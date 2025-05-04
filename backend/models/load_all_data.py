import json
import pandas as pd
from datasets import Dataset
import os


# LOAD ENV
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv(filename=".env.local"))


def load_jsonl(file_path):
    with open(file_path, "r") as file:
        return [json.loads(line) for line in file]


# Define paths for all folds (adjust file paths if necessary)
fold_paths = ["datasets/indosum/train.01.jsonl"]
eval_paths = ["datasets/indosum/test.01.jsonl"]

# Load and combine folds
all_data = []
eval_data = []
for path in fold_paths:
    all_data.extend(load_jsonl(path))
for path in eval_paths:
    eval_data.extend(load_jsonl(path))

# Convert combined data into a pandas DataFrame
df = pd.DataFrame(all_data)
edf = pd.DataFrame(eval_data)
print(df.head())
print(edf.head())


def flatten_text(nested_list):
    if not isinstance(nested_list, list):
        return ""
    result = []
    for item in nested_list:
        if isinstance(item, list):
            result.extend(flatten_text(item).split())
        else:
            result.append(str(item))
    return " ".join(result)


df["text"] = df["paragraphs"].apply(flatten_text)
df["summary_text"] = df["summary"].apply(flatten_text)

edf["text"] = edf["paragraphs"].apply(flatten_text)
edf["summary_text"] = edf["summary"].apply(flatten_text)

# data config
limit_data = int(os.environ.get("DATASETS_LIMIT"), 0)
print(f"LIMIT SET TO {limit_data}")
df = df[["text", "summary_text"]].head(limit_data)
edf = edf[["text", "summary_text"]].head(limit_data)


training_dataset = Dataset.from_pandas(df)
evaluation_dataset = Dataset.from_pandas(edf)

print("Training Datasets Summary: ", training_dataset)
print("Evaluation Datasets Summary: ", evaluation_dataset)
