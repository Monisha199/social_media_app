const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const Like = require('../models/like');

module.exports.create = async function(req,res){
    // Post.findById(req.body.post).then((post)=>{
    //     Comment.create({
    //         content:req.body.content,
    //         post:req.body.post, // this post is comming from hidden field in home.ejs in form
    //         user:req.user._id
    //     }).then((comment)=>{
    //         post.comments.push(comment); // add the comment in posts' comments array , this is an update command
    //         post.save(); // once updated we need to save as well

    //         return res.redirect('/');
    //     })
    // })
    try{
        let post = await Post.findById(req.body.post);
        
        if (post){
            
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            console.log('im here from post',comment);
            post.comments.push(comment);
            post.save();
            console.log('second comments',comment);
            comment = await comment.populate('user', 'name email');
            // console.log('second comment',comment);
            commentsMailer.newComment(comment);
            console.log(req.xhr,"req.xhr /////////////////////////////////////")
            
            if (req.xhr){
                // Similar for comments to fetch the user's id!
                console.log("req is xhr");
                
                comment = await comment.populate('user', 'name').execPopulate();
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "comment created! ajax"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
}

module.exports.destroy = async function(req,res){
    // let comment = await Comment.findById(req.params.id).then((comment)=>{
    //     if(comment.user == req.user.id){
    //         let postId = comment.post;
    //         comment.deleteOne();
    //         Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}}).then(()=>{
    //             return res.redirect('back');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.deleteOne();
            let post = Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}})

            await Like.deleteMany({likeable:comment._id,onModel:'Comment'});
            if(req.xhr){
                return res.status(200).json({
                    message:"Post deleted",
                    data:{
                        comment_id:req.params.id
                    }
                });
            }
        }

    }catch(err){
        return res.status(401).json({
            message:"Unable to delete comment"
        })
    }
    Comment.findById(req.params.id).then((comment)=>{
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.deleteOne();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}}).then(()=>{
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}