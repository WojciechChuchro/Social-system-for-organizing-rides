import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import mysql from 'mysql2'
import router from './router'
import cookieParser from 'cookie-parser'
import {Server} from 'socket.io'
import {configureSocket} from './socketManager'

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'JsonWebToken']
}

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

const httpServer = app.listen(process.env.PORT || 8081, () => {
  console.log(`Server is running on port ${process.env.PORT || 8081}`)
})

const io = new Server(httpServer, {cors: corsOptions})

configureSocket(io)

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

const connection = mysql.createConnection(dbConfig)

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
  } else {
    console.log('Connected to MySQL successfully!')
  }
})

app.use('/api/', router())
