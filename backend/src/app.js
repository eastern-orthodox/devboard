const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const env = require('./config/env');

const app = express();

app.use(helmet());

if (env.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'DevBoard API is running',
    environment: env.nodeEnv,
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

module.exports = app;