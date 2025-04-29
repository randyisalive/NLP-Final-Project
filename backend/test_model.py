from rouge_score import rouge_scorer
from models.load_all_data import training_dataset, evaluation_dataset
from transformers import (
    MT5Tokenizer,
    MT5ForConditionalGeneration,
    TrainingArguments,
    Trainer,
)
import torch
import pandas as pd
from datasets import Dataset

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model_mT5 = MT5ForConditionalGeneration.from_pretrained("fine_tuned_model")
tokenizer_mT5 = MT5Tokenizer.from_pretrained("fine_tuned_model")
model_mT5.to(device)


# mT5 section
def generate_mt5_summary(text):
    input_text = "summarize: " + text
    inputs = tokenizer_mT5(
        input_text, return_tensors="pt", truncation=True, max_length=512
    ).to(device)
    summary_ids = model_mT5.generate(
        inputs["input_ids"], max_length=100, num_beams=4, early_stopping=True
    )
    return tokenizer_mT5.decode(summary_ids[0], skip_special_tokens=True)


scorer = rouge_scorer.RougeScorer(["rouge1", "rouge2", "rougeL"], use_stemmer=True)


# Evaluation function
def evaluate_rouge(generated_list, reference_list):
    scores = {"rouge1": [], "rouge2": [], "rougeL": []}

    for gen_sum, ref_sum in zip(generated_list, reference_list):
        score = scorer.score(ref_sum, gen_sum)
        for key in scores:
            scores[key].append(score[key].fmeasure)

    # Average scores
    return {k: sum(v) / len(v) for k, v in scores.items()}


mt5_summaries = [generate_mt5_summary(training_dataset["text"][i]) for i in range(10)]
print(mt5_summaries)

references = [training_dataset["summary_text"][i] for i in range(10)]

mt5_rouge = evaluate_rouge(mt5_summaries, references)

# Show results
rouge_comparison = pd.DataFrame([mt5_rouge], index=["mT5-small"])
rouge_comparison = rouge_comparison.applymap(lambda x: f"{x:.6f}")
print(rouge_comparison)


input_text = """

Dokter Lula Kamal yang merupakan selebriti sekaligus rekan kerja Ryan Thamrin menyebut kawannya itu sudah sakit sejak setahun yang lalu . Lula menuturkan , sakit itu membuat Ryan mesti vakum dari semua kegiatannya , termasuk menjadi pembawa acara Dokter Oz Indonesia . Kondisi itu membuat Ryan harus kembali ke kampung halamannya di Pekanbaru , Riau untuk menjalani istirahat .


"""
print(generate_mt5_summary(input_text))
