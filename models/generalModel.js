/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
// const slugify = require('slugify');
const moment = require('moment');
require('moment/locale/id');

const questionSchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: [true, 'Question must have a query'],
      trim: true,
      lowercase: true,
    },
    // slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// questionSchema.pre('save', function (next) {
//   this.slug = slugify(this.query, { lower: true });
//   next();
// });

const generalSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: [true, 'General must have a answer'],
    unique: true,
    trim: true,
  },
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

generalSchema.virtual('momentDate').get(function () {
  const date = moment(this.createdAt).format('DD-MM-YYYY HH:mm');
  return date;
});

const generalModel = mongoose.model('General', generalSchema);
module.exports = generalModel;
