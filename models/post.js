const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, // post is linked to user whose id is in Object Id 
        ref: 'User' // reference to the schema
    }
},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);

module.exports=Post;