// polymorpsim kita bisa extend class yang mengextend class sebelumnya
class Cars {
  constructor(model, type) {
    this.model = model;
    this.type = type;
  }

  drive() {
    return ` ${this.model} ${this.type}`;
  }
}
class ElecticCar extends Cars {
  constructor(model, type, batteryCapasity) {
    super(model, type);
    this.batteryCapasity = batteryCapasity;
  }

  getInfo() {
    return `${super.drive()}. It has a battery capasity is ${this.batteryCapasity}`
  }
}

class Obama extends ElecticCar {
    driveObama(){
        return `ini dari obama yang extend electricCar : ${super.getInfo()}`
    }
}

const car = new Cars("Toyota", "Bakwan")
const electricCar = new ElecticCar("Tesla", "G", 123)
const obama = new Obama("Nissan", "GTR", 9999)

console.log(car.drive());
console.log(electricCar.getInfo());
console.log(obama.driveObama());