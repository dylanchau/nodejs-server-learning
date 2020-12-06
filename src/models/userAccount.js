const mongoose = require('mongoose');

const {
  emailValidator,
  passwordValidator,
} = require('../validation/userAccountValidator');

const { Schema } = mongoose;

const userAccountSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: (e) => emailValidator(e),
      message: (e) => `${e.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: (p) => passwordValidator(p),
      message: (p) => `${p.value} is not a valid password`,
    },
  },
});

module.exports = mongoose.model('UserAccount', userAccountSchema);
