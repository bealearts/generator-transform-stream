import { pipeline } from 'stream';
import { promisify } from 'util';
import { createReadStream, createWriteStream } from 'fs';

import gts from './gts.js';

const pipe = promisify(pipeline);

test('Passes though chunks', async () => {
  await pipe(
    createReadStream('./test/artifact.json', 'utf8'),
    gts(async function* passthough(input) {
      for await (const chunk of input) {
        yield chunk;
      }
    }),
    createWriteStream('./test/artifact2.json')
  );
});

test('Transforms chunks', async () => {
  await pipe(
    createReadStream('./test/artifact.json', 'utf8'),
    gts(async function* transformChunk(input) {
      for await (const chunk of input) {
        yield chunk.reverse();
      }
    }),
    createWriteStream('./test/artifact.base64')
  );
});

test('Transforms objects', async () => {

});

async function test(name, func) {
  console.info(name);
  await func();
}
