/* eslint-disable import/no-extraneous-dependencies */
const sastrawi = require('sastrawijs');

exports.normalizeText = (txt) => {
  const stopWords = [
    'dan',
    'atau',
    'mau',
    'agar',
    'dengan',
    'tahu',
    'untuk',
    'supaya',
    'guna',
    'karena',
    'sebab',
    'hingga',
    'sampai',
    'akibat',
    'lalu',
    'kemudian',
    'jika',
    'kalau',
    'sistem',
    'informasi',
    'pengembangan',
    'analisis',
    'metode',
    'pada',
    'serta',
    'rancang',
    'setelah',
    'lanjut',
    'sedang',
    'agar',
    'atau',
    'bahkan',
    'dan',
    'jika',
    'juga',
    'karena',
    'karena itu',
    'kemudian',
    'kini',
    'lagi',
    'meskipun',
    'maka',
    'maupun',
    'namun',
    'sebab',
    'sebagai',
    'sehingga',
    'selagi',
    'selain',
    'sementara',
    'serta',
    'seusai',
    'supaya',
    'tapi',
    'tetapi',
    'yaitu',
    'pengaruh',
    'hubungan',
    'analisis',
    'faktor',
    'perbedaan',
    'korelasi',
    'dampak',
    'evaluasi',
    'strategi',
    'kajian',
  ];

  const results = [];
  const stemmer = new sastrawi.Stemmer();
  const tokenizer = new sastrawi.Tokenizer();
  const words = tokenizer.tokenize(txt);
  const filteredWords = words.filter((word) => !stopWords.includes(word));
  filteredWords.forEach((word) => results.push(stemmer.stem(word)));

  return results;
};
