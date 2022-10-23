const fs = require('fs');

const processData = data => {
	const regex = /([^!\.?]*[\!\.\?])/g;
	return data.match(regex);
};

module.exports = processFileUploads = fileObjs => {
	const processedTexts = [];

	/* file.fileObjs.map(fileObj =>{

  }) */

	const data = fs.readFileSync(`./uploads/${fileObjs[0].newFilename}`, 'utf-8');

	const processedData = processData(data);
	console.log(processedData[0]);

	return processedTexts;
};
