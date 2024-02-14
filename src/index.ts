import * as ts from "typescript";
import {
  DecoratorTypes,
  InjectDecoratorTypes,
  RunContext,
} from "./utils/types";
import { isIncludeDecorators, isInjectDecorator } from "./utils/predicates";
import { addFieldToDecoratorArgument } from "./utils/addFieldToDecoratorArgument";
import { getDecoratorValueParam } from "./utils/getDecoratorValueParam";
import { extractDecoratorName } from "./utils/extractDecoratorName";

const runContext: RunContext = {
  container: new Map(),
  dependency: new Map(),
};

export default function transformer(
  program: ts.Program,
  pluginConfig: ts.PluginConfig,
  extras: ts.ProgramTransformerExtras & ts.TransformerExtras,
) {
  return (context: ts.TransformationContext & ts.TransformerExtras) => {
    const addDiagnostic = extras.addDiagnostic || context.addDiagnostic;
    return (sourceFile: ts.SourceFile) => {
      function visit(node: ts.Node): ts.Node {
        if (extras.ts.isDecorator(node) && isIncludeDecorators(node)) {
          let className: string | null = null;

          node.parent.forEachChild((child) => {
            if (extras.ts.isIdentifier(child)) {
              className = child.text;
            }
          });

          if (className) {
            const decoratorNameField = getDecoratorValueParam(
              node as ts.Decorator,
              "name",
            );
            const notation = extractDecoratorName(
              node.getText(),
            ) as DecoratorTypes;

            runContext.container.set(className, {
              name: decoratorNameField || className,
              type: className,
              notation,
            });

            node.parent.forEachChild((child) => {
              if (extras.ts.isConstructorDeclaration(child)) {
                child.forEachChild((parameter) => {
                  if (extras.ts.isParameter(parameter)) {
                    parameter.forEachChild((modifier) => {
                      if (!isInjectDecorator(modifier as ts.ModifierLike)) {
                        return;
                      }

                      const injectType = parameter.type?.getText();

                      if (injectType && className) {
                        const injectNameValue =
                          getDecoratorValueParam(
                            modifier as ts.Decorator,
                            "name",
                          ) || injectType;
                        const notationName = extractDecoratorName(
                          modifier.getText(),
                        ) as InjectDecoratorTypes;
                        const dependency = [];
                        const sourceFile = node.getSourceFile();
                        const { line, character } =
                          sourceFile.getLineAndCharacterOfPosition(
                            modifier.getStart(),
                          );
                        const message = `Dependency with the key "${injectNameValue}" and type "${injectType}" does not match the type in the dependency container.`;
                        const errorMessage = `${sourceFile.fileName}:${line + 1}:${character + 1}: ${message}`;
                        const diagnostic: ts.DiagnosticWithLocation = {
                          category: ts.DiagnosticCategory.Error,
                          code: 2552,
                          file: sourceFile.getSourceFile(),
                          start: parameter.getStart(),
                          length: parameter.getWidth(),
                          messageText: errorMessage,
                          source: "onion-transformer",
                        };

                        dependency.push({
                          name: injectNameValue,
                          type: injectType,
                          notation: notationName,
                          className: className,
                          diagnostic
                        });

                        runContext.dependency.set(className, dependency);
                      }
                    });
                  }
                });
              }
            });

            return addFieldToDecoratorArgument(
              node as ts.Decorator,
              "name",
              className,
            );
          }
        }
        if (extras.ts.isDecorator(node) && isInjectDecorator(node)) {
          let className = node.parent.name?.getText();

          if (className) {
            return addFieldToDecoratorArgument(
              node as ts.Decorator,
              "name",
              className,
            );
          }
        }

        return extras.ts.visitEachChild(node, visit, context);
      }

      const result = extras.ts.visitNode(sourceFile, visit);

      const container = runContext.container;
      runContext.dependency.forEach((dependency) => {
        dependency.forEach((injectNotation) => {
          const containerNotation = container.get(injectNotation.name);

          if (
            containerNotation?.type &&
            containerNotation?.type !== injectNotation.type
          ) {
            addDiagnostic(
              injectNotation.diagnostic,
            );
          }
        });
      });

      return result;
    };
  };
}
