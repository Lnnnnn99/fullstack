const express = require('express')
const {
    getTables, 
    insertTable, 
    updateTable, 
    updateTableStatus,
    deleteTable,
    getTable
} = require('../controllers/tableController')

const router = express.Router()

router.get('/tables', getTables)
router.get('/table/:table_id', getTable)
router.post('/table', insertTable)
router.put('/table/:table_id', updateTable)
router.put('/table/status/:table_id', updateTableStatus)
router.delete('/table/:table_id', deleteTable)

module.exports = router