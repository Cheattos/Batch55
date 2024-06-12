const express = require("express");
// ini ada di node js
const path = require("path");

const app = express();
const port = 5000;

const data = [];

// app.set
// mendeskripsikan templte engine apa yang dipake
app.set("view engine", "hbs");
// ini memberitahu si templte engine ngambilnya dari folder mana
app.set("views", path.join(__dirname, "src/views"));

// ini untuk assets
app.use("/assests", express.static(path.join(__dirname, "src/assests")));
// middleware -> yang berfungsi sebagai alat memproses inputan dari form (Request)
app.use(express.urlencoded({ extended: false }));

// Routing
app.get("/", home);
app.get("/blog", blog);
app.get("/add-blog", viewblog);
app.post("/add-blog", addBlog);
app.get("/blog-detail/:id", blogDetail);
app.get("/testimonial", testimonial);
app.get("/contact", contactme);

function home(req, res) {
  res.render("index");
}

function blog(req, res) {
  res.render("blog", { data });
}

function viewblog(req, res) {
  res.render("add-blog");
}

// Array Manipulation
function addBlog(req, res) {
  const { title, content } = req.body;

  console.log("Title :", title);
  console.log("content :", content);

  const dataBlog = { title, content };

  const uwu = data.unshift(dataBlog);

  console.log(uwu);

  res.redirect("blog");
}

function blogDetail(req, res) {
  const { id } = req.params;

  const detail = data[id]

  res.render("blog-detail", { detail });
}

function testimonial(req, res) {
  res.render("testimonial");
}

function contactme(req, res) {
  res.render("contact");
}

// Day-12
// update post / blog
// delete post 

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
