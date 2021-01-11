// load modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();
dotenv.config();
// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// TODO setup your api routes here
(async () => {
	const db = require('./models/index');

	try {
		const response = await db.sequelize.authenticate();
		console.log('connection successfully established');
	} catch (err) {
		console.log('ERROR in establishing connection');
	}

	await db.sequelize.sync();
})();

const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
	res.json({
		message:
			'Welcome to the REST API project! Head to "/api/courses" to check out the course list'
	});
});

// send 404 if no other route matched
app.use((req, res) => {
	res.status(404).json({
		message: 'Route Not Found'
	});
});

// setup a global error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message,
		error: {}
	});
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
	console.log(`Express server is listening on port ${server.address().port}`);
});
