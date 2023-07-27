# Use the official Node.js image as the base
FROM node:latest as build

# Set the working directory inside the container
WORKDIR /var/www

# Add the source code to app
COPY ../../client /var/www

# Install dependencies
RUN npm install

# Build the Angular application
RUN npm run build

# Serve app with nginx server
FROM nginx:latest as runtime

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to replace the default nginx files
COPY --from=build /var/www/dist/client /var/share/nginx/html

# Expose port 80
EXPOSE 80
