const bcrypt = require('bcryptjs');
const hashSalt = 10;

function hashPassword(password) {
    return bcrypt.hashSync(password, hashSalt);
}

function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = { hashPassword, checkPassword };