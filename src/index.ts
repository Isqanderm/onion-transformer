import * as ts from "typescript";
import type { TransformerExtras, PluginConfig } from "ts-patch";
import { addFieldToDecoratorArgument } from "./utils/addFieldToDecoratorArgument";
import { extractDecoratorName } from "./utils/extractDecoratorName";

const requireDecorators = [
  "Application",
  "Entity",
  "Infrastructure",
  "Repository",
  "Service",
];
const injectClass = "Inject";

const transformers = [
  (program: ts.Program, tsInstance: typeof ts) =>
    (context: ts.TransformationContext) => {
      const { factory } = context;
      return (source: ts.SourceFile): ts.SourceFile => {
        source.statements?.forEach((statement, statementIndex) => {
          if (ts.isClassDeclaration(statement)) {
            statement.modifiers?.forEach((decorator, index) => {
              const name = extractDecoratorName(decorator.getText());
              if (
                ts.isDecorator(decorator) &&
                requireDecorators.indexOf(name) !== -1
              ) {
                // @ts-ignore
                statement.modifiers[index] = addFieldToDecoratorArgument(
                  decorator,
                  "name",
                  statement.name?.getText() as string,
                );
              }
            });

            statement.members?.forEach((Class) => {
              if (ts.isConstructorDeclaration(Class)) {
                // INJECT TO CONSTRUCTOR
                Class.parameters?.forEach((parameter) => {
                  parameter.modifiers?.forEach((decorator, decoratorIndex) => {
                    if (decorator.getText().includes(injectClass)) {
                      // @ts-ignore
                      parameter.modifiers[decoratorIndex] =
                        addFieldToDecoratorArgument(
                          decorator as ts.Decorator,
                          "name",
                          parameter.type?.getText() || "",
                        );
                    }
                  });
                });
              }
            });
          }
        });

        return source;
      };
    },
];

export default function transformer(
  program: ts.Program,
  pluginConfig: PluginConfig,
  { ts: tsInstance }: TransformerExtras,
): ts.TransformerFactory<ts.SourceFile> {
  return (context) => {
    const initializedTransformers = transformers.map((transformer) =>
      transformer(program, tsInstance)(context),
    );

    return (sourceFile) => {
      return initializedTransformers.reduce((source, transformer) => {
        return transformer(source);
      }, sourceFile);
    };
  };
}
