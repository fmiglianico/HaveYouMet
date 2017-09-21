// extracts just the data from the query results

const _ = require('lodash');

const getAgeFromDOB = function(dob) {

	const birthdayDate = new Date(dob);
	const now = new Date();

	let age = now.getFullYear() - birthdayDate.getFullYear() - 1;

	if (now.getMonth() > birthdayDate.getMonth()) {
		age++;
	} else if (now.getMonth() === birthdayDate.getMonth()
		&& now.getDay() >= birthdayDate.getDay()) {
		age++;
	}
	return age;
};

const Profile = function (_node) {
    _.extend(this, _node.properties);

    if (this.birthday) {
    	_.assign(this, {age: getAgeFromDOB(this.birthday)});
    	delete this.birthday;
    }
};

module.exports = Profile;