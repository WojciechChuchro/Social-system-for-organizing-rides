import http from "http"
import cors from "cors"
import express, { Request, Response } from "express"
import compression from "compression"
import cookieParser from "cookie-parser"
import router from "./router"
import dotenv from "dotenv"

// app.js

import mysql from 'mysql';

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors)
dotenv.config()

const db = mysql.createConnection({
  host: 'localhost',
  user: 'wojtek',
  password: 'wojtek',
  database: 'social-system-for-organizing-rides',
});

if(db) {
  console.log('db connection')
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get('/', (req: Request, res: Response) => {
  return res.status(200).send('Hello World');
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
