from rouge_score import rouge_scorer
import pandas as pd
from mT5_model import generate_mt5_summary
from load_all_data import training_dataset


# Initialize scorer
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


# example usage
# Collect mT5-small summaries
mt5_summaries = [generate_mt5_summary(training_dataset["text"][i]) for i in range(1)]
print(mt5_summaries)
print(training_dataset)
# Collect XLsum summaries
# Ground truth
references = [training_dataset["summary_text"][i] for i in range(1)]

mt5_rouge = evaluate_rouge(mt5_summaries, references)

# Show results
rouge_comparison = pd.DataFrame([mt5_rouge], index=["mT5-small"])
rouge_comparison = rouge_comparison.applymap(lambda x: f"{x:.6f}")
print(rouge_comparison)
