const _ = require('lodash');
const dateAdder = require('date-fns/add');

const calculateAgeForBirthDate = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
};

module.exports = {
  validateAttributesInObject:
  (obj, attributes) => {
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
  /**
   *
   * @param { // Values are representational
        years: 2,
        months: 9,
        weeks: 1,
        days: 7,
        hours: 5,
        minutes: 9,
        seconds: 30,
      } adder
   * @returns Date
   */
  timestampAdderToCurrentTime: (adder) => {
    if (!_.isPlainObject(adder)) {
      return false;
    }

    return dateAdder(Date.now(), adder);
  },
  addAgeFieldToUserFields: (dataField) => {
    if (!_.isArray(dataField)) {
      return dataField;
    }
    const birthDate = _.find(dataField, (entry) => entry.field_name === 'Date of Birth');

    if (typeof birthDate === 'undefined') {
      return dataField;
    }

    dataField.push({
      field_id: birthDate.field_id,
      field_name: 'Age',
      field_value: calculateAgeForBirthDate(birthDate.field_value),
      dataReference: birthDate.dataReference,
      isVerified: true,
      isCurrent: true,
      verifierDoc: birthDate.verifierDoc,
    });

    return dataField;
  },
};
