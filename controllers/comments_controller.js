const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create =  async function (req, res) {

    try {
        let post = await Post.findById(req.body.post);
        // if post exist
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            // add comment id to --- posts comments array
            post.comments.push(comment._id);
            // save changes to db , after every update (without this changes are still in memory only )
            post.save();
        };
        return res.redirect('/');
    } 
    catch (err) {
        console.log("Error while creating comment", err);
        return;
    }
};

module.exports.delete = async function (req, res) {
    try{
        let comment = await Comment.findById(req.query.commentId);

        if (comment.user == req.user.id || req.query.postUser == req.user.id) {
            let postId = comment.post;
            comment.remove();

            // remove  from comments array in post , a comment with some id
            await Post.findByIdAndUpdate(postId, {$pull: { comments: req.query.commentId }} );         
        };
        return res.redirect('back');
    }
    catch(err){
        console.log("Error while deleting comment", err);
        return;
    }
};