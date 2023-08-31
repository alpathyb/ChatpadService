/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const moment = require('moment');
require('moment/locale/id');

const questionSchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: [true, 'Question must have a query'],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
    },
    time: {
      type: Number,
      default: () => new Date().getTime(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

questionSchema.virtual('momentDate').get(function () {
  const date = moment(this.createdAt).format('DD-MM-YYYY HH:mm');
  return date;
});

const questionModel = mongoose.model('Question', questionSchema);
module.exports = questionModel;
