require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./DB/connection')

const weatherServer = express()
weatherServer.use(express.json())
weatherServer.use(cors())
weatherServer.use(router)

const PORT = 4000 || process.env.port

weatherServer.listen(PORT, () => {
    console.log(`weatherServer started at port ${PORT}`);
})

weatherServer.get('/', (req, res) => {
    res.send(`<h1>Example app listening at http://localhost:${PORT}</h1>`)
})