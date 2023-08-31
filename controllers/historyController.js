const History = require('../models/historyModel');
const factory = require('./handlerFactory');

exports.createItem = factory.createOne(History);
exports.getAllItems = factory.getAll(History);
exports.getItem = factory.getOne(History);
exports.updateItem = factory.updateOne(History);
exports.deleteItem = factory.deleteOne(History);
