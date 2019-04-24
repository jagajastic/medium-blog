const { User }  = require('../user/user');
const db = require('../db');

describe('Test Create User method', function(){
    test('Create user with correct data', function(){
        let newUser = new User('joe', 'joe@gmail.com', 'passerby', 'user');
        expect(newUser.createNewUser()).toBe(1);
    });

    test('Create user with wrong data', function(){
        let newUser = new User('k', 'passerby', 'user');
        expect(newUser.createNewUser()).toBe('Invalid credentials');
    });
});


describe('Test Login user method', function(){
    test('login with correct data', function(){
        let newUser = new User('kale', 'kale@gmail.com', 'password', 'user');
        newUser.createNewUser();
        let logUser = newUser.loginUser('kale@gmail.com', 'password');
        expect(logUser).toBeDefined();
    });

    test('login with wrong data', function(){
        let newUser = new User('kalo', 'kalo@gmail.com', 'password', 'user');
        newUser.createNewUser();
        let logUser = newUser.loginUser('kosi@gmail.com', 'password');
        expect(logUser).toBe('User not found, please signup and try again');
    });
   
});

describe('Test Update user method', function(){
    test('update with correct data', function(){
        let newUser = new User('kale', 'kale@gmail.com', 'password', 'user');
        newUser.createNewUser();
        let logUser = newUser.updateUserInfo(1, {id: 1, name:'kalokalo', email: 'kalokalo@gmail.com', password: 'password'});
        expect(logUser).toBeDefined();
    });

    test('update with wrong id', function(){
        let newUser = new User('kale', 'kale@gmail.com', 'password', 'user');
        newUser.createNewUser();
        let logUser = newUser.updateUserInfo(15, {id: 1, name:'kalokalo', email: 'kalokalo@gmail.com', password: 'password'});
        expect(logUser).toBe('User does not exist / Invalid credentials');
    });
   
    test('update with string id', function(){
        let newUser = new User('kale', 'kale@gmail.com', 'password', 'user');
        newUser.createNewUser();
        let logUser = newUser.updateUserInfo('15', {id: 1, name:'kalokalo', email: 'kalokalo@gmail.com', password: 'password'});
        expect(logUser).toBe('User does not exist / Invalid credentials');
    });

});



describe('Test Delete user Account method', function(){
    test('delete with correct data', function(){
        let newUser = new User('kale', 'kale@gmail.com', 'password', 'user');
        newUser.createNewUser();
        let logUser = newUser.deleteUserAccount('kale@gmail.com', 'password');
        expect(logUser).toBe('Account Deleted successfully');
    });

    test('delete with wrong user data', function(){
        let newUser = new User('kale', 'kale@gmail.com', 'password', 'user');
        newUser.createNewUser();
        let logUser = newUser.deleteUserAccount('ke@gmail.com', 'pasword');
        expect(logUser).toBe('User do not exist');
    });
   
    // test('update with string id', function(){
    //     let newUser = new User('kale', 'kale@gmail.com', 'password', 'user');
    //     newUser.createNewUser();
    //     let logUser = newUser.updateUserInfo('15', {id: 1, name:'kalokalo', email: 'kalokalo@gmail.com', password: 'password'});
    //     expect(logUser).toBe('User does not exist / Invalid credentials');
    // });

});