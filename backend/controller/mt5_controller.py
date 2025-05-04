from flask import current_app, jsonify
from rouge_score import rouge_scorer


scorer = rouge_scorer.RougeScorer(["rouge1", "rouge2", "rougeL"], use_stemmer=True)


def generate_mt5_summary(text):
    model = current_app.config["model"]
    tokenizer = current_app.config["tokenizer"]
    device = current_app.config["device"]

    input_text = "summarize: " + text
    inputs = tokenizer(
        input_text, return_tensors="pt", truncation=True, max_length=512, padding=True
    )
    summary_ids = model.generate(
        inputs["input_ids"], max_length=100, num_beams=6, early_stopping=True
    )

    return tokenizer.decode(summary_ids[0], skip_special_tokens=True)


# Evaluation function
def evaluate_rouge(generated_list, reference_list):

    scores = {"rouge1": [], "rouge2": [], "rougeL": []}

    for gen_sum, ref_sum in zip(generated_list, reference_list):
        score = scorer.score(ref_sum, gen_sum)
        for key in scores:
            scores[key].append(score[key].fmeasure)

    # Average scores
    return {k: sum(v) / len(v) for k, v in scores.items()}
