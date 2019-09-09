const express = require("express");
const axios = require("axios");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;
// const db = require("./models");
const app = express();
const cheerio = require("cheerio");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const connectionInfo = process.env.MONGODB_URI || "mongodb://localhost/scraperdb"
mongoose.connect(connectionInfo)


axios.get("https://www.reddit.com/r/news/").then(function (res) {
    let $ = cheerio.load(res.data);
    results = [];

    $("h3 a").each(function (i, element) {
        let  title = $(element).text();

        

        // let link = $(element).children().attr("href")
        results.push({
            title: title
            // link: link,
        });
    });
    $("a").each(function(i, element) {
        link 
    })

 
    console.log(results);

})

app.listen(PORT, function () {
    console.log("Server Listening on port" + PORT);
})