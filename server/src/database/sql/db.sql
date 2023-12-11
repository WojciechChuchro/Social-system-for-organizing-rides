CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    street_id INTEGER,
    zip_code VARCHAR(9),
    house_number VARCHAR(7)
);

CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    brand_name VARCHAR(15) NOT NULL
);

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    model_id INTEGER NOT NULL,
    registration_number VARCHAR(9) NOT NULL,
    color VARCHAR(25) NOT NULL
);


CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    city_name VARCHAR(50) NOT NULL
);

CREATE TABLE looking_for_drivers (
    id SERIAL PRIMARY KEY,
    start_address_id INTEGER NOT NULL,
    destination_address_id INTEGER NOT NULL,
    earliest_departure_time TIMESTAMP NOT NULL,
    latest_departure_time TIMESTAMP NOT NULL,
    max_price NUMERIC(8,2) NOT NULL,
    number_of_people INTEGER NOT NULL
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    driver_id INTEGER NOT NULL,
    passenger_id INTEGER NOT NULL,
    text VARCHAR(255) NOT NULL,
    send_time TIMESTAMP NOT NULL,
    was_read BOOLEAN NOT NULL
);

CREATE TABLE models (
    id SERIAL PRIMARY KEY,
    brand_id INTEGER NOT NULL,
    model_name VARCHAR(30) NOT NULL
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    message VARCHAR(255) NOT NULL,
    was_read BOOLEAN NOT NULL
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    comment VARCHAR(255),
    rating INTEGER NOT NULL
);

CREATE TABLE rides (
    id SERIAL PRIMARY KEY,
    driver_id INTEGER NOT NULL,
    start_address_id INTEGER NOT NULL,
    destination_address_id INTEGER,
    earliest_departure_time TIMESTAMP NOT NULL,
    latest_departure_time TIMESTAMP NOT NULL,
    price_per_person NUMERIC(8,2) NOT NULL,
    seats_number INTEGER NOT NULL
);

CREATE TABLE statuses (
    id SERIAL PRIMARY KEY,
    is_accepted BOOLEAN NOT NULL
);

CREATE TABLE streets (
    id SERIAL PRIMARY KEY,
    city_id INTEGER,
    street_name VARCHAR(50)
);

CREATE TABLE user_rides (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    looking_for_driver_id INTEGER,
    ride_id INTEGER,
    status_id INTEGER NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    car_id INTEGER,
    email VARCHAR(50) NOT NULL,
    name VARCHAR(20) NOT NULL,
    surname VARCHAR(30) NOT NULL,
    phone_number VARCHAR(12) NOT NULL,
    profile_picture VARCHAR(255) DEFAULT 'default',
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    session_token VARCHAR(255)
);

ALTER TABLE cars
ADD CONSTRAINT cars_model_id_foreign
    FOREIGN KEY (model_id)
    REFERENCES models(id);

ALTER TABLE looking_for_drivers
ADD CONSTRAINT looking_for_drivers_start_address_id_foreign
    FOREIGN KEY (start_address_id)
    REFERENCES addresses(id);

ALTER TABLE looking_for_drivers
ADD CONSTRAINT looking_for_drivers_destination_address_id_foreign
    FOREIGN KEY (destination_address_id)
    REFERENCES addresses(id);

ALTER TABLE messages
ADD CONSTRAINT messages_passenger_id_foreign
    FOREIGN KEY (passenger_id)
    REFERENCES users(id);

ALTER TABLE messages
ADD CONSTRAINT messages_driver_id_foreign
    FOREIGN KEY (driver_id)
    REFERENCES users(id);

ALTER TABLE models
ADD CONSTRAINT models_brand_id_foreign
    FOREIGN KEY (brand_id)
    REFERENCES brands(id);

ALTER TABLE notifications
ADD CONSTRAINT notifications_userid_foreign
    FOREIGN KEY (user_id)
    REFERENCES users(id);

ALTER TABLE reviews
ADD CONSTRAINT reviews_userid_foreign
    FOREIGN KEY (user_id)
    REFERENCES users(id);

ALTER TABLE rides
ADD CONSTRAINT rides_driver_id_foreign
    FOREIGN KEY (driver_id)
    REFERENCES users(id);

ALTER TABLE rides
ADD CONSTRAINT rides_start_address_id_foreign
    FOREIGN KEY (start_address_id)
    REFERENCES addresses(id);

ALTER TABLE rides
ADD CONSTRAINT rides_destination_address_id_foreign
    FOREIGN KEY (destination_address_id)
    REFERENCES addresses(id);

ALTER TABLE streets
ADD CONSTRAINT streets_city_id_foreign
    FOREIGN KEY (city_id)
    REFERENCES cities(id);

ALTER TABLE user_rides
ADD CONSTRAINT user_rides_userid_foreign
    FOREIGN KEY (user_id)
    REFERENCES users(id);

ALTER TABLE user_rides
ADD CONSTRAINT user_rides_looking_for_driver_id_foreign
    FOREIGN KEY (looking_for_driver_id)
    REFERENCES looking_for_drivers(id);

ALTER TABLE user_rides
ADD CONSTRAINT user_rides_ride_id_foreign
    FOREIGN KEY (ride_id)
    REFERENCES rides(id);

ALTER TABLE user_rides
ADD CONSTRAINT user_rides_status_id_foreign
    FOREIGN KEY (status_id)
    REFERENCES statuses(id);

ALTER TABLE users
ADD CONSTRAINT users_email_unique
    UNIQUE (email);

ALTER TABLE users
ADD CONSTRAINT users_phone_number_unique
    UNIQUE (phone_number);

ALTER TABLE users
ADD CONSTRAINT users_car_id_foreign
    FOREIGN KEY (car_id)
    REFERENCES cars(id);

