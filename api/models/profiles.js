let _ = require('lodash');
let uuid = require('node-uuid');
let Profile = require('./neo4j/profile');

let _singleProfileWithLikes = function (record) {
	if (record.length) {
		let result = {};
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
let getById = function (session, id) {
	let query = [
		'MATCH (profile:ProfileThumbnail {id:{id}})',
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
let getByFacebookId = function (session, facebookId) {
	let query = [
		'MATCH (profile:ProfileThumbnail {facebookId:{facebookId}})',
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
let getAll = function (session) {
	return session.run('MATCH (profile:Profile) RETURN profile')
		.then(result => _manyProfiles(result));
};

// Create profile
let createProfile = function (session, profile, likes) {
	let newProfile = Object.assign({}, profile, {
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
