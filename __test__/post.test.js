const Post = require('../post/post');
const { User } = require('../users/user');
const db = require('../db');

describe('Test Post methods', function () {

    test('create post no data passed', function () {
        let newUser = new User('joe', 'joe@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        let newPost = Post.createNewPost();
        expect(newPost).toBe('User not found, please signup and try again');
    });

    test('create post with correct data', function () {
        let newUser = new User('joe', 'joe@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        let newPost = Post.createNewPost('joe@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        expect(newPost).toBe(1);
    });

    test('create post with wrong data', function () {
        let newUser = new User('joe', 'jo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        let newPost = Post.createNewPost('kolo@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        expect(newPost).toBe('User not found, please signup and try again');
    });
});


describe('Test Read Post Methods', function () {
    test('view single post with no data passed', function () {
        let newUser = new User('joe', 'jo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        let newPost = Post.createNewPost('kolo@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        let readPost = Post.readPostById();
        expect(readPost).toBe('User not found / Post does not exist');
    });

    test('view single post by correct id', function () {
        let newUser = new User('joe', 'jo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        let newPost = Post.createNewPost('kolo@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        let readPost = Post.readPostById('jo@gmail.com', 'passerby', 1);
        expect(readPost).toBeDefined();
    });
});

describe('Test Read All Post Mehtod', function () {
    test('read all post with no user credentials', function () {
        let newUser = new User('joe', 'jo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        Post.createNewPost('koooo@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        Post.createNewPost('joe@gmail.com', 'passerby', 'Goodnews: God is the Almighty!');
        let readPost = Post.readAllPost();
        expect(readPost).toBe('User does not exist, login to Delete a Post');
    });

    test('read all post with correct credentials', function () {
        let newUser = new User('joe', 'jo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        Post.createNewPost('koooo@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        let readPost = Post.readAllPost('joe@gmail.com', 'passerby');
        expect(readPost).toBeDefined();
    });
});


describe('Test Delete Single Post Method', function () {
    test('delete post with no params passed', function () {
        let newUser = new User('joe', 'jo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        Post.createNewPost('koooo@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        let deletePost = Post.deletePostById();
        expect(deletePost).toBe('User does not exist, login to Delete a Post');
    });

    test('delete post with no post id', function () {
        let newUser = new User('joe', 'jo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        Post.createNewPost('koooo@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        let deletePost = Post.deletePostById('joe@gmail.com', 'passerby');
        expect(deletePost).toBe('Post does not exist');
    });

    test('delete post with correct id', function () {
        let newUser = new User('joe', 'jo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        Post.createNewPost('koooo@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        let deletePost = Post.deletePostById('joe@gmail.com', 'passerby', 2);
        expect(deletePost).toBeDefined();
    });
});


describe('Test Delete All Post Method', function () {
    test('delete post with no params passed', function () {
        let newUser = new User('joe', 'jo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        Post.createNewPost('koooo@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        let deletePost = Post.deleteAllPost();
        expect(deletePost).toBe('User does not exist, login to Delete a Post');
    });

    test('delete post with correct email, and password', function () {
        let newUser = new User('joe', 'jo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        Post.createNewPost('jo@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        Post.createNewPost('jo@gmail.com', 'passerby', 'My friends surname!');
        let deletePost = Post.deleteAllPost('jo@gmail.com', 'passerby');
        expect(deletePost).toBe('Delete all Post sucessfully');
    });
});

describe('Test Comment Post Method', function () {
    test('Comment on post with no params passed', function () {
        let newUser = new User('joe', 'koooo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        let newPost = Post.createNewPost('koooo@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        let newComment = Post.commentPost();
        expect(newComment).toBe('User does not exist, login to Comment a Post');
    });

    test('Comment on post with email and password', function () {
        let newUser = new User('joe', 'koooo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        let newPost = Post.createNewPost('koooo@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        let newComment = Post.commentPost('joe@gmail.com', 'passerby');
        expect(newComment).toBe('Post does not exist');
    });

    test('Comment on post with email and password, post id and comment text', function () {
        let newUser = new User('joe', 'koooo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        let newPost = Post.createNewPost('koooo@gmail.com', 'passerby', 'Goodnews: Christ is risen!');
        let newComment = Post.commentPost('joe@gmail.com', 'passerby', 4, 'Yes, he is the Almighty God');
        expect(newComment).toBe(1);
    });
});

describe('Test Clap For A Post Method', function () {
    test('clap for a post with no params passed', function () {
        let newUser = new User('joe', 'koooo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        let newPost = Post.createNewPost('koooo@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        let clapForPost = Post.clapForAPost();
        expect(clapForPost).toBe('User does not exist, login to clap a Post');
    });

    test('clap for a post with no post Id', function () {
        let newUser = new User('joe', 'koooo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        let newPost = Post.createNewPost('koooo@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        let clapForPost = Post.clapForAPost('joe@gmail.com', 'passerby');
        expect(clapForPost).toBe('Post does not exist');
    });

    test('clap for a post with no post Id', function () {
        let newUser = new User('joe', 'koooo@gmail.com', 'passerby', 'user');
        newUser.createNewUser();
        Post.createNewPost('koooo@gmail.com', 'passerby', 'Goodnews: God is Jesus!');
        let ss = Post.clapForAPost('joe@gmail.com', 'passerby', 2);
        expect(ss).toBe('You just clap a Post!');
    });
});