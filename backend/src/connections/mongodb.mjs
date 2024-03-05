import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

// Create connection
let client = new MongoClient(url);
// client.connect().then(()=>{
//     console.log("connected to database...");
// }).catch((err)=>{
//     console.log(err.message);
// });

export default client;