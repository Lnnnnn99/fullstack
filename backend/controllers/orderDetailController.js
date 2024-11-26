const conn = require('../config/db')

exports.getOrderDetail = (req, res) => {
    const order_id = req.params.order_id

    const query = "SELECT * FROM tab_order_detail WHERE order_id = ?"
    conn.query(query, [order_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}


exports.insertOrderDetail = (req, res) => {
    const order_id = req.body.order_id
    const menu_id = req.body.menu_id
    const order_detail_menu_se = req.body.order_detail_menu_se
    const order_detail_quantity = req.body.order_detail_quantity
    const order_detail_price = req.body.order_detail_price
    const order_detail_substatus = req.body.order_detail_substatus

    const query = "INSERT INTO tab_order_detail (order_id, menu_id , order_detail_menu_se, order_detail_quantity, order_detail_price, order_detail_substatus) VALUES (?, ?, ?, ?, ?, ?)"

    conn.query(query, [order_id, menu_id , order_detail_menu_se, order_detail_quantity, order_detail_price, order_detail_substatus], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}