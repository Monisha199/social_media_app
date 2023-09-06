const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt; // used to extract jwt from the header 
const env = require('./environment')

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), //header has keys with Authorisation and that has keys called Bearer which has the JWT token
    secretOrKey: env.jwt_secret
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad,done){ //telling passport to use jWT startegy , callback function reads the data from JWT payload , payload contains the info of the user
    User.findById(jwtPayLoad._id).then((user)=>{ //find the user with matching payload
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
})) ;


module.exports = passport;

