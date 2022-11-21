const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User.ts')
const bcrypt = require('bcrypt')

module.exports = (passport) => {
    passport.use(new LocalStrategy({usernameField: 'email'},
    async (email, password, done) => {
        // Check if user exists
        const user = await User.findOne({ email: email })
         
        if (!user){
            return done(null, false)
        }

        try {
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false)
            }
        } catch (err) {
            return done(err)
        }
    }))

    passport.serializeUser( (user, done) => {
        done(null, user.id);
      })
    
      passport.deserializeUser( (id, done) => {
        User.findById(id, (error, user) => {
          done(error, user);
        })
      })
}