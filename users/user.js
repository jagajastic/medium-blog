const db = require('../db');

function User(name, email, password, type) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
}

function generateAutoIncrementalId(type) {
    let id = db[type].length ? db[type][db[type].length - 1].id + 1 : 1;
    return id;
}

function checkUserExistance(email, password) {
    let findUserInfo = db.users.findIndex(eachObject =>
        eachObject.email === email && eachObject.password === password);
    return findUserInfo;
}

function updateInformation(user_id) {
    let userIndex = 0;
    return typeof user_id === 'number' ?
        db.users.findIndex(eachObject => eachObject.id === user_id)
        : "Invalid credentals";
}

User.prototype = {
    constructor: User,
    createNewUser: function () {
        let id = generateAutoIncrementalId('users');
        return (typeof this.type === 'string' && this.type === 'user') ?
            db.users.push({ id: id, name: this.name, email: this.email, password: this.password }) : 'Invalid credentials';
    },
    createNewAdmin: function () {
        let id = generateAutoIncrementalId('admin');
        return db.admin.push({ id: id, name: this.name, email: this.email, password: this.password });
    },
    loginUser: function (email, password) {
        let foundUser = checkUserExistance(email, password);
        return foundUser !== -1 ? db.users[foundUser] : "User not found, please signup and try again";
    },
    updateUserInfo: function (user_id, user_data) {
        let returnValue = updateInformation(user_id);
        return returnValue !== -1 && typeof returnValue !== 'string' ?
            db.users[returnValue] = user_data : "User does not exist / Invalid credentials";
    },
    deleteUserAccount: function (user_email, user_password) {
        let findUser = checkUserExistance(user_email, user_password);
        return (findUser !== -1) ?
            db.users.splice(findUser, 1) ? 'Account Deleted successfully' : 'something went wrong' : 'User do not exist';
    }

}

module.exports = { User, generateAutoIncrementalId, updateInformation, checkUserExistance, updateInformation };