const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/Users');


router.get('/', (req,res,next) => {
    res.redirect('/signin');
});

router.get('/signup',isLoggedIn, (req,res,next) => {
    res.render('login/signup');
});

router.post('/signup', passport.authenticate('local-signup' ,{
    successRedirect: '/home',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin', (req,res,next) => {
    res.render('login/signin');
});

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/home',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout', (req,res,next) => {
    res.redirect('/')
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('incorrect', 'Not Authorized');
    res.redirect('/');
}


module.exports = router;