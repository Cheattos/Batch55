const express = require("express");
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);

const path = require("path");

const app = express();
const port = 5000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/assests", express.static(path.join(__dirname, "src/assests")));

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

async function addBlog(req, res) {
  const { title, content } = req.body;

  const date = new Date();
  const dateString = date.toISOString().slice(0, 19).replace("T", " ");

  const query = `INSERT INTO "Blogs"(title, content, "createdAt", "updatedAt") VALUES ('${title}', '${content}','${dateString}','${dateString}')`;
  await sequelize.query(query, { type: QueryTypes.INSERT });

  res.redirect("blog");
}

async function blogDetail(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM "Blogs" WHERE id='${id}'`
  const obj = await sequelize.query(query, {type: QueryTypes.SELECT})

  res.render("blog-detail", { detail:obj[0] });
}

async function editBlogView(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM "Blogs" WHERE id=${id}`
  const obj = await sequelize.query(query, {type: QueryTypes.SELECT})

  res.render("update-blog", { data: obj[0] });
}

async function updateBlog(req, res) {
  const { title, content, id } = req.body;

  const date = new Date();
  const dateString = date.toISOString().slice(0, 19).replace("T", " ");

  const query = `UPDATE "Blogs" SET title='${title}',content='${content}',"createdAt"='${dateString}',"updatedAt"='${dateString}' WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.UPDATE });
  res.redirect("/blog");
}

async function deleteBlog(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM "Blogs" WHERE id=${id} `
  await sequelize.query(query, { type: QueryTypes.DELETE });

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
