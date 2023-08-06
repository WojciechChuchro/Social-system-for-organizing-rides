# Use the official Node.js image as the base
FROM node:18.10 as build

# Set the working directory inside the container
WORKDIR /usr/local/app/client

# Add the source code to app
COPY ./ /usr/local/app/client

# Install dependencies
RUN npm install

# Build the Angular application
RUN npm run build

# Expose port 4200
EXPOSE 4200
