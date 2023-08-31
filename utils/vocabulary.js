// const { normalizeText } = require('./normalize');

// exports.createVocabulary = (trainings) => {
//   const uniqueWords = new Set();

//   trainings.forEach((training) => {
//     training.questions.forEach((question) => {
//       const answer = normalizeText(question.answer).join(' ');
//       const words = answer.toLowerCase().split(/\W+/);
//       words.forEach((word) => uniqueWords.add(word));
//     });
//   });

//   // Convert the set of unique words to an array
//   const vocabulary = Array.from(uniqueWords);

//   return vocabulary;
// };

exports.createVocabulary = (trainings) => {
  const uniqueWords = new Set();

  trainings.forEach((training) => {
    const words = training.stemmedStr.toLowerCase().split(/\W+/);
    words.forEach((word) => uniqueWords.add(word));
  });

  // Convert the set of unique words to an array
  const vocabulary = Array.from(uniqueWords);

  return vocabulary;
};
