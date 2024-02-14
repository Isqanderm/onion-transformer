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
    return (sourceFile: ts.SourceFile) => {
      function visit(node: ts.Node): ts.Node {
        if (ts.isDecorator(node) && isIncludeDecorators(node)) {
          let className: string | null = null;

          node.parent.forEachChild((child) => {
            if (ts.isIdentifier(child)) {
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
              if (ts.isConstructorDeclaration(child)) {
                child.forEachChild((parameter) => {
                  if (ts.isParameter(parameter)) {
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
                        const message = `Dependency with the key "${injectNameValue}" and type "${injectType}" does not match the type in the dependency container.`;
                        const diagnostic: ts.DiagnosticWithLocation = {
                          category: ts.DiagnosticCategory.Error,
                          code: "(onion)" as any,
                          file: sourceFile,
                          start: parameter.getStart(),
                          length: parameter.getWidth(),
                          messageText: message,
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

        if (ts.isDecorator(node) && isInjectDecorator(node)) {
          let className = (node.parent as ts.ParameterDeclaration)?.type?.getText()

          if (className) {
            return addFieldToDecoratorArgument(
              node as ts.Decorator,
              "name",
              className,
            );
          }
        }

        return ts.visitEachChild(node, visit, context);
      }

      const result = ts.visitNode(sourceFile, visit);

      const container = runContext.container;
      runContext.dependency.forEach((dependency, key) => {
        dependency.forEach((injectNotation) => {
          const containerNotation = container.get(injectNotation.name);

          if (
            containerNotation?.type &&
            containerNotation?.type !== injectNotation.type &&
            !extras.diagnostics.length
          ) {
            extras.addDiagnostic(
              injectNotation.diagnostic,
            );
          }
        });

        runContext.dependency.delete(key);
      });

      return result;
    };
  };
}
