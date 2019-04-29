const { User }  = require('./users/user');
const Admin = require('./users/admin');
const db = require('./db');
const Post =  require('./post/post');



let ja = new User('ja', 'ja@gmail.com', 'passerby', 'user');
ja.createNewUser();

let newAdmin = new Admin('joe', 'joe@gmail.com', 'passerby', 'user');
console.log(newAdmin.createNewAdmin());
console.log(db);
console.log(Post.createNewPost('ja@gmail.com', 'passerby', 'Goodnews: God is Jesus!'));
console.log(Post.createNewPost('ja@gmail.com', 'passerby', 'Goodnews: God is Jesus and Jesus is God!'));
console.log(Post.createNewPost('ja@gmail.com', 'passerby', 'Goodnews: God is Jesus!'));

console.log(Post.readAllPost('ja@gmail.com', 'passerby'));

console.log(Post.readPostById('ja@gmail.com', 'passerby', 1));

Post.deletePostById('ja@gmail.com', 'passerby', 2);

console.log(db.post)

console.log(Post.commentPost('ja@gmail.com', 'passerby', 1, 'Yes, he is the Almighty God'));

console.log(db.comment);

console.log(Post.clapForAPost('ja@gmail.com', 'passerby', 3));

console.log(db.post)

console.log(Post.deleteAllPost('ja@gmail.com', 'passerby'));

console.log(db.post)

ja.updateUserInfo(1, { name:'updated', email:'updated@gmail.com', password: 'updatedpass', type: 'user'});

console.log(db.users);

console.log(ja.deleteUserAccount('updated@gmail.com', 'updatedpass'));

console.log(db.users)

let newUser = new User('joe', 'joe@gmail.com', 'passerby', 'user');
newUser.createNewUser();

let newPerson = new User('newuser', 'newuser@gmail.com', 'passerby', 'user');
newPerson.createNewUser();

console.log(db.users);

newAdmin.getAllUsers('admin');

newAdmin.deleteAllUser('admin');

 console.log(db);