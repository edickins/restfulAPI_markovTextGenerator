const express = require('express');
const dotenv = require('dotenv');
const { request } = require('express');

// routes
const markovtext = require('./routes/markovtext');

// Load in env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// mount routes
app.use('/api/v1/markovtext/', markovtext);

const PORT = process.env.PORT || 3000;

app.listen(
	PORT,
	console.log(`server running in ${process.env.NODE_ENV} on PORT ${PORT}`)
);
