
const Products = require('../models/products')

const getAllProductsStatic = async (req,res) => {
  const products = await Products.find({})
  // if(product.length === 0)
  // {
  //   throw new Error('Item not found')
  // }
  res.status(200).json({products : products , nBHits : products.length })
}

const getAllProducts = async(req,res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query

  const queryObject = {}

  if(featured)
  {
    queryObject.featured = featured
  }
  if (company) {
    queryObject.company = company
  }
  if(name)
  {
    queryObject.name = { $regex : name , $options : 'i'}
  }

  if(numericFilters)
  {
    const operators = {
      '>' : '$gt',
      '>=' : '$gte',
      '=' : '$eq',
      '<' : '$lt',
      '<=' : '$lte'
    }
    const regEx = /\b(<|>|<=|>=|=)\b/ 
    let filters = numericFilters.replace(regEx , (match) => {
      return `-${operators[match]}-`
    });
    filters = filters.split(',').forEach((item) => {
      let [ field , operator , value ] = item.split('-');
      queryObject[field] = { [operator] : Number(value) }
    })
  }

  let results = Products.find(queryObject)

  if(sort)
  {
    const sortList = sort.split(',').join(' ')
    results = results.sort(sortList)
  }
  else
  {
    results = results.sort('createdAt')
  }

  if(fields)
  {
    const fieldsList = fields.split(',').join(' ')
    results = results.select(fieldsList)
  }

  const products = await results
  console.log(queryObject)

  res.status(200).send({ products : products , nBHits : products.length })
  // res.status(200).json(req.query)
}

module.exports = { getAllProductsStatic , getAllProducts }