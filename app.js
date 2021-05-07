const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const authRoute = require('./routes/authRoutes.js');
const postRoute = require('./routes/postRoutes.js');
const userRoute = require('./routes/userRoutes.js');
const AppError = require('./utils/appErrorHandler.js');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 100 requests per windowMs
  messages: 'Too many request from this Ip, please try again in an hour',
});

const appVersion = process.env.APP_VERSION;

// Set HTTP Headers
app.use(helmet());

// Body parser middleware
app.use(express.json({ limit: '10kb' }));

// Data sanitizarion against Nosql injection
app.use(mongoSanitize());

// Data sanitization aains xss
app.use(xss());
// Prod logging
if (process.env.NODE_ENV === 'production') {
  app.use('/api', limiter);
}

//Dev logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  // console.log(req.headers);
  // console.log(process.env.APP_VERSION)
  next();
});

// loading Routes
// app.use('/api/v1/auth', authRoute);
app.use(`/${appVersion}/auth`, authRoute);
app.use(`/${appVersion}/user`, userRoute);
app.use(`/${appVersion}/post`, postRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
