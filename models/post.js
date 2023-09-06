const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, // post is linked to user whose id is in Object Id 
        ref: 'User' // reference to the schema
    },
    // include the array of ids of comments of this particular post 
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId, // post is linked to comment whose id is in Object Id 
            ref: 'Comment'
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId, // post is linked to likes wh
            ref:'Like'
        }
    ]
},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);

module.exports=Post;