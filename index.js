const express = require('express');
const app = express();
const port = 8000;

app.use('/',require('./routes')); // we need to use router defined in routes , telling index.js to use routes 

app.listen(port, function(err){
    if(err){
        console.log('Error: ',err);
        return;
    }
    console.log("server running on ",port);
})