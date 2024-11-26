const conn = require('../config/db')

exports.getMenus = (req, res) => {
    const query = "SELECT * FROM tab_menu"
    conn.query(query, (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.insertMenu = (req, res) => {
    const menu_name = req.body.menu_name
    const menu_type = req.body.menu_type
    const menu_price = req.body.menu_price
    const menu_pic = req.body.menu_pic
    const menu_description = req.body.menu_description
    const menu_status = req.body.menu_status
    const menu_sales = req.body.menu_sales
    const menu_se = req.body.menu_se

    const query = "INSERT INTO tab_menu (menu_name, menu_type, menu_price, menu_pic, menu_description, menu_status, menu_sales, menu_se) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

    conn.query(query, [menu_name, menu_type, menu_price, menu_pic, menu_description, menu_status, menu_sales, menu_se], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.updateMenu = (req, res) => {
    const menu_id = req.body.menu_id
    const menu_sales = req.body.menu_sales

    const query = "UPDATE tab_menu SET menu_sales = ? WHERE menu_id = ?"

    conn.query(query, [menu_sales, menu_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.deleteMenu = (req, res) => {
    const menu_id = req.body.menu_id

    const query = "DELETE FROM tab_menu WHERE menu_id = ?"

    conn.query(query, [menu_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.getTypes = (req, res) => {
    const query = "SELECT menu_type FROM tab_menu GROUP BY menu_type"
    conn.query(query, (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.getMenu = (req, res) => {
    const menu_id = req.params.menu_id

    const query = "SELECT * FROM tab_menu WHERE menu_id = ?"
    conn.query(query, [menu_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}
