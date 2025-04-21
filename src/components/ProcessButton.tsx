import React from 'react';
import { Cog } from 'lucide-react';
import { ProgressState } from '../types';

interface ProcessButtonProps {
  isDisabled: boolean;
  onProcess: () => void;
  progress: ProgressState;
}

const ProcessButton: React.FC<ProcessButtonProps> = ({ 
  isDisabled, 
  onProcess, 
  progress 
}) => {
  return (
    <>
      <button 
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-50"
        disabled={isDisabled}
        onClick={onProcess}
      >
        <Cog className="mr-2" />
        Process Reconciliation
      </button>
      
      {progress.isVisible && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{progress.status}</span>
            <span>{progress.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="progress-bar bg-blue-600 rounded-full"
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProcessButton;