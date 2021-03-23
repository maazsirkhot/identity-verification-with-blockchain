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
        && typeof (obj[attribute]) !== 'undefined',
    );
  },
  validateArrayOfObjects: (array, attributes) => {
    if (!_.isArray(array) || !_.isArray(attributes) || _.size(array) === 0) {
      return false;
    }
    let check = true;
    _.forEach(array, (obj) => {
      _.forEach(attributes, (attribute) => {
        if (!_.has(obj, attribute) || obj[attribute] === null || typeof (obj[attribute]) === 'undefined') {
          check = false;
        }
      });
    });
    return check;
  },
};
