var IsHelpedBys = require('../models/isHelpedBys')
	, _ = require('lodash')
	, writeResponse = require('../helpers/response').writeResponse
	, dbUtils = require('../neo4j/dbUtils');

/**
 * @swagger
 * definition:
 *   IsHelpedBy:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       singleId:
 *         type: integer
 *       friendId:
 *         type: integer
 */

/**
 * @swagger
 * /api/v0/ishelpedby:
 *   post:
 *     tags:
 *     - ishelpedby
 *     description: Create a new relation of type IS_HELPED_BY
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *             singleId:
 *               type: object
 *             friendId:
 *               type: object
 *     responses:
 *       201:
 *         description: Your new relation
 *         schema:
 *           $ref: '#/definitions/IsHelpedBy'
 *       400:
 *         description: Error message(s)
 */
exports.createRelation = function (req, res, next) {
	const singleId = _.get(req.body, 'singleId');
	const friendId = _.get(req.body, 'friendId');

	IsHelpedBys.createRelation(dbUtils.getSession(req), singleId, friendId)
		.then(response => writeResponse(res, response, 201))
		.catch(next);
};