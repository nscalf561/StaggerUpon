var mongoose 		= require('mongoose'),
	User			= require('../models/user');

mongoose.connect('mongodb://localhost/staggerupon');


//clears existing users and projects from database

User.remove({}, (err,users) => {
	if (err) {
		console.log('error removing users: $(err)');
		process.exit();
		mongoose.connection.close();
	}
		console.log('users deleted');
});

//TODO create seed data for users
var userList = [
	{
		name: "Jess",
		email: "jess@gmail.com",
		number: 5612380928,
		password: "GiveMeCheeseOrGiveMeDeath"
	},

	{
		name: "Caleb",
		email: "caleb@gmail.com",
		number: 1231231234,
		password: "12345"
	}
];

//TODO create seed data for projects


userList.forEach((user) => {
	let newUser = new User(user);
	newUser.save((err) => {
		if (err) {
			console.log(`Error creating user seed: ${err}`);
			process.exit();
			mongoose.connection.close();
		}

		console.log ('success');
	});
});

// User.create(userList, (err, users) => {
// 	if (err) {
// 		console.log(`Error creating user seed: ${err}`);
// 		process.exit();
// 		mongoose.connection.close();
// 	}
// 	console.log(users);
// });





