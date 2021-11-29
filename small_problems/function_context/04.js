function myFilter(array, func, thisArg) {
  let result = [];

  if (thisArg) {
    funcContext = func.bind(thisArg);
  } else {
    funcContext = func;
  }
  // let context = func.bind(thisArg);

  array.forEach(function(value) {
    if (funcContext(value)) {
      result.push(value);
    }
  });

  return result;
}

let filter = {
  allowedValues: [5, 6, 9],
}

let filteredArr = myFilter([2, 1, 3, 4, 5, 6, 9, 12], function(val) {
  return this.allowedValues.indexOf(val) >= 0;
}, filter); // returns [5, 6, 9]

console.log(filteredArr);