const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let PostSchema = new Schema({
    title: {type: String},
        
    tagline : {type: String},
    upvotes : {type: String}

})

var Post  = mongoose.model("Post", PostSchema);
module.exports = Post;