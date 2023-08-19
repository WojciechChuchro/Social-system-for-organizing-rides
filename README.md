# Social system for organizing rides

Execute migration:

npx knex migrate:latest --knexfile knexfile.ts

Insert data to the Database:

knex seed:run

Rollback database:

knex migrate:rollback --all