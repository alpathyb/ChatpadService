#!/usr/bin/env python
# coding: utf-8

# In[1]:


import numpy as np
import pandas as pd
import nltk
from nltk.tokenize import word_tokenize
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import svm


# In[2]:


class TextClassificationModel:
    def __init__(self):
        self.sastrawi_stemmer = StemmerFactory().create_stemmer()
        self.encoder = LabelEncoder()
        self.tfidf_vect = TfidfVectorizer(max_features=5000)
        self.SVM = svm.SVC(C=1.0, kernel='linear', degree=3, gamma='auto')

    def preprocess_text(self, text):
        text = text.lower()
        tokens = word_tokenize(text)
        lemmatized_tokens = [self.sastrawi_stemmer.stem(token) for token in tokens]
        preprocessed_text = ' '.join(lemmatized_tokens)
        return preprocessed_text

    def train(self, train_data):
        train_texts = train_data['text'].apply(self.preprocess_text)
        train_labels = self.encoder.fit_transform(train_data['label'])
        self.tfidf_vect.fit(train_texts)
        train_texts_tfidf = self.tfidf_vect.transform(train_texts)
        self.SVM.fit(train_texts_tfidf, train_labels)

    def predict(self, input_text):
        preprocessed_input = self.preprocess_text(input_text)
        input_tfidf = self.tfidf_vect.transform([preprocessed_input])
        predicted_label = self.SVM.predict(input_tfidf)
        return self.encoder.inverse_transform(predicted_label)[0]


# In[3]:


# Load your dataset
Corpus = pd.read_csv("sample.csv", encoding='latin-1')


# In[4]:


def main():

    # Train the model
    model = TextClassificationModel()
    model.train(Corpus)
    
    # Load dataset atau pertanyaan yang ingin ditanyakan
    questions = [
        "Apakah kamu merasa diri kamu kecanduan pornografi? : ",
        "Apakah kamu suka mengatur jadwal untuk menonton pornografi? : ",
        "Apakah kamu sangat tertarik dengan pornografi? : ",
        "Apakah kamu menolak ajakan teman-teman mu demi menonton pornografi? : ",
        "Apakah kamu merasa malu setelah melihat pornografi? : ",
        "Apakah kamu merasa menyesal setelah melihat pornografi? : ",
        "Apakah kamu merasa sakit(stress dan sebagainya) setelah melihat pornografi? : "
        
    ]

    # Dictionary untuk mapping label ke bobot nilai
    label_to_weight = {
        "label_0": 0,
        "label_1": 1,
        "label_2": 2,
        "label_3": 3,
        "label_4": 4
    }

    total_weight = 0  # Inisialisasi total bobot nilai

    for question in questions:
        user_input = input(question)  # Minta input dari pengguna
        predicted_label = model.predict(user_input)  # Prediksi label dari input
        label_weight = label_to_weight[predicted_label]  # Dapatkan bobot dari label
        total_weight += label_weight  # Tambahkan bobot ke total

    print("Total Bobot Nilai:", total_weight)
    
    if total_weight >= 25:
        print("Kamu mengalami kecanduan terhadap pornografi dan sulit lepas, alangkah baiknya jika kamu segera sadar!")
    elif total_weight >= 17:
        print("Sudah mulai muncul tanda-tanda kecanduan terhadap pornografi dari dirimu, alangkah baiknya kamu segera menghindari pornografi")
    elif total_weight >= 9:
        print("Kamu terlibat dengan pornografi dan rentan kecanduan, segera berhenti yaa!")
    else :
        print("Selamat kamu normal dan tidak kecanduan, terus hindari pornografi dan menjadi manusia yang sehat secara mental dan jasmani!!")
        
if __name__ == "__main__":
    main()


# In[ ]:




