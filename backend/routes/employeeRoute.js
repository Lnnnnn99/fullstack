const express = require('express')
const {
    getEmployees, 
    insertEmployee, 
    updateEmployee, 
    updateEmployeeStatus,
    deleteEmployee,
    getEmployee
} = require('../controllers/employeeController')

const router = express.Router()

router.get('/employees', getEmployees)
router.get('/employee/:employee_id', getEmployee)
router.post('/employee', insertEmployee)
router.put('/employee/:employee_id', updateEmployee)
router.put('/employee/status/:employee_id', updateEmployeeStatus)
router.delete('/employee/:employee_id', deleteEmployee)

module.exports = router