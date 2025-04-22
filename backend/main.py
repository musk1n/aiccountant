from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from reconcile_logic import reconcile_data
from summary_agent import generate_summary
from feedback_handler import save_feedback


app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/reconcile")
async def reconcile(bank_file: UploadFile = File(...), ledger_file: UploadFile = File(...)):
    bank_df = pd.read_csv(bank_file.file)
    ledger_df = pd.read_csv(ledger_file.file)
    result = reconcile_data(bank_df, ledger_df)
    return result

@app.post("/summary")
async def summary(data: dict):
    return {"summary": generate_summary(data)}

@app.post("/feedback")
async def feedback_update(feedback: dict):
    # Save feedback to json (you can make this smarter later)
    with open("backend/feedback_store.json", "a") as f:
        f.write(str(feedback) + "\n")
    return {"status": "Feedback received"}

@app.post("/feedback")
async def feedback_update(feedback: dict):
    return save_feedback(feedback)