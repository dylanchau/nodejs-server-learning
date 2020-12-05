const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserAccountSchema = require('../models/userAccount');
const { hashPassword } = require('../utils');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const isExistedAccount = await UserAccountSchema.exists({ email });
    if (isExistedAccount) {
      return res.status(404).json({
        message: `${email} has already exist`,
      });
    }

    const hashedPassword = await hashPassword(password);

    const userAccount = new UserAccountSchema({
      email,
      password: hashedPassword,
    });

    const isCreatedSuccessfull = await userAccount.save();
    if (isCreatedSuccessfull) {
      return res.status(201).json({
        message: 'User account is created successful',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { email: inputEmail, password: inputPass } = req.body;
  const userAccount = await UserAccountSchema.find({ email: inputEmail });

  if (!userAccount) {
    return res.status(404).json({
      error: 'Email/Password is incorrect',
    });
  }

  const match = await bcrypt.compare(inputPass, userAccount[0].password);
  if (!match) {
    return res.status(401).json({
      error: {
        message: 'Email/Password is incorrect',
      },
    });
  }

  const token = await jwt.sign(
    { email: userAccount[0].email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.EXPIRE_PERIOD,
    }
  );
  res.status(200).json({
    data: token,
  });
});

module.exports = router;
