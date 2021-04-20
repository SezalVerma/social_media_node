const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session'); 

const port = 8000;
const app = express();

// get db , it runs the page while requiring
const db = require('./config/mongoose');

/*get layouts & ask express to use it . mention before routes , as layouts to be rendered in views */
const express_layouts = require("express-ejs-layouts");
app.use(express_layouts);
// extract script & style from sub pages & render in specific part in layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

// refer static files for views in "assets" folder
app.use(express.static('./assets'));

// cookies be parsed & send with body
app.use(cookieParser());

// for parsing req body
app.use(express.urlencoded({extended : true}));

// set up view engine & path of folder to render views from -- for all routes
app.set('view engine' , 'ejs');
app.set('views' , './views');

// express-session , encrypts the cookie
// name under which cookie stored , secret - key for encrypt/decrypt , maxAge - in millisec
app.use(session({
   name : 'letsinteract',
   secret : 'something',
//    if user is not authenticated , dont initialise a cookie
   saveUninitialized : false,
//    if already data saved in cookie, dont resave same 
   resave : false,
   cookie: {
    //    100 min lifetime of cookie, after it destroys
        maxAge : (1000 * 60 * 100) 
   }
}));

app.use(passport.initialize());
app.use(passport.session());


// for any url ,use routes from 
app.use('/' , require('./routes/index'));

app.listen( port , function(err){
    if(err){
        console.log(`Error while firing the server at port : ${port}`);
        return;
    }

    console.log( ` Server is successfully running at port : ${port}`);
})