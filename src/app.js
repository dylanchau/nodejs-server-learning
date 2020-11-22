/* eslint-disable no-unused-vars */
const express = require('express');

const productRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const logger = require('./logger');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE');
    return res.status(200).json({});
  }

  next();
});

app.use(logger);

app.use('/products', productRouter);
app.use('/orders', ordersRouter);

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log('Error handler');

  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
