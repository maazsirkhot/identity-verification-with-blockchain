const _ = require('lodash');

module.exports = {
  validateAttributesInObject: (obj, attributes) => {
    if (!_.isArray(attributes) || !_.isPlainObject(obj)) {
      return false;
    }
    return _.every(
      attributes,
      (attribute) => _.has(obj, attribute)
        && obj[attribute] !== null
        && obj[attribute] !== undefined,
    );
  },
};
