const { Player } = require("../models");
const passport = require("../lib/passport");

async function formRegister(req, res) {
  res.render("register");
}

async function register(req, res) {
  try {
    let data = await Player.register(req.body);
    console.log(data);
    res.redirect("/player/login");
  } catch (error) {
    console.log(error);
  }
}

async function formLogin(req, res) {
  res.render("login");
}

async function profile(req, res){
  res.render('profile', req.user.dataValues);
}

async function login(req, res){
  console.log(req.body)
}

async function api(req, res){
  res.send("ini api")
}

module.exports = { 
  formRegister, 
  login,
  register, 
  formLogin, 
  profile,
  api
};
