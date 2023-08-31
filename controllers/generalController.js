const General = require('../models/generalModel');
const GeneralHistory = require('../models/generalHistoryModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createItem = factory.createOne(General);
exports.getAllItems = factory.getAll(General);
exports.getItem = factory.getOne(General);
exports.updateItem = factory.updateOne(General);
exports.deleteItem = factory.deleteOne(General);

exports.insertManyGenerals = catchAsync(async (req, res, next) => {
  if (!req.body) return next(new AppError('Data not found', 404));

  const docs = await General.insertMany(req.body);
  res.status(200).json({
    status: 'success',
    data: docs,
  });
});

exports.start = catchAsync(async (req, res, next) => {
  if (!req.query || !req.query.user) {
    return next(new AppError('Data not found', 404));
  }

  const history = await GeneralHistory.find().sort('-createdAt');
  if (history && history.length > 0) {
    const data = history[0];
    if (
      data.history ===
      'Selamat datang, silahkan kirimkan saya pertanyaan seputar dampak pornografi :)'
    ) {
      await GeneralHistory.findByIdAndDelete(data._id);
    }
  }

  await GeneralHistory.create({
    user: req.query.user,
    history:
      'Selamat datang, silahkan kirimkan saya pertanyaan seputar dampak pornografi :)',
    from: 'system',
  });

  res.status(200).json({
    status: 'success',
  });
});

exports.process = catchAsync(async (req, res, next) => {
  if (!req.query || !req.query.history) {
    return next(new AppError('Data user not found', 404));
  }

  await GeneralHistory.create(req.query);

  const general = await General.find({
    'questions.query': req.query.history.toLowerCase(),
  });

  if (!general || general.length === 0) {
    await GeneralHistory.create({
      user: req.query.user,
      history: 'Pertanyaan tidak dikenali',
      from: 'system',
    });
  } else {
    await GeneralHistory.create({
      user: req.query.user,
      history: general[0].answer,
      from: 'system',
    });
  }

  res.status(200).json({
    status: 'success',
  });
});
