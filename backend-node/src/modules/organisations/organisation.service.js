const crypto = require('crypto');

const {
  createWorkspaceQuery,
  getAllWorkspacesQuery,
  getWorkspaceByIdQuery,
  updateWorkspaceQuery,
  deleteWorkspaceQuery,
} = require('./organisation.query');

const createWorkspace = async (
  payload,
  userId
) => {
  if (!payload.name) {
    const error = new Error(
      'Workspace name is required'
    );

    error.statusCode = 400;

    throw error;
  }

  const workspace =
    await createWorkspaceQuery({
      id: crypto.randomUUID(),

      name: payload.name,

      description:
        payload.description || '',

      editors: payload.editors || [],

      viewers: payload.viewers || [],

      created_by: userId,
    });

  return {
    message:
      'Workspace created successfully',

    workspace,
  };
};

const getAllWorkspaces = async (userId) => {

    const workspaces =
      await getAllWorkspacesQuery(userId);
  
    return {
      message:
        'Workspaces fetched successfully',
  
      workspaces,
    };
  };

const getSingleWorkspace = async (
  workspaceId,
  userId
) => {
  const workspace =
    await getWorkspaceByIdQuery(
      workspaceId,
      userId
    );

  if (!workspace) {
    const error = new Error(
      'Workspace not found'
    );

    error.statusCode = 404;

    throw error;
  }

  return {
    message:
      'Workspace fetched successfully',

    workspace,
  };
};

const updateWorkspace = async (
  workspaceId,
  payload,
  userId
) => {
  if (!Object.keys(payload).length) {
    const error = new Error(
      'No fields to update'
    );

    error.statusCode = 400;

    throw error;
  }

  const updated =
    await updateWorkspaceQuery(
      workspaceId,
      userId,
      payload
    );

  if (!updated) {
    const error = new Error(
      'Workspace not found'
    );

    error.statusCode = 404;

    throw error;
  }

  return {
    message:
      'Workspace updated successfully',

    workspace: updated,
  };
};

const deleteWorkspace = async (
  workspaceId,
  userId
) => {
  const deleted =
    await deleteWorkspaceQuery(
      workspaceId,
      userId
    );

  if (!deleted) {
    const error = new Error(
      'Workspace not found'
    );

    error.statusCode = 404;

    throw error;
  }

  return {
    message:
      'Workspace deleted successfully',
  };
};

module.exports = {
  createWorkspace,
  getAllWorkspaces,
  getSingleWorkspace,
  updateWorkspace,
  deleteWorkspace,
};