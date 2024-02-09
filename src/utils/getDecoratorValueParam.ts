import * as ts from "typescript";

const regexp = /"([^"]*)"/;
export function getDecoratorValueParam(
  decorator: ts.Decorator,
  fieldName: string,
): string | null {
  if (!fieldName) {
    return null;
  }

  let fieldValue = null;
  decorator.forEachChild((expression) => {
    if (ts.isCallExpression(expression)) {
      let firstArgument: ts.ObjectLiteralExpression | null = null;
      expression.arguments.forEach((argument) => {
        if (!firstArgument) {
          firstArgument = argument as ts.ObjectLiteralExpression;
        }
      });

      if (firstArgument && ts.isObjectLiteralExpression(firstArgument)) {
        let hasName = false;
        (firstArgument as ts.Expression).forEachChild((child) => {
          if (child.getText().startsWith(`${fieldName}:`)) {
            fieldValue = child.getText().split(":")[1];

            const match = fieldValue.match(regexp);

            if (match) {
              fieldValue = match[1];
            }
          }
        });
      }
    }
  });

  return fieldValue;
}
