const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create mongoose schema for book
const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
})

//model refer to a collection in MongoDB
module.exports = mongoose.model("Book", bookSchema)