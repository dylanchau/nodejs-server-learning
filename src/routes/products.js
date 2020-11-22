const express = require('express');

const ProductSchema = require('../models/products');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Handing GET request to /products',
  });
});

router.get('/:productId', async (req, res) => {
  const { productId: id } = req.params;
  const product = await ProductSchema.findById(id);

  res.status(200).json({
    data: product,
  });
});

router.post('/', (req, res) => {
  const { name, price, quantity } = req.body;

  const product = new ProductSchema({ name, price, quantity });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        data: {
          product: result,
        },
      });
    })
    .catch((err) => console.log(err));
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
