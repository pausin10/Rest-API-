const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const bcrypt = require('bcryptjs');

//Inicializaciones
const app = express();
require('./database');
require ('./passport/local-auth');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//express-handlebars motor de plantillas para html
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'key',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use((req,res,next) =>{
    app.locals.correct = req.flash('correct');
    app.locals.incorrect = req.flash('incorrect');
    //app.locals.user = req.user;
    next();
});

//routes
app.use(require('./routes/routes'));
app.use(require('./routes/login'));



//server
app.listen(app.get('port'), () => {
    console.log(`Server on ${app.get('port')}`);

});