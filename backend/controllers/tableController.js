const conn = require('../config/db')

exports.getTables = (req, res) => {
    const query = "SELECT * FROM tab_table"
    conn.query(query, (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.insertTable = (req, res) => {
    const table_number = req.body.table_number
    const table_status = req.body.table_status

    const query = "INSERT INTO tab_table (table_number, table_status) VALUES (?, ?)"

    conn.query(query, [table_number, table_status], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.updateTable = (req, res) => {
    const table_id = req.body.table_id
    const table_status = req.body.table_status

    const query = "UPDATE tab_table SET table_status = ? WHERE table_id = ?"

    conn.query(query, [table_status, table_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.deleteTable = (req, res) => {
    const table_id = req.body.table_id

    const query = "DELETE FROM tab_table WHERE table_id = ?"

    conn.query(query, [table_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}