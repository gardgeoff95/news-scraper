const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let PostSchema = new Schema({
    title: {type: String},
        
    user : {type: String},
    upvotes : {type: Number}

})

var Post  = mongoose.model("Post", PostSchema);
module.exports = Post;