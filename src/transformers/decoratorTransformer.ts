import * as ts from "typescript";
import { addFieldToDecoratorArgument } from "../utils/addFieldToDecoratorArgument";
import { actionByPredicate } from "../utils/actionByPredicate";
import {
  classDeclaration,
  constructorDeclaration,
  isInjectDecorator,
  isIncludeDecorators,
} from "../utils/predicates";
import { RunContext } from "../utils/types";
import { getDecoratorValueParam } from "../utils/getDecoratorValueParam";

export const decoratorTransformer =
  (
    program: ts.Program,
    extras: ts.ProgramTransformerExtras,
    runContext: RunContext,
  ) =>
  (context: ts.TransformationContext) => {
    const addToDecorators = actionByPredicate<ts.ClassDeclaration>(
      classDeclaration,
      (classNode) => {
        // @ts-ignore
        classNode.modifiers = ts.visitNodes<ts.ModifierLike>(
          classNode.modifiers,
          (modifier) => {
            if (!isIncludeDecorators(modifier)) {
              return modifier;
            }

            return addFieldToDecoratorArgument(
              modifier as ts.Decorator,
              "name",
              classNode.name?.text as string,
            );
          },
        );
      },
    );

    const addToInjectDecorators = actionByPredicate(
      constructorDeclaration,
      (classNode) => {
        // @ts-ignore
        classNode.parameters = ts.visitNodes<ts.ParameterDeclaration>(
          classNode.parameters,
          (parameter) => {
            parameter.modifiers = ts.visitNodes<ts.ModifierLike>(
              parameter.modifiers,
              (modifier) => {
                if (isInjectDecorator(modifier)) {
                  const injectType = parameter.type?.getText() as string;
                  const injectNameValue =
                    getDecoratorValueParam(modifier as ts.Decorator, "name") ||
                    injectType;
                  const typeMetadata = runContext.get(injectNameValue);

                  if (typeMetadata) {
                    if (typeMetadata.type !== injectType) {
                      const sourceFile = modifier.getSourceFile();
                      const { line, character } =
                        sourceFile.getLineAndCharacterOfPosition(
                          modifier.getStart(),
                        );
                      const message = `Dependency with the key "${injectType}" and type "${injectType}" does not match the types "${typeMetadata.type}" and key "${typeMetadata.name}" in the dependency container.`;
                      const errorMessage = `${sourceFile.fileName}:${line + 1}:${character + 1}: ${message}`;
                      const diagnostic: ts.DiagnosticWithLocation = {
                        category: ts.DiagnosticCategory.Error,
                        code: 666,
                        file: parameter.getSourceFile(),
                        start: parameter.getStart(),
                        length: parameter.getWidth(),
                        messageText: errorMessage,
                        source: "onion-transformer",
                      };

                      (extras as any as ts.TransformerExtras).addDiagnostic(
                        diagnostic,
                      );
                    }
                  }

                  return addFieldToDecoratorArgument(
                    modifier as ts.Decorator,
                    "name",
                    parameter.type?.getText() as string,
                  );
                }

                return modifier;
              },
            );

            return parameter;
          },
        );
      },
    );

    const visitor: ts.Visitor = (node: ts.Node): ts.Node => {
      addToDecorators(node as any);
      addToInjectDecorators(node as any);

      return ts.visitEachChild(node, visitor, context);
    };

    return (source: ts.SourceFile): ts.SourceFile => {
      ts.visitNode(source, visitor);

      return source;
    };
  };
