const express = require('express')
const router = express.Router()


// @desc    404 page
// @route   GET /error/404
router.get('/404', (req, res) => {
    res.render('errors/404', { layout: null })
})

// @desc    500 page
// @route   GET /error/500
router.get('/500', (req, res) => {
    res.render('errors/500', { layout: null })
})


module.exports = router