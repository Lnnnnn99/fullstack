const conn = require('../config/db')

exports.getEmployees = (req, res) => {
    const query = "SELECT * FROM tab_employee"
    conn.query(query, (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.getEmployee = (req, res) => {
    const { employee_id } = req.params;
    const query = "SELECT * FROM tab_employee WHERE employee_id = ?";

    conn.query(query, [employee_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results[0])
    })
}

exports.insertEmployee = (req, res) => {
    const employee_name = req.body.employee_name
    const employee_status = req.body.employee_status
    const employee_username = req.body.employee_username
    const employee_password = req.body.employee_password
    const employee_role = req.body.employee_role

    const query = "INSERT INTO tab_employee (employee_name, employee_status, employee_username, employee_password, employee_role) VALUES (?, ?, ?, ?, ?)";
    conn.query(query, [employee_name, employee_status, employee_username, employee_password, employee_role], (err, results) => {
        if(err){
            return res.json(err) 
        }
        res.json(results)
    });
}

exports.updateEmployee = (req, res) => {
    const { employee_id } = req.params;
    const { employee_name, employee_status, employee_username, employee_password, employee_role } = req.body;

    const query = "UPDATE tab_employee SET employee_name = ?, employee_status = ?, employee_username = ?, employee_password = ?, employee_role = ? WHERE employee_id = ?";

    conn.query(query, [employee_name, employee_status, employee_username, employee_password, employee_role, employee_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.updateEmployeeStatus = (req, res) => {
    const { employee_id } = req.params;
    const { employee_status } = req.body;

    const query = "UPDATE tab_employee SET employee_status = ? WHERE employee_id = ?";

    conn.query(query, [employee_status, employee_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}

exports.deleteEmployee = (req, res) => {
    const employee_id = req.body.employee_id

    const query = "DELETE FROM tab_employee WHERE employee_id = ?"

    conn.query(query, [employee_id], (err, results) => {
        if(err){
           return res.json(err) 
        }
        res.json(results)
    })
}