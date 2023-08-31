/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const moment = require('moment');
require('moment/locale/id');

const historySchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, 'History must have a user'],
      trim: true,
    },
    history: {
      type: String,
      required: [true, 'History must have a history'],
      trim: true,
    },
    from: {
      type: String,
      required: [true, 'History must have a from'],
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

historySchema.virtual('momentDate').get(function () {
  const date = moment(this.createdAt).format('DD-MM-YYYY HH:mm');
  return date;
});

const historyModel = mongoose.model('History', historySchema);
module.exports = historyModel;
