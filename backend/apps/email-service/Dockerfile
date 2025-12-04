# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the code
COPY . .

# Build NestJS project
RUN npm run build

# Expose port (optional, not needed if only RMQ)
EXPOSE 3002

# Start the microservice
CMD ["node", "dist/main.js"]
