const express = require('express')
const {
    getPayment,
    getPaymentByOrderID,
    insertPayment,
    updatePaymentStatus,
} = require('../controllers/paymentController')

const router = express.Router()

router.get('/payment/:payment_id', getPayment)
router.get('/payment/order/:order_id', getPaymentByOrderID)
router.post('/payment', insertPayment)
router.put('/payment/status', updatePaymentStatus)

module.exports = router