const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;
const db = require("./models");
const app = express();
const cheerio = require("cheerio");
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
const connectionInfo =
  process.env.MONGODB_URI || "mongodb://localhost/scraperHW";
mongoose.connect(connectionInfo);

axios.get("https://old.reddit.com/r/worldnews/").then(function(res) {
  let $ = cheerio.load(res.data);
  let results = {
    title: [],
    upvotes: [],
    tagline: []
  };
  $(".score").each(function(i, element) {
    score = $(element).text();
    results.upvotes.push({
      upvotes: score
    });
  });
  $("a.title").each(function(i, element) {
    title = $(element).text();
    results.title.push({
      title: title
    });
  });
  $(".tagline").each(function(i, element) {
    tagline = $(element).text();
    results.tagline.push({
      tagline: tagline
    });
  });
  dbResults = []
  for (i = 0; i < results.title.length; i++) {
   
    resultsObj = {
        title: results.title[i].title,
        upvotes: results.upvotes[i].upvotes,
        tagline: results.tagline[i].tagline
    }
    dbResults.push(resultsObj);
    console.log(dbResults)
 
  }
  db.Post.insertMany(dbResults, function(error, docs) {
      if (error) console.log(error);
      else {
        console.log(docs);
      }
    });
});
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.get("/posts", function(req, res) {
  db.Post.find({}).then(function(data) {
    res.json(data);
  });
});

app.listen(PORT, function() {
  console.log("Server Listening on port" + PORT);
});
