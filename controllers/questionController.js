const Question = require('../models/questionModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createItem = factory.createOne(Question);
exports.getAllItems = factory.getAll(Question);
exports.getItem = factory.getOne(Question);
exports.updateItem = factory.updateOne(Question);
exports.deleteItem = factory.deleteOne(Question);

exports.insertManyQuestions = catchAsync(async (req, res, next) => {
  if (!req.body) return next(new AppError('Data not found', 404));

  const docs = await Question.insertMany(req.body);
  res.status(200).json({
    status: 'success',
    data: docs,
  });
});
