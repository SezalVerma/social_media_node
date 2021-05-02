// all actions for posts view

const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
 
    Post.create( {content : req.body.content , user : req.user._id} , function(err,post){
        if(err){
            req.flash("error", err);
            return res.redirect('/');
        }
        req.flash("success","Post published");
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
            req.flash("success", "Post deleted");
        }   
        return res.redirect('back');

    }
    catch(err){
        req.flash("error", err);
        return res.redirect('back');
    }    
};

