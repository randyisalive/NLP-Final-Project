from flask import Blueprint, jsonify, request, current_app
from controller.mt5_controller import generate_mt5_summary, evaluate_rouge
from controller.bart_controller import generate_bart_summary
from controller.model_controller import getModel
from controller.rouge_controller import add_rouge_data, get_rouge_data

# load model pretrained

model_api = Blueprint("model_api", __name__)


@model_api.route("/api/get", methods=["GET", "POST"])
def get():
    model = getModel()
    print(model)
    return jsonify(model)


@model_api.route("/api/rouge_scores", methods=["GET", "POST"])
def rough_scores():
    training_dataset = current_app.config["training_dataset"]
    if request.method == "POST":
        data = request.json
        model_id = data.get("model_id")
        rouge_summaries = ""
        test_len = 100
        if model_id == 0:
            rouge_summaries = [
                generate_mt5_summary(training_dataset["text"][i])
                for i in range(test_len)
            ]
        elif model_id == 1:
            rouge_summaries = [
                generate_bart_summary(training_dataset["text"][i])
                for i in range(test_len)
            ]
        references = [training_dataset["summary_text"][i] for i in range(test_len)]
        model_rouge = evaluate_rouge(rouge_summaries, references)
        add_rouge_data(
            r1=model_rouge["rouge1"],
            r2=model_rouge["rouge2"],
            rl=model_rouge["rougeL"],
            model_id=model_id,
        )
        return jsonify(
            {
                "summarize": model_rouge,
                "status": 400,
            }
        )
    return jsonify({"api": "/api/rouge_scores", "status": 400})


@model_api.route("/api/rouge_scores/get", methods=["POST", "GET"])
def rouge_scores_get():
    if request.method == "POST":
        data = request.json
        model_id = data.get("model_id")
        model_rouge = get_rouge_data(model_id=model_id)
        return jsonify(
            {
                "summarize": model_rouge,
                "status": 400,
            }
        )
    return jsonify({"api": "/api/rouge_scores", "status": 400})


@model_api.route("/api/post", methods=["GET", "POST"])
def post():
    if request.method == "POST":
        data = request.json
        input_text = data.get("input_text")
        result = generate_mt5_summary(input_text)
        return jsonify(
            {
                "input_data": input_text,
                "summarize": result,
                "status": 200,
            }
        )
    return jsonify({"message": "over"})
