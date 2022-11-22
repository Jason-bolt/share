module.exports = {
    isAuthUser: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }else{
            res.redirect('/login')
        }
    },
    
    isNotAuthUser: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect('/testimonies')
        }else{
            return next()
        }
    }
}