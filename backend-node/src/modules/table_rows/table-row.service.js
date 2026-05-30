const crypto = require('crypto');
const { createTableRowQuery, getAllTableRowsQuery, getTableRowByIdQuery, updateTableRowQuery, deleteTableRowQuery, getTableByIdQuery } = require('./table-row.query');

const createTableRow = async (
  payload,
  userId
) => {
  const table =
    await getTableByIdQuery(
      payload.table_id
    );

  if (!table) {
    const error = new Error(
      'Table not found'
    );

    error.statusCode = 404;

    throw error;
  }

  const row =
    await createTableRowQuery({
      id: crypto.randomUUID(),

      table_id: payload.table_id,

      row_data:
        payload.row_data || {},

      created_by: userId,
    });

  return {
    message:
      'Row created successfully',

    row,
  };
};

const getAllTableRows = async (
  tableId
) => {
  const rows =
    await getAllTableRowsQuery(
      tableId
    );

  return {
    message:
      'Rows fetched successfully',

    rows,
  };
};

const getSingleTableRow = async (
  rowId
) => {
  const row =
    await getTableRowByIdQuery(
      rowId
    );

  if (!row) {
    const error = new Error(
      'Row not found'
    );

    error.statusCode = 404;

    throw error;
  }

  return {
    message:
      'Row fetched successfully',

    row,
  };
};

const updateTableRow = async (
  rowId,
  payload
) => {
  const row =
    await updateTableRowQuery(
      rowId,
      payload.row_data || {}
    );

  if (!row) {
    const error = new Error(
      'Row not found'
    );

    error.statusCode = 404;

    throw error;
  }

  return {
    message:
      'Row updated successfully',

    row,
  };
};

const deleteTableRow = async (
  rowId
) => {
  const row =
    await deleteTableRowQuery(
      rowId
    );

  if (!row) {
    const error = new Error(
      'Row not found'
    );

    error.statusCode = 404;

    throw error;
  }

  return {
    message:
      'Row deleted successfully',
    row,
  };
};

module.exports = {
  createTableRow,
  getAllTableRows,
  getSingleTableRow,
  updateTableRow,
  deleteTableRow,
};