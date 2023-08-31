/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
const natural = require('natural');

const { TfIdf } = natural;

// const tokenizer = new natural.WordTokenizer();
// const { normalizeText } = require('../utils/normalize');

// exports.calculateTfIdfVector = (text, vocabulary, trainings) => {
//   // Hitung term frequency (TF) untuk setiap kata dalam dokumen
//   const tf = {};
//   const words = tokenizer.tokenize(text.toLowerCase());
//   for (const word of words) {
//     if (!tf[word]) {
//       tf[word] = 1;
//     } else {
//       tf[word]++;
//     }
//   }

//   // Hitung inverse document frequency (IDF) untuk setiap kata dalam vocabulary
//   const idf = {};
//   const numDocs = trainings.length;
//   for (const word of vocabulary) {
//     // let count = 0;

//     // trainings.forEach((training) => {
//     //   const answers = training.questions.map((question) => question.answer);
//     //   const ans = normalizeText(answers.join(' ')).join(' ');
//     //   if (tokenizer.tokenize(ans.toLowerCase()).includes(word)) {
//     //     count += 1;
//     //   }
//     // });
//     // idf[word] = Math.log(numDocs / (count + 1));

//     let count = 0;
//     trainings.forEach((item) => {
//       if (tokenizer.tokenize(item.stemmedStr.toLowerCase()).includes(word))
//         count += 1;
//     });
//     idf[word] = Math.log(numDocs / (count + 1));
//   }

//   // Hitung TF-IDF vector untuk dokumen
//   const vector = [];
//   for (const word of vocabulary) {
//     vector.push(tf[word] ? tf[word] * idf[word] : 0);
//   }

//   return vector;
// };

exports.calculateTfIdfVector = (text, vocabulary) => {
  // Inisialisasi objek TfIdf
  const tfidf = new TfIdf();

  // Proses dokumen dan hitung TF-IDF
  vocabulary.forEach((doc) => {
    tfidf.addDocument(doc);
  });

  // Hitung vektor TF-IDF untuk kata-kata yang dicari
  const tfidfVector = [];
  tfidf.tfidfs(text, (index, measure) => {
    tfidfVector[index] = measure;
  });

  return tfidfVector;
};
