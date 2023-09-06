const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs'); // variable which finds where the log will be stored
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory); // checking if production logs already exists  or needs to be created

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});


const development = {
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: 'monisha.m@campusuvce.in',
            pass:  'Moni123#$tofu'
        }
    },
    google_client_id:"326699953323-9epb13en6384n2kl3p0iop7ng7s30nhn.apps.googleusercontent.com",
    google_client_secret:"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",
    google_call_back_url:"http://127.0.0.1:8000/users/auth/google/callback",
    jwt_secret:'codeial',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}


const production = {
    name:'production',
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIALSESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass:  process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,//"326699953323-9epb13en6384n2kl3p0iop7ng7s30nhn.apps.googleusercontent.com",
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET, //"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",
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,//"http://codeial.com/users/auth/google/callback",
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined? development:eval(process.env.CODEIAL_ENVIRONMENT);
