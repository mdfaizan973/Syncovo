const authMiddleware = require("../../middleware/auth.middleware");
const userInfoController = require("./usersInfo.controller");
const express = require('express');
const router = express.Router();

router.get('/:userId/info', authMiddleware, userInfoController.getUserInfo);

module.exports = router;