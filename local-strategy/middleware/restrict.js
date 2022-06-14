function restrict (req, res, next){
    if(req.isAuthenticated()) return next();
    res.redirect('/player/login')
}

module.exports = restrict;