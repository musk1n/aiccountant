import React from 'react';
import { AnalysisResult, MatchingResult } from '../../types';
import { CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

interface SummaryStatsProps {
  analysisResults: AnalysisResult;
  matchingResults: MatchingResult[];
}

const SummaryStats: React.FC<SummaryStatsProps> = ({ 
  analysisResults, 
  matchingResults 
}) => {
  const totalTransactions = analysisResults.totalTransactions;
  
  // Calculate confidence counts
  const highConfidence = matchingResults.filter(r => r.confidence >= 80).length;
  const mediumConfidence = matchingResults.filter(r => r.confidence >= 50 && r.confidence < 80).length;
  const lowConfidence = matchingResults.filter(r => r.confidence < 50).length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="font-medium text-gray-700 mb-3 flex items-center">
          <CheckCircle className="text-green-500 mr-2" />
          Matched Transactions
        </h3>
        <div className="flex items-end">
          <div className="text-3xl font-bold text-gray-800 mr-2">
            {analysisResults.matchedTransactions}
          </div>
          <div className="text-green-600 text-sm mb-1">
            ({Math.round(analysisResults.matchedTransactions / totalTransactions * 100)}% of total)
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>High confidence</span>
            <span>{highConfidence}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${highConfidence / totalTransactions * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="font-medium text-gray-700 mb-3 flex items-center">
          <AlertTriangle className="text-yellow-500 mr-2" />
          Needs Review
        </h3>
        <div className="flex items-end">
          <div className="text-3xl font-bold text-gray-800 mr-2">
            {analysisResults.reviewTransactions}
          </div>
          <div className="text-yellow-600 text-sm mb-1">
            ({Math.round(analysisResults.reviewTransactions / totalTransactions * 100)}% of total)
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Medium confidence</span>
            <span>{mediumConfidence}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full" 
              style={{ width: `${mediumConfidence / totalTransactions * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="font-medium text-gray-700 mb-3 flex items-center">
          <HelpCircle className="text-red-500 mr-2" />
          Unmatched
        </h3>
        <div className="flex items-end">
          <div className="text-3xl font-bold text-gray-800 mr-2">
            {analysisResults.unmatchedTransactions}
          </div>
          <div className="text-red-600 text-sm mb-1">
            ({Math.round(analysisResults.unmatchedTransactions / totalTransactions * 100)}% of total)
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Low confidence</span>
            <span>{lowConfidence}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full" 
              style={{ width: `${lowConfidence / totalTransactions * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStats;