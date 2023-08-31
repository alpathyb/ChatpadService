/* eslint-disable import/no-extraneous-dependencies */
const Inferrer = require('inferrer');
const Training = require('../models/trainingModel');
const Question = require('../models/questionModel');
const History = require('../models/historyModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { createVocabulary } = require('../utils/vocabulary');
const { normalizeText } = require('../utils/normalize');
const { calculateTfIdfVector } = require('../utils/idfUtils');

exports.createItem = factory.createOne(Training);
exports.getAllItems = factory.getAll(Training);
exports.getItem = factory.getOne(Training);
exports.updateItem = factory.updateOne(Training);
exports.deleteItem = factory.deleteOne(Training);

exports.insertManyTrainings = catchAsync(async (req, res, next) => {
  if (!req.body) return next(new AppError('Data not found', 404));

  await Training.deleteMany();

  const docs = await Training.insertMany(req.body);
  res.status(200).json({
    status: 'success',
    data: docs,
  });
});

exports.welcome = catchAsync(async (req, res, next) => {
  if (!req.query || !req.query.user) {
    return next(new AppError('Data not found', 404));
  }

  const history = await History.find().sort('-createdAt');
  if (history && history.length > 0) {
    const data = history[0];
    if (
      data.history ===
      'Selamat datang, apakah anda ingin memulai sistem diagnosa tingkat kecanduan pornografi? (ya/tidak)'
    ) {
      await History.findByIdAndDelete(data._id);
    }
  }

  const questions = await Question.find().sort('-createdAt');
  if (questions && questions.length > 0) {
    await History.create({
      user: req.query.user,
      history:
        'Selamat datang, apakah anda ingin memulai sistem diagnosa tingkat kecanduan pornografi? (ya/tidak)',
      from: 'system',
    });
  } else {
    await History.create({
      user: req.query.user,
      history:
        'Mohon maaf, saat ini sistem kami tidak memiliki data yang dibutuhkan.',
      from: 'system',
    });
  }

  res.status(200).json({
    status: 'success',
  });
});

exports.start = catchAsync(async (req, res, next) => {
  const { user, message } = req.query;
  if (!req.query || !user || !message) {
    return next(new AppError('Data not found', 404));
  }

  await History.create({
    user: user,
    history: message,
    from: 'user',
  });

  const questions = await Question.find().sort('-createdAt');
  if (!questions || questions.length === 0) {
    await History.create({
      user: user,
      history:
        'Mohon maaf, saat ini sistem tidak memiliki data yang dibutuhkan.',
      from: 'system',
    });
  } else if (message === 'ya') {
    await History.create({
      user: user,
      history: questions[0].query,
      from: 'system',
    });
  }

  res.status(200).json({
    status: 'success',
    result: message === 'ya' ? questions.length : 0,
    data: {
      data: message === 'ya' ? questions : [],
    },
  });
});

exports.process = catchAsync(async (req, res, next) => {
  const { user, answer, question } = req.query;

  await History.create({
    user: user,
    history: answer,
    from: 'user',
  });

  await History.create({
    user: user,
    history: question,
    from: 'system',
  });

  res.status(200).json({
    status: 'success',
  });
});

exports.diagnose = catchAsync(async (req, res, next) => {
  const data = req.body;

  if (!data || !data.user || !data.questions || !data.questions.length === 0) {
    return next(new AppError('Data not found', 404));
  }

  const trainings = await Training.find().sort('-createdAt');
  if (!trainings || trainings.length === 0) {
    await History.create({
      user: data.user,
      history:
        'Mohon maaf, saat ini sistem tidak memiliki data yang dibutuhkan.',
      from: 'system',
    });

    res.status(200).json({
      status: 'success',
    });

    return;
  }

  const vocabulary = createVocabulary(trainings);

  const ansArr = data.questions.map((el) => el.answer);
  const newAnswers = normalizeText(ansArr.join(' ')).join(' ');

  const testingVectors = calculateTfIdfVector(
    newAnswers,
    vocabulary,
    trainings
  );

  const train = [];

  trainings.forEach((training) => {
    // const arrAns = training.questions.map((el) => el.answer);
    // const trainingAnswers = normalizeText(arrAns.join(' ')).join(' ');

    const vector = calculateTfIdfVector(
      training.stemmedStr,
      vocabulary,
      trainings
    );

    const obj = {
      input: vector,
      classification: training.class,
    };
    train.push(obj);
  });

  const XOR = new Inferrer({ kernel: 'gaussian', gamma: 2 });
  XOR.train(train);
  XOR.classify(testingVectors); //HASILNYA DISINI

  const hyperplane = XOR.hyperplane();
  const max = Math.max(...hyperplane);
  const maxIndex = hyperplane.indexOf(max);

  await History.create({
    user: data.user,
    history: `Hasil screening test anda adalah ${trainings[maxIndex].classification} dengan nilai hyperplane ${max}`,
    from: 'system',
  });

  res.status(200).json({
    status: 'success',
    // result: trainings[maxIndex].classification,
    // class: XOR.classify(testingVectors),
    // testing: testingVectors,
    // training: train,
  });
});
