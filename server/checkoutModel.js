const mongoose = require("mongoose");

const thirdSchema =  new mongoose.Schema({
 
studentName: String,
title: [String],
author: [String],
bookID:[Number],
dueDate:String


})
module.exports = mongoose.model("CheckOutNames", thirdSchema)