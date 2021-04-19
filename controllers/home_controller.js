// all actions for a route are enlisted in its controller

// module.exports.actionName = function(req,res){}

module.exports.home = function(req,res){

    // -------------------cookies
    // ---to see all cookies for the page in a browser
    // console.log(req.cookies);
    // ---to send or modify single cookie
    // res.cookie('sezal' , '44');

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