class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  getWheels() {
    return this.wheels;
  }

  info() {
    return `${this.make} ${this.model}`
  }
}

class Car extends Vehicle {
  constructor(make, model) {
    super(make, model);
    this.wheels = 4;
  }
}

class Motorcycle {
  constructor(make, model) {
    super(make, model);
    this.wheels = 2;
  }
}

class Truck {
  constructor(make, model, payload) {
    super(make, model);
    this.payload = payload;
    this.wheels = 6;
  }
}