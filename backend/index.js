import env from 'dotenv';
env.config();
import express from "express";
import multer from "multer";
import route from "./src/route.mjs";
import client from "./src/connections/mongodb.mjs";
import cors from "cors";


const app = express();

app.use(cors());

app.use(express.json());
app.use(multer().any());
app.use("/", route);

// Connect to MongoDB server
client.connect().then(() => {
    console.log("connected to database...");
}).catch((err) => {
    console.log(err.message);
});

app.listen(process.env.PORT || 3000, (err) => {
    if (err) console.log(err.message);
    console.log("Application in running...");
});