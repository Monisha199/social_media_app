const mongoose = require('mongoose');
const multer = require('multer'); // multer config can be different from user to user , so importing it here
const path = require('path') ; // we need to use path to define where the files will be stored
const AVATAR_PATH = path.join('/uploads/users/avatars'); // path where all the avatars will be stored //var that will be exported

const userSchema = new mongoose.Schema({
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String
    },
    friendships:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Friendship'
      }
    ]
},{timestamps:true});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH)); //user.js(models/)+..+/uploads/uers/avatar
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

//static method
userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar'); // will be able to uplaod only one file
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema);

module.exports=User;
