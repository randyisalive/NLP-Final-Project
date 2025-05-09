import torch.version
from load_all_data import training_dataset, evaluation_dataset


# mT5 large Model
from transformers import (
    MT5Tokenizer,
    MT5ForConditionalGeneration,
    TrainingArguments,
    Trainer,
)
import torch
import os

model_dir = os.environ.get("MT5_MODEL_DIR")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model_mT5 = ""
tokenizer_mT5 = ""

# check model_dir exist
if not os.path.exists(model_dir):
    os.mkdir("./mT5-small")  # create folder
# check if model_dir empty
if len(os.listdir(model_dir)) == 0:
    # save mT5
    tokenizer = MT5Tokenizer.from_pretrained("google/mt5-small")
    model = MT5ForConditionalGeneration.from_pretrained("google/mt5-small").to(device)
    save_dir = "mT5-small"
    tokenizer.save_pretrained(save_dir)
    model.save_pretrained(save_dir)
    tokenizer_mT5 = MT5Tokenizer.from_pretrained("mT5-small")
    model_mT5 = MT5ForConditionalGeneration.from_pretrained("mT5-small")
    print("Model mT5 loaded!")
else:
    tokenizer_mT5 = MT5Tokenizer.from_pretrained(model_dir)
    model_mT5 = MT5ForConditionalGeneration.from_pretrained(model_dir).to(device)
    print("Model mT5 loaded!")


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


def generate_mt5_summary(text):
    cleaned_text = clean_text(text)
    input_text = "summarize: " + cleaned_text

    inputs = tokenizer_mT5(
        input_text, return_tensors="pt", truncation=True, max_length=512
    ).to(device)

    summary_ids = model_mT5.generate(
        inputs["input_ids"],
        max_length=100,
        num_beams=4,
        early_stopping=True,
        no_repeat_ngram_size=2,
        length_penalty=1.0,
    )

    summary = tokenizer_mT5.decode(
        summary_ids[0], skip_special_tokens=True, clean_up_tokenization_spaces=True
    )

    summary = re.sub(r"<extra_id_\d+>", "", summary).strip()
    summary = remove_repetitions(summary)

    return summary


def preprocess_function(examples):
    inputs = tokenizer_mT5(
        examples["text"], max_length=512, truncation=True, padding="max_length"
    )
    labels = tokenizer_mT5(
        examples["summary_text"], max_length=128, truncation=True, padding="max_length"
    )

    # Add labels to inputs
    inputs["labels"] = labels["input_ids"]
    return inputs


# tokenize dataset
tokenized_train_dataset = training_dataset.map(
    lambda examples: tokenizer_mT5(examples["text"], truncation=True, max_length=512),
    batched=True,
)

tokenized_eval_dataset = evaluation_dataset.map(
    lambda examples: tokenizer_mT5(
        examples["summary_text"], truncation=True, max_length=512
    ),
    batched=True,
)


tokenized_train_dataset = training_dataset.map(preprocess_function, batched=True)
tokenized_eval_dataset = evaluation_dataset.map(preprocess_function, batched=True)

MT5_NUM_TRAIN_EPOCH = int(os.environ.get("MT5_NUM_TRAIN_EPOCH"), 0)
training_args = TrainingArguments(
    output_dir="./mt5_results",
    eval_strategy="epoch",
    learning_rate=5e-5,
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    num_train_epochs=MT5_NUM_TRAIN_EPOCH,
    weight_decay=0.01,
    save_total_limit=3,
    logging_dir="./logs",
    logging_steps=10,
    gradient_accumulation_steps=4,
)


trainer = Trainer(
    model=model_mT5,
    args=training_args,
    train_dataset=tokenized_train_dataset,
    eval_dataset=tokenized_eval_dataset,
    tokenizer=tokenizer_mT5,
)

# Start training
trainer.train()

# Evaluate the model
trainer.evaluate()

trainer.save_model(f"./fine_tuned_model_{MT5_NUM_TRAIN_EPOCH}_epoch_splitting")
