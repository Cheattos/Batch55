const TestimoniData = [
  {
    image:
      "https://banggaikep.go.id/portal/wp-content/uploads/2024/03/jokowi-1.jpg",
    content: "Ndak tau kok tanyak saya!?",
    author: "Joko Widodo",
    rating: 5,
  },
  {
    image:
      "https://library.sportingnews.com/styles/twitter_card_120x120/s3/2021-08/ronaldo-cropped_1jm2feotxjjx41uxa4pnnu68q1.jpg?itok=IvRTnN9V",
    content: "Waka waka ee",
    author: "Ronaldo Brazil",
    rating: 4,
  },
  {
    image:
      "https://asset-2.tstatic.net/style/foto/bank/images/ayah-rozak-jawab-cibiran-yang-sebut-dirinya-tukang-pamer-harta.jpg",
    content: "Ih anak gua mahhh canttiikk, udaahhh kaya",
    author: "Ayah Ojak",
    rating: 1,
  },
  {
    image:
      "https://asset-2.tstatic.net/sultra/foto/bank/images/Lucinta-Luna-setelah-operasi.jpg",
    content: "AKHhhdhakwdhwakdhkawhdkahk....",
    author: "Lucinta Dede Hidayat?",
    rating: 2,
  },
  {
    image:
      "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/04/24/Amanda-JKT48-mudik-ke-Malang-1666402919.jpg",
    content: "Warmindo Kuy, Warkop Bang Saykotsss",
    author: "Amanda Puspita JKT48",
    rating: 5,
  },
];

function html(item) {
  return `
    <div class="testimonial">
        <img src="${item.image}" alt="testimonial" class="profile-testimonial">
            <p class="quote">${item.content}</p>
            <p class="author">- ${item.author}</p>
            <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
    </div>`;
}

function allTestimonial() {
  let testimonialHtml = ``;
  TestimoniData.forEach((item) => {
    testimonialHtml += html(item);
  });

  document.getElementById("testimonials").innerHTML = testimonialHtml;
}

allTestimonial();

function filterTestimonials(rating) {
  let testimonialHtml = ``;
  const testimonialFilter = TestimoniData.filter((item) => {
    return item.rating === rating;
  });

  if (testimonialFilter.length === 0) {
    testimonialHtml = `<h1> Data not found!</h1>`;
  } else {
    testimonialFilter.forEach((item) => {
      testimonialHtml += html(item);
    });
  }

  document.getElementById("testimonials").innerHTML = testimonialHtml;
}
