const express = require('express');
const router = express.Router();

const posts_controller = require('../controllers/posts_controller');

router.get('/add' ,posts_controller.add );

module.exports = router;