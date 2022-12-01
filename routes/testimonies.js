const express = require('express')
const router = express.Router()
const Testimony = require('../models/Testimony.ts')
const { isAuthUser } = require('../middleware/auth')


// @desc    Submitting a testimony
// @route   POST /testimony/add
router.post('/add', isAuthUser, async (req, res) => {
    console.log(req.body)
    const testimony = req.body.testimony.trim()
    const tags = req.body.tags
    const user = req.user._id

    if (testimony == ''){
        req.flash('error', 'Testimony field cannot be left blank!')
        res.redirect('/profile')
    }

    const testimonyData = {
        testimony: testimony,
        tags: tags,
        user: user
    }

    try {
        await Testimony.create(testimonyData)
        
        req.flash('success', 'Testimony added successfully!')
        res.redirect('/profile')

    } catch (err) {
        console.error(err)
        res.render('errors/500')
    }
})


// @desc    Deleting a testimony
// @route   DELETE /testimony/:id
router.delete('/:id', isAuthUser, async (req, res) => {
    try {
        await Testimony.remove({ _id: req.params.id })
        
        req.flash('success', 'Testimony deleted successfully!')
        res.redirect('/profile')
    
    } catch (err) {
        console.error(err)
        res.render('errors/500')
    }
})

// @desc    Editting a testimony
// @route   PUT /testimony/:id
router.put('/:id', isAuthUser, async (req, res) => {
    try {
        let testimony = await Testimony.findById(req.params.id)

        if (!testimony){
            return res.render('errors/404')
        }

        if (req.body.testimony.trim() == ''){
            req.flash('error', 'Testimony field cannot be left blank!')
            res.redirect('/profile')
        }

        if (String(testimony.user) != String(req.user._id)){
            res.redirect('/profile')
        }else{
            await Testimony.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            )

            req.flash('success', 'Testimony editted successfully!')
            res.redirect('/profile')
        }

    } catch (err) {
        console.error(err)
        res.render('errors/500')
    }
})


module.exports = router