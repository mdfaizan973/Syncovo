const formService = require('./form.service');

const createForm = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await formService.createForm(
        req.body,
        req.user.id
      );

    return res.status(201).json({
      success: true,
      message: result.message,
      data: result.form,
    });
  } catch (error) {
    next(error);
  }
};

const getFormsByTable = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await formService.getFormsByTable(
        req.params.tableId
      );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.forms,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleForm = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await formService.getSingleForm(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.form,
    });
  } catch (error) {
    next(error);
  }
};

const updateForm = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await formService.updateForm(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.form,
    });
  } catch (error) {
    next(error);
  }
};

const deleteForm = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await formService.deleteForm(
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
  createForm,
  getFormsByTable,
  getSingleForm,
  updateForm,
  deleteForm,
};