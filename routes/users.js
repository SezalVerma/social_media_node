const express = require('express');
const router = express.Router();
const passport = require('passport');

// controller for users
const users_controller = require('../controllers/users_controller');

router.get('/profile' , passport.checkAuthentication , users_controller.profile);
router.get('/sign-in' , users_controller.sign_in);
router.get('/sign-up' , users_controller.sign_up);
router.get('/sign-out' , users_controller.sign_out);

router.post('/create-user' , users_controller.create_user);

// add passport as a middleware for authentication
router.post('/create-session' , passport.authenticate(
    // strategy used by passport
    'local',
    // if authentication fails, redirect to other page
    { failureRedirect : '/users/sign-in'}
) , users_controller.create_session);


module.exports = router;