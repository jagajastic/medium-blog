const Admin = require('../users/admin');
const { User } = require('../users/user');
const db = require('../db');
const Post = require('../post/post');



describe('Tes All Admin methods', function () {
    beforeEach(function () {
        let joe = new User('joe', 'joe@gmail.com', 'password', 'user');
        joe.createNewUser();
        let james = new User('james', 'james@gmail.com', 'password', 'user');
        james.createNewUser();
    });
    test('Test delete all users', function () {
        let admin = new Admin('admin', 'admin@gmail.com', 'password', 'admin');
        admin.createNewAdmin();
        let deleteUsers = admin.deleteAllUser('admin');
        expect(deleteUsers).toBe(0);
    });

    test('Test get all users', function () {
        let admin = new Admin('admin', 'admin@gmail.com', 'password', 'admin');
        admin.createNewAdmin();
        let deleteUsers = admin.getAllUsers('admin');
        expect(deleteUsers).toBeDefined();
    });

    test('Test delete all post', function () {
        let admin = new Admin('admin', 'admin@gmail.com', 'password', 'admin');
        admin.createNewAdmin();
        let deleteUsers = admin.deleteAllPost('admin');
        expect(deleteUsers.length).toBe(0);
    });
});