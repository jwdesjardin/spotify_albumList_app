// load modules
const express = require('express');
const morgan = require('morgan');

const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// setup morgan which gives us http request logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// TODO setup your api routes here
(async () => {
	const db = require('./models/index');

	try {
		await db.sequelize.authenticate();
		console.log('connection successfully established');
	} catch (err) {
		console.log('ERROR in establishing connection');
	}

	await db.sequelize.sync();
})();

// create the Express app
const app = express();

app.use(express.json());

const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(process.cwd(), '/client/build')));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(process.cwd(), 'client', 'build', 'index.html'))
	);
} else {
	// setup a friendly greeting for the root route
	app.get('/', (req, res) => {
		res.json({
			message:
				'Welcome to the REST API project! Head to "/api/courses" to check out the course list'
		});
	});
}

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

const PORT = process.env.PORT || 5000;

// start listening on our port
app.listen(PORT, () => {
	console.log(`Express server is listening on port ${PORT}`);
});
