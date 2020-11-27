const calculateTotal = (productList) => {
  return (productList || []).reduce((sum, p) => {
    const { price, quantity } = p;
    return sum + Number(price) * Number(quantity);
  }, 0);
};

module.exports = { calculateTotal };
