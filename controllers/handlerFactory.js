const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    // response tidak akan mengirimkan data apapun ketika status 204

    if (!doc) return next(new AppError('No document found with that id', 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // const tour = await Tour.updateOne({ id: req.params.id }, req.body);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //penting untuk mengembalikan nilai yang baru kalo gak dia akan return nilai yang lama (sebelum di update)
      runValidators: true, //untuk run ulang validator, jika ini false maka validator di schema akan di skip. Misal mim, max, minlengt, maxlength dll
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body); //req.body itu object json, jadi gk perlu create manual. newTour akan mengembalikan nilai document

    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    // eslint-disable-next-line prefer-const
    let query = Model.findById(req.params.id);
    if (populateOptions) query.populate(populateOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //to allow for nested GET reviews on tour v163
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain(); //v167
    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });
