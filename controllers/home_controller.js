const User = require('../models/user');
const Post = require('../models/post');

//---------------- all actions for a route are enlisted in its controller

// module.exports.actionName = function(req,res){}

 // -------------------cookies
    // ---to see all cookies for the page in a browser
    // console.log(req.cookies);
    // ---to send or modify single cookie
    // res.cookie('sezal' , '44');

// async -> tells compiler that it contains async statements inside
module.exports.home = async function (req, res) {

try{
    //  find all posts  , await -> first execute this & then move to next
    let posts = await Post.find({})
    // populate user of each post - means bring in whole object of user from id mentioned in posts
    .populate('user')
    // go to comments & populate user of each comment
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    });

    // send user friends, *****change later
    let users = await User.find({});

    return res.render('home', {
        title: "Home",
        posts : posts,
        all_users : users
    });
}catch(err){
        console.log("error while loading home page" , err);
        return;
}
};





