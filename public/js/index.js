$(document).ready(function(){
    console.log("hello")


    $.get("/posts", function (data) {
        console.log(data);
    });
});