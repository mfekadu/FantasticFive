// tell typescript to interpret this file as a module
// allows for 'augmenting' the global scope in this file
// do this ... `import "../utils/array.utils";`;
// Global Array is affected
export {};

// Augment the global scope with extra functions for Array type
// must be declared in a global scope because `Array` is global environment
declare global {
  interface Array<T> {
    union(arr: T[]): T[];
    or(arr: T[]): T[]; // alias for union [1,2].or([1,3]) >> [1,2,3]
    intersection(arr: T[]): T[];
    and(arr: T[]): T[]; // alias for intersection [1,2].and([1,3]) >> [1]
  }
}

// ==============================================================
// define union
// ==============================================================

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

// ==============================================================
// define intersection
// ==============================================================

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
  // undo the stringification and append values to final array
  let intersection: any[] = [];
  strIntersection.forEach(val => {
    intersection.push(JSON.parse(val));
  });
  return intersection;
};
// define an alias
Array.prototype.and = Array.prototype.intersection;

// ==============================================================
// define the same functions by themselves (not extending Array)
// ==============================================================

// given array A, and array B, returns (A u B)
// e.g. union([1,2,3],[1,2,4]) >> [1,2,3,4]
// e.g. union([1,{a:2},3],[1,{a:2},3, 4]) >> `[1,{a:2},3,4]`
export const union = function(A: any[], B: any[]) {
  // loop through once for each value in this array.
  // make each object into a string so Set can compare
  const strEachA = A.map(value => JSON.stringify(value));
  // same for given array
  const strEachB = B.map(value => JSON.stringify(value));
  // Set is new in ES6 and it is an array with 'unique' values (no duplicates).
  const setA = new Set(strEachA);
  const setB = new Set(strEachB);
  // "destructure" each Set into an Array and concatenate them.
  const concatenated = [...setA, ...setB];
  const strOnion = new Set(concatenated);
  let onion: any[] = [];
  strOnion.forEach(val => {
    onion.push(JSON.parse(val));
  });
  // dont cry, here's the pre-chopped onion:
  return onion;
};

// given array A, and array B, returns (A n B)
// e.g. intersection([1,2,3],[1,2,4]) >> [1,2]
// e.g. intersection([1,{a:2},3],[1,{a:2},4]) >> [1,{a:2}]
export const intersection = function(A: any[], B: any[]) {
  // loop through once for each value in this array.
  // make each object into a string so Set can compare
  const strEachA = A.map(value => JSON.stringify(value));
  // same for given array
  const strEachB = B.map(value => JSON.stringify(value));
  // Set is new in ES6 and it is an array with 'unique' values (no duplicates).
  const setA = new Set(strEachA);
  const setB = new Set(strEachB);
  let strIntersection = [...setA].filter(x => setB.has(x));
  // console.log("filteredByIntersect...",filteredByIntersect);
  let intersection: any[] = [];
  // undo the stringification and append values to final array
  strIntersection.forEach(val => {
    intersection.push(JSON.parse(val));
  });
  return intersection;
};


// ==============================================================
// test cases
// ==============================================================
const testUnion = function() {
  const empty: any[] = [];
  const a: any = [1,2,3];
  const b: any = [1,2,4];
  const c: any = [1,1,2,2,3,3];
  const d: any = [1,1,2,2,3,3,4,4];
  const e: any = [1,{a:2},3];
  const f: any = [1,{a:2},3,4];
  const g: any = [1,1,{a:2},{a:2},3,3];
  const h: any = [1,1,{a:2},{a:2},3,3,4,4];
  // same strings in reverse
  const _a: any = [3,2,1];
  const _b: any = [4,2,1];
  const _c: any = [3,3,2,2,1,1];
  const _d: any = [4,4,3,3,2,2,1,1];
  const _e: any = [3,{a:2},1];
  const _f: any = [4,3,{a:2},1];
  const _g: any = [3,3,{a:2},{a:2},1,1];
  const _h: any = [4,4,3,3,{a:2},{a:2},1,1];
  const res1: any = a.or(empty);
  const expect1: any = [1,2,3]
  const res2: any = a.or(b)
  const expect2: any = [1,2,3,4];
  const res3: any = a.or(c)
  const expect3: any = [1,2,3];
  const res4: any = a.or(d)
  const expect4: any = [1,2,3,4];
  const res5: any = e.or(f);
  const expect5: any = [1,{a:2},3,4]
  const res6: any = g.or(h);
  const expect6: any = [1,{a:2},3,4]
  const res7: any = a.or(_a);
  const expect7: any = [1,2,3];
  const res8: any = c.or(_c);
  const expect8: any = [1,2,3];
  const res9: any = g.or(_g);
  const expect9: any = [1,{a:2},3];
  const res10: any = a.or(_b);
  const expect10: any = [1,2,3,4];

  let res = res1;
  let expect = expect1;
  res.forEach((element: any, index: any) => {
    (element === expect[index]) ? true : console.error("fail1",element,"!==",expect[index]);
  });
  res = res2;
  expect = expect2;
  res.forEach((element: any, index: any) => {
    (element === expect[index]) ? true : console.error("fail2",element,"!==",expect[index]);
  });
  res = res3;
  expect = expect3;
  res.forEach((element: any, index: any) => {
    (element === expect[index]) ? true : console.error("fail3",element,"!==",expect[index]);
  });
  res = res4;
  expect = expect4;
  res.forEach((element: any, index: any) => {
    (element === expect[index]) ? true : console.error("fail4",element,"!==",expect[index]);
  });
  res = res5;
  expect = expect5;
  res.forEach((element: any, index: any) => {
    if (typeof element === 'object') {
      (element.a === expect[index].a) ? true : console.error("fail6",element,"!==",expect[index]);
    } else {
      (element === expect[index]) ? true : console.error("fail7",element,"!==",expect[index]);
    }
  });
  res = res6;
  expect = expect6;
  res.forEach((element: any, index: any) => {
    if (typeof element === 'object') {
      (element.a === expect[index].a) ? true : console.error("fail6",element,"!==",expect[index]);
    } else {
      (element === expect[index]) ? true : console.error("fail7",element,"!==",expect[index]);
    }
  });
  res = res7;
  expect = expect7;
  res.forEach((element: any, index: any) => {
    (element === expect[index]) ? true : console.error("fail7",element,"!==",expect[index]);
  });
  res = res8;
  expect = expect8;
  res.forEach((element: any, index: any) => {
    (element === expect[index]) ? true : console.error("fail8",element,"!==",expect[index]);
  });
  res = res9;
  expect = expect9;
  res.forEach((element: any, index: any) => {
    if (typeof element === 'object') {
      (element.a === expect[index].a) ? true : console.error("fail6",element,"!==",expect[index]);
    } else {
      (element === expect[index]) ? true : console.error("fail7",element,"!==",expect[index]);
    }
  });
  res = res10;
  expect = expect10;
  res.forEach((element: any, index: any) => {
    (element === expect[index]) ? true : console.error("fail10",element,"!==",expect[index]);
  });
}


const testIntersection = function() {
  const empty: any[] = [];
  const a: any = [1,2,3];
  const b: any = [1,2,4];
  const c: any = [1,1,2,2,3,3];
  const d: any = [1,1,2,2,3,3,4,4];
  const e: any = [1,{a:2},3];
  const f: any = [1,{a:2},3,4];
  const g: any = [1,1,{a:2},{a:2},3,3];
  const h: any = [1,1,{a:2},{a:2},3,3,4,4];
  // same strings in reverse
  const _a: any = [3,2,1];
  const _b: any = [4,2,1];
  const _c: any = [3,3,2,2,1,1];
  const _d: any = [4,4,3,3,2,2,1,1];
  const _e: any = [3,{a:2},1];
  const _f: any = [4,3,{a:2},1];
  const _g: any = [3,3,{a:2},{a:2},1,1];
  const _h: any = [4,4,3,3,{a:2},{a:2},1,1];
  const res1: any = a.and(empty);
  const expect1: any = []
  const res2: any = a.and(b)
  const expect2: any = [1,2];
  const res3: any = a.and(c)
  const expect3: any = [1,2,3];
  const res4: any = a.and(d)
  const expect4: any = [1,2,3];
  const res5: any = e.and(f);
  const expect5: any = [1,{a:2},3]
  const res6: any = g.and(h);
  const expect6: any = [1,{a:2},3]
  const res7: any = a.and(_a);
  const expect7: any = [1,2,3];
  const res8: any = c.and(_c);
  const expect8: any = [1,2,3];
  const res9: any = g.and(_g);
  const expect9: any = [1,{a:2},3];
  const res10: any = a.and(_b);
  const expect10: any = [1,2];

  let res = res1;
  let expect = expect1;
  res.forEach((element: any, index: any) => {
    (element === expect[index]) ? true : console.error("fail1",element,"!==",expect[index]);
  });
  res = res2;
  expect = expect2;
  res.forEach((element: any, index: any) => {
    (element === expect[index]) ? true : console.error("fail2",element,"!==",expect[index]);
  });
  res = res3;
  expect = expect3;
  res.forEach((element: any, index: any) => {
    (element === expect[index]) ? true : console.error("fail3",element,"!==",expect[index]);
  });
  res = res4;
  expect = expect4;
  res.forEach((element: any, index: any) => {
    (element === expect[index]) ? true : console.error("fail4",element,"!==",expect[index]);
  });
  res = res5;
  expect = expect5;
  res.forEach((element: any, index: any) => {
    if (typeof element === 'object') {
      (element.a === expect[index].a) ? true : console.error("fail6",element,"!==",expect[index]);
    } else {
      (element === expect[index]) ? true : console.error("fail7",element,"!==",expect[index]);
    }
  });
  res = res6;
  expect = expect6;
  res.forEach((element: any, index: any) => {
    if (typeof element === 'object') {
      (element.a === expect[index].a) ? true : console.error("fail6",element,"!==",expect[index]);
    } else {
      (element === expect[index]) ? true : console.error("fail7",element,"!==",expect[index]);
    }
  });
  res = res7;
  expect = expect7;
  res.forEach((element: any, index: any) => {
    (element === expect[index]) ? true : console.error("fail7",element,"!==",expect[index]);
  });
  res = res8;
  expect = expect8;
  res.forEach((element: any, index: any) => {
    (element === expect[index]) ? true : console.error("fail8",element,"!==",expect[index]);
  });
  res = res9;
  expect = expect9;
  res.forEach((element: any, index: any) => {
    if (typeof element === 'object') {
      (element.a === expect[index].a) ? true : console.error("fail6",element,"!==",expect[index]);
    } else {
      (element === expect[index]) ? true : console.error("fail7",element,"!==",expect[index]);
    }
  });
  res = res10;
  expect = expect10;
  res.forEach((element: any, index: any) => {
    (element === expect[index]) ? true : console.error("fail10",element,"!==",expect[index]);
  });
}
