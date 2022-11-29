const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const flash = require('connect-flash')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
// Handlebars helpers
const { formatDate, selectIncluded } = require('./helpers/hbs')


// Load config variables
dotenv.config({ path: './config/config.env' })

// Connect Database
connectDB()

// Configure passport
require('./config/passport')(passport)

// Routes
const publicRoute = require('./routes/public')
const errorRoute = require('./routes/errors')
const testimonyRoute = require('./routes/testimonies')

// Initializing app
const app = express()

// Override POST method
app.use(methodOverride('_method'))

// Parse body
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));


// Flash messages
app.use(flash())

// Registering passport
app.use(passport.initialize())
app.use(passport.session())

// Setting up global variables
app.use(function(req, res, next){
    res.locals.message = req.flash();
    res.locals.user = req.user || null
    next();
});

// Handlebars
app.engine('.hbs', handlebars.engine({
    helpers: {
        formatDate,
        selectIncluded
    },
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

// Routes implementation
app.use('/', publicRoute)
app.use('/error', errorRoute)
app.use('/testimony', testimonyRoute)

PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
