import React, { useState, useEffect } from 'react';
import Header from './components/Header';
// import LoginPage from './components/LoginPage';
import FileUpload from './components/FileUpload/FileUpload';
import MatchingParametersSection from './components/MatchingParameters';
import DataPreview from './components/DataPreview';
import ProcessButton from './components/ProcessButton';
import SummaryPreview from './components/SummaryPreview';
import ResultsSection from './components/Results/ResultsSection';
import Chatbot from './components/Chatbot/Chatbot';
import axios from 'axios';
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
  // State for file handling
  const [bankData, setBankData] = useState<FinancialEntry[] | null>(null);
  const [ledgerData, setLedgerData] = useState<FinancialEntry[] | null>(null);
  const [fileStatus, setFileStatus] = useState<FileStatus>({
    bank: { fileName: '', status: 'none' },
    ledger: { fileName: '', status: 'none' }
  });
  
  // State for matching parameters
  const [matchingParameters, setMatchingParameters] = useState<MatchingParameters>({
    dateTolerance: 1,
    amountTolerance: 1,
    algorithm: 'fuzzy'
  });
  

  
  // State for results
  const [matchingResults, setMatchingResults] = useState<MatchingResult[]>([]);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);
  
  // UI state
  const [showDataPreview, setShowDataPreview] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState<ProgressState>({
    percentage: 0,
    status: 'Initializing...',
    isVisible: false
  });
  
  // Effect to check if files are uploaded and enable processing
  useEffect(() => {
    if (fileStatus.bank.status === 'ready' && fileStatus.ledger.status === 'ready') {
      setShowDataPreview(true);
    } else {
      setShowDataPreview(false);
    }
  }, [fileStatus]);
  
  // Handle bank file upload
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
      console.error('Error parsing bank file:', error);
      alert('Error reading bank file. Please check the format and try again.');
    }
  };
  
  // Handle ledger file upload
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
      console.error('Error parsing ledger file:', error);
      alert('Error reading ledger file. Please check the format and try again.');
    }
  };
  
  // Handle processing button click
  const handleProcess = () => {
    if (!bankData || !ledgerData) {
      alert('Please upload both bank and ledger files first.');
      return;
    }
    
    setProgress({
      percentage: 0,
      status: 'Initializing...',
      isVisible: true
    });
    
    // Simulate processing steps
    simulateProcessing();
  };
  
  // Simulate the processing steps with realistic progress
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
        
        // Random interval to simulate processing time
        const interval = 500 + Math.random() * 1000;
        setTimeout(processStep, interval);
      } else {
        // Processing complete
        setTimeout(() => {
          processComplete();
        }, 500);
      }
    };
    
    processStep();
  };
  
  // Process complete - show results
  const processComplete = () => {
    if (!bankData || !ledgerData) return;
    
    // Generate matching results
    const results = generateMatchingResults(bankData, ledgerData, matchingParameters);
    setMatchingResults(results);
    
    // Generate financial analysis
    const analysis = generateFinancialAnalysis(results);
    setAnalysisResults(analysis);
    
    // Show results section
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById('results-section')?.offsetTop || 0,
        behavior: 'smooth'
      });
    }, 100);
  };
  
  // Handle feedback submission
  const handleFeedbackSubmit = (index: number, type: string, notes: string) => {
    // In a real app, this would send the feedback to a backend
    // For demo, just show an alert
    alert(`Feedback submitted!\n\nType: ${type}\nNotes: ${notes}`);
  };

  
  
  return (
    <div className="bg-gradient-to-b from-[#cddffc] to-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
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
          
          {/* Summary Preview */}
          <SummaryPreview fileStatus={fileStatus} />
        </div>
        
        {/* Results Section */}
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
        
        {/* Chatbot Component
        <Chatbot 
          messages={[]} // Pass messages state if needed
          onSendMessage={() => {}} // Implement send message function if needed
        /> */}
    </div>
  );
}

// Import missing icon
import { FileUp as FileUpIcon } from 'lucide-react';

export default App;