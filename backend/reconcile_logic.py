import pandas as pd
from fuzzywuzzy import fuzz

def reconcile_data(bank_df: pd.DataFrame, ledger_df: pd.DataFrame):
    matches = []
    for i, bank_row in bank_df.iterrows():
        best_match = None
        best_score = 0
        for j, ledger_row in ledger_df.iterrows():
            score = fuzz.token_set_ratio(str(bank_row['Description']), str(ledger_row['Description']))
            if score > best_score:
                best_score = score
                best_match = ledger_row
        matches.append({
            "bank": bank_row.to_dict(),
            "ledger": best_match.to_dict() if best_match is not None else {},
            "score": best_score,
            "match_status": "Matched" if best_score > 80 else "Unmatched"
        })
    return {"results": matches}
