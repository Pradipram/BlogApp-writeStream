import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import Route from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = path.resolve();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Route);

// app.use(express.static("client/build"));
app.use(express.static('client/build'));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });
// app.get("*", (_, res)=> {
//   res.sendFile(path.join(dirname, "./client/build/index.html"));
// });
// app.get("*",(req,res)=>{
//   res.sendFile('./client/build/index.html');
// })
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, 'client', 'build', 'index.html');
  res.sendFile(indexPath);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);

const url = process.env.MONGODB_URI;
Connection(url);
