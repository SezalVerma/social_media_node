// all actions for posts view

module.exports.add = function(req,res){
    return res.render('posts' , {
        title : 'Posts'
    });
};
