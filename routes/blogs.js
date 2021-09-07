const express = require('express');
const router = express.Router();

const blogControllers = require('../controllers/blogs_controller');
router.get('/', blogControllers.blogs);

module.exports = router;