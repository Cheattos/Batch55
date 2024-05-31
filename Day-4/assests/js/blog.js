let dataBlog = [];

function submitBlog(event) {
    // fungsi dari even dan preventDefault adalah menahan agar si browser tidak langsung merefresh ahalam
    // ketika kita input data, agar kita tau datanya sudah masuk atau belum jika via consol
    // dan dapat kita lihat perubahan jika menggunakan inerhtml



  event.preventDefault();

  let inputTitle = document.getElementById("inputTitle").value;
  let inputContent = document.getElementById("inputContent").value;
  let inputImage = document.getElementById("inputImage").files;

  if (inputTitle == "") {
    alert("title harus diisi");
  } else if (inputContent == "") {
    alert("content harus diisi");
  } else if (inputImage == "") {
    alert("file harus diisi");
  }

  // mengabil sumber dari file image(jpn/png)
  inputImage = URL.createObjectURL(inputImage[0]);

  // data ini akan kita masukkan kedalam sebuah array
  const blog = {
    title: inputTitle,
    content: inputContent,
    image: inputImage,
    postAt: "31 Januari 2077",
    author: "Gunawan Hidayat",
  };

  dataBlog.push(blog);
  console.log("dataArray:", dataBlog);
  renderBlog()
}

function renderBlog() {
  document.getElementById("content").innerHTML = "";
  for (let index = 0; index < dataBlog.length; index++) {
    document.getElementById("content").innerHTML += `
            <div class="blog-list-items">
                <div class="blog-image">
                    <img src="${dataBlog[index].image}" alt="image upload" />
                </div>
                <div class="blog-content">
                    <div class="btn-group">
                        <button class="btn-edit"> Edit Blog </button>
                        <button class="btn-post"> Post Blog </button>
                    </div>
                    <h1>
                        <a href="blog-detail.html" target="_black">${dataBlog[index].title}</a>
                    </h1>
                    <div class="detail-blog">
                        ${dataBlog[index].postAt} | ${dataBlog[index].author}
                    </div>
                    <p>
                    ${dataBlog[index].content}
                    </p>
                </div>
            </div>
        `
  }
}
