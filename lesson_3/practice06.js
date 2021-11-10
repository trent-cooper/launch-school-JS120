function User(first, last) {
  if (this.constructor === User) {
    this.first = first;
    this.last = last;
    this.name = first + ' ' + last;
  } else {
    return new User(first, last);
  }
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe