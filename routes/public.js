const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User.ts')
const Testimonies = require('../models/Testimony.ts')
const passport = require('passport')
const { isAuthUser, isNotAuthUser } = require('../middleware/auth')

// @desc    Index page
// @route   GET /
router.get('/', isNotAuthUser, async (req, res) => {
    try {
        const testimonies = await Testimonies.find()
        res.render('index',
        {
            testimonies: testimonies
        })
    } catch (err) {
        res.render('errors/500')
        console.error(err)
    }
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

    
    try {
        // Hash password and create user
        hashed_password = await bcrypt.hash(req.body.password, 10)
        
        // Enter user data to database
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
        res.render('errors/500')
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
router.get('/testimonies', isAuthUser, async (req, res) => {
    page = {
        testimonies: true,
        profile: false
    }

    try {
        const testimonies = await Testimonies.find()
        .populate('user')
        .lean()

        res.render('auth/testimonies', {
            page: page,
            testimonies: testimonies
        })  
    } catch (err) {
        console.error(err)
        res.render('errors/500')
    }    
})

// @desc    Profile page
// @route   GET /profile
router.get('/profile', isAuthUser, async (req, res) => {
    page = {
        testimonies: false,
        profile: true
    }

    try {
        const testimonies = await Testimonies.find({ user: req.user._id })
        .populate('user')
        .lean()
        
        res.render('auth/profile', {
            page: page,
            user_name: req.user.name,
            user_email: req.user.email,
            user_id: req.user._id,
            testimonies: testimonies
        })     
    } catch (err) {
        console.error(err)
        res.render('errors/500')
    }

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
        res.render('errors/500')
    }
    
    page = {
        testimonies: false,
        profile: true
    }
    req.flash('success', 'Profile data updated!')
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