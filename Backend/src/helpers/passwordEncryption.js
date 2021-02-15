const bcrypt = require('bcrypt');

const crypt = {};
const saltRounds = 10;

crypt.createHash = async (data) => {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(data, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedPassword;
};

crypt.compareHash = async (data, encrypted) => {
  const checkHash = await bcrypt.compare(data, encrypted);
  if (checkHash) return true;
  return false;
};

module.exports = crypt;
