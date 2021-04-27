const express = require('express')
const helmet = require('helmet')
const morgan  = require('morgan')

const authRoute = require('./routes/userRoutes.js')
const postRoute  = require('./routes/postRoute.js')


const app = express()

//Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

// loading Routes 
app.use('/api/v1/users', authRoute)
app.use('/api/v1/blog', postRoute)


module.exports = app