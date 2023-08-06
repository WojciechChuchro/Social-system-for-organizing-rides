# Use the official Node.js image as the base
FROM node:18.10

# Set the working directory inside the container
WORKDIR /usr/local/app/server

# Add the source code to app
COPY ./ /usr/local/app/server

# Install dependencies
RUN npm install

# Expose port 8080
EXPOSE 8080

# Build the Express application

RUN apt update

RUN apt install netcat -y


CMD ["npm", "start"]
#RUN npm start

WORKDIR /usr/local/app/server/src/database
#
## Run the database migration
#RUN npx knex migrate:latest
#
## Make dummy data in the database
#RUN npx knex seed:run

## Copy the start script
#COPY start.sh /usr/local/app/server
#
## Make the start script executable
#RUN chmod +x /usr/local/app/server/start.sh
#
## Build the Express application
#CMD ["/usr/local/app/server/start.sh"]
