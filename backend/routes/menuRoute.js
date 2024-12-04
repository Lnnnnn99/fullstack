const express = require('express')
const multer = require("multer");
const path = require("path");
const {
    getMenus, 
    insertMenu, 
    updateMenu,
    updateMenuStatus,
    deleteMenu,
    getTypes,
    getMenu
} = require('../controllers/menuController')

const router = express.Router()

// ตั้งค่า multer สำหรับอัปโหลดรูปภาพ
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images")); // โฟลเดอร์เก็บไฟล์
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // ชื่อไฟล์ไม่ซ้ำ
    },
});

const upload = multer({ storage });

router.get('/menus', getMenus)
router.post('/menu', upload.single("menu_pic"), insertMenu)
router.put('/menu/:menu_id', upload.single("menu_pic"), updateMenu)
router.put('/menu/status/:menu_id', updateMenuStatus)
router.delete('/menu', deleteMenu)

router.get('/types', getTypes)

router.get('/menu/:menu_id', getMenu)

module.exports = router