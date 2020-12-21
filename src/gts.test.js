import { pipeline } from 'stream';
import { promisify } from 'util';
import streamtest from 'streamtest';
import { strict as assert } from 'assert';

import gts from './gts.js';

const { v2 } = streamtest;
const {
  fromChunks, fromObjects, toText, toObjects
} = v2;

const pipe = promisify(pipeline);

test('Passes though chunks', async () => {
  const data = ['first', 'second', 'third'];
  await pipe(
    fromChunks(data),
    gts(async function* passthoughChun(input) {
      for await (const chunk of input) {
        yield chunk;
      }
    }),
    toText((error, result) => assert.equal(result, 'firstsecondthird'))
  );
});

test('Transforms chunks', async () => {
  const data = ['first', 'second', 'third'];
  await pipe(
    fromChunks(data),
    gts(async function* transformChunk(input) {
      for await (const chunk of input) {
        const text = chunk.reverse().toString('utf8');
        yield text;
      }
    }),
    toText((error, result) => assert.equal(result, 'tsrifdnocesdriht'))
  );
});

test('Passes through objects', async () => {
  const data = [{ name: 'first' }, { name: 'second' }, { name: 'third' }];
  await pipe(
    fromObjects(data),
    gts(async function* passthoughObject(input) {
      for await (const obj of input) {
        yield obj;
      }
    }, {
      objectMode: true
    }),
    toObjects((error, result) => assert.deepEqual(result, data))
  );
});

test('Transforms objects', async () => {
  const data = [{ name: 'first' }, { name: 'second' }, { name: 'third' }];
  await pipe(
    fromObjects(data),
    gts(async function* passthoughObject(input) {
      for await (const obj of input) {
        yield [obj.name];
      }
    }, {
      objectMode: true
    }),
    toObjects((error, result) => assert.deepEqual(result, [['first'], ['second'], ['third']]))
  );
});

async function test(name, func) {
  console.info(name); // eslint-disable-line
  await func();
}
