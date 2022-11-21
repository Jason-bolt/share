const express = require('express')
const router = express.Router()


// @desc    Index page
// @route   GET /
router.get('/', (req, res) => {
    res.render('index')
})

// @desc    Registration page
// @route   GET /register
router.get('/register', (req, res) => {
    res.render('register')
})

// @desc    Login page
// @route   GET /login
router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router