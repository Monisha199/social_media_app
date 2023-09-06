const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike= async function(req,res){
    try{
        let likeable ;
        let deleted = false;

        if(req.query.type=='Post'){
            likeable = await Post.findById(req.query.id).populate('likes'); // here likeable is the Post that was liked by the user
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes'); //here likeable is the comment taht was liked by user
        }
        //check if like exists already
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })
        if(existingLike){ // if like exists alreday on the particular obj , then remove or basically decrease the count by 1
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.deleteOne();
            deleted=true;
        }else{
            //if there are no likes , then we create one
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.status(200).json({
            message:'request successfull',
            data:{
                deleted:deleted
            }
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Internal server error'
        });
    }
} 