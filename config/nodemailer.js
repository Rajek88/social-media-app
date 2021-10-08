const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth : {
        user : 'your email',
        pass : 'your password'
    }
});

let renderTemplate = function(data, relativePath){
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers/', relativePath),
        data,
        function(err, template){
            if(err){
                console.log('Error in rendering template : ', err);
                return;
            }
            mailHTML = template;

        }
    )

    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate,
}