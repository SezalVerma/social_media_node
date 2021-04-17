// all actions for a route are enlisted in its controller

// module.exports.actionName = function(req,res){}

module.exports.home = function(req,res){

    // render ('view from views folder' , {arr of vars})
    return res.render('home' , {
        title : "Home"
    });
};

module.exports.auth = function(req,res){
    return res.render('home', {
        title : 'authorization'
    });
}