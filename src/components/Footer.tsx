
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-os-card border-t border-os-primary/20 p-4 text-center text-sm text-os-text/60 mt-6">
      <p>Deadlock Defender OS Helper &copy; {new Date().getFullYear()}</p>
      <p className="mt-1">A web application for operating systems deadlock detection and resource management</p>
    </footer>
  );
};

export default Footer;
