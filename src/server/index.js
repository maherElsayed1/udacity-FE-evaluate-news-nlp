const dotenv = require("dotenv");
dotenv.config();

var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mockAPIResponse = require("./mockAPI.js");
const cors = require("cors");
const fetch = require("node-fetch");

const apiKey = process.env.API_KEY;

// start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve("src/client/views/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log("Example app listening on port 8080!");
});

app.get("/test", function (req, res) {
    res.send(mockAPIResponse);
});

// Meaning Cloud Post Route
app.post("myMeaningCloud", handleMeaningCloud);
async function handleMeaningCloud(req, res) {
    const baseURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${req.body.url}&lang=en`;

    const response = await fetch(baseURL);
    const myData = await response.json();
    const mainData = {
        score_tag: myData.score_tag,
        agreement: myData.agreement,
        subjectivity: myData.subjectivity,
        confidence: myData.confidence,
        irony: myData.irony,
    };
    res.send(mainData);
}
