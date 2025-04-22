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

  const sendFeedback = async (index: number, type: string, notes: string) => {
    try {
      const response = await fetch('http://localhost:8000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index, type, notes }),
      });

      if (!response.ok) throw new Error('Failed to submit feedback');
      onFeedbackSubmit(index, type, notes);
    } catch (err) {
      console.error(err);
      alert('Feedback failed');
    }
  };

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

      <SummaryStats analysisResults={analysisResults} matchingResults={matchingResults} />

      <TransactionTable matchingResults={matchingResults} onFeedbackSubmit={sendFeedback} />

      <FinancialSummary analysisResults={analysisResults} />
    </div>
  );
};

export default ResultsSection;
