
import React from 'react';
import { WhatsAppIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 shadow-inner">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <a href="https://chat.whatsapp.com/J5nyjbjYscdKWCJNMcLEkm?mode=wwt" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors duration-300">
            <span className="sr-only">WhatsApp</span>
            <WhatsAppIcon className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} Forex Trading Competition. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;