import React from 'react';
import { Github, Linkedin, Instagram, Mail, Smartphone } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight uppercase">KHOIRULUMAM.ID</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Membantu bisnis bertumbuh melalui teknologi, pemasaran digital, dan edukasi yang berdampak.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-cyan-600 transition-colors"><Github size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-cyan-600 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-cyan-600 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-slate-900 font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#about" className="hover:text-cyan-600 transition-colors">About Me</a></li>
              <li><a href="#links" className="hover:text-cyan-600 transition-colors">Daftar Aplikasi</a></li>
              <li><a href="#" className="hover:text-cyan-600 transition-colors">Jadwal Training</a></li>
              <li><a href="#" className="hover:text-cyan-600 transition-colors">Download Resume</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center"><Mail size={16} className="mr-2 text-cyan-600" /> hello@khoirulumam.id</li>
              <li className="flex items-center"><Smartphone size={16} className="mr-2 text-cyan-600" /> +62 812-3456-7890</li>
              <li>
                <a href="#" className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
                  Chat via WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; 2026 Khoirul Umam. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with Next.js & Supabase</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
