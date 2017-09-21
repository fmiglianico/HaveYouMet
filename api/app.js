var express = require('express')
  , path = require('path')
  , routes = require('./routes')
  , nconf = require('./config')
  , swaggerJSDoc = require('swagger-jsdoc')
  , methodOverride = require('method-override')
  , errorHandler = require('errorhandler')
  , bodyParser = require('body-parser')
  , neo4jSessionCleanup = require('./middlewares/neo4jSessionCleanup')
  , writeError = require('./helpers/response').writeError;

var app = express()
  , api = express();

app.use(nconf.get('api_path'), api);

var swaggerDefinition = {
  info: {
    title: 'HaveYouMet',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// serve swagger
api.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/docs', express.static(path.join(__dirname, 'swaggerui')));
app.set('port', nconf.get('PORT'));

api.use(bodyParser.json());
api.use(methodOverride());

//enable CORS
api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//api custom middlewares:
api.use(neo4jSessionCleanup);

//api routes
api.post('/profile', routes.profiles.createProfile);
api.get('/profile', routes.profiles.list);
api.get('/profile/:facebookId', routes.profiles.findByFacebookId);
api.post('/page', routes.pages.createPage);
api.get('/pages', routes.pages.list);
api.post('/ishelpedby', routes.isHelpedBys.createRelation);

//api error handler
api.use(function(err, req, res, next) {
  if(err && err.status) {
    writeError(res, err);
  }
  else next(err);
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port') + ' see docs at /docs');
});