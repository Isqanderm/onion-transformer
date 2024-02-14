import * as ts from "typescript";

export enum DecoratorTypes {
  "Application" = "Application",
  "Infrastructure" = "Infrastructure",
  "Repository" = "Repository",
  "Service" = "Service",
}

export enum InjectDecoratorTypes {
  Inject = "Inject",
}

export type RunContext = {
  container: Map<string, NotationMetadata<DecoratorTypes>>;
  dependency: Map<string, DependenceNotationMetadata<InjectDecoratorTypes>[]>;
};

export type NotationMetadata<N> = {
  name: string;
  type: string;
  notation: N;
};

export type DependenceNotationMetadata<N> = NotationMetadata<N> & {
  className: string;
  diagnostic: ts.DiagnosticWithLocation,
}

export type Callback<T> = (node: T) => T | void;
