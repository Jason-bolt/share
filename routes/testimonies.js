const express = require('express')
const router = express.Router()
const Testimony = require('../models/Testimony.ts')
const { isAuthUser } = require('../middleware/auth')


// @desc    Submitting a testimony
// @route   POST /testimony/add
router.post('/add', isAuthUser, async (req, res) => {
    console.log(req.body)
    const testimony = req.body.testimony
    const tags = req.body.tags
    const user = req.user._id

    const testimonyData = {
        testimony: testimony,
        tags: tags,
        user: user
    }

    try {
        await Testimony.create(testimonyData)
    } catch (err) {
        res.render('errors/500')
        console.error(err)
    }
    req.flash('success', 'Testimony added successfully!')
    res.redirect('/profile')
})


// @desc    Deleting a testimony
// @route   DELETE /testimony/:id
router.delete('/:id', isAuthUser, async (req, res) => {
    try {
        await Testimony.remove({ _id: req.params.id })
    } catch (err) {
        res.render('errors/500')
        console.error(err)
    }
    req.flash('success', 'Testimony deleted successfully!')
    res.redirect('/profile')
})


module.exports = router