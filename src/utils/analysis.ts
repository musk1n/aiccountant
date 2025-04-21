import { FinancialEntry, MatchingResult, AnalysisResult } from '../types';

// Generate financial analysis based on matching results
export const generateFinancialAnalysis = (matchingResults: MatchingResult[]): AnalysisResult => {
  // Calculate basic stats
  const totalTransactions = matchingResults.length;
  const matchedTransactions = matchingResults.filter(r => r.status === 'matched').length;
  const reviewTransactions = matchingResults.filter(r => r.status === 'needs_review').length;
  const unmatchedTransactions = matchingResults.filter(r => r.status === 'unmatched').length;
  
  // Calculate total amounts
  let totalBankAmount = 0;
  let totalLedgerAmount = 0;
  
  matchingResults.forEach(result => {
    if (result.bankEntry) {
      const amount = parseFloat(result.bankEntry.Amount || result.bankEntry.amount || '0');
      totalBankAmount += amount;
    }
    
    if (result.ledgerEntry) {
      const amount = parseFloat(result.ledgerEntry.Amount || result.ledgerEntry.amount || '0');
      totalLedgerAmount += amount;
    }
  });
  
  // Calculate categories (simple demo implementation)
  const categories: Record<string, number> = {};
  matchingResults.forEach(result => {
    if (result.ledgerEntry) {
      const desc = (result.ledgerEntry.Description || result.ledgerEntry.description || '').toLowerCase();
      let category = 'Other';
      
      if (desc.includes('amazon') || desc.includes('aws')) {
        category = 'Cloud Services';
      } else if (desc.includes('office') || desc.includes('supply')) {
        category = 'Office Supplies';
      } else if (desc.includes('travel') || desc.includes('hotel') || desc.includes('flight')) {
        category = 'Travel';
      } else if (desc.includes('salary') || desc.includes('payroll')) {
        category = 'Payroll';
      } else if (desc.includes('tax') || desc.includes('irs')) {
        category = 'Taxes';
      }
      
      const amount = parseFloat(result.ledgerEntry.Amount || result.ledgerEntry.amount || '0');
      categories[category] = (categories[category] || 0) + amount;
    }
  });
  
  // Generate insights
  const insights = [];
  
  if (unmatchedTransactions > 0) {
    insights.push({
      icon: 'exclamation-triangle',
      color: 'yellow',
      title: `${unmatchedTransactions} unmatched transactions`,
      detail: 'Requires manual review'
    });
  }
  
  if (Math.abs(totalBankAmount - totalLedgerAmount) > 1) {
    insights.push({
      icon: 'balance-scale',
      color: 'red',
      title: `Balance discrepancy: $${Math.abs(totalBankAmount - totalLedgerAmount).toFixed(2)}`,
      detail: 'Bank and ledger totals don\'t match'
    });
  }
  
  // Find largest transactions
  let largestPayment = 0;
  let largestPaymentDesc = '';
  
  matchingResults.forEach(result => {
    if (result.ledgerEntry) {
      const amount = parseFloat(result.ledgerEntry.Amount || result.ledgerEntry.amount || '0');
      if (amount > largestPayment) {
        largestPayment = amount;
        largestPaymentDesc = result.ledgerEntry.Description || result.ledgerEntry.description || '';
      }
    }
  });
  
  if (largestPayment > 0) {
    insights.push({
      icon: 'money-bill-wave',
      color: 'blue',
      title: `Largest payment: $${largestPayment.toFixed(2)}`,
      detail: largestPaymentDesc
    });
  }
  
  return {
    totalTransactions,
    matchedTransactions,
    reviewTransactions,
    unmatchedTransactions,
    totalBankAmount,
    totalLedgerAmount,
    categories,
    insights
  };
};

// Generate a random color for category visualization
export const getRandomColor = (): string => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  return colors[Math.floor(Math.random() * colors.length)];
};