const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Handing GET request to /products',
  });
});

router.get('/:productId', (req, res) => {
  const { productId } = req.params;
  res.json({
    message: `You are fetching info of product with id ${productId}`,
  });
});

router.post('/', (req, res) => {
  const data = req.body;
  res.json({
    data,
  });
});

router.patch('/:productId', (req, res) => {
  res.json({
    message: `Product with ${req.params.productId} updated`,
  });
});

router.delete('/:productId', (req, res) => {
  res.json({
    message: `Product with ${req.params.productId} deleted`,
  });
});
module.exports = router;
