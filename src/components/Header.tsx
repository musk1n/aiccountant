import React from 'react';
import { Notebook as Robot } from 'lucide-react';
import { Lightning as lt} from 'lucide-react';
import { Laptop } from 'lucide-react';
import { Shield } from 'lucide-react';
import { CreditCard } from 'lucide-react';



const Header: React.FC = () => {
  return (
    <header className="mb-10">
      <h1 className="text-6xl font-thin text-gray-800 flex items-center font-russo">
        <CreditCard className="text-gray-800 mr-4 size-20" />
        AIccountant
      </h1>
      <p className="text-gray-600 mt-2 ml-1">
        Accounting Reconciliation & Advisory Agent
      </p>
    </header>
  );
};

export default Header;