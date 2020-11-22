/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const connectDb = () => {
  console.log(`MONGOOSE_URL CONFIG: ${process.env.MONGOOSE_URL}`);
  return mongoose.connect(
    'mongodb+srv://nodejs-server:123456x@X@nodejs-server-learning.8d4c5.mongodb.net/nodejs-server-learning?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = { connectDb };
