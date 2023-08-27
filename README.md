# RideMate: Social System for Organizing Rides

## About

RideMate is a community-driven platform aimed at simplifying the process of organizing rides for various activities such
as carpooling to work, attending events, and more. Whether you have a vehicle and are looking to split costs or you're seeking a ride,
RideMate connects you with like-minded individuals to make your journey easier, economical, and more sustainable.

## Features

- **Ride Creation**: Easily create a new ride, specifying details like origin, destination, time, and available seats.
- **Ride Search**: Find rides that suit your timing and location needs.
- **User Profiles**: Create and customize your profile to build trust within the community.
- **In-App Messaging**: Communicate with potential ride mates without leaving the app.
- **Rating System**: Rate your experience to maintain a high-quality community.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Docker and Docker-compose

### Installation

1. **Clone the repository:**
git clone https://github.com/WojciechChuchro/SocialSystemForOrganizingRides.git

2. **Start docker-compose:**
docker-compose up -d

### Database Setup with Migration

1. **Execute the migration to create the database schema:**
npx knex migrate:latest --knexfile knexfile.ts

2. **Seed the database with initial data:**
npx knex seed:run

3. **To rollback the database:**
npx knex migrate:rollback --all

### Usage

1. **Register or Login**: Create a new account or log in using existing credentials.
2. **Profile Setup**: Set up your user profile.
3. **Create or Find a Ride**: Use the intuitive interface to either offer a ride or find one.
4. **In-App Communication**: Once matched, use the in-app messaging to coordinate.
5. **Ride and Rate**: After the ride is complete, rate your ride mate to help maintain a quality community.
