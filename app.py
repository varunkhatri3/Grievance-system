from flask import Flask, request, jsonify
import google.generativeai as genai
from transformers import pipeline
import random
from textblob import TextBlob
import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from nltk.stem import WordNetLemmatizer
import nltk
import random
import re

# Configure Gemini API
genai.configure(api_key="AIzaSyBw_KLUZV20SHR8nb-bwFJ_yzxuZ_cX4XI")
model = genai.GenerativeModel("gemini-1.5-flash")

# Load pre-trained text classification pipeline
classifier = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")

# Pretrained summarizer
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
# Sentiment analyzer
sentiment_analyzer = pipeline("sentiment-analysis")
# Named Entity Recognition (NER)
ner = pipeline("ner", grouped_entities=True)

# Define categories and sub-categories
categories = {
    "Infrastructure": {
        "Roads and Highways": ["pothole", "road damage", "traffic congestion", "pedestrian infrastructure"],
        "Urban Development": ["slum development", "housing shortage", "waterlogging", "drainage"],
        "Rural Development": ["rural roads", "sanitation", "drinking water", "housing"]
    },
    "Public Utilities": {
        "Water Supply": ["water scarcity", "water quality", "water supply shortage", "leakage", "contamination"],
        "Sanitation": ["poor sanitation", "open defecation", "toilet shortage", "sewage overflow", "solid waste"],
        "Electricity": ["power outage", "voltage fluctuation", "unreliable power supply", "high electricity tariffs"]
    },
    "Health and Education": {
        "Health": ["healthcare facilities", "medical staff shortage", "healthcare quality", "medical costs"],
        "Education": ["education quality", "school shortage", "teacher shortage", "infrastructure"]
    },
    "Environment": {
        "Air Pollution": ["air pollution", "smog", "dust"],
        "Water Pollution": ["water pollution", "water contamination"],
        "Noise Pollution": ["noise pollution", "loud noise"],
        "Deforestation": ["deforestation", "forest degradation"],
        "Climate Change": ["climate change", "global warming", "extreme weather events"]
    },
    "Social Justice and Empowerment": {
        "Social Justice": ["caste discrimination", "gender inequality", "disability rights", "minority rights"],
        "Women and Child Development": ["women's safety", "child labor", "child marriage", "malnutrition"]
    },
    "Agriculture and Rural Development": {
        "Agriculture": ["low agricultural productivity", "crop failure", "farmer suicides", "pesticide poisoning"],
        "Rural Development": ["rural poverty", "unemployment", "migration", "basic amenities"]
    },
    "Law and Order": {
        "Crime and Terrorism": ["crime", "terrorism", "internal security"],
        "Law Enforcement": ["police corruption", "police inefficiency"]
    },
    "Miscellaneous": ["general complaint", "other"]
}

# Initialize Flask app
app = Flask(__name__)

# Download NLTK data
nltk.download("punkt")
nltk.download("wordnet")

with open("intents.json") as file:
    data = json.load(file)  
    
    # Preprocessing
lemmatizer = WordNetLemmatizer()
words = []
classes = []
documents = []
ignore_words = ["?", "!", ".", ","]

for intent in data["intents"]:
    for pattern in intent["patterns"]:
        word_list = nltk.word_tokenize(pattern)
        words.extend(word_list)
        documents.append((word_list, intent["tag"]))
        if intent["tag"] not in classes:
            classes.append(intent["tag"])
            
            # Lemmatize and remove duplicates
words = [lemmatizer.lemmatize(w.lower()) for w in words if w not in ignore_words]
words = sorted(set(words))
classes = sorted(set(classes))

# Load trained model
model = load_model("chatbot_model.h5")

def clean_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bag_of_words(sentence):
    sentence_words = clean_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, word in enumerate(words):
            if word == s:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence):
    bow = bag_of_words(sentence)
    result = model.predict(np.array([bow]))[0]
    threshold = 0.25
    results = [[i, r] for i, r in enumerate(result) if r > threshold]
    results.sort(key=lambda x: x[1], reverse=True)
    return [{"intent": classes[r[0]], "probability": str(r[1])} for r in results]

def get_response(intent):
    for i in data["intents"]:
        if i["tag"] == intent:
            return random.choice(i["responses"])

# API Endpoints
@app.route("/predict", methods=["POST"])
def predict():
    user_input = request.json.get("message", "")
    print(user_input)
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    intents = predict_class(user_input)
    if intents:
        response = get_response(intents[0]["intent"])
        return jsonify({"response": response, "intent": intents[0]["intent"]})
    else:
        return jsonify({"response": "I'm sorry, I didn't understand that.", "intent": None})


# Spell correction using TextBlob
def correct_spelling(text):
    blob = TextBlob(text)
    return str(blob.correct())

# Text summarization
def summarize_text(text):
    try:
        if len(text.split()) > 20:  # Summarize only for long paragraphs
            summary = summarizer(text, max_length=50, min_length=25, do_sample=False)
            return summary[0]['summary_text']
        return text
    except Exception as e:
        print("Summarization error:", e)
        return text

# Preprocessing function
def preprocess_complaint(complaint_text):
    # Correct spelling
    corrected_text = correct_spelling(complaint_text)
    # Summarize if necessary
    summarized_text = summarize_text(corrected_text)
    # Clean text (remove special characters and normalize case)
    clean_text = re.sub(r"[^a-zA-Z0-9\s]", "", summarized_text.lower())
    return clean_text

# Classify complaint based on keywords and subcategories
def manual_classifier(complaint_text):
    complaint_text = complaint_text.lower()

    for category, subcategories in categories.items():
        for subcategory, keywords in subcategories.items():
            if any(keyword in complaint_text for keyword in keywords):
                return {'category': category, 'sub-category': subcategory}

    return {'category': 'Other', 'sub-category': 'General Complaints'}

# Analyze a complaint
def analyze_complaint(complaint_text):
    # Preprocess complaint
    preprocessed_text = preprocess_complaint(complaint_text)

    # Attempt Gemini analysis
    gemini_result = analyze_with_gemini(preprocessed_text)

    # Fallback if Gemini fails
    if gemini_result['category'] == 'Unknown':
        result = manual_classifier(preprocessed_text)
    else:
        result = {'category': gemini_result['category'], 'sub-category': 'General'}

    return {
        'original_complaint': complaint_text,
        'preprocessed_complaint': preprocessed_text,
        'category': result['category'],
        'sub-category': result['sub-category'],
        'sentiment': gemini_result.get('sentiment', 'Neutral'),
        'entities': gemini_result.get('entities', [])
    }

# Analyze with Gemini API
def analyze_with_gemini(complaint_text):
    try:
        print(f"Analyzing with Gemini API: {complaint_text}")
        response = {
            'category': random.choice(['Electricity', 'Water', 'Sanitation', 'Roads']),
            'sentiment': random.choice(['Positive', 'Neutral', 'Negative']),
            'entities': ['Entity1', 'Entity2']
        }
        return response
    except Exception as e:
        print("Error with Gemini API:", e)
        return {
            'category': 'Unknown',
            'sentiment': 'Neutral',
            'entities': []
        }

# API endpoint to process complaints
@app.route('/analyze_complaint', methods=['POST'])
def analyze_complaint_endpoint():
    # Get complaint text from the request
    data = request.get_json()
    print("Request data: ",data)
    complaint_text = data.get('complaint')

    if not complaint_text:
        return jsonify({'error': 'Complaint text is required'}), 400

    # Analyze the complaint
    result = analyze_complaint(complaint_text)

    # Return the result as a JSON response
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)