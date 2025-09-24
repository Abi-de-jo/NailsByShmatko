import React from 'react';
import { Link } from 'react-router-dom';
import { translations } from '../../data/translations';
 
const Navbar: React.FC = () => {
  const navLinks = [
    { name: translations.uk.home, href: '/home' },
    { name: translations.uk.services, href: '/services' },
    { name: translations.uk.gallery, href: '/gallery' },
  ];

  return (
    <nav className="w-full bg-transparent sticky z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-center items-center space-x-4 md:space-x-8 lg:space-x-12 flex-wrap gap-2 md:gap-0">
          {/* Navigation Links - Responsive */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-[#1c0038] hover:text-[#9929EA] font-medium md:font-semibold text-sm md:text-lg transition-colors duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#CC66DA] after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full px-2 py-1 md:px-0 md:py-0"
            >
              {link.name}
            </Link>
          ))}
          
          <Link
            to="/book"
            className="relative px-4 py-2 md:px-8 md:py-3 text-[#1c0038] font-medium md:font-semibold text-sm md:text-lg rounded-full transition-all duration-500 group whitespace-nowrap"
          >
            <span className="relative z-10">{translations.uk.book}</span>
            
            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#9929EA] transition-all duration-300"></div>
            
            <div className="absolute inset-0 rounded-full bg-[#9929EA] scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;