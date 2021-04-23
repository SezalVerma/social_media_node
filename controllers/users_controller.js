// const { user } = require('../config/mongoose');
const User = require('../models/user');


// ---------------------------------------------all actions for users model

module.exports.profile = function(req,res){
    return res.render('profile' , {
        title : 'User Profile'
    })
}

//  get sign In page
module.exports.sign_in = function(req,res){
    if( req.isAuthenticated() ){
        return res.redirect('/users/profile');
    }   
    return res.render('sign_in', {title : "Sign In"});
}

// get sign Up page
module.exports.sign_up = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_up' , {title : "Sign Up"});
}

module.exports.sign_out = function(req,res){
    // function in passport, session is being destroyed here 
    req.logout();
    return res.redirect('/');
}


// create new user
module.exports.create_user = function(req,res){
    
    //  if both passwords doesn't match
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    // check if user already exist
    User.findOne({email : req.body.email} , function(err,user){
        if(err){console.log("Error in finding user in sign up page" , err); return;}

        
        // if user  exist
        if(user){
            return res.redirect('/users/sign-in');
        }
        // if not , create new
        else{
            User.create(req.body , function(err, user){
                if(err){console.log("Error while creating new user" , err); return;}
                console.log("new user created");
                return res.redirect('/users/sign-in');
            })
        }
    })

}

// create new session when user sign in
module.exports.create_session = function(req,res){
    // after authentication by passport in route , redirects to home page
    return res.redirect('/');
}