const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser'); // weneed to import cookie parser package
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session'); // helps encrypt that data being stored in cookies
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
// const http = require('http').Server(app);
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const httpServer = createServer(app);
// const io = new Server(httpServer, { /* options */ });
const chatServer = require('http').Server(app);  // socket.io implementation
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5001); // chat server will listen to port 5000
console.log("chatServer is listening on port 5000")
const path = require('path');
const environment = require('./config/environment');
// path.join(__dirname, '.env');

app.use(express.json())

app.use(express.urlencoded()); // use to read through the post requests
app.use(cookieParser()); // use to tell app to use cookieparser

app.use(express.static(env.asset_path));

app.use('/uploads',express.static(__dirname+'/uploads')); //make the uploads path available to browser
app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts); // need to present before routes
app.set('layout extractStyles',true); // extract style and script from subpages into the layout
app.set('layout extractScripts',true); // extract scripts from subpages into the layout



app.set('view engine', 'ejs');
app.set('views', './views');

// mogo store is used to store the session cookie in db
app.use(session({
    name:'codeial', // name of the cookie
    // change the secret before deployment in production mode
    secret:env.session_cookie_key, // key to encode and decode strings
    saveUninitialized:false, //when user is not logged in , do I want to store extra data in session cookie --> false means no
    resave:false, // when user is logged in , do I want to rewrite the data inside session cookie and save again and again --> no 
    cookie:{
        maxAge: (1000*60*100)// used to define time limit for session expiration, in miiliseconds
    },
    store: MongoStore.create(
        {   
            // mongoUrl: 'mongodb://localhost:27017',
            // 'mongodb://127.0.0.1:27017/'
            // mongoUrl: mongoose.connection._connectionString,
            mongoUrl: db._connectionString,
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash()); // uses session cookies to store flash messages
app.use(customMware.setFlash);


// use express router
app.use('/',require('./routes')); 
// we need to use router defined in routes , telling index.js to use routes for any requests coming 
// after localhost url- http://127.0.0.1:8000/ 

app.listen(port, function(err){
    if(err){
        console.log('Error: ',err);
        return;
    }
    console.log("server running on ",port);
})