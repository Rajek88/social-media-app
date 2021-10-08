const User = require('../../../models/users');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res){

    try {
        let user = await User.findOne({email : req.body.email});

        if(!user || user.password != req.body.password){

            return res.status(422).json({
                message : 'JWT :: Unauthorized access : INVALID UserName / Password',
            });
        }
        
        return res.status(200).json({
            message : 'Authenticated :: Here is your toke please keep it safe',
            data : {
                token : jwt.sign(user.toJSON(), 'franKLY@E104$$Bill!0N', { expiresIn : '100000' }),
            } 
        })

    } catch (error) {
        console.log('Error : ', error);
        return;
    }
}