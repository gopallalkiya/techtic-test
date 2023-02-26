const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const multer = require('multer');


require('dotenv').config();
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
    res.json({ message: "Node Server is Up & Running" });
  });

app.use(require("./api/routes/index"));
app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'));



// function apiResponse(results){
//   return JSON.stringify({"status": 200, "error": null, "response": results});
// }
 // DB Connection 
mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log("Connected to DB")
);

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });