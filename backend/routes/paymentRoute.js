const express = require('express')
const {
    getPayment,
    insertPayment,
    updatePaymentStatus,
} = require('../controllers/paymentController')

const router = express.Router()

router.get('/payment/:payment_id', getPayment)
router.post('/payment', insertPayment)
router.put('/payment', updatePaymentStatus)

module.exports = router