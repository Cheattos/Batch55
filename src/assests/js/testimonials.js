// Promise
//  Promise adalah sebuah object yang mempresentasikan dari operasi asyncronus yang memiliki sebuah
// kondisi yang harus dipenuhi  atau menghasilkan nilai.
// 1. kondisi yang harus dipenuhi
// 2. operasi yang belum selesai

// Promise punya 3 kondisi
// 1. Pending (tunggu/tunda) = Ketika dia sedang dijalankan / dipanggil (undifinded)
// 2. Fullfilled (Terselesaikan) = Ketika janjinya terlaksana / terpenuhi / berhasil (value)
// 3. Rejected (Gagal/Tertolak) = Ketika janjinya tidak terlaksana / di jalankan (error)

// API
// Appication Programming Interface (API)
// API ini sebuah data / kumpulan data yang sudah ada / tersedia dari aplikasi lain/server,
// yang dapat kita gunakan/pakai untuk dikelola kembali

const testimonial = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  // Apa itu xml?
  //  Ini sebuah fungsi yang memungkinkan kita untuk / dapat memanggil sebuah API.
  // Yang kita ambil adalah sebuah Request HTTP dari server yang akan dikirim ke kita
  // berupa sebuah response.
  // xhr ini merupakan salah satu cara asyncronus untuk memanggil request HTTP

  xhr.open("GET", "https://api.npoint.io/b3a4c7ed44162a465ce0", true);
  // Get -> Methode
  // yg-2 -> Alamat api
  // kondisi 3 -> sebuah izin

  // Get -> untuk mendapatkan API

  // Post -> Ini untuk mengirimkan data ke API
  // PUT -> untuk merubah data di API
  // Delete -> menghapus data di API

  // fungsi true -> fungsinya jadi asyncronus (dijalankan secara bersamaan)
  // fungsi false -> fungsinya jadi syncronus (dijalankan secara berurutan)

  xhr.onload = function () {
    if (xhr.status == 200) {
      resolve(JSON.parse(xhr.response));
    } else {
      reject("Erorr Loaded Data");
      // salah menuliskan alamat
      // gangguan langsung dari server (lagi perbaikan)
    }
  };

  xhr.onerror = function () {
    reject("404 Not Found");
    // CORS
  };

  // Mengirim permintaan ke HTTP ke Server
  xhr.send();
});

async function showTestimonial() {
  try {
    const response = await testimonial;
    // await disini sebagai penanda bahwa butuh waktu tunggu samapi data dari API kita dapatkan.
    // setiap penggunaan async sudah pasti pake await
    // Hasil dari pemanggilan jika tidak menggunakan await maka akan diberikan output undifinded
    // Jika pake await akan tampil datanya
    let testimonialHtml = ``;

    response.forEach((item) => {
      testimonialHtml += `
      <div class="testimonial">
        <img src="${item.image}" alt="testimonial" class="profile-testimonial">
            <p class="quote">${item.content}</p>
            <p class="author">- ${item.author}</p>
            <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
      </div>`;
    });

    document.getElementById("testimonials").innerHTML = testimonialHtml;

  } catch (error) {
    console.log(error);
  }
}
// callback -> pemanggilan fungsi kembali
showTestimonial();

async function filterTestimonials(rating) {
  try {
    const response = await testimonial;
    let testimonialHtml = ``;

    const dataFilter = response.filter((data) => data.rating === rating);
    if (dataFilter.length === 0) {
      testimonialHtml = `<h1> Data not found!</h1>`;
    } else {
      dataFilter.forEach((item) => {
        testimonialHtml += `<div class="testimonial">
        <img src="${item.image}" alt="testimonial" class="profile-testimonial">
            <p class="quote">${item.content}</p>
            <p class="author">- ${item.author}</p>
            <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
      </div>`;
      });
    }

    document.getElementById("testimonials").innerHTML = testimonialHtml;
  } catch (error) {
    console.log(error);
  }
}
