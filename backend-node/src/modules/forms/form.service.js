const crypto = require('crypto');

const {
  createFormQuery,
  getFormsByTableQuery,
  getFormByIdQuery,
  updateFormQuery,
  deleteFormQuery,
} = require('./form.query');

const createForm = async (
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

  if (!payload.table_id) {
    const error = new Error(
      'table_id is required'
    );

    error.statusCode = 400;

    throw error;
  }

  if (!payload.name) {
    const error = new Error(
      'Form name is required'
    );

    error.statusCode = 400;

    throw error;
  }

  const form = await createFormQuery({
    id: crypto.randomUUID(),
    workspace_id: payload.workspace_id,
    table_id: payload.table_id,
    name: payload.name,
    description: payload.description || '',
    fields: payload.fields || [],
    created_by: userId,
  });

  return {
    message: 'Form created successfully',
    form,
  };
};

const getFormsByTable = async (
  tableId
) => {
  const forms =
    await getFormsByTableQuery(tableId);

  return {
    message: 'Forms fetched successfully',
    forms,
  };
};

const getSingleForm = async (
  formId
) => {
  const form =
    await getFormByIdQuery(formId);

  if (!form) {
    const error = new Error(
      'Form not found'
    );

    error.statusCode = 404;

    throw error;
  }

  return {
    message: 'Form fetched successfully',
    form,
  };
};

const updateForm = async (
  formId,
  payload
) => {
  const updated =
    await updateFormQuery(
      formId,
      payload
    );

  if (!updated) {
    const error = new Error(
      'Form not found'
    );

    error.statusCode = 404;

    throw error;
  }

  return {
    message: 'Form updated successfully',
    form: updated,
  };
};

const deleteForm = async (
  formId
) => {
  const deleted =
    await deleteFormQuery(formId);

  if (!deleted) {
    const error = new Error(
      'Form not found'
    );

    error.statusCode = 404;

    throw error;
  }

  return {
    message: 'Form deleted successfully',
  };
};

module.exports = {
  createForm,
  getFormsByTable,
  getSingleForm,
  updateForm,
  deleteForm,
};