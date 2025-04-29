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


model_dir = "mT5-small"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model_mT5 = ""
tokenizer_mT5 = ""


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


training_args = TrainingArguments(
    output_dir="./mt5_results",
    eval_strategy="epoch",
    learning_rate=5e-5,
    per_device_train_batch_size=2,
    per_device_eval_batch_size=2,
    num_train_epochs=3,
    weight_decay=0.01,
    save_total_limit=3,
    logging_dir="./logs",
    logging_steps=1,
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

trainer.save_model("./fine_tuned_model")
