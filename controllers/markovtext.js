const express = require('express');
const generator = require('../modules/markovTextGenerator.js');

// @desc    return text generated from the default markov text sources
// @route   GET /api/v1/markovtext
// @access  public
exports.getMarkovText = (req, res, next) => {
	generator.getText({}).then(txt => {
		console.log('sending response : ' + txt);
	});
	res.status(200).json({ success: true, msg: 'request markovtext' });
};
