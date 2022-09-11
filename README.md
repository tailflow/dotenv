# .env File Entries Manager

This package allows you to easily manage `.env` file entries in a type-safe manner.

## Installation

```bash
npm install @tailflow/dotenv

# or

yarn add @tailflow/dotenv
```

## Usage

```ts

let dotEnv = new DotEnv(`EXAMPLE_NUMBER_FIELD=123`);

// retrieving 
const exampleNumberEntry = dotEnv.get<number>('EXAMPLE_NUMBER_FIELD');

console.log(exampleNumberEntry.key); // string ("EXAMPLE_NUMBER_FIELD")
console.log(exampleNumberEntry.value); // number (123)
console.log(exampleNumberEntry.comment); // undefined

// setting values and comments
dotEnv.set('EXAMPLE_NUMBER_FIELD', 456);
dotEnv.setComment('EXAMPLE_NUMBER_FIELD', 'Example comment');

dotEnv.set('NEW_FIELD', 'test');

// formatting entries to string
console.log(dotEnv.toString()); // "EXAMPLE_NUMBER_FIELD=456 # Example comment\nNEWFIELD=test"
```
