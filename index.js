
import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/orderRoutes.js"
import cors from "cors";


dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

app.use(bodyParser.json())
const PORT = process.env.PORT || 5000 ;
const MONGOURL = process.env.MONGO_URL ;


mongoose.connect(MONGOURL).then(()=>{
    console.log("database connected")
    app.listen(PORT , ()=>{
        console.log(`port iss running ${PORT}`);
    })
})

.catch((error) => console.log(error))


app.use("/api" , route)