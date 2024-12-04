const conn = require('../config/db')

exports.getPayment = (req, res) => {
    const payment_id = req.params.payment_id

    const query = "SELECT * FROM tab_payment WHERE payment_id = ?"
    conn.query(query, [payment_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.getPaymentByOrderID = (req, res) => {
    const order_id = req.params.order_id

    const query = "SELECT * FROM tab_payment WHERE order_id = ?"
    conn.query(query, [order_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}


exports.insertPayment = (req, res) => {
    const order_id = req.body.order_id
    const payment_method = req.body.payment_method
    const payment_status = req.body.payment_status
    const payment_amount = req.body.payment_amount
    const payment_currency = req.body.payment_currency

    const query = "INSERT INTO tab_payment (order_id, payment_method, payment_status, payment_amount, payment_currency) VALUES (?, ?, ?, ?, ?)"

    conn.query(query, [order_id, payment_method, payment_status, payment_amount, payment_currency], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.updatePaymentStatus = (req, res) => {
    const payment_id = req.body.payment_id
    const payment_status = req.body.payment_status

    const query = "UPDATE tab_payment SET payment_status = ? WHERE payment_id = ?"

    conn.query(query, [payment_status, payment_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}