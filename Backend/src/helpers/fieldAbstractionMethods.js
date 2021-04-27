module.exports = { // Function names must be same as field_name
  Age: (ageCondition, dob) => {
    if (!isNaN(dob)) {
      return dob >= parseInt(ageCondition);
    }
    var today = new Date();
    var birthDate = new Date(dob);
    var actualAge = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      actualAge--;
    }
    return actualAge >= parseInt(ageCondition);
  },
};
