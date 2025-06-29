# 🤖 AICOUNTANT – The Smarter Financial Reconciliation Assistant  

> Automate transaction reconciliation, learn from user feedback, and deliver actionable insights—all in one intuitive application.
   
---
- 👉 **CHECK LIVE VERSION:** https://aiccountant-eta.vercel.app/
- 👉 **DOCUMENTATION:** https://github.com/musk1n/aiccountant/blob/main/aiccountant.pdf
- 👉 **PROBLEM STATEMENT - TRACK 3:** https://drive.google.com/file/d/1N--C5_wygrwymsbsqympnqvzKnKns1O4/view

-----------------

## 🏗️ About AICOUNTANT  

AICOUNTANT is an AI agent that simplifies financial reconciliation for CPA firms and finance teams. It leverages AI to match transactions, handle discrepancies, and generate plain-language summaries for executive review.  

This platform is designed to improve efficiency, reduce manual errors, and evolve over time through feedback-driven learning.



## ✨ Key Features  

1. **Fuzzy Transaction Matching**  
   - Matches `bank.csv` and `ledger.csv` with advanced heuristics.  
   - Highlights discrepancies with confidence scores.

2. **Feedback-Driven Learning**  
   - Accepts user feedback on matches to refine future logic.  
   - (Planned) Updates results dynamically based on feedback.

3. **Intelligent Summarization**  
   - Summarizes monthly financial trends in natural language.  
   - Generates actionable insights with supporting tables.

4. **User-Friendly Interface**  
   - Intuitive React-based UI for uploading files, viewing reconciliations, and submitting feedback.  

5. **Escalation Mechanism**  
   - Flags unclear matches for manual review, ensuring transparency.  



## 🔧 System Architecture
<img width="3744" alt="Untitled (7)" src="https://github.com/user-attachments/assets/fd23addc-a514-438a-9f40-59f08561b00c" />
<img width="2256" alt="Untitled (8)" src="https://github.com/user-attachments/assets/3d609e48-577b-4fce-aebe-453e6e345044" />
<img width="2944" alt="Untitled (9)" src="https://github.com/user-attachments/assets/66e17c31-675a-462f-9eab-01df91b73eae" />
<img width="4784" alt="Untitled (10)" src="https://github.com/user-attachments/assets/0ca48206-428b-4c18-9caf-9541dafc7983" />
<img width="5216" alt="Untitled (11)" src="https://github.com/user-attachments/assets/20d7b4a4-5e3d-4b56-b141-9943240ff06f" />



## 🏁 Getting Started  

### Prerequisites  
- **Frontend**: Node.js, npm  
- **Backend**: Python 3.8+, FastAPI  

### Run Locally  

#### Backend  
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
#### Frontend
```bash
cd frontend
npm install
npm run dev
```


![Screenshot 2025-04-25 222717](https://github.com/user-attachments/assets/350fb1e3-ddaf-4129-a001-263ea55d93e2)

![Screenshot 2025-04-25 222749](https://github.com/user-attachments/assets/6768cc2e-acb2-47fb-b40a-a91b5cd93aed)

![Screenshot 2025-04-25 222836](https://github.com/user-attachments/assets/f1f1fe5d-ce4f-490d-9680-478c094de38d)

![Screenshot 2025-04-25 222916](https://github.com/user-attachments/assets/5d13c6a8-e4cd-44f1-aa0a-7d836e113573)

![Screenshot 2025-04-25 222947](https://github.com/user-attachments/assets/8b475bfa-0621-4c0f-9ae7-43b8ba9ec09c)



## 🌟 Future Prospects

- **Dynamic Updates Based on Feedback**: Regenerate summaries and reconciliations when feedback is submitted.
- **Plugin Integrations**: Sync data from external tools like QuickBooks or Xero.
- **Voice Narration**: Provide audio summaries of financial reports for accessibility.
- **User Roles and Permissions**: Auditor Mode: View-only access; Reconciler Mode: Edit access for managing matches; Admin Mode: Full access to all features all with outh login
- **Collaborative Notes and Comments**: Add comments directly to reconciliation entries for team collaboration.
- **Version History**: Maintain a history of reconciliations for audits and reviews.
- **Vendor Matching**: Automatically match vendors with slight name variations (e.g., "TATA Motors Ltd." vs "TATA MOTORS").

