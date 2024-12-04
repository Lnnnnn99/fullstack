const conn = require('../config/db')

exports.getTables = (req, res) => {
    const query = "SELECT * FROM tab_table ORDER BY table_number"
    conn.query(query, (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.getTable = (req, res) => {
    const { table_id } = req.params;
    const query = "SELECT * FROM tab_table WHERE table_id = ?";

    conn.query(query, [table_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results[0])
    })
}

exports.insertTable = (req, res) => {
    const table_number = req.body.table_number
    const table_status = req.body.table_status

    // ตรวจสอบว่า table_number ซ้ำหรือไม่
    const checkQuery = "SELECT * FROM tab_table WHERE table_number = ?";
    conn.query(checkQuery, [table_number], (err, results) => {
        if(err){
            return res.json(err) 
        }
        if (results.length > 0) { 
            return res.status(400).json({ error: "Table number already exists" });
        } 

        // เพิ่มข้อมูลโต๊ะใหม่
        const query = "INSERT INTO tab_table (table_number, table_status) VALUES (?, ?)";
        conn.query(query, [table_number, table_status], (err, results) => {
            if(err){
                return res.json(err) 
            }
            res.json(results)
        });
    });
}

exports.updateTable = (req, res) => {
    const { table_id } = req.params;
    const { table_number, table_status } = req.body;

    const query = "UPDATE tab_table SET table_number = ?, table_status = ? WHERE table_id = ?";

    conn.query(query, [table_number, table_status, table_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.updateTableStatus = (req, res) => {
    const { table_id } = req.params;
    const { table_status } = req.body;

    const query = "UPDATE tab_table SET table_status = ? WHERE table_id = ?";

    conn.query(query, [table_status, table_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.deleteTable = (req, res) => {
    const { table_id } = req.params;

    const query = "DELETE FROM tab_table WHERE table_id = ?"

    conn.query(query, [table_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}