
const { generateAutoIncrementalId, checkUserExistance } = require('../users/user');
const db = require('../db');
const {User} = require('../users/user');



function Post() { }

function checkIfPostExist(postId) {
    let userIndex = 0;
    return typeof postId === 'number' ?
        db.post.findIndex(eachObject => eachObject.id === postId)
        : "Invalid credentals";
}

Post.methods = {
    createNewPost: function (email, password, post) {
        this.post = post, claps = 0, newDate = new Date(), getUserId = null;
        let timeOfPost = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
        let dateOfPost = newDate.getDay() + "-" + newDate.getMonth() + "-" + newDate.getFullYear();
        let status = 'publish', id = generateAutoIncrementalId('post');
        let foundUser = checkUserExistance(email, password);
        foundUser !== -1 ? getUserId = db.users[foundUser].id : 'User not found, please signup and try again';
        let newPost = { id: id, user_id: getUserId, post: post, date: dateOfPost, time: timeOfPost, claps: claps };
        return typeof getUserId === 'number' ? db.post.push(newPost) : 'User not found, please signup and try again';
    },
    readPostById: function (email, password, postId) {
        let foundUser = checkUserExistance(email, password);
        let foundPost = checkIfPostExist(postId);
        return foundPost !== -1 && foundUser !== -1 ? db.post[foundPost] : 'User not found / Post does not exist';
    },
    readAllPost: function (email, password) {
        let foundUser = checkUserExistance(email, password);
        if (foundUser === -1) {
            return 'User does not exist, login to Delete a Post';
        }
        let userId = db.users[foundUser].id;
        let allFoundPostForAUser = db.post.filter(eachOnject => eachOnject.user_id === userId);
        return foundUser !== -1 ? allFoundPostForAUser : 'User not found / Post does not exist';
    },
    deletePostById: function (email, password, postId) {
        let foundUser = checkUserExistance(email, password);
        if (foundUser === -1) {
            return 'User does not exist, login to Delete a Post';
        }
        let foundPost = checkIfPostExist(postId);
        if (foundPost === -1 || foundPost === 'Invalid credentals') {
            return 'Post does not exist';
        }
        return foundPost !== -1 && foundUser !== undefined ? db.post.splice(foundPost, 1) : 'User not found / Post does not exist';
    },
    deleteAllPost: function (email, password) {
        let foundUser = checkUserExistance(email, password);
        if (foundUser === -1) {
            return 'User does not exist, login to Delete a Post';
        }
        let userId = db.users[foundUser].id;
        let i = null;
        for (i = 0; i < db.post.length;) {
            if (db.post[i].user_id === userId) {
                db.post.splice(i, 1);
                continue;
            }
            i++;
        }
        return 'Delete all Post sucessfully';
    },
    commentPost: function (email, password, postId, comment) {
        let foundUser = checkUserExistance(email, password);
        let newDate = new Date();
        let timeOfComment = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
        let dateOfComment = newDate.getDay() + "-" + newDate.getMonth() + "-" + newDate.getFullYear();
        if (foundUser === -1) {
            return 'User does not exist, login to Comment a Post';
        }
        let foundPost = checkIfPostExist(postId);
        if (foundPost === -1 || foundPost === 'Invalid credentals') {
            return 'Post does not exist';
        }
        let postToCommentId = db.post[foundPost].id;
        let userId = db.users[foundUser].id;
        let id = generateAutoIncrementalId('comment');
        return foundPost !== -1 ? db.comment.push({ id: id, postId: postToCommentId, userId: userId, comment: comment, dateOfComment: dateOfComment, timeOfComment: timeOfComment }) : 'Post do not exist';
    },
    clapForAPost: function (email, password, postId) {
        let foundUser = checkUserExistance(email, password);
        if (foundUser === -1) {
            return 'User does not exist, login to clap a Post';
        }
        let foundPost = checkIfPostExist(postId);
        if (foundPost === -1 || foundPost === 'Invalid credentals' || foundPost === undefined) {
            return 'Post does not exist';
        }
        db.post[foundPost].claps++;
        return 'You just clap a Post!';
    },
}

module.exports = Post.methods;