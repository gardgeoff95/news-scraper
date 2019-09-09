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
const connectionInfo = process.env.MONGODB_URI || "mongodb://localhost/scraperHW"
mongoose.connect(connectionInfo)


axios.get("https://old.reddit.com/r/worldnews/").then(function (res) {
    let $ = cheerio.load(res.data);
    let results = {
        title : [],
        upvotes : [],
        tagline : []

    }

    $(".score").each(function (i, element) {
        score = $(element).text();

        

        // let link = $(element).children().attr("href")
        results.upvotes.push({
            upvotes : score
            
            // link: link,
        });

    });
    $("a.title").each(function (i, element) {
        title = $(element).text();
        results.title.push({
            title: title
        })
    })
    $(".tagline").each(function (i, element) { 
        tagline = $(element).text()
        results.tagline.push({
            tagline: tagline
        })


    })
    // $("a").each(function(i, element) 
    //     link 
    // })

   for (i = 0; i < results.title.length; i++) {
    //    console.log(results.title[i]);
    //    console.log(results.tagline[i]);
    //    console.log(results.upvotes[i]);
       dbResults = [
        {title : results.title[i]},
        {user: results.tagline[i]},
        {upvotes : results.upvotes[i]}
       ]
           
       
       db.Post.insertMany(dbResults, function(error, docs) {
           if (error) console.log(error);
           else {
               console.log(docs);
           }
       
        
    });

       
   }


})
app.get("/", function(req, res) {

    res.sendFile(path.join(__dirname, "/index.html"))
});
app.get("/posts", function (req, res) {
    db.Post.find({}).then(function(data){
        res.json(data);
    })
})

app.listen(PORT, function () {
    console.log("Server Listening on port" + PORT);
})