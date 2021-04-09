const express = require('express');
const port = 8000;

const app = express();

// set up view engine & folder to render views from -- for all routes
app.set('view engine' , 'ejs');
app.set('view' , require('./views'));

// for any url ,use routes from 
app.use('/' , require('./routes/index'));

app.listen( port , function(err){
    if(err){
        console.log(`Error while firing the server at port : ${port}`);
        return;
    }

    console.log( ` Server is successfully running at port : ${port}`);
})