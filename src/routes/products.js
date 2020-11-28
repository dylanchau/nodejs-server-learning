const express = require('express');
const multer = require('multer');

const ProductSchema = require('../models/products');
const { validateProductId } = require('../validation/productValidator');
const { storage, limits } = require('../file-upload/uploadFile');

const upload = multer({ storage, limits });
const router = express.Router();

router.get('/', async (req, res) => {
  const allProducts = await ProductSchema.find().select('-__v');
  res.status(200).json({
    data: allProducts,
  });
});

router.get('/:productId', async (req, res, next) => {
  const { productId: id } = req.params;
  if (!validateProductId(id)) {
    const err = new Error(`Parameter ${id} is invalid`);
    next(err);
  }
  const product = await ProductSchema.findById(id).select('-__v');
  res.status(200).json({
    data: product,
  });
});

router.post('/', upload.single('image'), (req, res) => {
  const { name, price, quantity } = req.body;
  const image = (req.file && req.file.filename) || null;

  const product = new ProductSchema({
    name,
    price,
    quantity,
    image,
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        data: {
          product: result,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: err.message,
      });
    });
});

router.patch('/:productId', async (req, res) => {
  const { productId: id } = req.params;
  const query = req.body;

  const updatedProduct = await ProductSchema.findByIdAndUpdate(id, query, {
    new: true,
  }).select('-__v');

  res.status(200).json({
    data: updatedProduct,
  });
});

router.delete('/:productId', async (req, res) => {
  const { productId: id } = req.params;
  let result = {};
  try {
    const deletedProduct = await ProductSchema.findByIdAndDelete(id);
    result = {
      message: 'Deleted Successfully',
      status: 200,
    };
    if (!deletedProduct) {
      result = {
        message: `Cannot found product with id=${id}`,
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
