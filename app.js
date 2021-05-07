const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoute = require('./routes/authRoutes.js');
const postRoute = require('./routes/postRoutes.js');
const userRoute = require('./routes/userRoutes.js');
const AppError = require('./utils/appErrorHandler.js');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

if (process.env.NODE_ENV === 'production') {
  app.use(limiter);
}

const appVersion = process.env.APP_VERSION;

app.use(express.json());
app.use(helmet());
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
