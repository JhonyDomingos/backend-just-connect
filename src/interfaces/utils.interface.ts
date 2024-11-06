import type { PrismaClient } from "@prisma/client";

type FilterNotStartingWith<T, K extends string> = T extends
  | `${K}${infer _X}`
  | symbol
  ? never
  : T;

type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (
  x: infer I
) => void
  ? I
  : never;

type PrismaClientKeys = FilterNotStartingWith<keyof PrismaClient, "$">;
type PrismaClientGeneric = UnionToIntersection<PrismaClient[PrismaClientKeys]>;

type DynamicParamsIdFinder = {
  searchKey: string;
  error: string;
  model: PrismaClientKeys;
};

export { DynamicParamsIdFinder, PrismaClientGeneric };