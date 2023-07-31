module.exports.profile = function(req,res){
    // return res.end('<h1>User profile</h1>')
    return res.render('user_profile',{
        title:"profile"
    })
}

module.exports.account = function(req,res){
    return res.end('<h1>Account of user</h1')
}