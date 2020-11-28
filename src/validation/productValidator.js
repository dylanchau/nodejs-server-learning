const mongoose = require('mongoose');

const validateProductId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = {
  validateProductId,
};
