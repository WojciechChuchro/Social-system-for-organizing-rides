import dotenv from "dotenv";
import cors from "cors";
import express, {Request, Response} from "express";
import mysql from "mysql2";

const app = express();
app.use(express.json());
app.use(cors()); // Invoking the cors middleware
dotenv.config(); // Loading environment variables from .env file

app.listen(process.env.PORT || 8081, () => {
    console.log(`Server is running on port ${process.env.PORT || 8081}`);
});

app.get('/', (req: Request, res: Response) => {
    return res.status(200).send('Hello World');
});

// Database configuration
const dbConfig = {
    host: "localhost",
    user: "wojtek",
    password: "wojtek",
    database: 'social-system-for-organizing-rides',
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


app.post('/add-home-post', (req: Request, res: Response) => {
    const { id, about_us } = req.body;
    const insertQuery = 'INSERT INTO home (id, about_us) VALUES (?, ?)';

    connection.query(insertQuery, [id, about_us], (error, results) => {
        if (error) {
            console.error('Error adding home post:', error);
            return res.status(500).json({ error: 'Failed to add home post' });
        }

        console.log('New home post added successfully!');
        return res.status(201).json({ message: 'New home post added successfully!' });
    });
});



// Test the MySQL connection
// pool.getConnection((err: any, connection: any) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL successfully!');
//   connection.release();
// });

// Example route to fetch data from the database
// app.get('/users', (req: Request, res: Response) => {
//   pool.query('SELECT * FROM users', (err: any, results: any) => {
//     if (err) {
//       console.error('Error fetching data from MySQL:', err);
//       return res.status(500).json({ error: 'Error fetching data' });
//     }
//     return res.json(results);
//   });
// });


// const PORT = process.env.PORT || 8081
// const app = express()
//
// app.use(cors())
// app.use(cookieParser())
// app.use(compression())
// app.use(express.json())
//
// const server = http.createServer(app)
//
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}/`)
// })

// app.use("/", router())
