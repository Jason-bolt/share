const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
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
    helpers: {
        // formatDate,
        // stripTags,
        // truncate,
        // editIcon,
        // select
    },
    extname: '.hbs',
    // defaultLayout: 'main_template'
}))
app.set('view engine', '.hbs')

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))