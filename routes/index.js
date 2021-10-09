const express = require('express');

//create router
const router = express.Router();

//controllers

const homeController = require('../controllers/home_controller');


//route to the controllers
router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/blogs', require('./blogs'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));

router.use('/api', require('./api'))


module.exports = router;