// tell typescript to interpret this file as a module
// allows for 'augmenting' the global scope in this file
// do this ... `import "@/utils/array.utils"`;
// Global Array is affected
export {};

// Augment the global scope with extra functions for Array type
// must be declared in a global scope because `Array` is global environment
declare global {
  interface Array<T> {
    union(arr: T[]): T[];
    or(arr: T[]): T[]; // alias for union
    intersection(arr: T[]): T[];
    and(arr: T[]): T[]; // alias for intersection
  }
}

// extend the Array; return the union of `this` array and a given array
// allows for syntax `[1,2,3].union([1,2,4])` expect output `[1,2,3,4]`
// another example: `[1,{a:2},3].union([1,{a:2},3, 4])` expect `[1,{a:2},3,4]`
// adimittedly, this function could be made 3x faster if Set compared objects by their contents.
Array.prototype.union = function(arr: any[]) {
  // loop through once for each value in this array.
  // make each object into a string so Set can compare
  const strEachThis = this.map(value => JSON.stringify(value));
  // same for given array
  const strEachArr = arr.map(value => JSON.stringify(value));
  // Set is new in ES6 and it is an array with 'unique' values (no duplicates).
  const setThis = new Set(strEachThis);
  const setArr = new Set(strEachArr);
  // "destructure" each Set into an Array and concatenate them.
  const concatenated = [...setThis, ...setArr];
  const strOnion = new Set(concatenated);
  let onion: any[] = [];
  strOnion.forEach(val => {
    onion.push(JSON.parse(val));
  });
  // dont cry, here's the pre-chopped onion:
  return onion;
};
// define an alias
Array.prototype.or = Array.prototype.union;

// extend the Array; return the intersection of `this` array and a given array
// allows for syntax `[1,2,3].intersection([1,2,4])` expect output `[1,2]`
// another example: `[1,{a:2},3].intersection([1,{a:2},4])` expect `[1,{a:2}]`
Array.prototype.intersection = function(arr: any[]) {
  // loop through once for each value in this array.
  // make each object into a string so Set can compare
  const strEachThis = this.map(value => JSON.stringify(value));
  // same for given array
  const strEachArr = arr.map(value => JSON.stringify(value));
  // Set is new in ES6 and it is an array with 'unique' values (no duplicates).
  const setThis = new Set(strEachThis);
  const setArr = new Set(strEachArr);
  let strIntersection = [...setThis].filter(x => setArr.has(x));
  // console.log("filteredByIntersect...",filteredByIntersect);
  let intersection: any[] = [];
  strIntersection.forEach(val => {
    intersection.push(JSON.parse(val));
  });
  // let intersection = new Set(filteredByIntersect);
  // console.log("Array.from(intersection)...",Array.from(intersection),intersection);
  return intersection; // Array.from(intersection);
};
// define an alias
Array.prototype.and = Array.prototype.intersection;
