# Stage 1: Build the app
FROM node:20 AS build

# Set the working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the app source code
COPY . .

# Build the NestJS app
RUN npm run build-docker

# Stage 2: Production image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy only the production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the compiled app from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose the application port (default: 3000)
EXPOSE 8080

# Start the application
CMD ["node", "dist/main"]
