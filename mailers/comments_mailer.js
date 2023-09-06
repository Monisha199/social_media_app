//all comments related mails will be put in here only
const nodeMailer  = require('../config/nodemailer');

//function which sends the mail
exports.newComment = (comment)=>{//== newComment = function() module.exports = newComment
    // console.log('inside newComment mailer',comment);
    let htmlString = nodeMailer.renderTemplate( {comment:comment},'/comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from: 'monishamona199@gmail.com',
        to: comment.user.email,
        subject: "New comment published",
        html: htmlString

    },(err,info)=>{//info carries info about the req that is being sent
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('mail delivered',info);
        return;
    });
} 



