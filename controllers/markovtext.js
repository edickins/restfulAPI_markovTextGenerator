const express = require('express');

// @desc    return text generated from the default markov text sources
// @route   GET /api/v1/markovtext
// @access  public
exports.getMarkovText = (req, res, next) => {
	res.status(200).json({ success: true, msg: 'request markovtext' });
};
