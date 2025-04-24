import React from 'react';
import { Notebook as Robot } from 'lucide-react';
import { Lightning as lt} from 'lucide-react';
import { Laptop } from 'lucide-react';
import { Shield } from 'lucide-react';
import { CreditCard } from 'lucide-react';



const Header: React.FC = () => {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen  px-6 py-12 text-center">
  {/* Cool Glassy Background Accent */}
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[90%] h-96 bg-white/30 rounded-3xl blur-2xl opacity-60 pointer-events-none"></div>

  <header className="z-10">
    <h1 className="text-6xl font-extrabold text-blue-900 font-orbitron drop-shadow-lg flex items-center justify-center">
      {/* <Robot className="text-blue-500 mr-3" /> */}
      AIccountant
    </h1>
    <p className="text-gray-700 mt-6 text-xl tracking-wide">
      Accounting Reconciliation & Advisory Agent
    </p>
  </header>

  {/* 👇 Scroll Cue */}
  <div className="mt-20 animate-bounce z-10">
    <svg
      className="w-7 h-7 text-blue-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
    <p className="text-sm text-blue-600 mt-1">Scroll Down</p>
  </div>
</div>

  );
};

export default Header;