const express = require('express');
const bcrypt = require('bcrypt');

const UserAccountSchema = require('../models/userAccount');
const { hashPassword } = require('../utils');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const userAccount = new UserAccountSchema({
      email,
      password: hashedPassword,
    });

    userAccount.save().then((result) => {
      res.status(201).json({
        data: {
          message: result,
        },
      });
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
