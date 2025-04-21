import { FinancialEntry } from '../types';

// Parse a CSV file and return an array of objects
export const parseCSV = (content: string): FinancialEntry[] => {
  const lines = content.split('\n');
  if (lines.length <= 1) {
    return [];
  }
  
  const headers = lines[0].split(',').map(h => h.trim());
  
  const data: FinancialEntry[] = [];
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue;
    
    const values = lines[i].split(',');
    const entry: FinancialEntry = {} as FinancialEntry;
    
    for (let j = 0; j < headers.length; j++) {
      entry[headers[j]] = values[j] ? values[j].trim() : '';
    }
    
    data.push(entry);
  }
  
  return data;
};

// Read a file as text
export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};

// Convert data to CSV format for export
export const convertToCSV = (analysisResults: any, matchingResults: any): string => {
  let csvContent = "Reconciliation Report\n\n";
  
  // Add summary section
  csvContent += "Summary\n";
  csvContent += `Total Transactions,${analysisResults.totalTransactions}\n`;
  csvContent += `Matched Transactions,${analysisResults.matchedTransactions}\n`;
  csvContent += `Transactions Needing Review,${analysisResults.reviewTransactions}\n`;
  csvContent += `Unmatched Transactions,${analysisResults.unmatchedTransactions}\n`;
  csvContent += `Total Bank Amount,${analysisResults.totalBankAmount.toFixed(2)}\n`;
  csvContent += `Total Ledger Amount,${analysisResults.totalLedgerAmount.toFixed(2)}\n`;
  csvContent += `Balance Discrepancy,${Math.abs(analysisResults.totalBankAmount - analysisResults.totalLedgerAmount).toFixed(2)}\n\n`;
  
  // Add transaction details
  csvContent += "Transaction Details\n";
  csvContent += "Bank Date,Bank Description,Bank Amount,Ledger Date,Ledger Description,Ledger Amount,Match Status,Confidence,Discrepancy\n";
  
  matchingResults.forEach((result: any) => {
    const bankDate = result.bankEntry ? (result.bankEntry.Date || result.bankEntry.date || 'N/A') : '';
    const bankDesc = result.bankEntry ? (result.bankEntry.Description || result.bankEntry.description || 'N/A') : '';
    const bankAmount = result.bankEntry ? parseFloat(result.bankEntry.Amount || result.bankEntry.amount || 0).toFixed(2) : '';
    
    const ledgerDate = result.ledgerEntry ? (result.ledgerEntry.Date || result.ledgerEntry.date || 'N/A') : '';
    const ledgerDesc = result.ledgerEntry ? (result.ledgerEntry.Description || result.ledgerEntry.description || 'N/A') : '';
    const ledgerAmount = result.ledgerEntry ? parseFloat(result.ledgerEntry.Amount || result.ledgerEntry.amount || 0).toFixed(2) : '';
    
    let status = '';
    if (result.status === 'matched') status = 'Matched';
    else if (result.status === 'needs_review') status = 'Needs Review';
    else status = 'Unmatched';
    
    csvContent += `"${bankDate}","${bankDesc}",${bankAmount},"${ledgerDate}","${ledgerDesc}",${ledgerAmount},${status},${result.confidence.toFixed(0)}%,"${result.discrepancy || 'None'}"\n`;
  });
  
  csvContent += "\n";
  
  // Add categories
  csvContent += "Categories\n";
  csvContent += "Category,Amount\n";
  Object.entries(analysisResults.categories).forEach(([category, amount]) => {
    csvContent += `"${category}",${Number(amount).toFixed(2)}\n`;
  });
  
  return csvContent;
};

// Export data as CSV file
export const exportCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};