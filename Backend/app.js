const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ConnectToDB = require("./config/db");
const userRoutes = require("./routes/user.route");
const incidentRoutes = require("./routes/incident.route")


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

ConnectToDB();

app.get('/', (req,res) => {
    res.send("Hello bhai");
})

app.use('/users',userRoutes);
app.use("/incidents",incidentRoutes)

module.exports = app;