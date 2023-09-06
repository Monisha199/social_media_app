const express = require('express')
const router = express.Router();
const passport = require('passport');



const usersController= require('../controllers/users_controller')
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/addFriend/:id', usersController.addFriend); // code added by me
router.post('/update/:id',passport.checkAuthentication,usersController.update);

router.get('/account',usersController.account);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create); // to redirect while form is submitted for signup
// router.post('/create-session',userController.createSession); // to redirect when signin form is submitted // used in manaul way od authentication
// use passport as middleware to authenticate // router.post can take three args out of which the second arg indicates the middleware 
// in second arg define scenarios for failure to create session
router.post('/create-session', passport.authenticate(
    'local', 
    {failureRedirect:'/users/sign-in'},
    ), usersController.createSession);


router.get('/sign-out',usersController.destroySession);

//scope is the information we are looking to fetch 
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession);

router.post('/addFriend/:id', usersController.addFriend); // code added by me

module.exports=router;


