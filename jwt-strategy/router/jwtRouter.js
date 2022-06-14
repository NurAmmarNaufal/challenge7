const express = require('express')
const { jwtController } = require('../controller')
const router = express.Router()
const passport = require('../lib/passport')
const auth = require('../middleware/auth')

router.post('/register', jwtController.register)
// router.post('/login', jwtController.login)
router.get('/user', jwtController.viewUsers)
router.get('/profile', jwtController.profile)
router.get('/success', jwtController.success)

router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/api/v1/jwt/success",
      failureRedirect: "/api/v1/jwt/login",
      failureFlash: true
    })
);

//untuk uji token
router.post('/token', auth, (req, res) => {
  res.status(201).json({message: "login sukses"})
})

router.post('/createRoom', jwtController.createRoom)
router.post('/game/:params', jwtController.game)
router.get('/history', jwtController.history)

module.exports = router