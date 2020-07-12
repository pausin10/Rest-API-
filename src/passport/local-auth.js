const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser(async(id, done) =>{
    const user = await User.findById(id);
    done(null, user);
});


passport.use('local-signup', new LocalStrategy({
    //objecto, opciones
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //varaible req para almacenar
}, async(req, email, password, done) => {

    const search = await User.findOne({email: email});
    if(search){
        return done(null ,false, req.flash('incorrect', 'Usuario ya registrado'));
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    await newUser.save();
    done(null, newUser);

}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //varaible req para almacenar
}, async(req, email, password, done) => {

    const search = await User.findOne({email: email});
    if(!search){
        return done(null ,false, req.flash('incorrect', 'No existe el usuario'));
    }
    if(!search.comparePassword(password)){
        return done(null, false, req.flash('incorrect', 'Contraseña Incorrecta'));
    }

    done(null, search);
}))