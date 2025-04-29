from flask import Blueprint, jsonify, request, current_app
from controller.mt5_controller import generate_mt5_summary, evaluate_rouge

# load model pretrained

model_api = Blueprint("model_api", __name__)


@model_api.route("/api/get", methods=["GET", "POST"])
def get():
    input_text = """
   Lula Kamal menuturkan, sakit itu membuat Ryan harus vakum dari semua kegiatannya, termasuk menjadi pembawa acara Dokter Oz Indonesia.
    """
    result = generate_mt5_summary(input_text)
    return jsonify(
        {
            "input_data": input_text,
            "summarize": result,
            "message": "get model data",
            "status": 200,
        }
    )


@model_api.route("/api/rough_scores", methods=["GET", "POST"])
def rough_scores():
    training_dataset = current_app.config["training_dataset"]
    mt5_summaries = [
        generate_mt5_summary(training_dataset["text"][i]) for i in range(10)
    ]
    references = [training_dataset["summary_text"][i] for i in range(10)]
    input_text = """
   Lula Kamal menuturkan, sakit itu membuat Ryan harus vakum dari semua kegiatannya, termasuk menjadi pembawa acara Dokter Oz Indonesia.
    """
    mt5_rouge = evaluate_rouge(mt5_summaries, references)
    return jsonify(
        {
            "summarize": mt5_rouge,
            "status": 200,
        }
    )


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
