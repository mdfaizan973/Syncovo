const tableService = require('./table.service');

const createTable = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await tableService.createTable(
        req.body,
        req.user.id
      );

    return res.status(201).json({
      success: true,
      message: result.message,
      data: result.table,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTables = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await tableService.getAllTables(
        req.params.workspaceId
      );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.tables,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleTable = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await tableService.getSingleTable(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.table,
    });
  } catch (error) {
    next(error);
  }
};

const updateTable = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await tableService.updateTable(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.table,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTable = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await tableService.deleteTable(
        req.params.id
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
  createTable,
  getAllTables,
  getSingleTable,
  updateTable,
  deleteTable,
};