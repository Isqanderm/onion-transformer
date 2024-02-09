export enum DecoratorTypes {
  "Application" = "Application",
  "Infrastructure" = "Infrastructure",
  "Repository" = "Repository",
  "Service" = "Service",
}

export type RunContext = Map<string, NotationMetadata>;

export type NotationMetadata = {
  name: string;
  type: string;
  notation: DecoratorTypes;
};

export type Callback<T> = (node: T) => T | void;
