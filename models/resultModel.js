const mongoose = require('mongoose');
const moment = require('moment');
require('moment/locale/id');

const questionsSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.ObjectId,
      ref: 'Question',
      required: true,
    },
    answer: {
      type: String,
      required: [true, 'Question training must have answer'],
      trim: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const resultSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, 'Training data must have a name'],
      trim: true,
    },
    questions: [questionsSchema],
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

resultSchema.virtual('momentDate').get(function () {
  const date = moment(this.createdAt).format('DD-MM-YYYY HH:mm');
  return date;
});

const resultModel = mongoose.model('Result', resultSchema);
module.exports = resultModel;
