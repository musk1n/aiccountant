import React from 'react';
import { FileStatus } from '../types';
import { PieChart, Circle as CircleNotch } from 'lucide-react';

interface SummaryPreviewProps {
  fileStatus: FileStatus;
}

const SummaryPreview: React.FC<SummaryPreviewProps> = ({ fileStatus }) => {
  const isFilesReady = fileStatus.bank.status === 'ready' && fileStatus.ledger.status === 'ready';
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 summary-card">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <PieChart className="text-purple-500 mr-2" />
        Reconciliation Preview
      </h2>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">Files Ready</h3>
            <span 
              className={`${isFilesReady ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} text-xs font-medium px-2.5 py-0.5 rounded`}
            >
              {isFilesReady ? 'Ready to process' : 'Waiting'}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <div>
              {fileStatus.bank.status === 'ready' 
                ? `${fileStatus.bank.fileName} (ready)` 
                : 'No bank file uploaded'}
            </div>
            <div className="mt-1">
              {fileStatus.ledger.status === 'ready' 
                ? `${fileStatus.ledger.fileName} (ready)` 
                : 'No ledger file uploaded'}
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-2">Expected Analysis</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <CircleNotch className="text-blue-400 mr-2 text-xs" />
              <span>Precise transaction matching</span>
            </li>
            <li className="flex items-center">
              <CircleNotch className="text-green-400 mr-2 text-xs" />
              <span>Discrepancy detection</span>
            </li>
            <li className="flex items-center">
              <CircleNotch className="text-purple-400 mr-2 text-xs" />
              <span>Accurate financial summary</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-2">AI Capabilities</h3>
          <div className="text-xs text-gray-600 space-y-2">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>CSV parsing with proper data types</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Fuzzy matching with configurable thresholds</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Realistic transaction counts</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Accurate financial analysis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPreview;