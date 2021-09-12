const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
router.get('/', function(req, res){
    res.end('<h1>Users ?</h1>')
});
router.get('/profile', usersController.profile);
router.get('/timeline', usersController.timeline);
router.get('/signin', usersController.signin);
router.get('/signup', usersController.signup);
router.post('/create', usersController.create);
router.post('/createSession', usersController.createSession);

module.exports = router;