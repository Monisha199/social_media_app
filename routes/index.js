const express = require('express'); // we have included express in codeial/index.js, so when we include express again here , the 
// same instance is getting used everywhere new one is not created

const router = express.Router(); //express.Router() function is used to create a new router object that helps better in routing

const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);
console.log('router loaded');
module.exports=router; // we are exporting router object, this is needed to handle all get, post requests 



