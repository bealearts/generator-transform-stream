# generator-transform-stream ![Build and Test](https://github.com/bealearts/generator-transform-stream/workflows/Build%20and%20Test/badge.svg)

Create a transform stream using an async generator

# Install
```shell
npm i -D generator-transform-stream
```

# Usage

```js
import fs from 'fs';
import { pipeline } from 'stream';
import gts from 'generator-transform-stream';

pipeline(
  fs.createReadStream('input.txt', 'utf8'),
  gts(async function* transform(input) {
    for await (const chunk of input) {
      yield chunk.toUpperCase();
    }
  }),
  fs.createWriteStream('output.txt')
);
```


# Development

## Run
```shell
npm start
```

## Build
```shell
npm test
```

# Publish
```shell
npm version patch|minor|major
git push --follow-tags
```
