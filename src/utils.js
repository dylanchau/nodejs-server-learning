const bcrypt = require('bcrypt');

const calculateTotal = (productList) => {
  return (productList || []).reduce((sum, p) => {
    const { price, quantity } = p;
    return sum + Number(price) * Number(quantity);
  }, 0);
};

const hashPassword = async (password) => {
  // console.log(`Password: ${password}, ${process.env.SALT_HASH}`);
  try {
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
    return hash;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { calculateTotal, hashPassword };
