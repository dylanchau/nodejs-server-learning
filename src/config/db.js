const mongoose = require('mongoose');

const connectDb = () => {
  return mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = { connectDb };
