// all actions for posts view

const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
 
    Post.create( {content : req.body.content , user : req.user._id} , function(err,post){
        if(err){
            console.log("Error while creating new post", err);
            return;
        }
        console.log("New Post created");
        return res.redirect('/');
    });
};

module.exports.delete = function(req,res){
    Post.findById( req.params.id , function(err,post){
        // req.user._id -> form of object id , to compare ids , we need to convert them in strings .
        // mongoose does that automatically by providing req.user.id -> string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post : req.params.id}, function(err){
                res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
    
}

