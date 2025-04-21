// Define types for the application

// Type for a single bank or ledger entry
export type FinancialEntry = {
  [key: string]: string;
  Date?: string;
  Description?: string;
  Amount?: string;
  date?: string;
  description?: string;
  amount?: string;
};

// Type for matching result
export type MatchingResult = {
  bankEntry: FinancialEntry | null;
  ledgerEntry: FinancialEntry | null;
  confidence: number;
  discrepancy: string | null;
  status: 'matched' | 'needs_review' | 'unmatched';
};

// Type for analysis result
export type AnalysisResult = {
  totalTransactions: number;
  matchedTransactions: number;
  reviewTransactions: number;
  unmatchedTransactions: number;
  totalBankAmount: number;
  totalLedgerAmount: number;
  categories: Record<string, number>;
  insights: {
    icon: string;
    color: string;
    title: string;
    detail: string;
  }[];
};

// Type for matching parameters
export type MatchingParameters = {
  dateTolerance: number;
  amountTolerance: number;
  algorithm: 'fuzzy' | 'levenshtein' | 'combined';
};

// Type for file status
export type FileStatus = {
  bank: {
    fileName: string;
    status: 'ready' | 'none';
  };
  ledger: {
    fileName: string;
    status: 'ready' | 'none';
  };
};

// Type for progress state
export type ProgressState = {
  percentage: number;
  status: string;
  isVisible: boolean;
};