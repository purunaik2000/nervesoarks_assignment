import mongodb from "mongodb";
import env from "dotenv";
env.config();
const MongoClient = mongodb.MongoClient;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
// var url = process.env.MONGODB_URI;

// Create connection
let client = new MongoClient(url);
// client.connect().then(()=>{
//     console.log("connected to database...");
// }).catch((err)=>{
//     console.log(err.message);
// });

export default client;