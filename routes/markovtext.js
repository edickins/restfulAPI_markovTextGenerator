const express = require('express');
const router = express.Router();
const { getMarkovText } = require('../controllers/markovtext');

router.route('/').get(getMarkovText);

module.exports = router;
