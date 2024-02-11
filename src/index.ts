import * as ts from "typescript";
import { decoratorTransformer } from "./transformers/decoratorTransformer";
import { parseTypes } from "./transformers/parseTypes";

const transformers = [parseTypes, decoratorTransformer];

export default function transformer(
  program: ts.Program,
  pluginConfig: ts.PluginConfig,
  extras: ts.ProgramTransformerExtras
): ts.TransformerFactory<ts.SourceFile> {
  return (context) => {
    const runContext = new Map();
    const initializedTransformers = transformers.map((transformer) =>
      transformer(program, extras, runContext)(context),
    );

    return (sourceFile) => {
      return initializedTransformers.reduce((source, transformer) => {
        return transformer(source);
      }, sourceFile);
    };
  };
}
