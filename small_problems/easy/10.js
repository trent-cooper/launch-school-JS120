class Pet {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }

  info() {
    return `a ${this.type} named ${this.name}`;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  numberOfPets() {
    return this.pets.length;
  }

  adoptPet(pet) {
    this.pets.push(pet);
  }
}

class Shelter {
  constructor() {
    this.owners = [];
    this.unadopted = [];
  }

  adopt(owner, pet) {
    owner.adoptPet(pet);
    if (!this.owners.includes(owner)) {
      this.owners.push(owner);
    }
  }

  printAdoptions() {
    this.owners.forEach(owner => {
      console.log(`${owner.name} has adopted the following pets:`);
      owner.pets.forEach(pet => console.log(pet.info()));
      console.log('');
    });
  }

  takeInAnimal(pet) {
    this.unadopted.push(pet);
  }

  printUnadopted() {
    console.log('The Animal Shelter has the following unadopted pets:');
    this.unadopted.forEach(pet => console.log(pet.info()));
  }

  numberOfUnadopted() {
    return this.unadopted.length;
  }
}


let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');
let asta      = new Pet('dog', 'Asta');
let laddie      = new Pet('dog', 'Laddie');
let fluffy      = new Pet('cat', 'Fluffy');
let kat      = new Pet('cat', 'Kat');
let ben      = new Pet('cat', 'Ben');
let chatterbox      = new Pet('parakeet', 'Chatterbox');
let bluebell      = new Pet('parakeet', 'Bluebell');
let tucker = new Pet('dog', 'Tucker');
let ollie = new Pet('dog', 'Ollie');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');
let tcooper = new Owner('T Cooper');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.adopt(tcooper, tucker);
shelter.adopt(tcooper, ollie);
shelter.takeInAnimal(bluebell);
shelter.takeInAnimal(chatterbox);
shelter.takeInAnimal(ben);
shelter.takeInAnimal(kat);
shelter.takeInAnimal(fluffy);
shelter.takeInAnimal(laddie);
shelter.takeInAnimal(asta);
shelter.printUnadopted();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);
console.log(`${tcooper.name} has ${tcooper.numberOfPets()} adopted pets.`);
console.log(`The animal shelter has ${shelter.numberOfUnadopted()} unadopted pets.`);