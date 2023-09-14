#!/bin/bash

# Function to wait for the database to be up and running
wait_for_db() {
  while ! nc -z server_container 8806; do
    echo "Waiting for the database to be available..."
    sleep 2
  done
  echo "Database is up and running!"
}

# Wait for the database to be ready
wait_for_db

# Run the database migration
npx knex migrate:latest

# Make dummy data in the database
npx knex seed:run

# Start the Express application
npm start
