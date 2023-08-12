const User = require('../models/user') ; //import user from models

// manual authentication 
// module.exports.profile = function(req,res){
//     // return res.end('<h1>User profile</h1>')
//     if(req.cookies.user_id){
//         User.findById(req.cookies.user_id).then((user)=>{
//             if(user){
//                 console.log("user looged in successfully",user);
//                 return res.render('user_profile',{
//                     title:'User profile',
//                     name1:'hello',
//                     user: user
//                 })
//             }
//             return res.redirect('/users/sign-in');
//         })
//     }else{
//         return res.redirect('/users/sign-in')
//     }
//     // return res.render('user_profile',{
//     //     title:"profile"
//     // })
// }

module.exports.account = function(req,res){
    return res.end('<h1>Account of user</h1')
}

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'signUp'
    });
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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
        if(!user){
            console.log(req.body,"blassssssss");
            User.create(req.body).then(()=>{
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
        
}


// get data for sign in form 
// manual authentication
// module.exports.createSession = function(req,res){

//     // steps to authenticate
//     // find the user
//     console.log("req for signin",req.body);
//     User.findOne({email: req.body.email}).then((user)=>{
//         // handle user found
//         if(user){
//             // handle password which dont match
//             if(user.password!=req.body.password){
//                 console.log("password not matchingggggggggggggggggggggggggggggggggggggggggggggggggggg");
//                 return res.redirect('back');
//             }

//             // handle session creation
//             res.cookie('user_id',user.id);
//             console.log("password is matchingggggggggggggggggggggggggggggggggggggggggggggggggggg");
//             return res.redirect('/users/profile');

            
//         }else{
//             // handle user not found
//             return res.redirect('back');
//         }
//     })

// }

//  // // signin user using passportjs library
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

// module.exports.signOut = function(req,res){
//     res.clearCookie('user_id');
//     console.log("trying to sign out")
//     return res.redirect('/users/sign-in');
// }

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });
    return res.redirect('/');
}