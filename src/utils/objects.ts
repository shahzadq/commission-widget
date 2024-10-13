export const getKeys = <O extends object>(object: O) =>
  (typeof object === "object" ? Object.keys(object) : []) as (keyof O)[];

export const mapKeys = <O extends object, R>(
  object: O,
  mapFn: (key: keyof O, value: O[keyof O], idx: number) => R,
) => getKeys(object).map((key, i) => mapFn(key, object[key], i));
