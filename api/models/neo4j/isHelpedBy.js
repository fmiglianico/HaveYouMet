// extracts just the data from the query results

const _ = require('lodash');

const IsHelpedBy = function (_node) {
    _.extend(this, _node.properties);
};

module.exports = IsHelpedBy;