const express = require('express');
const router = express.Router();

// controller for home 
const home_controller = require('../controllers/home_controller');

//  routes for home page & controller
router.get('/' , home_controller.home);

// any other route , refer to its route page
router.use('/users' , require('./users'));
router.use('/posts' , require('./posts'));
router.use('/comments', require('./comments'));

console.log("routes loaded");


module.exports = router;