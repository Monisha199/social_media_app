const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

// defines the config for the transport of the mail or defines how the communication between our server and mailing system happens
let transporter = nodemailer.createTransport(env.smtp);

//defining that we'll be using ejs , template rendering engine
let renderTemplate = (data,relativePath )=> { //relative is the path from where the mail is being sent
    let mailHTML ; // stores what all HTML the mail is going to be in mail
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath), // where do I place my templates for the mail 
        //relativePath is from where this function is being called
        data, // data is the info that is used to fill in the template eg: name of the user 
        function(err,template){
            if(err){
                console.log('error in rendering template',err);
                return;
            }
            mailHTML = template;
        }
    ) // using ejs to render the template
    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}