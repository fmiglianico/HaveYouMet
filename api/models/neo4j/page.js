// extracts just the data from the query results

var _ = require('lodash');

var Page = function (_node) {
  _.extend(this, _node.properties);
};

module.exports = Page;