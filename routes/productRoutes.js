const express = require('express')
const router = express.Router()
const {
    getProducts,
    setProduct,

} = require('../controllers/productController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getProducts).post(protect, setProduct)


module.exports = router