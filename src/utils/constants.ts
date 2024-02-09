import { DecoratorTypes } from "./types";

export const requireDecorators = [
  DecoratorTypes.Application,
  DecoratorTypes.Infrastructure,
  DecoratorTypes.Repository,
  DecoratorTypes.Service,
];
export const injectClass = "Inject";
