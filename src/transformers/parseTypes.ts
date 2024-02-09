import * as ts from "typescript";
import { extractDecoratorName } from "../utils/extractDecoratorName";
import { requireDecorators } from "../utils/constants";
import { predicate } from "../utils/predicate";
import { actionByPredicate } from "../utils/actionByPredicate";
import { DecoratorTypes, RunContext } from "../utils/types";
import { getDecoratorValueParam } from "../utils/getDecoratorValueParam";

const classDeclaration = predicate<ts.ClassDeclaration>((node) =>
  ts.isClassDeclaration(node),
);
const isIncludeDecorators = predicate<ts.ModifierLike>((node) => {
  const decoratorName = extractDecoratorName(node.getText()) as DecoratorTypes;

  return requireDecorators.includes(decoratorName);
});

export const parseTypes =
  (
    program: ts.Program,
    extras: ts.ProgramTransformerExtras,
    runContext: RunContext,
  ) =>
  (context: ts.TransformationContext) => {
    const collectDecoratorTypes = actionByPredicate<ts.ClassDeclaration>(
      classDeclaration,
      (classNode) => {
        ts.visitNodes<ts.ModifierLike>(classNode.modifiers, (modifier) => {
          if (!isIncludeDecorators(modifier)) {
            return modifier;
          }

          const decoratorNameField = getDecoratorValueParam(
            modifier as ts.Decorator,
            "name",
          );
          const name = decoratorNameField || (classNode.name?.text as string);
          const type = classNode.name?.text as string;
          const notation = extractDecoratorName(
            modifier.getText(),
          ) as DecoratorTypes;

          runContext.set(name, {
            name,
            type,
            notation,
          });
        });
      },
    );

    const visitor: ts.Visitor = (node: ts.Node): ts.Node => {
      collectDecoratorTypes(node as any);

      return ts.visitEachChild(node, visitor, context);
    };

    return (source: ts.SourceFile): ts.SourceFile => {
      ts.visitNode(source, visitor);
      return source;
    };
  };
