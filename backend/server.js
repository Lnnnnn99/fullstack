const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const tableRoute = require('./routes/tableRoute')
const menuRoute = require('./routes/menuRoute')
const orderRoute = require('./routes/orderRoute')
const orderDetailRoute = require('./routes/orderDetailRoute')
const paymentRoute = require('./routes/paymentRoute')


dotenv.config()

const app = express();

app.use(bodyParser.json())
app.use(cors());

app.use('/api', tableRoute)
app.use('/api', menuRoute)
app.use('/api', orderRoute)
app.use('/api', orderDetailRoute)
app.use('/api', paymentRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is running');
});