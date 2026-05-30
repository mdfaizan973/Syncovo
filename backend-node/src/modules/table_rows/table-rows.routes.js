const express = require('express');

const router = express.Router();

const tableRowController = require('./table-rows.controller');
const authMiddleware = require('../../middleware/auth.middleware');

router.post(
  '/',
  authMiddleware,
  tableRowController.createTableRow
);

router.get(
  '/',
  authMiddleware,
  tableRowController.getAllTableRows
);

router.get(
  '/:id',
  authMiddleware,
  tableRowController.getSingleTableRow
);

router.put(
  '/:id',
  authMiddleware,
  tableRowController.updateTableRow
);

router.delete(
  '/:id',
  authMiddleware,
  tableRowController.deleteTableRow
);

module.exports = router;