const MarkovChain = require('markov-chain-nlg');
const MAX_TEXT_LENGTH = 160;
const DEFAULT_TEXT_LENGTH = 80;

let generator = {
	getText: _getText,
};

function _getText(initObj) {
	initObj = !initObj ? {} : initObj;

	// destructure initObj with default values if they are missing
	const {
		SeedName: seedName = 'git',
		// MaxLength: maxLength = 200,
		ItemCount: itemCount = 1,
	} = initObj;
	console.log(`SeedName ${seedName}`);

	const filePath = './data/text/' + seedName + '.txt';
	return new Promise((resolve, reject) => {
		// train the MarkovChain with the supplied path
		MarkovChain.trainTxt(filePath, '\n').then(() => {
			// get text to the required length
			console.log(`${itemCount} lines of text required`);
			const returnObj = {};
			returnObj.items = [];
			for (let i = 0; i < itemCount; i++) {
				const txt = _getTextToLength(MAX_TEXT_LENGTH);
				returnObj.items.push({ txt: txt });
				console.log(`txt: ${txt}`);
			}
			resolve(returnObj);
		});
	});
}
function _getTextToLength(textLength) {
	let text = _generateMarkovText(textLength);
	text = _maximiseTextLength(text);
	return text;
}
function _generateMarkovText(maxLength) {
	maxLength = maxLength && !isNaN(maxLength) ? maxLength : DEFAULT_TEXT_LENGTH;
	let text = MarkovChain.generate(maxLength);
	text = cleanText(text);
	return text;
}
function cleanText(text) {
	let txt = String(text);
	txt = txt.replace(/\n/, '');
	return txt;
}
function _maximiseTextLength(text) {
	let maxCycles = 5;
	let currentCycle = 0;
	while (text.length <= MAX_TEXT_LENGTH && currentCycle < maxCycles) {
		let newText = MarkovChain.generate(100);
		text = _joinTexts(text, newText);
		currentCycle++;
	}
	return text;
}
function _joinTexts(text, newText) {
	let returnText = text;
	if (returnText.length + newText.length <= MAX_TEXT_LENGTH) {
		returnText += newText;
	}
	return returnText;
}
module.exports = generator;
