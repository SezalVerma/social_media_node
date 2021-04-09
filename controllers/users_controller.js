// all actions for users view

module.exports.profile = function(req,res){
    res.end('<h1> User Profile </h1>');
}

module.exports.name = function(req,res){
    res.end('<h1> <b> Name </b> </h1>');
}