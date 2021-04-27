import express from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import logger from 'morgan'
import { connectDB } from './db/connectDB.js'
import authRoute from './src/routers/authRoute.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 6000;

app.use(helmet());
app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// loading Routes 
app.use('/api/v1/', authRoute)


const connect =() => {
return app.listen(PORT, console.log("Im connected on port", PORT))
}

connectDB(connect)
