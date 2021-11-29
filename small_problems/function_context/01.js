let person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: function() {
    return this.firstName + this.lastName;
  }
};

console.log(person.fullName());
