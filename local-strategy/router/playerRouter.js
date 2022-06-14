const express = require("express");
const { authController } = require("../controller");
const router = express.Router();
const passport = require("../lib/passport");

router.get("/register", authController.formRegister);
router.get("/login", authController.formLogin);
router.post("/register", authController.register);
// router.post('/login', authController.login)
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/player/login",
    failureFlash: true,
  })
);
router.get("/profile", authController.profile);
router.get("/api", authController.api);

module.exports = router;
