const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

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

// @desc    Register user
// @route   POST /register
router.post('/register', (req, res) => {
    // Compare passwords
    if (req.body.password !== req.body.confirm_password){
        req.flash('message', 'Passwords do not match!')
        res.redirect('/register')   
    }

    // Check length
    if (req.body.password.length < 6) {
        req.flash('message', 'Password must be 8 or more characters long!')
        res.redirect('/register')
    }

    // Hash password and create user
})

// @desc    Login page
// @route   GET /login
router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router