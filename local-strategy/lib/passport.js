const passport = require('passport')
const LocalStrategy = require('passport-local')
const {Player} = require('../models')

async function authenticate (namaplayer, password, done) {
    try {
        const user = await Player.authenticate({namaplayer, password})

        return done(null, user)
    } catch (error) {
        return done(null, false, {message:error.message})
    }
}

passport.use( new LocalStrategy({usernameField:'namaplayer', passwordField:'password',}, authenticate))

passport.serializeUser(
    (user, done) => done(null, user.id)
)

passport.deserializeUser(
    async(id, done)=> done(null, await Player.findByPk(id))
)

module.exports = passport