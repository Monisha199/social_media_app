const express = require('express');
const app = express();
const port = 8000;

app.use('/',require('./routes')); // we need to use router defined in routes , telling index.js to use routes for any requests coming 
// after localhost url- http://127.0.0.1:8000/ 

app.listen(port, function(err){
    if(err){
        console.log('Error: ',err);
        return;
    }
    console.log("server running on ",port);
})