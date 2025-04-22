from fastapi import APIRouter, Request
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

FEEDBACK_STORE = []

class Feedback(BaseModel):
    index: int
    type: str
    notes: str
    timestamp: datetime = datetime.now()

@router.post("/feedback")
async def receive_feedback(feedback: Feedback):
    FEEDBACK_STORE.append(feedback.dict())
    print("Feedback received:", feedback)
    return {"status": "success", "message": "Feedback saved"}