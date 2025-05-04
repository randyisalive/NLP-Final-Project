from transformers import (
    BartTokenizer,
    Seq2SeqTrainingArguments,
    BartForConditionalGeneration,
    Trainer,
)
import torch
import os
from load_all_data import training_dataset, evaluation_dataset

model_dir = "./bart-model"

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


# check if model_dir empty
if len(os.listdir(model_dir)) == 0:
    # save mT5
    tokenizer_bart = BartTokenizer.from_pretrained("facebook/bart-large-cnn")
    model_bart = BartForConditionalGeneration.from_pretrained(
        "facebook/bart-large-cnn"
    ).to(device)
    save_dir = "bart-model"
    tokenizer_bart.save_pretrained(save_dir)
    model_bart.save_pretrained(save_dir)
    tokenizer_mT5 = BartTokenizer.from_pretrained(save_dir)
    model_mT5 = BartForConditionalGeneration.from_pretrained(save_dir)
    print("Model Bart loaded!")
else:
    tokenizer_bart = BartTokenizer.from_pretrained(model_dir)
    model_bart = BartForConditionalGeneration.from_pretrained(model_dir).to(device)
    print("Model Bart loaded!")

# tokenize dataset
tokenized_train_dataset = training_dataset.map(
    lambda examples: tokenizer_bart(
        examples["text"],
        max_length=512,
        truncation=True,
        padding="max_length",
        return_tensors="pt",
    ),
)

tokenized_eval_dataset = evaluation_dataset.map(
    lambda examples: tokenizer_bart(
        examples["summary_text"],
        truncation=True,
        max_length=512,
        truncation=True,
        padding="max_length",
        return_tensors="pt",
    ),
)


def summarize_bart(text):
    inputs = tokenizer_bart(
        text, return_tensors="pt", truncation=True, max_length=512
    ).to(device)
    summary_ids = model_bart.generate(
        inputs["input_ids"], max_length=100, num_beams=4, early_stopping=True
    )
    return tokenizer_bart.decode(summary_ids[0], skip_special_tokens=True)


training_args = Seq2SeqTrainingArguments(
    output_dir="./bart-indosum",
    do_train=True,
    do_eval=True,
    learning_rate=2e-5,
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    weight_decay=0.01,
    save_total_limit=2,
    num_train_epochs=3,
    predict_with_generate=True,
    logging_dir="./logs",
    logging_steps=100,
    save_steps=500,
    save_strategy="epoch",
    report_to="none",
)

trainer = Trainer(
    model=model_bart,
    args=training_args,
    train_dataset=tokenized_train_dataset,
    eval_dataset=tokenized_eval_dataset,
    tokenizer=tokenizer_mT5,
)

trainer.train()
trainer.evaluate()
trainer.save_model(f"./fine_tuned_BERT")
