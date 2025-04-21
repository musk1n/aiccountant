import React from 'react';
import { AnalysisResult } from '../../types';
import { LineChart as ChartLine } from 'lucide-react';
import { getRandomColor } from '../../utils/analysis';

interface FinancialSummaryProps {
  analysisResults: AnalysisResult;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ analysisResults }) => {
  // Sort categories by amount
  const sortedCategories = Object.entries(analysisResults.categories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  const renderCategoryBar = (category: string, amount: number) => {
    const percent = (amount / analysisResults.totalLedgerAmount * 100).toFixed(0);
    return (
      <div key={category}>
        <div className="flex justify-between text-sm mb-1">
          <span>{category}</span>
          <span className="font-medium">${amount.toFixed(2)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full" 
            style={{ width: `${percent}%`, backgroundColor: getRandomColor() }}
          ></div>
        </div>
      </div>
    );
  };
  
  const renderInsight = (insight: { icon: string; color: string; title: string; detail: string }, index: number) => {
    // Map icon string to Lucide icon - this is a simplified approach
    let IconComponent = null;
    switch (insight.icon) {
      case 'exclamation-triangle':
        IconComponent = <AlertTriangle className={`text-${insight.color}-600`} />;
        break;
      case 'balance-scale':
        IconComponent = <Scale className={`text-${insight.color}-600`} />;
        break;
      case 'money-bill-wave':
        IconComponent = <BanknoteIcon className={`text-${insight.color}-600`} />;
        break;
      default:
        IconComponent = <Info className={`text-${insight.color}-600`} />;
    }
    
    return (
      <div key={index} className="flex items-center">
        <div className={`bg-${insight.color}-100 p-2 rounded-full mr-3`}>
          {IconComponent}
        </div>
        <div>
          <div className="text-sm font-medium">{insight.title}</div>
          <div className="text-xs text-gray-500">{insight.detail}</div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <ChartLine className="text-purple-500 mr-2" />
        AI-Generated Financial Summary
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Transaction Categories</h3>
          <div className="space-y-3">
            {sortedCategories.map(([category, amount]) => renderCategoryBar(category, amount))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Cash Flow Insights</h3>
          <div className="space-y-4">
            {analysisResults.insights.map((insight, index) => renderInsight(insight, index))}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium text-gray-700 mb-3">Detailed Analysis</h3>
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
          <p className="mb-2">
            The reconciliation process analyzed {analysisResults.totalTransactions} transactions between your bank statement and accounting ledger.
          </p>
          <p className="mb-2">
            {analysisResults.matchedTransactions} transactions ({Math.round(analysisResults.matchedTransactions / analysisResults.totalTransactions * 100)}%) were automatically matched with high confidence. {analysisResults.reviewTransactions} transactions require manual review due to potential discrepancies, and {analysisResults.unmatchedTransactions} transactions couldn't be matched to your ledger.
          </p>
          <p>
            The total bank amount was ${analysisResults.totalBankAmount.toFixed(2)} compared to the ledger total of ${analysisResults.totalLedgerAmount.toFixed(2)}, resulting in a {analysisResults.totalBankAmount > analysisResults.totalLedgerAmount ? 'surplus' : 'deficit'} of ${Math.abs(analysisResults.totalBankAmount - analysisResults.totalLedgerAmount).toFixed(2)}.
          </p>
        </div>
      </div>
    </div>
  );
};

// Importing circular references to avoid duplicate exports
import { AlertTriangle, Info, Scale } from 'lucide-react';
import { BanknoteIcon } from 'lucide-react';

export default FinancialSummary;