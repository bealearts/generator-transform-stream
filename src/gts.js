import { Readable, PassThrough } from 'stream';
import duplexify from 'duplexify';

export default function gts(func, options) {
  const inputStream = new PassThrough({
    ...options
  });

  const outputStream = Readable.from(func(inputStream));

  const transformStream = duplexify(inputStream, outputStream);

  return transformStream;
}
