import { Readable, PassThrough } from 'stream';
import duplexify from 'duplexify';

export default function gts(func, options) {
  const inputStream = new PassThrough({
    ...options
  });

  const outputStream = Readable.from(func(inputStream), { objectMode: false, ...options });

  const transformStream = duplexify(inputStream, outputStream, { ...options });

  return transformStream;
}
