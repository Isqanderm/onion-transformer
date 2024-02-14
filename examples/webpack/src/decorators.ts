export function Service(params?: { name?: string }) {
  return function (target: Function) {};
}

export function Inject(params?: { name?: string }) {
  return function (
    target: Object,
    propertyKey?: string | symbol,
    parameterIndex?: number,
  ) {};
}
