// utils for typescript objects
// the issue in typescript is when we use Object.keys(), we recieve an array of strings as a return value which we can then map
// however, becuase this is just a string[], typescript assumes the values can be used as keys for the original object

// example:

// const obj = { a: "", b: "", c: "" };
// const keys = Object.keys(obj);
// const mapping = keys.map((key) => {
//   const value = obj[key];
// });

// if you uncomment the above example, you should see a type error on line 9 where typescript doesn't recognise the key as a valid property for obj
// these utils fix that issue by strongly typing the object keys as whatever they actually are (you can do this manually every time but this is easier)
// they also make the code more concise without having to manually get the value every time you map keys

export const getKeys = <O extends object>(object: O) =>
  Object.keys(object) as (keyof O)[];

export const mapKeys = <O extends object, R>(
  object: O,
  mapFn: (key: keyof O, value: O[keyof O], idx: number) => R
) => getKeys(object).map((key, i) => mapFn(key, object[key], i));

// example:

// const obj = { a: "", b: "", c: "" };
// const keys = getKeys(obj);
// const mapping = keys.map((key) => {
//   const value = obj[key];
// });
// // or more concisely
// const concise = mapKeys(obj, (key, value, idx) => {});
