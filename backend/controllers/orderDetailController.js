const conn = require('../config/db')

exports.getOrderDetail = (req, res) => {
    const order_id = req.params.order_id

    const query = "SELECT * FROM tab_order_detail INNER JOIN tab_menu ON tab_menu.menu_id = tab_order_detail.menu_id WHERE order_id = ?"
    conn.query(query, [order_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}


exports.getOrderDetailByID = (req, res) => {
    const order_detail_id = req.params.order_detail_id

    const query = "SELECT * FROM tab_order_detail WHERE order_detail_id = ?"
    conn.query(query, [order_detail_id], (err, results) => {
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

exports.updateOrderDetail = (req, res) => {
    const order_detail_id = req.body.order_detail_id;
    const order_id = req.body.order_id;
    const menu_id = req.body.menu_id;
    const order_detail_menu_se = req.body.order_detail_menu_se;
    const order_detail_quantity = req.body.order_detail_quantity;
    const order_detail_price = req.body.order_detail_price;
    const order_detail_substatus = req.body.order_detail_substatus;

    const query = `
        UPDATE tab_order_detail 
        SET 
            order_id = ?, 
            menu_id = ?, 
            order_detail_menu_se = ?, 
            order_detail_quantity = ?, 
            order_detail_price = ?, 
            order_detail_substatus = ?
        WHERE 
            order_detail_id = ?
    `;

    conn.query(
        query,
        [
            order_id, 
            menu_id, 
            order_detail_menu_se, 
            order_detail_quantity, 
            order_detail_price, 
            order_detail_substatus, 
            order_detail_id
        ],
        (err, results) => {
            if (err) {
                return res.json({ error: err.message });
            }
            res.json({ message: "Order detail updated successfully!", results });
        }
    );
};


exports.deleteOrderDetail = (req, res) => {
    const order_detail_id = req.body.order_detail_id;

    const query = "DELETE FROM tab_order_detail WHERE order_detail_id = ?"
    conn.query(query, [order_detail_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}