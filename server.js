const express = require('express');
const dotenv = require('dotenv');
const { request } = require('express');
const colors = require('colors');
const morgan = require('morgan');

// routes
const markovtext = require('./routes/markovtext');

// Load in env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// mount routes
app.use('/api/v1/markovtext/', markovtext);

const PORT = process.env.PORT || 3000;

const server = app.listen(
	PORT,
	console.log(
		`server running in ${process.env.NODE_ENV} on PORT ${PORT}`.bold.blue
	)
);

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	server.close();
});
