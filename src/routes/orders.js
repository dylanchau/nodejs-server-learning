const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Handing GET request to orders/',
  });
});

router.get('/:orderId', (req, res) => {
  const { orderId } = req.params;
  res.json({
    message: `You are fetching info of order with id ${orderId}`,
  });
});

router.post('/', (req, res) => {
  const data = req.body;
  res.json({
    data,
  });
});

router.patch('/:orderId', (req, res) => {
  res.json({
    message: `Order with ${req.params.orderId} updated`,
  });
});

router.delete('/:orderId', (req, res) => {
  res.json({
    message: `Order with ${req.params.orderId} deleted`,
  });
});

module.exports = router;
