const express = require("express");
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);

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
app.get("/update-blog/:id", editBlogView);
app.post("/update-blog", updateBlog);
app.post("/delete-blog/:id", deleteBlog);

app.get("/testimonial", testimonial);
app.get("/contact", contactme);

function home(req, res) {
  res.render("index");
}

// Blog
async function blog(req, res) {
  // data query sql
  const query = `SELECT * FROM "Blogs"`;
  // mengirim query ke database
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
                      // menampung obj ke data
  res.render("blog", { data: obj });
}

function viewblog(req, res) {
  res.render("add-blog");
}

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

  const detail = data[id];

  res.render("blog-detail", { detail });
}

function editBlogView(req, res) {
  const { id } = req.params;

  // kenapa kita ubah id menjadi integer walaupun idnya sudah berupa angka
  // karan biasanya pada real project id ini tipernya adalah UUID (campuran angka dan huruf yg digenerate otomatis )
  // kalo disini kita pakenya angka aja dulu, sebagai contoh referensi NANTI

  const datafilter = data[parseInt(id)];
  datafilter.id = parseInt(id);
  res.render("update-blog", { data: datafilter });
}

function updateBlog(req, res) {
  const { title, content, id } = req.body;

  data[parseInt(id)] = {
    title,
    content,
  };

  res.redirect("/blog");
}

function deleteBlog(req, res) {
  const { id } = req.params;

  console.log("data sebelum:", data);
  data.splice(id, 1);
  console.log("data sesudah:", data);

  res.redirect("/blog");
}
// Blog

function testimonial(req, res) {
  res.render("testimonial");
}

function contactme(req, res) {
  res.render("contact");
}

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
