const mongoose = require('mongoose')

//define the mongodb connection url
const mongoURL = 'mongodb://127.0.0.1:27017/EcommerceShopDB'

//set up mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//get the default connection
//mongoose maintains a default connection object representing the mongodb connection.
const db = mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to mongoDB Server.")
})

db.on('error', () => {
    console.log("MongoDB Connection Error.")
});

db.on('disconnected', () => {
    console.log("MongoDB Disconnected.")
});

//Export the database connection

module.exports = db;