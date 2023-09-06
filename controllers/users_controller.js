const User = require('../models/user') ; //import user from models
const fs = require('fs');
const path = require('path');
const Friendship = require('../models/friendship');

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
    User.findById(req.params.id).then((user)=>{
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
        })
    })
    
}

module.exports.addFriend = async function(req,res){
    console.log("hello im from controllres",req.params.id,req.user.id);
    
    let friend = await User.findById(req.params.id);
    if(friend){
        console.log(friend);
        console.log("hereeeeeeeeeeeeeeeeeee goes ypur friend");
        Friendship.create({
            from_user:req.user,
            to_user:friend._id
        })
    }
    let user = await User.findById(req.user.id);
    user.friendships.push(friend._id);
    console.log(user.friendships);
    user.save();
    
    return res.redirect('back');
    // .then((user)=>{
    //     // if((user.friendships.includes(req.params.id)==true)){
    //     //     console.log('Already a friend');
    //     // }
    //     // user.friendships.push(req.params.id);
    //     console.log((req.params));
    //     console.log(user.friendships);
    //     // // user.friendships.pull(req.params.id);
    //     // console.log('7777777777777777777777777777777777')
    //     // user.friendships.push(req.params.id);
    //     // console.log((user.friendships));
    //     user.friendships.push(friend._id);
    //     console.log(user.friendships);
    // });
    // user.friendships.push('hello');
    // console.log(user);
    // user.friendships.push(req.params.id);
    // console.log(user.friendships);
}

module.exports.update = async function(req,res){
    // if (req.user.id== req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body).then((user)=>{
    //         return res.redirect('back');
    //     })
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
    if (req.user.id== req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('****** multer error  ******',err);
                }
                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    // if(user.avatar){
                    //     fs.unlinkSync(path.join(__dirname,'..', user.avatar));
                    // }
                    user.avatar= User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }catch(err){
            return res.redirect('back');
        }
    }else{
        return res.status(401).send('Unauthorized');
    }

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
    req.flash('success','Logged In successfully');
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
    req.flash('success','logged out successfully');
    return res.redirect('/');
}


