const express = require('express')
const {
    getOrderDetail,
    getOrderDetailByID,
    insertOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
} = require('../controllers/orderDetailController')

const router = express.Router()

router.get('/order_detail/:order_id', getOrderDetail)
router.get('/order_detail_by_id/:order_detail_id', getOrderDetailByID)
router.post('/order_detail', insertOrderDetail)
router.put('/order_detail', updateOrderDetail)
router.delete('/order_detail', deleteOrderDetail)

module.exports = router