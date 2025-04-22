import React from 'react';
import { AnalysisResult, MatchingResult } from '../../types';
import { ClipboardList, File as FileExport, Sliders, RefreshCw } from 'lucide-react';
import SummaryStats from './SummaryStats';
import TransactionTable from './TransactionTable';
import FinancialSummary from './FinancialSummary';
import { convertToCSV, exportCSV } from '../../utils/csvParser';

interface ResultsSectionProps {
  matchingResults: MatchingResult[];
  analysisResults: AnalysisResult;
  onReprocess: (params?: { threshold: number; dateTolerance: number }) => void;
  onFeedbackSubmit: (index: number, type: string, notes: string) => void;
  isVisible: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  matchingResults,
  analysisResults,
  onReprocess,
  onFeedbackSubmit,
  isVisible
}) => {
  const [showAdjustModal, setShowAdjustModal] = React.useState(false);
  const [matchingParams, setMatchingParams] = React.useState({
    threshold: 0.8,
    dateTolerance: 2,
  });

  if (!isVisible) return null;

  const handleExport = () => {
    if (!matchingResults || !analysisResults) {
      alert('No data to export. Please process reconciliation first.');
      return;
    }

    const csvContent = convertToCSV(analysisResults, matchingResults);
    exportCSV(csvContent, `reconciliation_report_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const handleAdjust = () => {
    setShowAdjustModal(true);
  };

  const handleApplyAdjustments = () => {
    setShowAdjustModal(false);
    onReprocess(matchingParams);
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-3 md:space-y-0">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <ClipboardList className="text-blue-500 mr-3" />
          Reconciliation Results
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <button
            className="bg-green-50 text-green-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-100 transition flex items-center"
            onClick={handleExport}
          >
            <FileExport className="mr-2" size={16} />
            Export Report
          </button>
          <button
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition flex items-center"
            onClick={handleAdjust}
          >
            <Sliders className="mr-2" size={16} />
            Adjust Matching
          </button>
          <button
            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition flex items-center"
            onClick={() => onReprocess()}
          >
            <RefreshCw className="mr-2" size={16} />
            Reprocess
          </button>
        </div>
      </div>

      <SummaryStats
        analysisResults={analysisResults}
        matchingResults={matchingResults}
      />

      <TransactionTable
        matchingResults={matchingResults}
        onFeedbackSubmit={onFeedbackSubmit}
      />

      <FinancialSummary
        analysisResults={analysisResults}
      />

      {showAdjustModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Adjust Matching Parameters</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Threshold (0 - 1)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={matchingParams.threshold}
                  onChange={(e) =>
                    setMatchingParams({
                      ...matchingParams,
                      threshold: parseFloat(e.target.value),
                    })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Date Tolerance (in days)</label>
                <input
                  type="number"
                  min="0"
                  value={matchingParams.dateTolerance}
                  onChange={(e) =>
                    setMatchingParams({
                      ...matchingParams,
                      dateTolerance: parseInt(e.target.value),
                    })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowAdjustModal(false)}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyAdjustments}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsSection;