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
if (req.body.password === req.body.confirm_password){
    // Hash password and create user

}else{
    req.flash('message', 'Wrong')
    res.redirect('/register')
}
})

// @desc    Login page
// @route   GET /login
router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router