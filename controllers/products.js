

const getAllProductsStatic = (req,res) => {
  res.send('All Products static')
}

const getAllProducts = (req,res) => {
  res.send('All products')
}

module.exports = { getAllProductsStatic , getAllProducts }