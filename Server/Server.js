const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ConnectedDB = require("./Config/Db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("AI Resume Analyzer Backend Running");
});

app.listen(3002,() => {
    console.log("Server Is Running")
});
