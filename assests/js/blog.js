function getFullTime(tanggal) {
  const monthList = [
    "January",
    "Febuari",
    "Maret",
    "Apr",
    "Meiiii",
    "Juni",
    "Juli",
    "Augustus",
    "Sep",
    "Okt",
    "Nov",
    "Desember",
  ];

  const date = tanggal.getDate();
  const month = tanggal.getMonth();
  const year = tanggal.getFullYear();
  let hours = tanggal.getHours();
  let minutes = tanggal.getMinutes();

  if (hours <= 9) {
    hours = "0" + hours;
  }

  // ketika ditampilkan yang tadinya 8:45, menjadi 08:45

  // jam 10:00
  // jam 07:00
  // jam 06:00

  if (minutes <= 9) {
    minutes = "0" + minutes;
  }

  return `${date} ${monthList[month]} ${year} ${hours}:${minutes}`;
}

function getDistanceTime(time) {
  const timeNow = new Date().getTime(); //ini ngambil waktu saat ini
  const timePosted = time;

  const distance = timeNow - timePosted; //ms atau miliseconds

  // math :
  // floor -> ini akan membulatkan angka kebawah : 8.9 -> 8
  // round -> dibulatkan ke yg terdekat: 9.7 -> 9 | 8.2 akan jadi 8
  // ceil -> dibulatkan ke atas : 8.7 -> 9

  const distanceSeconds = Math.floor(distance / 1000); // 1000 melambangkan setiap detik, karna 1 detika 1000 ms
  const distanceMinutes = Math.floor(distance / 1000 / 60); // 60 melambangkan 1 menit
  const distanceHours = Math.floor(distance / 1000 / 60 / 60); // 60 melambangkan 1 jam
  const distanceDay = Math.floor(distance / 1000 / 60 / 60 / 24); // 24 melambangkan 1 hari yaitu 24 jam

  console.log(distanceSeconds);
  console.log(distanceMinutes);
  console.log(distanceHours);
  console.log(distanceDay);

  if (distanceDay > 0) {
    return `${distanceDay} Day Ago`;
  } else if (distanceHours > 0) {
    return `${distanceHours} Hours Ago`;
  } else if (distanceMinutes > 0) {
    return `${distanceMinutes} Minutes Ago`;
  } else if (distanceSeconds > 0) {
    return `${distanceSeconds} Seconds Ago`;
  }
}

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
    // ini si posted add referance dari penulisan inggris
    postAt: new Date(),
    author: "Sultan Teguh",
    nodejs: true,
    react: true,
    next: true,
    java: false,
  };

  dataBlog.push(blog);
  console.log("dataArray:", dataBlog);
  renderBlog();
}

// Jika perkondisian dalam 1 baris yang sama kita bisa menggunakan yang namanya TERNARI (?) ini berdasarkan nilai boolean

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
                        <a href="blog-detail.html" target="_black">${
                          dataBlog[index].title
                        }</a>
                    </h1>
                    <div class="detail-blog">
                        ${getFullTime(dataBlog[index].postAt)} | ${
      dataBlog[index].author
    }
                    </div>
                    ${dataBlog[index].nodejs ? "nodeJs" : ""}
                    ${dataBlog[index].react ? "nodeJs" : ""}
                    ${dataBlog[index].next ? "nodeJs" : ""}
                    ${dataBlog[index].java ? "nodeJs" : ""}
                    <p>
                    ${dataBlog[index].content}
                    </p>
                    <p>
                    ${getDistanceTime(dataBlog[index].postAt)}
                    </p>
                </div>
            </div>
        `;
  }
}

setInterval(function () {
  renderBlog();
}, 1000);
