const workspaceService = require('./organisation.service');

const createWorkspace = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await workspaceService.createWorkspace(
        req.body,
        req.user.id
      );

    return res.status(201).json({
      success: true,
      message: result.message,
      data: result.workspace,
    });
  } catch (error) {
    next(error);
  }
};

const getAllWorkspaces = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await workspaceService.getAllWorkspaces(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.workspaces,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleWorkspace = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await workspaceService.getSingleWorkspace(
        req.params.id,
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.workspace,
    });
  } catch (error) {
    next(error);
  }
};

const updateWorkspace = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await workspaceService.updateWorkspace(
        req.params.id,
        req.body,
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.workspace,
    });
  } catch (error) {
    next(error);
  }
};

const deleteWorkspace = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await workspaceService.deleteWorkspace(
        req.params.id,
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createWorkspace,
  getAllWorkspaces,
  getSingleWorkspace,
  updateWorkspace,
  deleteWorkspace,
};