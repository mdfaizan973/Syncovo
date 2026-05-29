const crypto = require('crypto');


const {
  removeDeletedSchemaKeysFromRows,
} = require('../table_rows/table-row.query');

const { createTableQuery, getAllTablesQuery, getTableByIdQuery, updateTableQuery, deleteTableQuery } = require('./tables.query');

const createTable = async (
  payload,
  userId
) => {
  if (!payload.workspace_id) {
    const error = new Error(
      'workspace_id is required'
    );

    error.statusCode = 400;

    throw error;
  }

  if (!payload.name) {
    const error = new Error(
      'Table name is required'
    );

    error.statusCode = 400;

    throw error;
  }

  const table = await createTableQuery({
    id: crypto.randomUUID(),
  
    workspace_id: payload.workspace_id,
  
    name: payload.name,
  
    description: payload.description || '',
  
    schema: payload.schema || [],
    
    rows: payload.rows || [],
  
    editors: payload.editors || [],
  
    viewers: payload.viewers || [],
  
    created_by: userId,
  });

  return {
    message: 'Table created successfully',
    table,
  };
};

const getAllTables = async (
  workspaceId
) => {
  const tables =
    await getAllTablesQuery(workspaceId);

  return {
    message: 'Tables fetched successfully',
    tables,
  };
};

const getSingleTable = async (
  tableId
) => {
  const table =
    await getTableByIdQuery(tableId);

  if (!table) {
    const error = new Error(
      'Table not found'
    );

    error.statusCode = 404;

    throw error;
  }

  return {
    message: 'Table fetched successfully',
    table,
  };
};

const updateTable = async (
  tableId,
  payload
) => {
  const existingTable =
    await getTableByIdQuery(tableId);

  if (!existingTable) {
    const error = new Error(
      'Table not found'
    );

    error.statusCode = 404;

    throw error;
  }

  if (payload.schema) {
    const oldKeys =
      existingTable.schema.map(
        (field) => field.key
      );

    const newKeys =
      payload.schema.map(
        (field) => field.key
      );

    const removedKeys =
      oldKeys.filter(
        (key) => !newKeys.includes(key)
      );

    if (removedKeys.length) {
      await removeDeletedSchemaKeysFromRows(
        tableId,
        removedKeys
      );
    }
  }

  const updated =
    await updateTableQuery(
      tableId,
      payload
    );

  return {
    message: 'Table updated successfully',
    table: updated,
  };
};

const deleteTable = async (
  tableId
) => {
  const deleted =
    await deleteTableQuery(tableId);

  if (!deleted) {
    const error = new Error(
      'Table not found'
    );

    error.statusCode = 404;

    throw error;
  }

  return {
    message: 'Table deleted successfully',
  };
};

module.exports = {
  createTable,
  getAllTables,
  getSingleTable,
  updateTable,
  deleteTable,
};