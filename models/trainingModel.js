/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const moment = require('moment');
require('moment/locale/id');
const { normalizeText } = require('../utils/normalize');

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
      lowercase: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const trainingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Training data must have a name'],
      trim: true,
    },
    gender: {
      type: String,
      enum: ['laki-laki', 'perempuan'],
      required: [true, 'Training data must have a gender'],
    },
    age: {
      type: Number,
      required: [true, 'Training data must have a age'],
    },
    questions: [questionsSchema],
    classification: {
      type: String,
      enum: ['normal','rentan kecanduan pornografi', 'tahap awal kecanduan pornografi', 'Kecanduan, sulit lepas dari pornografi'],
      required: [true, 'Training must have a classification'],
    },
    class: {
      type: Number,
      enum: [1, -1],
      required: [true, 'Training data must have class'],
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

trainingSchema.virtual('momentDate').get(function () {
  const date = moment(this.createdAt).format('DD-MM-YYYY HH:mm');
  return date;
});

trainingSchema.virtual('stemmedStr').get(function () {
  if (!this.questions) return undefined;
  const answerArr = this.questions.map((el) => el.answer);
  const results = normalizeText(answerArr.join(' '));
  if (!results) return undefined;
  return results.join(' ');
});

const trainingModel = mongoose.model('Training', trainingSchema);
module.exports = trainingModel;
