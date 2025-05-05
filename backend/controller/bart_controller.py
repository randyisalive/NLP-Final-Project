from flask import current_app
import re


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


def generate_bart_summary(text):
    model = current_app.config["model_bart"]
    tokenizer = current_app.config["tokenizer_bart"]
    device = current_app.config["device"]
    cleaned_text = clean_text(text)
    input_text = "summary: " + cleaned_text

    inputs = tokenizer(
        input_text, return_tensors="pt", truncation=True, max_length=512
    ).to(device)

    summary_ids = model.generate(
        inputs["input_ids"],
        max_length=200,
        num_beams=6,
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
