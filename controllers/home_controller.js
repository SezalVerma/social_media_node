// all actions for a route are enlisted in its controller

// module.exports.actionName = function(req,res){}

module.exports.home = function(req,res){
    return res.end('<h1> Home Page </h1>');
    // console.log("Home Controller");
};

module.exports.auth = function(req,res){
    return res.end('Authorised');
}