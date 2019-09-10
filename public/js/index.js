$(document).ready(function(){
    console.log("hello")


    $.get("/posts", function (data) {
        console.log(data);
    }).then(function(data) {
        for (let i = 0; i < data.length; i ++) {
            let newDiv = $("<div>");
            $(newDiv).append("Title: " + data[i].title + "<br>")
            $(newDiv).append("Upvotes: " + data[i].upvotes + "<br> ")
            $(newDiv).append("User: " + data[i].tagline + "<br> ")
            $(newDiv).append("<hr><br><br><br><hr>")
            $(".list-group").append(newDiv)

        }
    });
});