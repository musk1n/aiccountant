import json
import os
from datetime import datetime

FEEDBACK_FILE = "backend/feedback_store.json"

def save_feedback(feedback: dict):
    # Add timestamp
    feedback_entry = {
        "timestamp": datetime.now().isoformat(),
        "feedback": feedback
    }

    # If file doesn't exist, create and add empty list
    if not os.path.exists(FEEDBACK_FILE):
        with open(FEEDBACK_FILE, "w") as f:
            json.dump([], f)

    # Load, append, and save
    with open(FEEDBACK_FILE, "r+") as f:
        data = json.load(f)
        data.append(feedback_entry)
        f.seek(0)
        json.dump(data, f, indent=2)
    return {"status": "success", "message": "Feedback saved"}
