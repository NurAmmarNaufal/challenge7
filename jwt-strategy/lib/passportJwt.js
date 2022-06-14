const passport = require('passport')
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt')
const {Player} = require('../models')

//jwt
const options = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: 'bisaapaaja'
}

passport.use(new JwtStrategy (options, async(payload, done) => {
    console.log(payload)
    Player.findByPk(payload.id)
        .then(user => done(null, user))
        .catch(err => done(err, false))
}))

module.exports = passport