# Use the official PHP image as the base
FROM php:8.1-apache

# Set the working directory inside the container
WORKDIR /var/www/html

# Install dependencies and extensions
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    && docker-php-ext-install zip pdo_mysql \
    && a2enmod rewrite

# Copy the entire Symfony project
COPY . .

# Expose the port on which the Symfony application will run
EXPOSE 8000

# Define the command to start the Symfony application
CMD [ "apache2-foreground" ]
