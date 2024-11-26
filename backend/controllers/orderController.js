const conn = require('../config/db')

exports.getOrders = (req, res) => {
    const query = "SELECT * FROM tab_order"
    conn.query(query, (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}


exports.getOrder = (req, res) => {
    const order_id = req.params.order_id

    const query = "SELECT * FROM tab_order WHERE order_id = ?"
    conn.query(query, [order_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}


exports.insertOrder = (req, res) => {
    const table_id = req.body.table_id
    const order_status = req.body.order_status
    const order_total_price = req.body.order_total_price

    const query = "INSERT INTO tab_order (table_id, order_status, order_total_price) VALUES (?, ?, ?)"

    conn.query(query, [table_id, order_status, order_total_price], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.updateOrderPaymentType = (req, res) => {
    const order_id = req.body.order_id
    const order_payment_type = req.body.order_payment_type

    const query = "UPDATE tab_order SET order_payment_type = ? WHERE order_id = ?"

    conn.query(query, [order_payment_type, order_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}