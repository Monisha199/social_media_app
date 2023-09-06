const User = require('../../../models/user');
const jwt = require('jsonwebtoken'); // used to used to craete encryted web token
const env = require('../../../config/environment');

module.exports.createSession = async function(req,res){ // when user signs in and we get username and password of the user we find the user
    //after we know its valid , we create jsonwebtoken for it
    try{
        let user = await User.findOne({email:req.body.email});

        if(!user || user.password!=req.body.password){
            return res.status(422).json({
                message:"Invalid Username or password"
            });
        }
        return res.status(200).json({
            message:"Signin successful, here is your token keep it safe!",
            data:{
                token:jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn:'1000000'}) // converting the user to json , this the token that is 
                //going to returned 
            }
        })
        
    }catch(err){
        console.log('********',err);
        return res.status(500).json({
            message:"Internal server error"
        });
    }
    

    
}




//326699953323-9epb13en6384n2kl3p0iop7ng7s30nhn.apps.googleusercontent.com
//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