const mongoose = require('mongoose')


const connection_string = process.env.CONNECTIONSTRING

mongoose.connect(connection_string).then((res)=>{
    console.log("MONGODB ATLAS CONNECTED SUCCESSFULLY WITH TEXTSERVER");
    
}).catch(err=>{
    console.log("MONGODB ATLAS FAILED");
    console.log(err);
    
    
})