const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}
Object.assign(Car.prototype, Speed);

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}
Object.assign(Truck.prototype, Speed);

console.log(Object.getOwnPropertyNames(Truck.prototype));
console.log(Object.getOwnPropertyNames(Car.prototype));

let car1 = new Car();
car1.goFast();

let truck1 = new Truck();
truck1.goFast();

