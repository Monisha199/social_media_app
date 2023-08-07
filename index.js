const express = require('express');
const cookieParser = require('cookie-parser'); // weneed to import cookie parser package
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.json())

app.use(express.urlencoded()); // use to read through the post requests
app.use(cookieParser()); // use to tell app to use cookieparser

app.use(express.static('./assets'));


app.use(expressLayouts); // need to present before routes
app.set('layout extractStyles',true); // extract style and script from subpages into the layout
app.set('layout extractScripts',true); // extract scripts from subpages into the layout
app.use('/',require('./routes')); // we need to use router defined in routes , telling index.js to use routes for any requests coming 
// after localhost url- http://127.0.0.1:8000/ 

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log('Error: ',err);
        return;
    }
    console.log("server running on ",port);
})