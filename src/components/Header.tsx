import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MenuIcon, XIcon, ChartBarIcon } from './icons';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/about', text: 'About' },
    { to: '/rules', text: 'Rules' },
    { to: '/leaderboard', text: 'Leaderboard' },
    { to: '/contact', text: 'Contact' },
  ];

  return (
    <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="sr-only">FX Compete Home</span>
              <ChartBarIcon className="h-8 w-8 text-blue-500" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={navLinkClass}>
                  {link.text}
                </NavLink>
              ))}
              {currentUser?.isAdmin && (
                 <NavLink to="/admin/dashboard" className={navLinkClass}>
                    Dashboard
                </NavLink>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {!currentUser && (
                <NavLink 
                    to="/auth" 
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-md text-sm transition duration-300 ease-in-out transform hover:scale-105 shadow-md shadow-blue-500/30"
                >
                    Register Now
                </NavLink>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? <MenuIcon className="block h-6 w-6" /> : <XIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                {link.text}
              </NavLink>
            ))}
            {currentUser?.isAdmin && (
                <NavLink to="/admin/dashboard" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                    Dashboard
                </NavLink>
            )}
             {!currentUser && (
                <NavLink to="/auth" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                  Register Now
                </NavLink>
              )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
