import dotenv from "dotenv";
import cors from "cors";
import express, {Request, Response} from "express";
import mysql from "mysql2";
import Users from "./models/users.model"
import router from "./router";

const app = express();
app.use(express.json());
app.use(cors()); // Invoking the cors middleware
dotenv.config(); // Loading environment variables from .env file

app.listen(process.env.PORT || 8081, () => {
    console.log(`Server is running on port ${process.env.PORT || 8081}`);
});

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

// Create the MySQL database connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL successfully!');
    }
});

app.get('/', async(req, res) => {
    // const users = await Users.query()
    res.send("users")
})

app.use("/", router())
