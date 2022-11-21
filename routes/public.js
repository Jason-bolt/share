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
    console.log(req.body)
})

// @desc    Login page
// @route   GET /login
router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router