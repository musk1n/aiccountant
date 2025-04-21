import React from 'react';
import { Building2, BookText } from 'lucide-react';
import FileDropArea from './FileDropArea';
import { FinancialEntry } from '../../types';

interface FileUploadProps {
  onBankFileSelected: (file: File) => void;
  onLedgerFileSelected: (file: File) => void;
  bankData: FinancialEntry[] | null;
  ledgerData: FinancialEntry[] | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onBankFileSelected,
  onLedgerFileSelected,
  bankData,
  ledgerData
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <FileDropArea
        type="bank"
        title="Bank Statement"
        icon={<Building2 />}
        color="blue"
        onFileSelected={onBankFileSelected}
      />
      
      <FileDropArea
        type="ledger"
        title="Ledger"
        icon={<BookText />}
        color="green"
        onFileSelected={onLedgerFileSelected}
      />
    </div>
  );
};

export default FileUpload;