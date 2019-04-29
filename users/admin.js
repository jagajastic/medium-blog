const db = require('../db');
const { User, generateAutoIncrementalId } = require('./user');
const Post = require('../post/post');

function Admin(name, email, password, type) {
    User.call(this, name, email, password, type)
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

// check if is admin
function isAdmin(userType) {
    return userType === 'admin' ? true : false;
}

Admin.prototype.deleteAllUser = function (userType) {
    return isAdmin(userType) ? (db.users.length = 0, db.comment.length = 0) : 'Only Admin access!';
};

Admin.prototype.getAllUsers = function (userType) {
    return isAdmin(userType) ? db.users : 'Ivalid credentials'
}

Admin.prototype.deleteAllPost = function (userType) {
    return isAdmin(userType) ? db.post = [] : 'Only Admin access!';
};


module.exports = Admin;

