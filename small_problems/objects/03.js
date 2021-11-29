function objectsEqual(obj1, obj2) {
  let objArr1 = Object.entries(obj1);
  let objArr2 = Object.entries(obj2);

  if (objArr1.length !== objArr2.length) return false;

  return objArr1.every((_, idx) => {
    return objArr1[idx][0] === objArr2[idx][0] &&
    objArr1[idx][1] === objArr2[idx][1];
  });
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false