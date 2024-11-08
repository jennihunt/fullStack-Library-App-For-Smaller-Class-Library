const mongoose = require("mongoose");

const secondSchema =  new mongoose.Schema({
 
title: String,
author: String,
description: String,
avaliable: Boolean


})
module.exports = mongoose.model("Book", secondSchema)