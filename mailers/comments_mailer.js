const nodeMailer = require('../config/nodemailer');
const User = require('../models/users');

exports.newComment = async (comment, post) =>{
    try {
        let postOwner = await User.findById(post.user._id);
        let postOwnerMail = postOwner.email;
        console.log('postOwnerMail : ', postOwnerMail);
        let htmlString = nodeMailer.renderTemplate({comment:comment, postOwner:postOwner}, 'comments/new_comment.ejs');

        // console.log('Inside newComment :: nodemailer', post);
        // console.log('Inside newComment :: nodemailer', comment.user.email);
        nodeMailer.transporter.sendMail({
            from : 'frankly.coder@gmail.com',
            to : postOwnerMail.toString(),
            subject : comment.user.name + ' commented on your post',
            html : htmlString
            // html : '<h1>' +comment.user.name + ' commented '+ comment.content + '</h1>'
        }, function(err, info){
            if(err){
                console.log('Error in sending mail : ', err);
                return;
            }

            console.log('mail delivered : ', info);
            return;
        });
    } catch (error) {
        console.log('Error in sending email :: Nodemailer');
    }
    
}