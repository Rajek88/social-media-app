const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.use(express.static('./assets'));
app.use(express.urlencoded());
app.use(cookieParser());
//make the uploads path available to downloads
app.use('/uploads', express.static(__dirname + '/uploads'));


//set up database
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

//sass middleware

const sassMiddleWare = require('node-sass-middleware-5');
app.use(sassMiddleWare({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css',

}));

const flash = require('connect-flash');
const customMware = require('./config/middleware');


//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to session cookie in mongo db
//set sessions
app.use(session({
    name : 'social-media',
    //todo change key before deploying to production
    secret : 'ogdf60b542cbfhd83584hdsiafo',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100),

    },
    store : new MongoStore({
        mongooseConnection : db,
        autoremove : 'disabled',
    },
    function(err){
        console.log(err || 'connection to mongo db ok');
    }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use flash here
app.use(flash());
app.use(customMware.setFlash);


//add specific css in head and js files in body of html smartly 
app.set('layout extractStyles', true); 
app.set('layout extractScripts', true); 

//set up router
app.use('/', require('./routes'));
console.log('Router loaded');


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
})