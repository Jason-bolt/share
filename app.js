const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
// Routes
const publicRoute = require('./routes/public')

// Load config variables
dotenv.config({ path: './config/config.env' })

// Initializing app
const app = express()

// Routes implementation
app.use('/', publicRoute)

// Handlebars
app.engine('.hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main_layout'
}))
app.set('view engine', '.hbs')

// Running logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))