const passport = require('passport')
const LocalStrategy = require('passport-local')
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt')
const {Player} = require('../models')

async function authenticate (username, password, done) {
    try {
        const user = await Player.login({username, password})
        return done(null, user)
    } catch (error) {
        return done(null, false, {message:error.message})
    }
}

passport.use( new LocalStrategy({usernameField:'username', passwordField:'password',}, authenticate))

passport.serializeUser(
    (user, done) => done(null, user.id)
)

passport.deserializeUser(
    async(id, done)=> done(null, await Player.findByPk(id))
)


module.exports = passport