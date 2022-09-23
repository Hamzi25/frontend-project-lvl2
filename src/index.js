import process from 'process';
import { resolve } from 'path';
import fs from 'node:fs';
import _ from 'lodash';
import parse from './parsers.js';
import diffToString from './formatters/index.js';
import buildDiff from './buildNewTree.js';

const getFixturePath = (filepath) => resolve(process.cwd(), filepath);

const parseFileAsString = (filePath) => fs.readFileSync(getFixturePath(filePath), 'utf8');

const getExtension = (filePath) => _.last(filePath.split('.')).toLowerCase();

const getData = (filepath) => parse(parseFileAsString(filepath), getExtension(filepath));

const genDiff = (filePath1, filePath2, outputFormat = 'stylish') => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);

  const diff = buildDiff(data1, data2);

  return diffToString(diff, outputFormat);
};

export default genDiff;