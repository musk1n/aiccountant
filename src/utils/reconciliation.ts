import { FinancialEntry, MatchingParameters, MatchingResult } from '../types';

// Calculate Levenshtein similarity between two strings
export const calculateLevenshteinSimilarity = (s1: string, s2: string): number => {
  if (!s1.length) return s2.length;
  if (!s2.length) return s1.length;
  
  const matrix: number[][] = [];
  
  // Initialize matrix
  for (let i = 0; i <= s2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= s1.length; j++) {
    matrix[0][j] = j;
  }
  
  // Fill in the matrix
  for (let i = 1; i <= s2.length; i++) {
    for (let j = 1; j <= s1.length; j++) {
      if (s2.charAt(i-1) === s1.charAt(j-1)) {
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i-1][j-1] + 1, // substitution
          matrix[i][j-1] + 1,    // insertion
          matrix[i-1][j] + 1     // deletion
        );
      }
    }
  }
  
  const distance = matrix[s2.length][s1.length];
  const maxLength = Math.max(s1.length, s2.length);
  return 1 - (distance / maxLength);
};

// Generate matching results based on bank and ledger data
export const generateMatchingResults = (
  bankData: FinancialEntry[], 
  ledgerData: FinancialEntry[], 
  params: MatchingParameters
): MatchingResult[] => {
  if (!bankData.length || !ledgerData.length) return [];
  
  const results: MatchingResult[] = [];
  const matchedBankIndices = new Set<number>();
  const matchedLedgerIndices = new Set<number>();
  
  // First pass - exact matches
  for (let i = 0; i < bankData.length; i++) {
    const bankEntry = bankData[i];
    
    for (let j = 0; j < ledgerData.length; j++) {
      if (matchedLedgerIndices.has(j)) continue;
      
      const ledgerEntry = ledgerData[j];
      
      // Simple matching logic for demo
      const amountMatch = Math.abs(parseFloat(bankEntry.Amount || bankEntry.amount || '0') - 
                                 parseFloat(ledgerEntry.Amount || ledgerEntry.amount || '0')) < 0.01;
      
      const descriptionMatch = (bankEntry.Description || bankEntry.description || '').toLowerCase() === 
                             (ledgerEntry.Description || ledgerEntry.description || '').toLowerCase();
      
      if (amountMatch && descriptionMatch) {
        results.push({
          bankEntry,
          ledgerEntry,
          confidence: 95 + Math.random() * 5, // 95-100%
          discrepancy: null,
          status: 'matched'
        });
        
        matchedBankIndices.add(i);
        matchedLedgerIndices.add(j);
        break;
      }
    }
  }
  
  // Second pass - fuzzy matches
  for (let i = 0; i < bankData.length; i++) {
    if (matchedBankIndices.has(i)) continue;
    
    const bankEntry = bankData[i];
    let bestMatch: { ledgerEntry: FinancialEntry; confidence: number; discrepancy: string | null } | null = null;
    let bestScore = 0;
    
    for (let j = 0; j < ledgerData.length; j++) {
      if (matchedLedgerIndices.has(j)) continue;
      
      const ledgerEntry = ledgerData[j];
      
      // Calculate fuzzy match score
      const amount1 = parseFloat(bankEntry.Amount || bankEntry.amount || '0');
      const amount2 = parseFloat(ledgerEntry.Amount || ledgerEntry.amount || '0');
      
      // Amount match within tolerance
      const amountDiff = Math.abs(amount1 - amount2);
      const amountThreshold = amount1 * (params.amountTolerance / 100);
      const amountMatch = amountDiff <= amountThreshold;
      
      if (!amountMatch) continue;
      
      // Description similarity
      const desc1 = (bankEntry.Description || bankEntry.description || '').toLowerCase();
      const desc2 = (ledgerEntry.Description || ledgerEntry.description || '').toLowerCase();
      
      let similarity = 0;
      if (params.algorithm === 'levenshtein') {
        similarity = calculateLevenshteinSimilarity(desc1, desc2);
      } else {
        // Simple common words approach for demo
        const words1 = desc1.split(' ');
        const words2 = desc2.split(' ');
        const commonWords = words1.filter(word => words2.includes(word));
        similarity = commonWords.length / Math.max(words1.length, words2.length);
      }
      
      // Date matching (if dates exist)
      let dateMatch = false;
      if (bankEntry.Date && ledgerEntry.Date) {
        const date1 = new Date(bankEntry.Date);
        const date2 = new Date(ledgerEntry.Date);
        const dateDiff = Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
        dateMatch = dateDiff <= params.dateTolerance;
      }
      
      // Calculate overall confidence score
      let score = 0;
      if (dateMatch) {
        score = 70 + similarity * 30;
      } else {
        score = 50 + similarity * 30;
      }
      
      // Adjust score based on amount difference
      score *= (1 - (amountDiff / (amountThreshold || 1)));
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = {
          ledgerEntry,
          confidence: score,
          discrepancy: amountDiff > 0 ? `$${amountDiff.toFixed(2)} diff` : null
        };
      }
    }
    
    if (bestMatch && bestScore >= 50) {
      results.push({
        bankEntry,
        ledgerEntry: bestMatch.ledgerEntry,
        confidence: bestScore,
        discrepancy: bestMatch.discrepancy,
        status: bestScore >= 80 ? 'matched' : 'needs_review'
      });
      
      matchedBankIndices.add(i);
    } else {
      // No match found
      results.push({
        bankEntry,
        ledgerEntry: null,
        confidence: Math.random() * 30, // 0-30%
        discrepancy: 'Unmatched',
        status: 'unmatched'
      });
    }
  }
  
  // Add any unmatched ledger entries
  for (let j = 0; j < ledgerData.length; j++) {
    if (matchedLedgerIndices.has(j)) continue;
    
    results.push({
      bankEntry: null,
      ledgerEntry: ledgerData[j],
      confidence: Math.random() * 30, // 0-30%
      discrepancy: 'Unmatched',
      status: 'unmatched'
    });
  }
  
  return results;
};