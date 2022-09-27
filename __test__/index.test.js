import { fileURLToPath } from 'url';
import { dirname, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
console.log(__filename, '////');
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
console.log(getFixturePath, '////');
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
console.log(readFile, '////');

const formats = ['stylish', 'plain', 'json'];

test.each(formats)('JSON file test', (format) => {
  const actual = getDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), format);
  const expected = readFile(`${format}Result.txt`).trim();
  expect(actual).toEqual(expected);
});

test.each(formats)('YAML file test', (format) => {
  const actual = getDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), format);
  const expected = readFile(`${format}Result.txt`).trim();
  expect(actual).toEqual(expected);
});
