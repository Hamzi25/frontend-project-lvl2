import _ from 'lodash';

const stringify = (value) => {
  if (_.isNumber(value)) {
    return value;
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (!_.isObject(value)) {
    return `${value}`;
  }
  return '[complex value]';
};

const plain = (item) => {
  const iter = (currentItem, propNames) => {
    const lines = currentItem.map((obj) => {
      const { name, value, type } = obj;
      const currentPropName = [...propNames, name];

      switch (type) {
        case 'added':
          return `Property '${currentPropName.join('.')}' was ${type} with value: ${stringify(value)}`;
        case 'removed':
          return `Property '${currentPropName.join('.')}' was ${type}`;
        case 'updated':
          return `Property '${currentPropName.join('.')}' was ${type}. From ${stringify(obj.value1)} to ${stringify(obj.value2)}`;
        case 'nested':
          return iter(value, currentPropName);
        case 'unchanged':
          return '';
        default:
          throw new Error(`Unexpected "obj.event" = ${type}`);
      }
    });

    return lines.filter((str) => str !== '').join('\n');
  };

  return iter(item, []);
};

export default plain;
