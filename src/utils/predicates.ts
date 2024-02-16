import * as ts from "typescript";
import { DecoratorTypes } from "./types";
import { predicate } from "./predicate";
import { injectClass, requireDecorators } from "./constants";
import { extractDecoratorName } from "./extractDecoratorName";

export const constructorDeclaration = predicate<ts.ConstructorDeclaration>(
  (node) => ts.isConstructorDeclaration(node),
);

export const isInjectDecorator = predicate<ts.ModifierLike>((node) =>
  node.getText().includes(`@${injectClass}`),
);

export const classDeclaration = predicate<ts.ClassDeclaration>((node) =>
  ts.isClassDeclaration(node),
);

export const isIncludeDecorators = predicate<ts.ModifierLike>((node) => {
  const decoratorName = extractDecoratorName(node.getText());

  return requireDecorators.includes(decoratorName as DecoratorTypes);
});
