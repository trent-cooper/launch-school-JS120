let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

function assignProperty(obj, key, value) {
  if (obj.hasOwnProperty(key)) {
    obj[key] = value;
  } else if (Object.getPrototypeOf(obj) === null) {
    return;
  } else {
    assignProperty(Object.getPrototypeOf(obj), key, value);
  }
}

// assignProperty(fooC, "bar", 2);
// console.log(fooA.bar); // 2
// console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false