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
 * /api/v0/profiles:
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

	const type = _.get(req.query, 'type');
	const gender = _.get(req.query, 'gender');
	const ageMin = _.get(req.query, 'ageMin');
	const ageMax = _.get(req.query, 'ageMax');

	Profiles.getAll(dbUtils.getSession(req), type, gender, ageMin, ageMax)
		.then(response => writeResponse(res, response))
		.catch(next);
};

/**
 * @swagger
 * /api/v0/friends:
 *   get:
 *     tags:
 *     - profile
 *     description: Returns all the friends
 *     summary: Returns all the friends
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
exports.findFriends = function (req, res, next) {

	const singleId = _.get(req.query, 'singleId');

	Profiles.findFriends(dbUtils.getSession(req), singleId)
		.then(response => writeResponse(res, response))
		.catch(next);
};

/**
 * @swagger
 * /api/v0/profile:
 *   get:
 *     tags:
 *     - profile
 *     description: Returns a profile by facebook id
 *     summary: Returns a profile by facebook id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID
 *         in: path
 *         required: true
 *         type: string
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
exports.findById = function (req, res, next) {

	const singleId = _.get(req.query, 'singleId');
	if (singleId) {
		Profiles.getById(dbUtils.getSession(req), singleId)
			.then(response => writeResponse(res, response))
			.catch(next);
		return;
	}

	const facebookId = _.get(req.query, 'facebookId');
	if (!facebookId) throw {message: 'No id provided', status: 400};

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