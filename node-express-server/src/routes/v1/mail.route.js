const express = require('express');
const mailController = require('../../controllers/mail.controller');
const auth = require('../../middleware/auth');

const router = express.Router();

router.post('/send', auth, mailController.sendMail);

module.exports = router;
