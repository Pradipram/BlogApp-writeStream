import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import Route from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

// const __dirname = path.resolve();

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join("__dirname", "build")));
app.use("/", Route);

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static("client/build"));
// }

// app.use(express.static('client/build'));

app.use(express.static('client/build'));
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,'client','build','index.html'));
})
app.get("*", (req, res) => {
    res.sendFile(require('path')
        .resolve(__dirname, 'client', 'build', 'index.html'));
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);

const URL =
  process.env.MONGODB_URI ||
  "mongodb+srv://pradip:pradip@cluster0.yeqsez8.mongodb.net/";

Connection(URL);
