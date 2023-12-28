// Express App
const express = require("express");
const cors = require("cors");
const path = require("path");
const { db } = require("./mongodb");
const multer = require("multer");
const postModel = require("./model/post.model");
const mongoose = require("mongoose");

// Storage
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../frontend/public/uploads"),
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const app = express();

// Set a view engine for templating
app.set("view engine", "ejs");

app.use(cors());

// Static Files
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Body Parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Running Express Server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// Home Page
app.get("/", (_, res) => {
  // Send index file as Response
  res.sendFile("index.html");
});

// Post Page
app.get("/post", (_, res) => {
  // Send index file as Response
  res.sendFile(path.join(__dirname, "../frontend/public/post.html"));
});

// About Page
app.get("/about", (_, res) => {
  // Send index file as Response
  res.sendFile(path.join(__dirname, "../frontend/public/about.html"));
});

// Contact Page
app.get("/contact", (_, res) => {
  // Send index file as Response
  res.sendFile(path.join(__dirname, "../frontend/public/contact.html"));
});

// Routes
app.post("/api/post", async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error uploading image");
      } else {
        const post = new postModel({
          _id: new mongoose.Types.ObjectId(),
          title: req.body.title,
          image: req.file.originalname,
          content: req.body.content,
          category: req.body.category,
          date: new Date().toLocaleDateString().toString(),
          author: req.body.author,
        });

        await db.collection("posts").insertOne(post);
        res.redirect("/post");
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating post");
  }
});

// Get All Posts
app.get("/api/posts", async (_, res) => {
  // Get Posts
  await db
    .collection("posts")
    .find({})
    .toArray()
    .then((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});

// Get Image By ID
app.get("/api/uploads/*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/public/uploads", req.params[0])
  );
});

// Get Data By ID
app.get("/api/post/:id", async (req, res) => {
  await db
    .collection("posts")
    .findOne({ _id: req.params.id })
    .then((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});

// Get Posts By Category
app.get("/api/posts/:category", async (req, res) => {
  await db
    .collection("posts")
    .find({ category: req.params.category })
    .toArray()
    .then((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});

// Get Post Page
app.get("/post/:pageId", async (req, res) => {
  const pageId = req.params.pageId;
  const data = await postModel.findOne({ _id: pageId });

  const pageData = {
    pageId: data._id,
    title: data.title,
    image: data.image,
    content: data.content,
    category: data.category,
    date: data.date,
    author: data.author,
  };

  res.render("page", {
    pageData: pageData,
  }); // Render the page template
});

// Get logo
app.get("/api/logo", (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/images/logo.jpeg"));
});
