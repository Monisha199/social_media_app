module.exports.profile = function(req,res){
    return res.end('<h1>User profile</h1>')
}

module.exports.account = function(req,res){
    return res.end('<h1>Account of user</h1')
}