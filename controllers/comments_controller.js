const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create= function(req,res){
   
    Post.findById(req.body.post , function(err,post){

        if(err){console.log(err , ": while finding post"); return;}

        // if post exist
        if(post){
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            }, function(err,comment){
                if(err){console.log("Error while adding comment on a post", err); return;};
                console.log("Comment added");
                // add comment id to --- posts comments array
                post.comments.push(comment._id);
                // save changes to db , after every update (without this changes are still in memory only )
                post.save();
                return res.redirect('/');
            });

        }
        
    })
    
};

module.exports.delete = function(req,res){
    Comment.findById(req.query.commentId , function(err,comment){
        
        if(comment.user == req.user.id || req.query.postUser == req.user.id ){
            let postId = comment.post;
            comment.remove();

            // remove  from comments array in post , a comment with some id
            Post.findByIdAndUpdate(postId , { $pull : {comments : req.query.commentId} } , function(err,post){
                return res.redirect('back');
            })

        }else{
            return res.redirect('back');
        }

    })
}