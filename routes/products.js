
const express = require('express')
const { getAllProducts , getAllProductsStatic } = require('../controllers/products')

const router = express.Router()

router.get('/static',getAllProductsStatic)

router.get('/',getAllProducts)

module.exports = router