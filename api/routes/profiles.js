var Profiles = require('../models/profiles')
	, _ = require('lodash')
	, writeResponse = require('../helpers/response').writeResponse
	, dbUtils = require('../neo4j/dbUtils');

/**
 * @swagger
 * definition:
 *   Profile:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 */

/**
 * @swagger
 * /api/v0/profile:
 *   get:
 *     tags:
 *     - profile
 *     description: Returns all profiles
 *     summary: Returns all profiles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of profiles
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Profile'
 */
exports.list = function (req, res, next) {

	const gender = _.get(req.query, 'gender');
	const ageMin = _.get(req.query, 'ageMin');
	const ageMax = _.get(req.query, 'ageMax');

	Profiles.getAll(dbUtils.getSession(req), gender, ageMin, ageMax)
		.then(response => writeResponse(res, response))
		.catch(next);
};

/**
 * @swagger
 * /api/v0/profile/{facebookId}:
 *   get:
 *     tags:
 *     - profile
 *     description: Returns a profile by facebook id
 *     summary: Returns a profile by facebook id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: facebookId
 *         description: Facebook ID
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A profile
 *         schema:
 *           $ref: '#/definitions/Profile'
 *       400:
 *         description: Error message(s)
 *       404:
 *         description: Profile not found
 */
exports.findByFacebookId = function (req, res, next) {
	const facebookId = req.params.facebookId;
	if (!facebookId) throw {message: 'Invalid facebook id', status: 400};

	Profiles.getByFacebookId(dbUtils.getSession(req), facebookId)
		.then(response => writeResponse(res, response))
		.catch(next);
};

/**
 * @swagger
 * /api/v0/profile:
 *   post:
 *     tags:
 *     - profile
 *     description: Create a new profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *             profile:
 *               type: object
 *             likes:
 *               type: array
 *     responses:
 *       201:
 *         description: Your new profile
 *         schema:
 *           $ref: '#/definitions/Profile'
 *       400:
 *         description: Error message(s)
 */
exports.createProfile = function (req, res, next) {
	const profile = _.get(req.body, 'profile');
	const likes = _.get(req.body, 'likes');

	Profiles.createProfile(dbUtils.getSession(req), profile, likes)
		.then(response => writeResponse(res, response, 201))
		.catch(next);
};