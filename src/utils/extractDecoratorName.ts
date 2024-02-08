export function extractDecoratorName(decoratorString: string): string {
  const regex = /@(\w+)\b/;
  const match = decoratorString.match(regex);
  return match ? match[1] : "";
}
