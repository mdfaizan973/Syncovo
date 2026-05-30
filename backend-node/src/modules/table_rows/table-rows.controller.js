const tableRowsService = require('./table-row.service');

const createTableRow = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await tableRowsService.createTableRow(
        req.body,
        req.user.id
      );

    return res.status(201).json({
      success: true,
      message: result.message,
      data: result.row,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTableRows = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await tableRowsService.getAllTableRows(
        req.query.table_id
      );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleTableRow = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await tableRowsService.getSingleTableRow(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.row,
    });
  } catch (error) {
    next(error);
  }
};

const updateTableRow = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await tableRowsService.updateTableRow(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.row,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTableRow = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await tableRowsService.deleteTableRow(
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
  createTableRow,
  getAllTableRows,
  getSingleTableRow,
  updateTableRow,
  deleteTableRow,
};