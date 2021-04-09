const express = require('express');
const router = express.Router();

// controller for users
const users_controller = require('../controllers/users_controller');

router.get('/profile' , users_controller.profile);
router.get('/name' , users_controller.name);


module.exports = router;