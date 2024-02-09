import type { Callback } from "./types";
import type { Predicate } from "./predicate";

export function actionByPredicate<T>(
  predicate: ReturnType<Predicate<T>>,
  cb: Callback<T>,
): (node: T) => T | void {
  return function (node: T): T | void {
    return predicate(node) ? cb(node) : node;
  };
}
