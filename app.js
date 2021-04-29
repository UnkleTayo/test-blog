const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

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

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  // console.log(req.headers);
  next();
});

// loading Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/post', postRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
