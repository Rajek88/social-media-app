const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controllers/users_controller');
router.get('/', function(req, res){
    res.end('<h1>Users ?</h1>')
});
router.get('/profile', passport.checkAuthentication ,usersController.profile);
router.get('/timeline', usersController.timeline);
router.get('/signin', usersController.signin);
router.get('/signup', usersController.signup);
router.post('/create', usersController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect : '/users/signin'
    },
) , usersController.createSession);

router.get('/signout', usersController.signout);


module.exports = router;