import _ from 'lodash';

const builder = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const arrayUniqKeys = _.sortBy(_.union(keys1, keys2));
  const diff = arrayUniqKeys.map((key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { name: key, value: builder(obj1[key], obj2[key]), type: 'nested' };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return { name: key, value: obj1[key], type: 'unchanged' };
    }
    if (!_.has(obj2, key)) {
      return { name: key, value: obj1[key], type: 'removed' };
    }
    if (!_.has(obj1, key)) {
      return { name: key, value: obj2[key], type: 'added' };
    }
    return { name: key, value1: obj1[key], value2: obj2[key], type: 'updated' };
  });
  return diff;
};

export default builder;
