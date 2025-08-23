const express = require('express')
const songRoutes = require('./routes/song.routes')

app = express()
app.use(express.json())

app.use('/', songRoutes)

module.exports = app