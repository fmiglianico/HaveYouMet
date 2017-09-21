const _ = require('lodash');
const IsHelpedBy = require('./neo4j/isHelpedBy');

const _singleIsHelpedBy = function (record) {
	if (record.length) {
		const result = {};
		_.extend(result, new IsHelpedBy(record.get('isHelpedBy')));
		return result;
	}
	else {
		return null;
	}
};

// Create profile
const createRelation = function (session, singleId, friendId) {
	return session.run('MATCH (s:Profile),(f:Profile)' +
	'WHERE s.id = {singleId} AND f.id = {friendId}'+
	'CREATE (s)-[isHelpedBy:IS_HELPED_BY]->(f)'+
	'RETURN isHelpedBy', { singleId, friendId }
	).then(results => {
			return new IsHelpedBy(results.records[0].get('isHelpedBy'));
		}
	)
};

module.exports = {
	createRelation
};
