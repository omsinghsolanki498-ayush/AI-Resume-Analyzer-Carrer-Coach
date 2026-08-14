const express = require("express");  
const cors = require("cors"); // Frontend Backend Connection
require("dotenv").config();

const ConnectedDB = require("./Config/Db"); // database

ConnectedDB();
const AuthRoutes = require("./Routes/AuthRoutes");

const app = express();

app.use(cors());
app.use(express.json());  

app.get("/", (req, res) => {
    res.send("AI Resume Analyzer Backend Running");
});

// Middleware's
app.use("/api/auth" , AuthRoutes); 

app.listen(3002,() => {
    console.log("Server Is Running");
});
