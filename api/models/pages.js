var _ = require('lodash');
var uuid = require('node-uuid');
var Page = require('./neo4j/page');


const _manyPages = function (result) {
	return result.records.map(r => new Page(r.get('p')));
};

const getAll = function(session) {
	return session.run('MATCH (p:Page) RETURN p')
		.then(_manyPages);
};

// Create profile
const createPage = function (session, {name}) {
	return session.run('MATCH (page:Page {name: {name}}) RETURN page', {name: name})
		.then(results => {
			if (!_.isEmpty(results.records)) {
				throw {name: 'name already in use', status: 400}
			}
			else {
				return session.run('CREATE (page:Page {id:{id}, name: {name}}) RETURN page',
					{
						id: uuid.v4(),
						name: name
					}
				).then(results => {
						return new Page(results.records[0].get('page'));
					}
				)
			}
		});
};

module.exports = {
	getAll: getAll,
	createPage: createPage
};