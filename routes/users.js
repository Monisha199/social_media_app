const express = require('express')
const router = express.Router();

const userController= require('../controllers/users_controller')
router.get('/profile',userController.profile);
router.get('/account',userController.account);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create', userController.create); // to redirect while form is submitted for signup
module.exports=router;


