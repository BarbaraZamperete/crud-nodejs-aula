const express = require('express');
const path = require('path');

const exhbs = require('express-handlebars');
const _handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access'); 

const morgan = require('morgan'); //ajuda a verificar as requisições do server
const methodOverride = require('method-override');

const flash = require('connect-flash');
const session = require('express-session');

const passport = require('passport');
// const { use } = require('passport');

//inicialization 
const app = express();
require('./config/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); //seta onde ta a pasta views
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(_handlebars)
}));
app.set('view engine', '.hbs');


//middlewares
app.use(express.static(path.join(__dirname, 'public'))); //seta onde ta a pasta public
app.use(morgan('dev')); 
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


//global variables
app.use((req, res, next) => {
    //o nome da variavel global é success_msg
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.user = req.user || null;
    next();
})


//routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/user.routes'));


//static files
module.exports = app;
