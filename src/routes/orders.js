const express = require('express');

const OrderSchema = require('../models/orders');
const { calculateTotal } = require('../utils');

const authMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const allOrders = await OrderSchema.find().select('-__v').exec();
  res.status(200).json({
    data: allOrders,
  });
});

router.get('/:orderId', authMiddleware, async (req, res) => {
  const { orderId: id } = req.params;
  const order = await OrderSchema.findById(id).select('-__v');

  res.status(200).json({
    data: order,
  });
});

router.post('/', authMiddleware, (req, res) => {
  const { description, products } = req.body;
  const total = calculateTotal(products);
  const order = new OrderSchema({ description, total, products });
  order
    .save()
    .then((result) => {
      res.status(201).json({
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.patch('/:orderId', authMiddleware, async (req, res) => {
  const { orderId: id } = req.params;
  const query = req.body;

  const updatedOrder = await OrderSchema.findByIdAndUpdate(id, query, {
    new: true,
  }).select('-__v');

  res.status(200).json({
    data: updatedOrder,
  });
});

router.delete('/:orderId', authMiddleware, async (req, res) => {
  const { orderId: id } = req.params;
  let result = {};
  try {
    const deletedOrder = await OrderSchema.findByIdAndDelete(id);
    result = {
      message: 'Deleted Successfully',
      status: 200,
    };
    if (!deletedOrder) {
      result = {
        message: `Cannot found order with id=${id}`,
        status: 404,
      };
    }
  } catch (err) {
    result = {
      message: `Deleted fail: ${err}`,
      status: 500,
    };
  }

  res.status(result.status).json({
    message: result.message,
  });
});

module.exports = router;
