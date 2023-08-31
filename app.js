const path = require('path');
const express = require('express');
const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const questionRouter = require('./routes/questionRoutes');
const trainingRouter = require('./routes/trainingRoutes');
const historyRouter = require('./routes/historyRoutes');
const generalRouter = require('./routes/generalRoutes');
const generalHistoryRouter = require('./routes/generalHistoryRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

// app.enable('trust proxy');

//pug enable
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// implement CORS
app.use(cors());
app.options('*', cors());

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limit api for api routes
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000, //1 hour
//   message: 'Too many requrest from this IP, please try again in an hour',
// });
// app.use('/api', limiter);

// body parser, reading data from body into req.body
app.use(express.json({ limit: '1000kb' }));

// reading url encoded // gak perlu install body parser
app.use(express.urlencoded({ extended: true, limit: '1000kb' }));

// reading cookies from incoming request
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize()); //filter semua param, body dll dari $ simbol, agar tidak bisa terjadi query injection lagi

// Data sanitization against XSS
app.use(xss()); //clear html in request

// untuk melakukan kompres semua text data yang dikirim ke client
app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//main routes
app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/trainings', trainingRouter);
app.use('/api/v1/generals', generalRouter);

//history
app.use('/api/v1/histories', historyRouter);
app.use('/api/v1/general-histories', generalHistoryRouter);
app.use('/', viewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
