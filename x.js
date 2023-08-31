const natural = require('natural');

const { TfIdf } = natural;

// Dokumen yang akan dihitung TF-IDF-nya
const documents = [
  'Ini adalah contoh dokumen pertama.',
  'Dokumen kedua ini juga hanya contoh.',
  'Dokumen yang ketiga memiliki beberapa kata unik.',
];

// Inisialisasi objek TfIdf
const tfidf = new TfIdf();

// Proses dokumen dan hitung TF-IDF
documents.forEach((doc) => {
  tfidf.addDocument(doc);
});

// Kata-kata yang akan dicari vektor TF-IDF-nya
const searchTerm = 'contoh kata';

// Hitung vektor TF-IDF untuk kata-kata yang dicari
const tfidfVector = [];
tfidf.tfidfs(searchTerm, (index, measure) => {
  tfidfVector[index] = measure;
});

console.log('TF-IDF Vector:');
console.log(tfidfVector);
