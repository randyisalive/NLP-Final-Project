from flask import current_app, jsonify
from rouge_score import rouge_scorer
import re

scorer = rouge_scorer.RougeScorer(["rouge1", "rouge2", "rougeL"], use_stemmer=True)


""" def generate_mt5_summary(text):
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

    return tokenizer.decode(summary_ids[0], skip_special_tokens=True) """


def clean_text(text):
    # Remove bracketed references like [9], [10], etc.
    text = re.sub(r"\[\d+(?:\]\[\d+)*\]", "", text)
    return re.sub(r"\s+", " ", text).strip()


def remove_repetitions(summary):
    sentences = summary.split(". ")
    seen = set()
    unique_sentences = []
    for sentence in sentences:
        trimmed = sentence.strip()
        if trimmed and trimmed not in seen:
            seen.add(trimmed)
            unique_sentences.append(trimmed)
    return ". ".join(unique_sentences).strip()


def generate_mt5_summary(text):
    model = current_app.config["model"]
    tokenizer = current_app.config["tokenizer"]
    device = current_app.config["device"]
    cleaned_text = clean_text(text)
    input_text = "summary: " + cleaned_text
    input_length = len(cleaned_text.split())
    max_summary_length = min(max(10, input_length // 3), 200)

    inputs = tokenizer(
        input_text, return_tensors="pt", truncation=True, max_length=1024
    ).to(device)

    summary_ids = model.generate(
        inputs["input_ids"],
        max_length=max_summary_length,
        num_beams=4,
        early_stopping=True,
        no_repeat_ngram_size=2,
        length_penalty=1.5,
        do_sample=False,
    )

    summary = tokenizer.decode(
        summary_ids[0], skip_special_tokens=True, clean_up_tokenization_spaces=True
    )

    summary = re.sub(r"<extra_id_\d+>", "", summary).strip()
    summary = remove_repetitions(summary)

    return summary


# Evaluation function
def evaluate_rouge(generated_list, reference_list):

    scores = {"rouge1": [], "rouge2": [], "rougeL": []}

    for gen_sum, ref_sum in zip(generated_list, reference_list):
        score = scorer.score(ref_sum, gen_sum)
        for key in scores:
            scores[key].append(score[key].fmeasure)

    # Average scores
    return {k: sum(v) / len(v) for k, v in scores.items()}
