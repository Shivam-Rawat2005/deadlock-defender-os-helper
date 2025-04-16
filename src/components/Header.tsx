
import React from 'react';
import { Shield, Lock } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-os-card border-b border-os-primary/20 p-4 flex justify-between items-center animate-fade-in">
      <div className="flex items-center gap-2">
        <Shield className="h-7 w-7 text-os-primary" />
        <h1 className="text-2xl font-bold text-os-text">Deadlock Defender</h1>
      </div>
      <div className="flex items-center gap-2">
        <Lock className="h-5 w-5 text-os-primary" />
        <span className="text-sm text-os-text/70">OS Resource Management</span>
      </div>
    </header>
  );
};

export default Header;
