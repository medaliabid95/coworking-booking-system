@echo off
REM -------------------------------
REM Start backend environment (Windows)
REM -------------------------------

echo Starting Docker containers for Postgres & RabbitMQ...
docker-compose up -d postgres rabbitmq

REM Wait until Postgres is ready
echo Waiting for Postgres to start...
:waitloop
docker exec -it coworking-db pg_isready -U admin >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    timeout /t 3 >nul
    goto waitloop
)
echo Postgres is ready!

REM Run Prisma migrations
echo Running Prisma migrations...
npx prisma migrate dev --name init --schema=libs/database/src/prisma/schema.prisma

REM Seed the database
echo Seeding the database...
npm run seed

REM Start all NestJS services in dev mode
echo Starting API Gateway, Booking Service, and Email Service...
start "API Gateway" cmd /k "npm run start:api:dev"
start "Booking Service" cmd /k "npm run start:booking:dev"
start "Email Service" cmd /k "npm run start:email:dev"

echo All services started!
pause
