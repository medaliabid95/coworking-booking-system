# ---------- BASE ----------
FROM node:20-alpine AS base
WORKDIR /app

# ---------- DEPS ----------
FROM base AS deps
COPY package*.json ./
COPY ../../package*.json ../
RUN npm install

# ---------- BUILD ----------
FROM deps AS build
COPY . .
RUN npm run build

# ---------- RUN ----------
FROM node:20-alpine AS prod
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3001
CMD ["node", "dist/main.js"]
