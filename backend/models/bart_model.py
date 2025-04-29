from transformers import BartTokenizer, BartForConditionalGeneration
import torch
import os

model_dir = "bart-model"

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


def summarize_bart(text):
    inputs = tokenizer_bart(
        text, return_tensors="pt", truncation=True, max_length=512
    ).to(device)
    summary_ids = model_bart.generate(
        inputs["input_ids"], max_length=100, num_beams=4, early_stopping=True
    )
    return tokenizer_bart.decode(summary_ids[0], skip_special_tokens=True)
