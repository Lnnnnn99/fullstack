const express = require('express')
const {
    getOrderDetail,
    insertOrderDetail,
} = require('../controllers/orderDetailController')

const router = express.Router()

router.get('/order_detail/:order_id', getOrderDetail)
router.post('/order_detail', insertOrderDetail)

module.exports = router