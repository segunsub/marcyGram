const path = require('path')
const middleware = (req, res,next) => {
    console.log(req.method,req.path)
    next()
}
const home = (req, res) => {
    res.redirect('/login')
  } 
const login = (req,res) => {
    res.render('login', {
        title: 'login'
    })
}







module.exports = {
    middleware,
    home,
    login
}