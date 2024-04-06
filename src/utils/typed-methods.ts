type AnyObj = {}; // [key in K]: unknown
type AnyEntries<K extends string = string> = [K, unknown][];

type AnyOtherString = string & {};

type AnyOtherNonString = undefined | null | number | bigint | boolean;

type MaybeKeyOf<Obj extends AnyObj> = keyof Obj | AnyOtherString | AnyOtherNonString;

export const has = <const Key extends MaybeKeyOf<Obj>, const Obj extends AnyObj>(
  object: Obj,
  key: Key,
): key is Key & keyof Obj => typeof key === "string" && key in object;

export const keys = <const Obj extends AnyObj>(object: Obj) => Object.keys(object) as (keyof Obj)[];
export const values = <const Obj extends AnyObj>(object: Obj) => Object.values(object) as Obj[keyof Obj][];

type TypedValue<Obj extends AnyObj, Key extends MaybeKeyOf<Obj>> = Key extends keyof Obj ? Obj[Key] : undefined;

export const get = <const Key extends MaybeKeyOf<Obj>, const Obj extends AnyObj>(object: Obj, key: Key) =>
  (has(object, key) ? object[key] : undefined) as TypedValue<Obj, Key>;

export type TypedEntry<Obj extends AnyObj> = NonNullable<{ [K in keyof Obj]: [K, Obj[K]] }[keyof Obj]>;

export const entries = <const Obj extends AnyObj>(object: Obj) => Object.entries(object) as TypedEntry<Obj>[];

type EntryKeys<Ents extends AnyEntries> = Ents[number][0];
type EntryByKey<Ents extends AnyEntries, Key extends EntryKeys<Ents>> = Extract<Ents[number], [Key, any]>;
type ObjectFromEntries<Ents extends AnyEntries> = {
  [K in EntryKeys<Ents>]: EntryByKey<Ents, K>[1];
};

export const fromEntries = <const Entries extends AnyEntries>(entries: Entries) =>
  Object.fromEntries(entries) as ObjectFromEntries<Entries>;

interface TypedReadonlyMap<Obj extends AnyObj> extends ReadonlyMap<keyof Obj, Obj[keyof Obj]> {
  get<K extends MaybeKeyOf<Obj>>(
    key: K,
  ): keyof Obj extends K ? Obj[keyof Obj] | undefined : K extends keyof Obj ? Obj[K] : undefined;
  has<K extends MaybeKeyOf<Obj>>(key: K): keyof Obj extends K ? boolean : K extends keyof Obj ? true : false;
}

export const mapFromObject = <const Obj extends AnyObj>(object: Obj) =>
  new Map(entries(object)) as TypedReadonlyMap<Obj>;

export const mapFromEntries = <const Entries extends AnyEntries>(entries: Entries) =>
  new Map(entries) as TypedReadonlyMap<ObjectFromEntries<Entries>>;

type ToString<T> = T extends string ? T : T extends number | bigint | boolean | null | undefined ? `${T}` : T & string;
type Join<Sep extends string, T1, T2> = `${ToString<T1>}${Sep}${ToString<T2>}`;
type JoinDeep<Sep extends string, Arr extends unknown[]> = Arr extends []
  ? ""
  : Arr extends [infer T]
    ? ToString<T>
    : Arr extends [infer T, infer T2]
      ? Join<Sep, T, T2>
      : Arr extends [infer T, ...infer Rest]
        ? Join<Sep, T, JoinDeep<Sep, Rest>>
        : string;

export const join = <const Sep extends string, const Arr extends unknown[]>(array: Arr, separator: Sep) =>
  array.join(separator) as JoinDeep<Sep, Arr>;

type Split<Sep extends string, Str extends string> = Str extends `${infer T1}${Sep}${infer T2}`
  ? [T1, ...Split<Sep, T2>]
  : [Str];

export const split = <const Sep extends string, const Str extends string>(string: Str, separator: Sep) =>
  string.split(separator) as Split<Sep, Str>;

export const lowerCase = <Str extends string>(string: Str) => string.toLowerCase() as Lowercase<Str>;
export const upperCase = <Str extends string>(string: Str) => string.toUpperCase() as Uppercase<Str>;
