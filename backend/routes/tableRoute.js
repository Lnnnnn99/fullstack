const express = require('express')
const {
    getTables, 
    insertTable, 
    updateTable, 
    deleteTable
} = require('../controllers/tableController')

const router = express.Router()

router.get('/tables', getTables)
router.post('/table', insertTable)
router.put('/table', updateTable)
router.delete('/table', deleteTable)

module.exports = router