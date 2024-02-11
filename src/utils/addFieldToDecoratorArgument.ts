import * as ts from "typescript";

export function addFieldToDecoratorArgument(
  decorator: ts.Decorator,
  fieldName: string,
  fieldValue: string,
): ts.Decorator | ts.ModifierLike {
  if (!fieldValue || !fieldName) {
    return decorator;
  }

  let newDecorator = decorator;
  decorator.forEachChild((expression) => {
    if (ts.isCallExpression(expression)) {
      let firstArgument: ts.ObjectLiteralExpression | null = null;
      expression.arguments.forEach((argument) => {
        if (!firstArgument) {
          firstArgument = argument as ts.ObjectLiteralExpression;
        }
      });

      if (firstArgument && ts.isObjectLiteralExpression(firstArgument)) {
        const params: any[] = [];
        let hasField = false;
        (firstArgument as ts.Expression).forEachChild((child) => {
          if (child.getText().startsWith(`${fieldName}:`)) {
            hasField = true;
          }
          params.push(child);
        });

        if (!hasField) {
          const objectLiteral = ts.factory.createObjectLiteralExpression([
            ...params,
            ts.factory.createPropertyAssignment(
              fieldName,
              ts.factory.createStringLiteral(fieldValue),
            ),
          ]);

          const newExpression = ts.factory.updateCallExpression(
            expression,
            expression.expression,
            expression.typeArguments,
            [objectLiteral],
          );

          newDecorator = ts.factory.updateDecorator(decorator, newExpression);
        }
      } else {
        const objectLiteral = ts.factory.createObjectLiteralExpression([
          ts.factory.createPropertyAssignment(
            fieldName,
            ts.factory.createStringLiteral(fieldValue),
          ),
        ]);

        const newExpression = ts.factory.updateCallExpression(
          expression,
          expression.expression,
          expression.typeArguments,
          [objectLiteral],
        );

        newDecorator = ts.factory.updateDecorator(decorator, newExpression);
      }
    }
  });

  return newDecorator
}
