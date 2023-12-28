const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  },
});

module.exports = postModel = new mongoose.model("posts", postSchema);
