const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
// const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middelwares/errorMiddleware");
const path=require("path");

//routes path
const authRoutes = require("./routes/authRoutes");

//dotenv
require("dotenv").config();

//mongo connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan("dev"));

const PORT = process.env.PORT || 8080;

//API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));

    app.use(express.static('front/build'));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"front","build","index.html"))
    })

//error middleware
app.use(errorHandler);
//listen server
app.listen(PORT, () => {
  console.log(
    `Server Running on port no ${PORT}`
  );
});
