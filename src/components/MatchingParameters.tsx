import React from 'react';
import { MatchingParameters } from '../types';

interface MatchingParametersProps {
  parameters: MatchingParameters;
  onParametersChange: (parameters: MatchingParameters) => void;
}

const MatchingParametersSection: React.FC<MatchingParametersProps> = ({
  parameters,
  onParametersChange
}) => {
  const handleDateToleranceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onParametersChange({
      ...parameters,
      dateTolerance: parseInt(e.target.value)
    });
  };
  
  const handleAmountToleranceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onParametersChange({
      ...parameters,
      amountTolerance: parseInt(e.target.value)
    });
  };
  
  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onParametersChange({
      ...parameters,
      algorithm: e.target.value as 'fuzzy' | 'levenshtein' | 'combined'
    });
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 space-y-4 md:space-y-0">
      <div>
        <h3 className="font-medium text-gray-700">Matching Parameters</h3>
        <p className="text-sm text-gray-500">Adjust matching sensitivity</p>
      </div>
      <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Tolerance</label>
          <select 
            value={parameters.dateTolerance}
            onChange={handleDateToleranceChange}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="1">±1 day</option>
            <option value="3">±3 days</option>
            <option value="7">±7 days</option>
            <option value="14">±14 days</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount Tolerance</label>
          <select 
            value={parameters.amountTolerance}
            onChange={handleAmountToleranceChange}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="0">Exact match</option>
            <option value="1">±1%</option>
            <option value="5">±5%</option>
            <option value="10">±10%</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Matching Algorithm</label>
          <select 
            value={parameters.algorithm}
            onChange={handleAlgorithmChange}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="fuzzy">Fuzzy Matching</option>
            <option value="levenshtein">Levenshtein Distance</option>
            <option value="combined">Combined Approach</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MatchingParametersSection;