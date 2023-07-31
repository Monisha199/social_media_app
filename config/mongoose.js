const  mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/codeial_development');

const db= mongoose.connection;

db.on('error',console.error.bind('error in connecting to db'));

db.once('open',()=>{
    console.log("connected to db");
});

module.exports=db;