const generator = require('../modules/markovTextGenerator.js');
const fsExtra = require('fs-extra');
const formidable = require('formidable');
const connectDB = require('../config/db');
const processFileUploads = require('../modules/processFileUploads');

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

exports.addMarkovText = async (req, res, next) => {
	//connect to database
	const conn = await connectDB();

	fsExtra.emptyDir('./uploads', err => {
		if (err) {
			res.status(500).json({ success: false, err: err });
			return;
		}

		try {
			const form = formidable({
				uploadDir: './uploads',
				multiples: true,
				keepExtensions: true,
			});

			//@err - Error object
			//@fields - Object - Any fields uploaded in the formData
			//@files - Object - Any files uploaded with the formData
			form.parse(req, (err, fields, files) => {
				if (err !== null) {
					res.status(500).json({ success: false, err: err });
				}

				// convert files.file into an Array if it is a single Object
				files.file = [].concat(files.file);

				const fileObjs = files.file.map((file, i) => {
					return {
						name: fields.name[i],
						description: fields.description[i],
						tags: fields.fileTags[i],
						newFilename: file.newFilename,
						originalFilename: file.originalFilename,
					};
				});

				console.log(fileObjs);

				const documents = processFileUploads(fileObjs);

				res.status(201).json({
					success: true,
					msg: `files uploaded`,
					files: files,
					fields: fields,
				});
			});
		} catch (err) {
			res.status(500).json({ sucess: false, error: err });
		}
	});
};
