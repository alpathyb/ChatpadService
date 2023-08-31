/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const moment = require('moment');
require('moment/locale/id');

const generalHistorySchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, 'General history must have a user'],
      trim: true,
    },
    history: {
      type: String,
      required: [true, 'General history must have a history'],
      trim: true,
    },
    from: {
      type: String,
      required: [true, 'General history must have a from'],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

generalHistorySchema.virtual('momentDate').get(function () {
  const date = moment(this.createdAt).format('DD-MM-YYYY HH:mm');
  return date;
});

const generalHistoryModel = mongoose.model(
  'GeneralHistory',
  generalHistorySchema
);
module.exports = generalHistoryModel;
