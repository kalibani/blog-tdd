const express = require('express');
const router = express.Router();
const users = require('../controllers/userCtrl');

router.post('/auth/register', users.register)
router.post('/auth/login', users.login)

module.exports = router;
