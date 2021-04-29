const Post = require('../models/post');

//---------------- all actions for a route are enlisted in its controller

// module.exports.actionName = function(req,res){}

module.exports.home = function (req, res) {

    // -------------------cookies
    // ---to see all cookies for the page in a browser
    // console.log(req.cookies);
    // ---to send or modify single cookie
    // res.cookie('sezal' , '44');

    //  find all posts  
    Post.find({})
    // populate user of each post - means bring in whole object of user from id mentioned in posts
    .populate('user')
    // go to comments & populate user of each comment
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    // then execute callback
    .exec( function(err, posts) {
        if (err) { console.log("Error in finding all posts of a user", err); return; }
        // render ('view from views folder' , {arr of vars})
        return res.render('home', {
            title: "Home",
            posts : posts
        });

    });

};





