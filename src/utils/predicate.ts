export function predicate<T>(predicate: (node: T) => boolean) {
  return (node: T) => predicate(node);
}

export type Predicate<T> = typeof predicate<T>;
