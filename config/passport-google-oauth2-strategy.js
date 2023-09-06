const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto'); // for generating unique passwords for the user logged in
const User = require('../models/user');
const env = require('./environment')


//tell passport to use a new strategy for  google login
passport.use(new googleStrategy({
        clientID:env.google_client_id,
        clientSecret:env.google_client_secret,
        callbackURL:env.google_call_back_url
    },function(accessToken,refreshToken,profile,done){  // accessToken same as out token in passport jwt that was sent in the header, if accesstoken expires refreshToken is used to get a
        //  new token without asking the user to signIn again
        User.findOne({email:profile.emails[0].value}).then((user)=>{  //emails will can be an array of emails that user has in gmail
            console.log(profile);

            if(user){
                //if found , set this as req.user basically sign in the user
                return done(null,user);
            }else{ //if user not found in our db , then use the information to signup the user
                User.create({  
                    name:profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')  // generate password of length 20 chars and convert to string of hex format
                }).then((user)=>{
                    return done(null,user);
                })
            }
        })
    }

));
module.exports=passport;