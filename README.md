# onion-transformer

`onion-transformer` is a TypeScript transformer designed to simplify Dependency Injection (DI) in the Onion architecture. It automatically transforms TypeScript code to make dependency injections simpler and less error-prone.

## Features

- **Automatic DI Metadata Addition:** Simplifies dependency injection by automatically adding necessary metadata.
- **Type safe DI:** Types check on compile type
- **Decorator Support:** Recognizes and processes decorators used for dependency injections.
- **Compatibility:** Designed to work seamlessly with the Onion DI package, ensuring smooth integration.

## Installation

Install `onion-transformer` using npm or yarn:

```bash
npm install onion-transformer --save-dev

# or

yarn add onion-transformer --dev
```

```bash
npx ts-patch install
```

This step modifies the TypeScript compiler to support custom transformers.

## Usage

To use onion-transformer in your project, add it to your TypeScript configuration (usually tsconfig.json) under compilerOptions.plugins:

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "onion-transformer"
      }
    ]
  }
}
```

## Examples

### Before Transformation

```ts
@Service()
class MyService {
  constructor(@Inject() private myOtherService: MyOtherService) {}
}
```

### After Transformation

```ts
@Service({ name: "MyService" })
class MyService {
  constructor(@Inject({ name: "MyOtherService" }) private myOtherService: MyOtherService) {}
}
```

## Development

## Use with Webpack:

You can use custom transformer with ts-loader if you prefer control your environment: https://github.com/TypeStrong/ts-loader?tab=readme-ov-file#getcustomtransformers

## Webpack example:

```ts
import onionTransformer from 'onion-transformer';

...
{
    test: /\.tsx?$/,
    loader: 'ts-loader',
    options: {
        ... // other loader's options
        getCustomTransformers: () => ({ before: [onionTransformer] })
    }
},
...     
```

## For local development and testing:

- git clone https://github.com/Isqanderm/onion-transformer.git
- cd transformer
- npm install
- cd examples
