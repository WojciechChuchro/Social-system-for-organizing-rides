import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import mysql from 'mysql2'
import router from './router'
import cookieParser from 'cookie-parser'

const corsOptions = {
	origin: 'http://localhost:4200',  // Your Angular's localhost or domain
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,  // This is essential
	allowedHeaders: ['Content-Type', 'Authorization', 'JsonWebToken']
}
const app = express()
dotenv.config()
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.listen(process.env.PORT || 8081, () => {
	console.log(`Server is running on port ${process.env.PORT || 8081}`)
})

// Database configuration
const dbConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	// password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
}

// Create the MySQL database connection
const connection = mysql.createConnection(dbConfig)

// Connect to the database
connection.connect((err) => {
	if (err) {
		console.error('Error connecting to MySQL:', err)
	} else {
		console.log('Connected to MySQL successfully!')
	}
})

app.use('/api/', router())
