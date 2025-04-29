from flask import Flask, Blueprint
from flask_cors import CORS
import os
from dotenv import load_dotenv, find_dotenv
from api.model_api import model_api
from views.home_views import home_views
from models.load_all_data import training_dataset, evaluation_dataset

from transformers import MT5Tokenizer, MT5ForConditionalGeneration
import torch


# configuration
app = Flask(__name__)
CORS(app)
load_dotenv(find_dotenv(filename=".env.local"))
app.secret_key = os.environ.get("SECRET_KEY")


# load mT5 model
model_selected = os.environ.get("MODEL")
model = MT5ForConditionalGeneration.from_pretrained(model_selected)
tokenizer = MT5Tokenizer.from_pretrained(model_selected)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# datasets
app.config["training_dataset"] = training_dataset
app.config["evaluation_dataset"] = evaluation_dataset

app.config["model"] = model
app.config["tokenizer"] = tokenizer
app.config["device"] = device


app.register_blueprint(model_api)

# views blueprint
app.register_blueprint(home_views)

if __name__ == "__main__":
    app.run(debug=False if os.environ.get("DEBUG_MODE") == "False" else True)
