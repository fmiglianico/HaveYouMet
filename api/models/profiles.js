const _ = require('lodash');
const uuid = require('node-uuid');
const Profile = require('./neo4j/profile');

const _singleProfileWithLikes = function (record) {
	if (record.length) {
		const result = {};
		_.extend(result, new Profile(record.get('profile')));
		// mappings are temporary until the neo4j driver team decides what to do about numbers
		/*result.likes = _.map(record.get('likes'), page => {
			if (page.id) {
				page.id = page.id.toNumber();
			}
			return page;
		});*/
		return result;
	}
	else {
		return null;
	}
};

// return many people
function _manyProfiles(neo4jResult) {
	return neo4jResult.records.map(r => new Profile(r.get('profile')))
}

// get a single person by id
const getById = function (session, id) {
	const query = [
		'MATCH (profile:Profile {id:{id}})',
		'OPTIONAL MATCH (profile)-[:LIKES]->(page:Page)',
		'RETURN DISTINCT person,',
		'collect(DISTINCT { name:page.title, id:page.id}) AS likes,'
	].join('\n');

	return session
		.run(query, {id: parseInt(id)})
		.then(result => {
			if (!_.isEmpty(result.records)) {
				return _singleProfileWithLikes(result.records[0]);
			}
			else {
				throw {message: 'ProfileThumbnail not found', status: 404}
			}
		});
};

// get a single person by facebookId
const getByFacebookId = function (session, facebookId) {
	const query = [
		'MATCH (profile:Profile {facebookId:{facebookId}})',
		'RETURN DISTINCT profile'
	].join('\n');

	return session
		.run(query, {facebookId: facebookId})
		.then(result => {
			if (!_.isEmpty(result.records)) {
				return _singleProfileWithLikes(result.records[0]);
			}
			else {
				throw {message: 'ProfileThumbnail not found', status: 404}
			}
		});
};

// Get all profiles
const getAll = function (session, type, gender, ageMin, ageMax) {
	const now = new Date();
	let birthdayMin = null;
	if (ageMin) {
		birthdayMin = new Date();
		birthdayMin.setYear(now.getYear() - ageMin);
	}
	let birthdayMax = null;
	if (ageMax) {
		birthdayMax = new Date();
		birthdayMax.setYear(now.getYear() - ageMax + 1);
	}
	return session.run('MATCH (profile:Profile) ' +
		(type ? 'WHERE profile.type = {type} ' : '') +
		(gender ? 'AND profile.gender = {gender} ' : '') +
		(birthdayMax ? 'AND profile.birthday > {birthdayMax} ' : '') +
		(birthdayMin ? 'AND profile.birthday <= {birthdayMin} ' : '') +
		'RETURN profile', {
				type,
				gender,
				birthdayMin: (birthdayMin ? birthdayMin.toISOString().substr(0, 10) : null),
				birthdayMax: (birthdayMax ? birthdayMax.toISOString().substr(0, 10) : null)
			})
		.then(result => _manyProfiles(result));
};

// Create profile
const createProfile = function (session, profile, likes) {
	const newProfile = Object.assign({}, profile, {
		id: uuid.v4()
	});
	return session.run('CREATE (profile:Profile {profile}) RETURN profile', {profile: newProfile}
	).then(results => {
			return new Profile(results.records[0].get('profile'));
		}
	)
};

module.exports = {
	getAll: getAll,
	getByFacebookId: getByFacebookId,
	createProfile: createProfile
};
