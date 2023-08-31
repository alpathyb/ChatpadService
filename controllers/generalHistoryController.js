const GeneralHistory = require('../models/generalHistoryModel');
const factory = require('./handlerFactory');

exports.createItem = factory.createOne(GeneralHistory);
exports.getAllItems = factory.getAll(GeneralHistory);
exports.getItem = factory.getOne(GeneralHistory);
exports.updateItem = factory.updateOne(GeneralHistory);
exports.deleteItem = factory.deleteOne(GeneralHistory);
