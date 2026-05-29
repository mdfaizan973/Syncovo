const express = require('express');

const router = express.Router();

const workspaceController = require('./organisation.controller');

const authMiddleware = require('../../middleware/auth.middleware');

router.post(
  '/',
  authMiddleware,
  workspaceController.createWorkspace
);

router.get(
  '/',
  authMiddleware,
  workspaceController.getAllWorkspaces
);

router.get(
  '/:id',
  authMiddleware,
  workspaceController.getSingleWorkspace
);

router.put(
  '/:id',
  authMiddleware,
  workspaceController.updateWorkspace
);

router.delete(
  '/:id',
  authMiddleware,
  workspaceController.deleteWorkspace
);

module.exports = router;