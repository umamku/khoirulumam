import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Link Hub', href: '#links' },
    { name: 'Portfolio', href: '#portfolio' },
  ];
  const location = useLocation();
  // Jika bukan di halaman utama, klik menu akan redirect ke / lalu scroll ke anchor
  function handleNavClick(e, href) {
    if (location.pathname !== '/') {
      e.preventDefault();
      window.location.href = '/' + href;
    }
  }
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 uppercase tracking-wide">
              KHOIRULUMAM.ID
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={e => handleNavClick(e, link.href)}
                  className="text-slate-600 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={e => handleNavClick(e, '#contact')}
                className="bg-cyan-50 text-cyan-700 border border-cyan-200 hover:bg-cyan-100 px-4 py-2 rounded-full text-sm font-medium transition-all"
              >
                Contact Me
              </a>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={e => { handleNavClick(e, link.href); setIsOpen(false); }}
                  className="text-slate-600 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
