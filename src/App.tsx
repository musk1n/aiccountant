import React, { useState, useEffect } from 'react';
import Header from './components/Header';
// import LoginPage from './components/LoginPage';
import FileUpload from './components/FileUpload/FileUpload';
import MatchingParametersSection from './components/MatchingParameters';
import DataPreview from './components/DataPreview';
import ProcessButton from './components/ProcessButton';
import SummaryPreview from './components/SummaryPreview';
import ResultsSection from './components/Results/ResultsSection';
import { FeedbackProvider } from './components/feedback/FeedbackContext';
import FeedbackForm from './components/feedback/FeedbackForm';
import Chatbot from './components/Chatbot/Chatbot';
import { MessageCircle, FileUp as FileUpIcon } from 'lucide-react'; // Icons

import {
  FinancialEntry,
  MatchingParameters,
  MatchingResult,
  AnalysisResult,
  FileStatus,
  ProgressState
} from './types';
import { parseCSV, readFileAsText } from './utils/csvParser';
import { generateMatchingResults } from './utils/reconciliation';
import { generateFinancialAnalysis } from './utils/analysis';

function App() {
  const [bankData, setBankData] = useState<FinancialEntry[] | null>(null);
  const [ledgerData, setLedgerData] = useState<FinancialEntry[] | null>(null);
  const [fileStatus, setFileStatus] = useState<FileStatus>({
    bank: { fileName: '', status: 'none' },
    ledger: { fileName: '', status: 'none' }
  });

  const [matchingParameters, setMatchingParameters] = useState<MatchingParameters>({
    dateTolerance: 1,
    amountTolerance: 1,
    algorithm: 'fuzzy'
  });

  const [matchingResults, setMatchingResults] = useState<MatchingResult[]>([]);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);

  const [showDataPreview, setShowDataPreview] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState<ProgressState>({
    percentage: 0,
    status: 'Initializing...',
    isVisible: false
  });

  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // Chatbot toggle

  useEffect(() => {
    if (fileStatus.bank.status === 'ready' && fileStatus.ledger.status === 'ready') {
      setShowDataPreview(true);
    } else {
      setShowDataPreview(false);
    }
  }, [fileStatus]);

  const handleBankFileSelected = async (file: File) => {
    try {
      const content = await readFileAsText(file);
      const data = parseCSV(content);
      setBankData(data);
      setFileStatus(prev => ({
        ...prev,
        bank: { fileName: file.name, status: 'ready' }
      }));
    } catch (error) {
      alert('Error reading bank file.');
    }
  };

  const handleLedgerFileSelected = async (file: File) => {
    try {
      const content = await readFileAsText(file);
      const data = parseCSV(content);
      setLedgerData(data);
      setFileStatus(prev => ({
        ...prev,
        ledger: { fileName: file.name, status: 'ready' }
      }));
    } catch (error) {
      alert('Error reading ledger file.');
    }
  };

  const handleProcess = () => {
    if (!bankData || !ledgerData) {
      alert('Upload both files first.');
      return;
    }

    setProgress({
      percentage: 0,
      status: 'Initializing...',
      isVisible: true
    });

    simulateProcessing();
  };

  const simulateProcessing = () => {
    const steps = [
      { progress: 10, status: "Reading bank data..." },
      { progress: 20, status: "Reading ledger data..." },
      { progress: 30, status: "Validating data formats..." },
      { progress: 40, status: "Applying matching algorithm..." },
      { progress: 60, status: "Calculating confidence scores..." },
      { progress: 75, status: "Identifying discrepancies..." },
      { progress: 85, status: "Generating financial analysis..." },
      { progress: 95, status: "Finalizing report..." },
      { progress: 100, status: "Completed!" }
    ];

    let currentStep = 0;

    const processStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        setProgress({
          percentage: step.progress,
          status: step.status,
          isVisible: true
        });
        currentStep++;
        setTimeout(processStep, 500 + Math.random() * 800);
      } else {
        setTimeout(() => {
          processComplete();
        }, 500);
      }
    };

    processStep();
  };

  const processComplete = () => {
    if (!bankData || !ledgerData) return;
    const results = generateMatchingResults(bankData, ledgerData, matchingParameters);
    setMatchingResults(results);
    const analysis = generateFinancialAnalysis(results);
    setAnalysisResults(analysis);
    setShowResults(true);

    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById('results-section')?.offsetTop || 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleFeedbackSubmit = (index: number, type: string, notes: string) => {
    alert(`Feedback submitted!\nType: ${type}\nNotes: ${notes}`);
  };

  return (
    <div className="bg-gradient-to-b from-[#cddffc] to-white font-sans min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FileUpIcon className="text-blue-500 mr-2" />
              Upload Files
            </h2>

            <FileUpload
              onBankFileSelected={handleBankFileSelected}
              onLedgerFileSelected={handleLedgerFileSelected}
              bankData={bankData}
              ledgerData={ledgerData}
            />

            <MatchingParametersSection
              parameters={matchingParameters}
              onParametersChange={setMatchingParameters}
            />

            <ProcessButton
              isDisabled={!bankData || !ledgerData}
              onProcess={handleProcess}
              progress={progress}
            />

            <DataPreview
              bankData={bankData}
              ledgerData={ledgerData}
              isVisible={showDataPreview}
            />
          </div>

          <SummaryPreview fileStatus={fileStatus} />
        </div>

        <div id="results-section">
          {analysisResults && (
            <ResultsSection
              matchingResults={matchingResults}
              analysisResults={analysisResults}
              onReprocess={handleProcess}
              onFeedbackSubmit={handleFeedbackSubmit}
              isVisible={showResults}
            />
          )}
        </div>
      </div>

      {/* Floating Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700"
        >
          <MessageCircle className="w-5 h-5" />
        </button>

        {isChatbotOpen && (
          <div className="mt-2 w-70 h-[380px] border rounded shadow-lg">
            <Chatbot
              messages={[]}
              onSendMessage={() => {}}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
