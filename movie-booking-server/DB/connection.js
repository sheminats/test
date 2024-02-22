const mongoose=require('mongoose')

const connectionString=process.env.CONNECTION_STRING
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDb Atlas Connected Successfully with stServer");
}).catch((reason)=>{
    console.log(reason);
    console.log("MongoDb Connection Failed");
})