/* eslint-disable import/no-extraneous-dependencies */
const Inferrer = require('inferrer');

const XOR = new Inferrer({ kernel: 'gaussian', gamma: 2 });

// XOR.train([
//   { input: [0, 0, 2], classification: -1 },
//   { input: [0, 1, 3], classification: 1 },
//   { input: [1, 0, 2], classification: 1 },
//   { input: [1, 1, 0], classification: -1 },
// ]);
XOR.train([
  { input: [0, 0, 2], classification: 1 },
  { input: [0, 1, 3], classification: -1 },
  { input: [1, 0, 2], classification: 1 },
  { input: [1, 1, 0], classification: -1 },
]);

console.log(XOR.classify([0, 0, 3]));

console.log(XOR.hyperplane());
