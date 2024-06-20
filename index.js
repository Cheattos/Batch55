const express = require("express");
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");

const path = require("path");

const app = express();
const port = 5000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/assests", express.static(path.join(__dirname, "src/assests")));

app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(
  session({
    name: "data",
    secret: "rahasiabgtcui",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

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

app.get("/login", loginView);
app.post("/logincui", login);
app.get("/register", registerView);
app.post("/register", register);
app.get("/logout", logout);

function home(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  res.render("index", { user, isLogin });
}

// Blog
async function blog(req, res) {
  // data query sql
  const query = `SELECT * FROM "Blogs"`;
  // mengirim query ke database
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
  // menampung obj ke data

  const isLogin = req.session.isLogin;
  const user = req.session.user;

  res.render("blog", { data: obj, isLogin, user });
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

  const query = `SELECT * FROM "Blogs" WHERE id='${id}'`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("blog-detail", { detail: obj[0] });
}

async function editBlogView(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM "Blogs" WHERE id=${id}`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

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

  const query = `DELETE FROM "Blogs" WHERE id=${id} `;
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

function loginView(req, res) {
  res.render("login-form");
}

async function login(req, res) {
  const { email, password } = req.body;
  const query = `SELECT * FROM "Users" WHERE email='${email}'`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  if (!obj.length) {
    req.flash("danger", "Login Failed: Email is wrong!");
    return res.redirect("/login");
  }

  bcrypt.compare(password, obj[0].password, (err, result) => {
    if (err) {
      req.flash("danger", "Login Failed: Internal Server Error");
      return res.redirect("/login");
    }

    if (!result) {
      req.flash("danger", "Login Failed: Password is wrong!");
      return res.redirect("/login");
    }

    req.flash("success", "Login Success!");
    req.session.isLogin = true;
    req.session.user = {
      name: obj[0].name,
      email: obj[0].email,
    };

    res.redirect("/");
  });
}

function registerView(req, res) {
  res.render("register-form");
}

async function register(req, res) {
  const { name, email, password } = req.body;

  // misal dikasih kondisi apakah data yg didatabase sudah ada atau belum
  const query = `SELECT * FROM "Users" WHERE email='${email}'`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  // if(obj[0].length === 1){
  //   req.flash("danger", "Register Failed: Email Already Use!");
  //   return res.redirect("/register");
  // }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      req.flash(
        "danger",
        "Register Failed : Password failde to be encyptionsss!"
      );
      return res.redirect("/register");
    }

    const query = `INSERT INTO "Users"(name, email, password) VALUES ('${name}','${email}','${hash}')`;
    await sequelize.query(query, { type: QueryTypes.INSERT });
    req.flash("success", "Register Success!");
    res.redirect("/login");
  });
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/login");
  });
}

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
