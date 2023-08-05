# Use the official Node.js image as the base
FROM node:18.10 as build

# Set the working directory inside the container
WORKDIR /usr/local/app/server

# Add the source code to app
COPY ./ /usr/local/app/server

# Install dependencies
RUN npm install


CMD ["npm","run","start"]

# Serve app with nginx server

