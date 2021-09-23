var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');
const verifyUserLogin = (req,res,next)=>{
  if(req.session.userloggedIn){
    next()
  }
  else{
    res.redirect('/login')
  }
}
/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user
  productHelpers.getAllProducts().then((products) => {
    res.render('user/view-products', { admin: false, products, user });
  })
});

router.get('/login', function (req, res) {
  if(req.session.userloggedIn){
    res.redirect('/');
  }
  else{
    res.render('user/login',{"loginErr":req.session.loginErr})
    req.session.loginErr = false
  }
  
});

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.userloggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      req.session.loginErr = "Invalid email or Password"
      res.redirect('/login')
    }
  })
});

router.get('/signup', function (req, res) {
  res.render('user/signup');
});

router.post('/signup', (req, res) => {
  userHelpers.doSignUp(req.body).then((response) => {
    console.log(response)
  })
});

router.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

router.get('/cart',verifyUserLogin, function (req, res) {
  res.render('user/cart');
});



module.exports = router;
