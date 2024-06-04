// Inheritance (Pewarisan)
// Mewarisi apa yang ada di dalam parent

class Cars {
  model = "";
  type = "";

  constructor(model, type) {
    this.model = model;
    this.type = type;
  }

  getInfo() {
    return `This car is a ${model}, with type ${type}`;
  }
}


// class ElectiCar akan mewaris properti dan methode seisinya dari class Cars(parent)
// Sehingga apa yang ada di class Cars dapat kita gunakan didalam class ElectricCar
// dan juga kita dapat menambahkan data baru sebagai input ketika kita mendefinisikan new ElectriCar
class ElecticCar extends Cars {
    constructor(model,type, batteryCapasity) {
        // super ini kita ambil dari class Cars
        super(model,type)
        // merupakan tambahan data dari ElecticCar
        this.batteryCapasity = batteryCapasity
    }

    getInfo(){
        return `${super.getInfo()}. It has a battery capasity is ${this.batteryCapasity}`
    }
}

const tesla = new ElecticCar("Tesla", "X", 1)
// angka 1 untuk mengisi value dari batteryCapasity
console.log(tesla);
