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

# Expose port
EXPOSE 3001

# Start the service
CMD ["node", "dist/main.js"]
