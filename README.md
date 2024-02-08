# @onion/transformer

`@onion/transformer` is a TypeScript transformer designed to simplify Dependency Injection (DI) in the Onion architecture. It automatically transforms TypeScript code to make dependency injections simpler and less error-prone.

## Features

- **Automatic DI Metadata Addition:** Simplifies dependency injection by automatically adding necessary metadata.
- **Decorator Support:** Recognizes and processes decorators used for dependency injections.
- **Compatibility:** Designed to work seamlessly with the Onion DI package, ensuring smooth integration.

## Installation

Install `@onion/transformer` using npm or yarn:

```bash
npm install @onion/transformer --save-dev

# or

yarn add @onion/transformer --dev
```

```bash
npx ts-patch install
```

This step modifies the TypeScript compiler to support custom transformers.

## Usage

To use @onion/transformer in your project, add it to your TypeScript configuration (usually tsconfig.json) under compilerOptions.plugins:

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "@onion/transformer"
      }
    ]
  }
}
```

## Examples

### Before Transformation
```ts
@Entity()
class MyEntity {
  constructor(@Inject() private myService: MyService) {}
}
```

### After Transformation
```ts
@Entity({ name: "MyEntity" })
class MyEntity {
  constructor(@Inject({ name: "MyService" }) private myService: MyService) {}
}
```

## Development
For local development and testing:

git clone https://example.com/onion/transformer.git
cd transformer
npm install
npm run example
