const generator = require('../modules/markovTextGenerator.js');

// @desc    return text generated from the default markov text sources
// @route   GET /api/v1/markovtext
// @access  public
exports.getMarkovText = async (req, res, next) => {
	try {
		const reqQuery = { ...req.query };
		console.log(reqQuery);
		const results = await generator.getText(reqQuery);
		res.status(200).json({ success: true, data: results.data });
	} catch (error) {
		res.status(400).json({ success: false });
	}
};
