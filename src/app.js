const express = require('express');

const productRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const logger = require('./logger');

const app = express();
app.use(express.json());

app.use(logger);

app.use('/products', productRouter);
app.use('/orders', ordersRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');

  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: error.message,
  });
});

module.exports = app;
