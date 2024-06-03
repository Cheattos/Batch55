let isOpen = false;
function openHumberger() {
  let humbergerButton = document.getElementById("humberger-nav-container");

  if (!isOpen) {
    //artinya humber sudah di click
    humbergerButton.style.display = "flex";
    isOpen = true; //si icon dia terbuka atau terclik
  } else {
    humbergerButton.style.display = "none";
    isOpen = false;
  }
}

// 1. kondisi awal dia none
// 2. kondisi di click -> isopen true
// 3 diklik 1x lagi dia bakaln membaca perbahan dari si isOpen
// 4. Apa yang terjadi ketika kondisinya adalah
// - true -> membuat display flex
// - false -> display none
//dieksekusi per baris
