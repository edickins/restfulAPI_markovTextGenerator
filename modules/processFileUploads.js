const fs = require('fs');

const findSentences = data => {
	const regex = /([^!\.?]*[\!\.\?])/g;
	data = removeLineEndings(data);
	return data.match(regex);
};

const removeLineEndings = data => {
	const regex = /\n/g;
	return data.replace(regex, ' ');
};

module.exports = processFileUploads = fileObjs => {
	const processedTexts = fileObjs.map((ileObj, i) => {
		const data = fs.readFileSync(
			`./uploads/${fileObjs[i].newFilename}`,
			'utf-8'
		);
		const sentences = findSentences(data);

		console.log(sentences[0]);
		return sentences;
	});

	return processedTexts;
};
