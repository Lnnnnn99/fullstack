const express = require('express')
const {
    getOrders,
    getOrder,
    insertOrder,
    updateOrderPaymentType,
} = require('../controllers/orderController')

const router = express.Router()

router.get('/orders', getOrders)
router.get('/order/:order_id', getOrder)
router.post('/order', insertOrder)
router.put('/order', updateOrderPaymentType)

module.exports = router