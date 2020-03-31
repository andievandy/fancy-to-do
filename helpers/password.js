const bcrypt = require('bcryptjs');
const hashSalt = 10;

function hashPassword(password) {
    return bcrypt.hashSync(password, hashSalt);
}

function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = { hashPassword, comparePassword };