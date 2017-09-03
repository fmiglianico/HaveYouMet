var Pages = require("../models/pages")
	, _ = require('lodash')
	, writeResponse = require('../helpers/response').writeResponse
	, dbUtils = require('../neo4j/dbUtils');

/**
 * @swagger
 * definition:
 *   Page:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 */

/**
 * @swagger
 * /api/v0/pages:
 *   get:
 *     tags:
 *     - pages
 *     description: Returns all pages
 *     summary: Returns all pages
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of pages
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Page'
 */
exports.list = function (req, res, next) {
  Pages.getAll(dbUtils.getSession(req))
    .then(response => writeResponse(res, response))
    .catch(next);
};

/**
 * @swagger
 * /api/v0/createPage:
 *   post:
 *     tags:
 *     - pages
 *     description: Create a new page
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *             page:
 *               type: object
 *     responses:
 *       201:
 *         description: Your new page
 *         schema:
 *           $ref: '#/definitions/Page'
 *       400:
 *         description: Error message(s)
 */
exports.createPage = function (req, res, next) {
	var page = _.get(req.body, 'page');

	Pages.createPage(dbUtils.getSession(req), page)
		.then(response => writeResponse(res, response, 201))
		.catch(next);
};