const mongoose = require('mongoose')

const connectionString = process.env.CONNECTION_STRING
mongoose.connect(connectionString).then(() => {
    console.log("MnogoDB atlas successfully connected with weatherServer");
}).catch((error) => {
    console.log(`MongoDB connection failed !!! Error : ${error}`);
})