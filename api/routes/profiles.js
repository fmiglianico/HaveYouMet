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
  Profiles.getAll(dbUtils.getSession(req))
    .then(response => writeResponse(res, response))
    .catch(next);
};

/**
 * @swagger
 * /api/v0/profile/{id}:
 *   get:
 *     tags:
 *     - profile
 *     description: Returns a profile by id
 *     summary: Returns a profile by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Profile id
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
  var id = req.params.id;
  if (!id) throw {message: 'Invalid id', status: 400};

  Profiles.getById(dbUtils.getSession(req), id)
    .then(response => writeResponse(res, response))
    .catch(next);
};

/**
 * @swagger
 * /api/v0/createProfile:
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
	var profile = _.get(req.body, 'profile');
	var likes = _.get(req.body, 'likes');

	Profiles.createProfile(dbUtils.getSession(req), profile, likes)
		.then(response => writeResponse(res, response, 201))
		.catch(next);
};