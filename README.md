# coworking-booking-system

I. Assignment
Build a website to manage meeting room bookings for a coworking space that meets the
following criteria :
1. The coworking space has 10 meeting rooms:
- 2 large rooms (premium)
- 5 medium rooms (2 premium)
- 3 small rooms
2. Users can view the availability of meeting rooms based on their membership type
(premium or regular).
- Premium users can book 24/7
- Regular users can book only during business hours/days
3. Users receive email reminders:
- 5 minutes before the booking time
- 5 minutes before the checkout time
4. Users can invite guests to attend the meetings, and everyone should receive reminder
emails.
5. Users must confirm their booking through a link sent to their email, which includes details
of the meeting room, time, date, and guest list.
II. Technical Specifications
1. Frontend: Next.js
2. Backend: Nest.js
3. Deployment: Vercel or a similar platform for frontend
4. Two microservices:
- Email microservice: Handles email reminders and confirmations
- Booking microservice: Manages bookings, availability, and meeting room details

III. Assessment Tasks
1. Design the frontend UI/UX of the link below for the website following the requirements
detailed above.
https://askproject.net/varspace/spaces/#
2. Create necessary API endpoints and controllers using Nest.js for the backend, including
user authentication, room availability, and booking management.
3. Implement microservices for email functionality and booking management.
Bonuses :
1. Integrate the frontend and backend components to ensure seamless user experience.
2. Deploy the frontend to Vercel or a similar platform, ensuring the website functions
correctly and remains responsive on various screen sizes.
3. Write unit tests for the frontend and backend components to ensure code quality and proper
functionality.
4. Properly handle errors on the frontend and backend components to prevent crashes and
ensure they are logged for review.
5. Document the project, including setup instructions, code descriptions, and future
improvements.

## Deploying the frontend (Vercel)
1. In `frontend`, set `NEXT_PUBLIC_API_BASE` (e.g., `https://<your-backend-host>/api`).
2. Run `npm run build` locally to confirm it compiles.
3. Push to your repo and import the project into Vercel; set `NEXT_PUBLIC_API_BASE` in Vercel env vars.
4. Vercel will run `npm run build` by default; after deploy, sanity-check responsive layout (mobile/desktop).

## Backend run/test
```bash
cd backend
npm install
npm test            # unit tests (includes booking-service unit spec)
docker compose up -d # infra (Postgres, RabbitMQ, MailHog) when running services locally
```

## Error handling & logging
- API Gateway and services return structured HTTP errors; RMQ consumers log failures.
- Email service catches SMTP errors and skips sends when recipients are missing.
- Reminders: scheduler runs every minute and sends start/checkout emails ~5 minutes before start/end (confirmed bookings only).

## Future improvements
- Add frontend unit/integration tests (React Testing Library) and E2E smoke (Playwright) against a running backend.
- Add migrations for DB schema changes instead of sync.
- Add centralized logging/metrics (e.g., pino + OpenTelemetry) across services.
- Harden rate limits/auth flows on API Gateway before production.
IV. Evaluation
The assessment will be evaluated based on the following criteria:
1. Completion of tasks as described in the list above
2. Quality of code, including readability, maintainability, and organization
3. Proper handling of errors in the user interface and backend components
4. Quality of UI/UX design
5. Adherence to the frontend and backend frameworks (Next.js and Nest.js) and proper use of
their features and best practices
6. Evaluation of the understanding of each used dependency

## Quickstart (local dev)

### Prereqs
- Node.js 18+ and npm
- Docker (PostgreSQL, RabbitMQ, MailHog run via compose)
- PostgreSQL reachable if you prefer running DB outside Docker

### Backend
```bash
cd backend
npm install
# start full stack (Postgres, RabbitMQ, MailHog, services)
docker compose up -d --build
# create .env (example) if you run services locally instead of compose
cat > .env <<'EOF'
DATABASE_URL=postgres://postgres:postgres@localhost:5432/coworking
JWT_SECRET=devsecret
SMTP_HOST=localhost       # compose wires mailhog internally
SMTP_PORT=1025            # MailHog SMTP port
SMTP_FROM=no-reply@example.com
FRONTEND_URL=http://localhost:3000
EOF
# generate seed data
npx ts-node libs/database/src/seeds.ts
# start services (in separate terminals) if not using compose
npx nest start booking-service --watch
npx nest start email-service --watch
npx nest start api-gateway --watch
```

### Frontend
```bash
cd frontend
npm install
npm run dev -- --hostname 0.0.0.0 
```

### Testing email locally
MailHog is included in docker compose. Dashboard: http://localhost:8025

### Reset the local stack and DB
```bash
cd backend
docker compose down -v   # stop and drop Postgres volume
docker compose up -d --build
npm test                 # run backend unit tests
```

### Key API endpoints (via API Gateway, default http://localhost:3000/api)
- `POST /auth/register` {name, email, password, isPremium?}
- `POST /auth/login` {email, password}
- `GET /rooms` list rooms
- `POST /bookings` create booking
- `PATCH /bookings/:id` update booking (room/time/guests)
- `PATCH /bookings/confirm` {bookingId, token?} confirm booking

Rules enforced:
- Premium rooms require premium users.
- Regular users: bookings only Mon-Fri 09:00-17:00 UTC.
- No overlapping bookings; end time must be after start.
