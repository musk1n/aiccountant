import React, { useState } from 'react';
import { FinancialEntry } from '../types';

interface DataPreviewProps {
  bankData: FinancialEntry[] | null;
  ledgerData: FinancialEntry[] | null;
  isVisible: boolean;
}

const DataPreview: React.FC<DataPreviewProps> = ({ 
  bankData, 
  ledgerData, 
  isVisible 
}) => {
  const [activePreview, setActivePreview] = useState<'bank' | 'ledger'>('bank');
  
  if (!isVisible) {
    return null;
  }
  
  const data = activePreview === 'bank' ? bankData : ledgerData;
  
  const renderPreviewTable = () => {
    if (!data || data.length === 0) {
      return (
        <tr>
          <td colSpan={10} className="py-4 text-center text-gray-500">
            No data available
          </td>
        </tr>
      );
    }
    
    // Create table header
    const headers = Object.keys(data[0]);
    
    return (
      <>
        <tr>
          {headers.map(header => (
            <th key={header} className="p-2">{header}</th>
          ))}
        </tr>
        {data.slice(0, 5).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map(header => (
              <td key={`${rowIndex}-${header}`} className="p-2 border-t border-gray-200">
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };
  
  return (
    <div className="mt-6">
      <h3 className="font-medium text-gray-700 mb-3">Data Preview</h3>
      <div className="flex space-x-4 mb-4">
        <button 
          className={`text-sm font-medium ${activePreview === 'bank' ? 'text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActivePreview('bank')}
        >
          Bank Data
        </button>
        <button 
          className={`text-sm font-medium ${activePreview === 'ledger' ? 'text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActivePreview('ledger')}
        >
          Ledger Data
        </button>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg overflow-x-auto">
        <table className="data-table w-full">
          {renderPreviewTable()}
        </table>
      </div>
    </div>
  );
};

export default DataPreview;