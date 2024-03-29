const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
        // passReqToCallback:true
    },
    function(email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}).then((user)=>{
            if (!user || user.password != password){
                // console.log('Invalid Username/Password');
                // req.flash('error','Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        });
    }

));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id).then((user)=>{
        return done(null, user);
    });
});

//check if the user is authenticated

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){ // user is signed in , pass request to next function which is my controller's action
        return next();
    }
    // if user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if (req.isAuthenticated()){
        // req.user contains the curent user who is signed in from the session cookie and we are sending this to the locals
        //  for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;