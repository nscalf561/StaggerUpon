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
		password: "GiveMeCheeseOrGiveMeDeath",
		role: "Investor",
		about: {
			picture: "This will need to be a picture",
			bio: "Here is a string",
			markets: ["This will likely change", "Why am i a string?"],
			education: [{
				schoolName: "Berkeley",
				degree: "Vagina Doctor",
				graduationYear: "1642"
			}]
		},
		entrepreneurStatus: false,
	  investorStatus: true,
	  //if investor status is true
	  advisorToCompanies: [],
	  previousInvestments: [],
	  lookingForFundingSupport: true
	},

	{
		name: "Caleb",
		email: "caleb@gmail.com",
		password: "12345",
		role: "Investor",
		about: {
			picture: "This will need to be a picture",
			bio: "Here is a string",
			markets: ["This will likely change", "Why am i a string?"],
			education: [{
				schoolName: "Berkeley",
				degree: "Vagina Doctor",
				graduationYear: "1642"
			}]
		},
		entrepreneurStatus: false,
	  investorStatus: true,
	  //if investor status is true
	  advisorToCompanies: [],
	  previousInvestments: [],
	  lookingForFundingSupport: true
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





