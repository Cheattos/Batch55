class Car {
  // properties
  color = "";
  roda = "Kaki";
  merk = "";
  sasis = "Baja Ringan";

  constructor(color, roda, merk) {
    // penaamaan dari isi di constractor akan disesuaikan sama yang kita definisikan
    // merubah pemanggilan berdasarkan penamaan yang kita definisikan
    // Jika di constractor namanya Bumble, tapi dimethode yang dipanggil adalah roda, dia akan menampilkan dari si roda
    // bukan dari si constractor, tapi kalo yang dipannggil adalah Bumble yang mana valuenya adalah dari si roda

    // kenapa kita pake constractor =

    // untuk menampung nilai
    // agar nilainya berubah-ubah/ bisa diubah
    // karna yang dipanggil adalah sebuah object
    // Memberikan referensi nilai
    // sebagi kerangka/blueprint
    // mengurangi duplikasi

    // Kesimpulan
    // Untuk mendefinisikan isi object yang diambil dari kerangkanya/propertis, yang dapat diubah nilainya, dan mengurangi duplikasi

    this.warna = color;
    this.Bumble = roda;
    this.merk = merk;
  }

  //   methode
  getInfo() {
    // penggunaan petika 1 (') dan petik 2 ("") dianggap hanya sebuah text saja
    // penggunaan bektik (`) akan dibaca ada kode yang dipanggil seperti ${this.roda}
    return `color : ${this.warna},roda : ${this.Bumble},merek: ${this.merk},sasis: ${this.sasis}`;
  }
}

const caraja = new Car("black", "2", "suzuki", "kosong");
console.log(caraja.getInfo());

const car1 = new Car();
console.log(car1.getInfo());

// npm = node langsung kefolder/nama file
// node exercise/2.object.js
