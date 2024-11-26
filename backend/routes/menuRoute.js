const express = require('express')
const {
    getMenus, 
    insertMenu, 
    updateMenu, 
    deleteMenu,
    getTypes,
    getMenu
} = require('../controllers/menuController')

const router = express.Router()

router.get('/menus', getMenus)
router.post('/menu', insertMenu)
router.put('/menu', updateMenu)
router.delete('/menu', deleteMenu)

router.get('/types', getTypes)

router.get('/menu/:menu_id', getMenu)

module.exports = router