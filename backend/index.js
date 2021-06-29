const express = require('express')
require('dotenv').config()

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(require('./routes/'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
