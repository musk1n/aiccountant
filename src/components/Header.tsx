import React from 'react';
import { Notebook as Robot } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="mb-10">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center">
        <Robot className="text-blue-500 mr-3" />
        Advanced Financial Reconciliation AI Agent
      </h1>
      <p className="text-gray-600 mt-2">
        Precise CSV matching with intelligent reconciliation and accurate analysis
      </p>
    </header>
  );
};

export default Header;