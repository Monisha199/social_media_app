const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
module.exports.create = async function(req,res){ //using async await notation 
    try{
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        });
   // let post = await Post.create({
        //     content:req.body.content,
        //     user:req.user._id
        // }).populate({
        //     path:'user'
        // })
        console.log(req.xhr,"req.xhr from post");

        if(req.xhr){ //checking whether the request is AJAX or not
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user','name');
            return res.status(200).json({  // while using ajax , response is always a JSON object
                data:{
                    post :post
                },
                message:'Post created !'
            });

        }
        req.flash('success','Post published');
        return res.redirect('back');
    }catch(err){
        console.log("err",err);
        req.flash('error',err);
        return res.redirect('back');
    }
    
}


module.exports.destroy = async function(req,res){

    
    try{
        let post = await Post.findById(req.params.id);
        //.id means converting the object id to string
        if(post.user == req.user.id){
            // console.log(typeof(post),"post");
            //delete the likes of the post and its comments's likes too
            await Like.deleteMany({likeable:post, onModel:'Post'});
            await Like.deleteMany({_id:{$in:post.comments}});
            
            post.deleteOne();
            await Comment.deleteMany({post:req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:'Post deleted'
                });
            }
            req.flash('success','Post and associated comments deleted');
            return res.redirect('back');
        }else{
            req.flash('error','you cannot delete this post');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        console.log("err",err);
        return res.redirect('back');
    }

}









