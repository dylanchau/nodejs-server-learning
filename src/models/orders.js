const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  description: { type: String },
  total: { type: Number },
  products: { type: [Schema.Types.Mixed], required: [true] },
});

module.exports = mongoose.model('Order', orderSchema);
