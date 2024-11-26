const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

conn.connect(err => {
    if(err) throw err
    console.log('Connected database success!')
})

module.exports = conn