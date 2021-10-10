const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication ,postsController.createPost);
// router.post('/create', passport.checkAuthentication ,function(req, res){
//     console.log('Req.file :::::: ', req.file);
// });
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

module.exports = router;