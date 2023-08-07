const User = require('../models/user') ; //import user from models

module.exports.profile = function(req,res){
    // return res.end('<h1>User profile</h1>')
    return res.render('user_profile',{
        title:"profile"
    })
}

module.exports.account = function(req,res){
    return res.end('<h1>Account of user</h1')
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:'signUp'
    });
}

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:'signIn'
    });
}

// get data of sign up form
module.exports.create = function(req,res){
    // check if user password is equal to confirm password or not
    if(req.body.password!=req.body.confirm_password_data){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email}).then((user)=>{
        // if(err){
        //     console.log('error in finding user in signing up');
        //     return;
        // }
        if(!user){
            console.log(req.body);
            User.create(req.body).then((user)=>{
                // if(err){
                //     console.log('error in creating user in signing up');
                //     return;
                // } 
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
        
}

// get data for sign in form 
module.exports.createSession = function(req,res){
//  to do later
}