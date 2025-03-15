import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
import numpy as np
import pickle

# Load the trained sentiment analysis model
model = tf.keras.models.load_model("Sentiment_Analysis.h5")



# Function to predict sentiment
def predict_sentiment(text):
    tokens = Tokenizer()
    tokens.fit_on_texts([text]) # Fit on the current text only
    sequences = tokens.texts_to_sequences([text])
    maxlen = int(np.percentile([len(seq) for seq in sequences], 95))
    padded_sequence = pad_sequences(sequences,maxlen=maxlen,dtype='int32',padding='post',truncating='post',value=0.0)
    prediction = np.max(model.predict(padded_sequence)[0])  # Assuming binary classification (positive/negative)
    return prediction
    # if prediction > 0.5:
    #     return "Positive"
    # else:
    #     return "Negative"

# Example sentences
example_sentences = [
    "I love this product! It's amazing.",
    "The product is good, but it can improve.",
    "Worst Product ever!!"
]

# Check sentiments
for sentence in example_sentences:
    print(f"Sentence: {sentence}")
    print(f"Sentiment: {predict_sentiment(sentence)}\n")
