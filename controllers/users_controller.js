// all actions for users view

module.exports.profile = function(req,res){
    return res.render('users' , {
        title : 'users'
    })
}

module.exports.name = function(req,res){
    return res.render('users' , {
        title : 'Name'
    })
}