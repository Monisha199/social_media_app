const Post = require('../../../models/post');
const Comment = require('../../../models/comment');


module.exports.index = async function(req,res){
    let posts = await Post.find({})
        .sort('createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
    });
    
    return res.status(200).json({
        message:"list of posts",
        posts:posts
    })
}

module.exports.destroy = async function(req,res){

    
    try{
        let post = await Post.findById(req.params.id);
        //.id means converting the object id to string
        console.log("======================================================================post user",post.user);
        if(post.user == req.user.id){
            // console.log(typeof(post),"post");
            post.deleteOne();
            await Comment.deleteMany({post:req.params.id});
            
            
            return res.json(200,{
                message:'post and associated comments deleted postman '
            })
        }else{
            // req.flash('error','you cannot delete this post');
            console.log("======================================================================post user",post.user,"6666666666666666666666666666666666666666");

            return res.status(401).json({
                message:"you cannot delete this post"
            })
        }
    }catch(err){
        // req.flash('error',err);
        console.log("err***************************************",err);
        
        console.log(req,"req***********************************************************************************************",req.user);
        return res.status(500).json({
            message:'Internal server error'
        });
    }

}