const express = require('express');
const port = 8000;

const app = express();

/*get layouts & ask express to use it . mention before routes , as layouts to be rendered in views */
const express_layouts = require("express-ejs-layouts");
app.use(express_layouts);

// extract script & style from sub pages & render in specific part in layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

// refer static files for views in "assets" folder
app.use(express.static('./assets'));

// set up view engine & path of folder to render views from -- for all routes
app.set('view engine' , 'ejs');
app.set('views' , './views');

// for any url ,use routes from 
app.use('/' , require('./routes/index'));

app.listen( port , function(err){
    if(err){
        console.log(`Error while firing the server at port : ${port}`);
        return;
    }

    console.log( ` Server is successfully running at port : ${port}`);
})