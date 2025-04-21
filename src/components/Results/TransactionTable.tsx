import React from 'react';
import { MatchingResult } from '../../types';
import TransactionItem from './TransactionItem';

interface TransactionTableProps {
  matchingResults: MatchingResult[];
  onFeedbackSubmit: (index: number, type: string, notes: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ 
  matchingResults, 
  onFeedbackSubmit 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 p-4 font-medium text-gray-700 text-sm">
        <div className="col-span-3">Bank Transaction</div>
        <div className="col-span-1 text-center">Match</div>
        <div className="col-span-3">Ledger Entry</div>
        <div className="col-span-2">Confidence</div>
        <div className="col-span-2">Discrepancy</div>
        <div className="col-span-1">Action</div>
      </div>
      
      <div>
        {matchingResults.slice(0, 20).map((result, index) => (
          <TransactionItem 
            key={index} 
            result={result} 
            index={index} 
            onFeedbackSubmit={onFeedbackSubmit} 
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;