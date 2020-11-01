const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create mongoose schema for book
const authorSchema = new Schema({
    name: String,
    age: Number
})

//model refer to a collection in MongoDB
module.exports = mongoose.model("Author", authorSchema)