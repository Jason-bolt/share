const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User.ts')
const passport = require('passport')

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
router.post('/register', async (req, res) => {
    // Compare passwords
    if (req.body.password !== req.body.confirm_password){
        req.flash('error_message', 'Passwords do not match!')
        res.redirect('/register')   
    }

    // Check length
    if (req.body.password.length < 6) {
        req.flash('error_message', 'Password must be 8 or more characters long!')
        res.redirect('/register')
    }

    // Hash password and create user
    hashed_password = await bcrypt.hash(req.body.password, 10)

    // Enter user data to database
    try {
        // Check if user already exists
        const user = await User.findOne({name: req.body.name})
        if (user){
            req.flash('error_message', 'User already exists!')
            res.redirect('/register')
        }else{
            await User.create({
                email: req.body.email,
                name: req.body.name,
                password: hashed_password,
            })
            req.flash('success', 'Registration was successful!')
            res.redirect('/login')
        }
    } catch (err) {
        console.error(err)
    }
})

// @desc    Login page
// @route   GET /login
router.get('/login', (req, res) => {
    res.render('login')
})

// @desc    User login
// @route   POST /login
router.post('/login', passport.authenticate('local', { failureRedirect: '/login',
successRedirect: '/dashboard',
failureFlash: 'Invalid username or password!'
 }))

module.exports = router