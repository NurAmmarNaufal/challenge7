const passport = require('../lib/passportJwt')


module.exports = passport.authenticate('jwt', {
    session: false
})
