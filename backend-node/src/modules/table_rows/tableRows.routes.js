const express = require('express');

const router = express.Router();

const tableRowsController = require('./tableRows.controller');

const authMiddleware = require('../../middleware/auth.middleware');

router.post(
  '/',
  authMiddleware,
  tableRowsController.createTableRow
);

router.get(
  '/',
  authMiddleware,
  tableRowsController.getAllTableRows
);

router.get(
  '/:id',
  authMiddleware,
  tableRowsController.getSingleTableRow
);

router.put(
  '/:id',
  authMiddleware,
  tableRowsController.updateTableRow
);

router.delete(
  '/:id',
  authMiddleware,
  tableRowsController.deleteTableRow
);

module.exports = router;