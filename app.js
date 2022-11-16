const express = require('express')
const dotenv = require('dotenv')
const path = require('path')


// Load config variables
dotenv.config({ path: './config/config.env' })

// Initializing app
const app = express()


// Static folder
app.use(express.static(path.join(__dirname, 'public')))

PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))