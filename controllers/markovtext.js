const { text } = require('express');
const express = require('express');
const generator = require('../modules/markovTextGenerator.js');

// @desc    return text generated from the default markov text sources
// @route   GET /api/v1/markovtext
// @access  public
exports.getMarkovText = (req, res, next) => {
	generator.getText({}).then(texts => {
		console.log('sending response : ' + texts);
		res.status(200).json({ success: true, texts: texts });
	});
};
