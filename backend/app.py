from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv, find_dotenv
from api.model_api import model_api
from api.chat_api import chat_api
from views.home_views import home_views
from models.load_all_data import training_dataset, evaluation_dataset

from transformers import (
    MT5Tokenizer,
    MT5ForConditionalGeneration,
    BartTokenizer,
    BartForConditionalGeneration,
)
import torch


# configuration
app = Flask(__name__)
CORS(app)
load_dotenv(find_dotenv(filename=".env.local"))
app.secret_key = os.environ.get("SECRET_KEY")


# load mT5 model
model_selected = os.environ.get("MODEL")
bart_model_selected = os.environ.get("BART_MODEL")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Model Selected mT5:", model_selected)

# mt5
model = MT5ForConditionalGeneration.from_pretrained(model_selected).to(device)
tokenizer = MT5Tokenizer.from_pretrained(model_selected)

# BART MODEL
model_bart = BartForConditionalGeneration.from_pretrained(bart_model_selected).to(
    device
)
tokenizer_bart = BartTokenizer.from_pretrained("./bart-indosum-final-fold1")

# datasets
app.config["training_dataset"] = training_dataset
app.config["evaluation_dataset"] = evaluation_dataset

app.config["model"] = model
app.config["tokenizer"] = tokenizer
app.config["device"] = device
app.config["DATABASE"] = os.environ.get("DATABASE")
app.config["model_bart"] = model_bart
app.config["tokenizer_bart"] = tokenizer_bart

app.register_blueprint(model_api)
app.register_blueprint(chat_api)

# views blueprint
app.register_blueprint(home_views)

if __name__ == "__main__":
    app.run(debug=False if os.environ.get("DEBUG_MODE") == "False" else True)
