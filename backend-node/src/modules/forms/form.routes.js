const express = require('express');

const router = express.Router();

const formController = require('./form.controller');

const authMiddleware = require('../../middleware/auth.middleware');

router.post(
  '/',
  authMiddleware,
  formController.createForm
);

router.get(
  '/table/:tableId',
  authMiddleware,
  formController.getFormsByTable
);

router.get(
  '/:id',
  authMiddleware,
  formController.getSingleForm
);

router.put(
  '/:id',
  authMiddleware,
  formController.updateForm
);

router.delete(
  '/:id',
  authMiddleware,
  formController.deleteForm
);

module.exports = router;