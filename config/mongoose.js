const  mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://127.0.0.1/${env.db}`);

const db= mongoose.connection;

db.on('error',console.error.bind('error in connecting to db'));

db.once('open',()=>{
    console.log("connected to db");
});

module.exports=db;