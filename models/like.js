const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId
    },
    // this defines the object id of the liked object either post or comment
    likeable:{
        type:mongoose.Schema.ObjectId,
        required:true,
        refPath: 'onModel' // telling it is dynamically referred // it can be a Post or a comment
    },
    //this field is used for defining the ytype of the liked object since this is a dynamic reference 
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment'] // like can be placed on a post or comment so parentId can be of a post or a comment 
    }
},{
    timestamps:true
});

const Like = mongoose.model('Like',likeSchema)//tell mongoose this is a model
module.exports = Like;