const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User.ts')
const passport = require('passport')
const { isAuthUser, isNotAuthUser } = require('../middleware/auth')

// @desc    Index page
// @route   GET /
router.get('/', isNotAuthUser, (req, res) => {
    res.render('index')
})

// @desc    Registration page
// @route   GET /register
router.get('/register', isNotAuthUser, (req, res) => {
    res.render('register')
})

// @desc    Register user
// @route   POST /register
router.post('/register', isNotAuthUser, async (req, res) => {
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
router.get('/login', isNotAuthUser, (req, res) => {
    res.render('login')
})

// @desc    User login
// @route   POST /login
router.post('/login', isNotAuthUser, passport.authenticate('local', { failureRedirect: '/login',
successRedirect: '/testimonies',
failureFlash: 'Invalid username or password!'
 }))

// @desc    All testimonies
// @route   GET /testimonies
router.get('/testimonies', isAuthUser, (req, res) => {
    page = {
        testimonies: true,
        profile: false
    }
    
    res.render('auth/testimonies', {
        page: page
    })
})

// @desc    Profile page
// @route   GET /profile
router.get('/profile', isAuthUser, (req, res) => {
    page = {
        testimonies: false,
        profile: true
    }
    
    res.render('auth/profile', {
        page: page,
        user_name: req.user.name,
        user_email: req.user.email,
        user_id: req.user._id
    })
})

// @desc    Edit profile
// @route   PUT /profile/edit/:id
router.put('/profile/edit/:id', isAuthUser, async (req, res) => {
    const user_id = req.params.id
    try {
        await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                email: req.body.email,
                name: req.body.name,
            }
        )
    } catch (err) {
        console.error(err)
    }
    
    page = {
        testimonies: false,
        profile: true
    }
    
    res.redirect('/profile')
})

// @desc    Logout
// @route   DELETE /logout
router.delete('/logout', isAuthUser, (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/login');
    })
})


module.exports = router