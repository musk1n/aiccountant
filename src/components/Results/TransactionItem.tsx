import React, { useState } from 'react';
import { Edit, Link, Link2Off as LinkOff, MessageSquare } from 'lucide-react';
import { MatchingResult } from '../../types';

interface TransactionItemProps {
  result: MatchingResult;
  index: number;
  onFeedbackSubmit: (index: number, type: string, notes: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ 
  result, 
  index, 
  onFeedbackSubmit 
}) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackNotes, setFeedbackNotes] = useState('');
  
  const bankEntry = result.bankEntry;
  const ledgerEntry = result.ledgerEntry;
  const confidence = Math.round(result.confidence);
  const discrepancy = result.discrepancy;
  const status = result.status;
  
  let matchIcon = null;
  let matchColor = '';
  
  if (status === 'matched') {
    matchIcon = <Link className="text-green-500" />;
    matchColor = 'text-green-500';
  } else if (status === 'needs_review') {
    matchIcon = <Link className="text-yellow-500" />;
    matchColor = 'text-yellow-500';
  } else {
    matchIcon = <LinkOff className="text-red-400" />;
    matchColor = 'text-red-400';
  }
  
  let discrepancyHtml = null;
  if (discrepancy) {
    if (discrepancy.includes('diff')) {
      discrepancyHtml = (
        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">
          {discrepancy}
        </span>
      );
    } else {
      discrepancyHtml = (
        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded discrepancy-tag">
          {discrepancy}
        </span>
      );
    }
  } else {
    discrepancyHtml = <span className="text-xs text-gray-600">No discrepancy</span>;
  }
  
  let confidenceClass = 'confidence-high';
  if (confidence < 50) {
    confidenceClass = 'confidence-low';
  } else if (confidence < 80) {
    confidenceClass = 'confidence-medium';
  }
  
  const toggleFeedbackPanel = () => {
    setIsFeedbackOpen(!isFeedbackOpen);
  };
  
  const handleFeedbackSubmit = (type: string) => {
    onFeedbackSubmit(index, type, feedbackNotes);
    setIsFeedbackOpen(false);
    setFeedbackNotes('');
  };
  
  return (
    <div className="grid grid-cols-12 border-b border-gray-100 p-4 text-sm transaction-card">
      <div className="col-span-3">
        {bankEntry ? (
          <>
            <div className="font-medium">
              {bankEntry.Description || bankEntry.description || 'N/A'}
            </div>
            <div className="text-gray-500 text-xs">
              {bankEntry.Date || 'N/A'} • ${parseFloat(bankEntry.Amount || bankEntry.amount || '0').toFixed(2)}
            </div>
          </>
        ) : (
          <div className="text-gray-400 italic">No bank transaction</div>
        )}
      </div>
      
      <div className="col-span-1 flex items-center justify-center">
        {matchIcon}
      </div>
      
      <div className="col-span-3">
        {ledgerEntry ? (
          <>
            <div className="font-medium">
              {ledgerEntry.Description || ledgerEntry.description || 'N/A'}
            </div>
            <div className="text-gray-500 text-xs">
              {ledgerEntry.Date || 'N/A'} • ${parseFloat(ledgerEntry.Amount || ledgerEntry.amount || '0').toFixed(2)}
            </div>
          </>
        ) : (
          <div className="text-gray-400 italic">No ledger entry</div>
        )}
      </div>
      
      <div className="col-span-2 flex items-center">
        <div className="w-full">
          <div className={`progress-bar ${confidenceClass} rounded-full`} style={{ width: `${confidence}%` }}></div>
          <div className="text-xs text-gray-600 mt-1">{confidence}% confidence</div>
        </div>
      </div>
      
      <div className="col-span-2 flex items-center">
        {discrepancyHtml}
      </div>
      
      <div className="col-span-1 flex items-center justify-center">
        <button 
          className="text-blue-500 hover:text-blue-700"
          onClick={toggleFeedbackPanel}
        >
          {status === 'unmatched' ? <MessageSquare size={16} /> : <Edit size={16} />}
        </button>
      </div>
      
      {/* Feedback panel (hidden by default) */}
      {isFeedbackOpen && (
        <div className="col-span-12 mt-3 feedback-panel open">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Help improve the AI matching</h4>
            <p className="text-xs text-gray-600 mb-3">
              {status === 'unmatched' 
                ? 'Is there a matching ledger entry for this transaction?' 
                : 'Is this match correct?'}
            </p>
            
            <div className="flex space-x-3 mb-3">
              <button 
                className="flex-1 bg-green-50 text-green-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-green-100 transition flex items-center justify-center"
                onClick={() => handleFeedbackSubmit('correct')}
              >
                <CheckCircle className="mr-2" size={16} />
                {status === 'unmatched' ? 'Yes, link to...' : 'Correct match'}
              </button>
              <button 
                className="flex-1 bg-red-50 text-red-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-red-100 transition flex items-center justify-center"
                onClick={() => handleFeedbackSubmit('incorrect')}
              >
                <XCircle className="mr-2" size={16} />
                {status === 'unmatched' ? 'No match' : 'Incorrect match'}
              </button>
            </div>
            
            <div className="mt-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Additional notes
              </label>
              <textarea 
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                rows={2}
                placeholder="Any feedback to improve future matching..."
                value={feedbackNotes}
                onChange={(e) => setFeedbackNotes(e.target.value)}
              />
            </div>
            
            <button 
              className="mt-2 bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition float-right"
              onClick={() => handleFeedbackSubmit('notes')}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Import circular reference to avoid duplicate export
import { CheckCircle, XCircle } from 'lucide-react';

export default TransactionItem;