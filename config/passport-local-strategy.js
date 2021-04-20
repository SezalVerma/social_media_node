//  passport.js -> encrypt ur key while storing in cookies 

//  get passport middleware & strategy to use
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/user');

// ****** refer passport-local.js******

// authenticate user by email & password
passport.use(new LocalStrategy(
    // usernameField -- unique field , setting usernameField to take email 
    {usernameField :'email'} , function(email,password,done){
        User.findOne({email : email}, function(err,user){
            if(err){
                console.log("error while finding user --> Passport-local",err);
                return done(err);
            }
            // ****done takes 2 args(err, any info to send/auth failed)

            if(!user || user.password != password){
                console.log("Either email or password entered isn't correct");
                // err- null & authentication- failed
                return done(null, false);
            }

            // if user found , return user to serialiseUser 
            return done(null,user);
        })
        
    }
))

// serialize which key to send to browser's cookies
// done -- callback function, can name it anything
passport.serializeUser(function(user,done){
    // err->null & send user id in passport.session (created in index.js)
     return done(null, user.id);
})

// get user from key(user id) in browser cookies
passport.deserializeUser(function(id,done){
    User.findOne({id : id}, function(err,user){
        if(err){
            console.log("Error while finding user -> passport-> deserialise");
            return done(err);
        }
        return(null,user);
    })
})

module.exports = passport;