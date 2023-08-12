const express = require('express');
const cookieParser = require('cookie-parser'); // weneed to import cookie parser package
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session'); // helps encrypt that data being stored in cookies
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.use(express.json())

app.use(express.urlencoded()); // use to read through the post requests
app.use(cookieParser()); // use to tell app to use cookieparser

app.use(express.static('./assets'));


app.use(expressLayouts); // need to present before routes
app.set('layout extractStyles',true); // extract style and script from subpages into the layout
app.set('layout extractScripts',true); // extract scripts from subpages into the layout



app.set('view engine', 'ejs');
app.set('views', './views');

// mogo store is used to store the session cookie in db
app.use(session({
    name:'codeial', // name of the cookie
    // change the secret before deployment in production mode
    secret:'blahsomething', // key to encode and decode strings
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