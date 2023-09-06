const Post = require('../models/post');
const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.home= async function(req,res){  //async indicating the function has some aynchronous statements
    // return res.end('<h1>express is up for codeial</h1>');
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    // Post.find({}).then((postsList)=>{console.log("posts fetched");
    //     return res.render('home',{
    //         title:"codeial home",
    //         postsList:postsList
    //     });
    // });

    //populate the user of each post 
    // this uses normally then() syntax
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path:'comments',
    //     populate:{
    //         path:'user'
    //     }
    // })
    // .exec().then((postsList)=>{console.log("posts fetched");

    //     User.find({}).then((users)=>{
    //         return res.render('home',{
    //             title:"codeial home",
    //             postsList:postsList,
    //             all_users:users
    //         });
    //     })

    

    // });

    //------------------this is using asyn await syntax
    try{
        let postsList = await Post.find({}) // await 1 - wait for this 
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            },
            populate:{  // likes on the comment
                path:'likes'
            }
        }).populate('likes'); //likes on post
    
        let users = await  User.find({}).then(postsList); // wait for this 
        // console.log(postsList);
        let friends_list = await Friendship.find({from_user:req.user})
        .populate('to_user');
        // console.log(friends_list,"friends list");

        return res.render('home',{
            title:"codeial home",
            postsList:postsList,
            all_users:users,
            friends_list:friends_list
        });
    }catch(err){
        console.log("error",err);
        return;
    }
    

}

module.exports.login = function(req,res){
    return res.end('<h1>Login here</h1>')
}

