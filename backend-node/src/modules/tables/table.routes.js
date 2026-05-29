const express = require('express');

const router = express.Router();

const tableController = require('./table.controller');

const authMiddleware = require('../../middleware/auth.middleware');

router.post(
  '/',
  authMiddleware,
  tableController.createTable
);

router.get(
  '/workspace/:workspaceId',
  authMiddleware,
  tableController.getAllTables
);

router.get(
  '/:id',
  authMiddleware,
  tableController.getSingleTable
);

router.put(
  '/:id',
  authMiddleware,
  tableController.updateTable
);

router.delete(
  '/:id',
  authMiddleware,
  tableController.deleteTable
);

module.exports = router;