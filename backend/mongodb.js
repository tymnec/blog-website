const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/etereablogs");

let db = mongoose.connection;
db.on("error", console.log.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("MongoDB connection successful");
});

module.exports = { db };
