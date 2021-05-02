// all actions for posts view

const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
 
    Post.create( {content : req.body.content , user : req.user._id} , function(err,post){
        if(err){
            console.log("Error while creating new post", err);
            return;
        }
        return res.redirect('/');
    });
};

module.exports.delete =  async function(req,res){
    try{
        let post = await Post.findById( req.params.id );

        // req.user._id -> form of objectId , to compare ids , we need to convert them in strings .
        // mongoose does that automatically by providing req.user.id -> string
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post : req.params.id});
        }   
        return res.redirect('back');

    }
    catch(err){
        console.log("Error while deleting a post", err);
        return;
    }    
};

