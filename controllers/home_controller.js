module.exports.home= function(req,res){
    // return res.end('<h1>express is up for codeial</h1>');
    console.log(req.cookies);
    res.cookie('user_id',25);
    return res.render('home',{
        title:"Home"
    });
}

module.exports.login = function(req,res){
    return res.end('<h1>Login here</h1>')
}

