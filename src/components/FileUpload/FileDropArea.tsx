import React, { useState, DragEvent } from 'react';

interface FileDropAreaProps {
  type: 'bank' | 'ledger';
  title: string;
  icon: React.ReactNode;
  color: string;
  onFileSelected: (file: File) => void;
}

const FileDropArea: React.FC<FileDropAreaProps> = ({ 
  type, 
  title, 
  icon, 
  color, 
  onFileSelected 
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };
  
  const handleFile = (file: File) => {
    setFileName(file.name);
    onFileSelected(file);
  };
  
  return (
    <div 
      className={`file-drop-area rounded-lg p-6 text-center ${isDragActive ? 'active' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={`text-3xl text-${color}-400 mb-3`}>{icon}</div>
      <h3 className="font-medium text-gray-700">{title} CSV</h3>
      <p className="text-sm text-gray-500 mt-1 mb-3">Drag & drop or click to upload</p>
      
      <input 
        type="file" 
        id={`${type}-file`} 
        className="hidden" 
        accept=".csv"
        onChange={handleFileInput}
      />
      
      <button 
        onClick={() => document.getElementById(`${type}-file`)?.click()} 
        className={`bg-${color}-50 text-${color}-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-${color}-100 transition`}
      >
        Select File
      </button>
      
      <div className="mt-3 text-sm text-gray-600">{fileName}</div>
    </div>
  );
};

export default FileDropArea;