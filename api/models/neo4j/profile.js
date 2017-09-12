// extracts just the data from the query results

var _ = require('lodash');

var Profile = function (_node) {
    _.extend(this, _node.properties);

    if (this.id) {
        this.id = this.id;
    }
    if (this.born) {
        this.born = this.born.toNumber();
    }
};

module.exports = Profile;