const generator = require('../modules/markovTextGenerator.js');

// @desc    return text generated from the default markov text sources
// @route   GET /api/v1/markovtext
// @access  public
exports.getMarkovText = (req, res, next) => {
	// copy request.query
	const reqQuery = { ...req.query };
	console.log(reqQuery);
	generator.getText(reqQuery).then(texts => {
		res.status(200).json({ success: true, texts: texts });
	});
};
