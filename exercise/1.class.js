// class adalah fungsi dari oop
// Car adalah insiasi nama yang kita definisikan, jadi gak harus Car tapi sesuaikan kebutuhan penamaanya

class Car {
  // properties
  color = "";
  roda = "";
  merk = "";
  sasis = "";

  // Object -> yang akan diproses dari properties, kita ubah propertis menjadi sebuah object
  // constractor yang menerima parameter
  //   yang ada di parameter didapat dari si properties
  constructor(color, roda, merk, sasis) {
    // isi dari this itu didapat dari parameter
    // untuk penamaan dari this. ini bebas, tapi valuenya/nilai ngambil dari si parameter yang didapt dari properties
    this.warna = color;
    this.roda = roda;
    this.merk = merk;
    this.sasis = sasis;
  }

  //   this merupakan sebuah fungsi  untuk kita gunakan sebagai penanda yang didapat dari si constractor

  //   Ini method / perintah yang akan kita jalankan
  getInfo() {
    return `This car have ${this.warna}, ${this.roda}, ${this.merk}, ${this.sasis}`;
  }
}
