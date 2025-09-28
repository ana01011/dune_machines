import React from 'react';
import { Building2, Mail, Phone, MapPin, Github, Twitter, Linkedin, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer 
      className="relative border-t border-white/10 mt-20"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-light text-white tracking-wider">THINKING MACHINES</h3>
            </div>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              Enterprise-grade workflow visualization and management systems trusted by Fortune 500 companies worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-white/80 transition-colors duration-300">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-white font-medium text-sm tracking-wider">PRODUCTS</h4>
            <ul className="space-y-3">
              {[
                'Corporate Workflows',
                'Healthcare Systems',
                'Software Development',
                'Research Management',
                'Manufacturing Operations',
                'Consulting Solutions'
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-white/60 hover:text-white/90 text-sm font-light transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h4 className="text-white font-medium text-sm tracking-wider">SOLUTIONS</h4>
            <ul className="space-y-3">
              {[
                'Enterprise Integration',
                'Cloud Deployment',
                'Security & Compliance',
                'Analytics & Reporting',
                'Custom Development',
                'Training & Support'
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-white/60 hover:text-white/90 text-sm font-light transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-medium text-sm tracking-wider">CONTACT</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-white/40" />
                <span className="text-white/60 text-sm font-light">silvercity320@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter - Full Width on Mobile */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="text-center mb-4">
            <h5 className="text-white/80 text-sm font-medium">Stay Updated</h5>
          </div>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter email"
              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-l-lg text-white text-sm placeholder-white/40 focus:outline-none focus:border-white/30"
            />
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-r-lg transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/40 text-sm font-light">
            © 2025 Thinking Machines. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/40 hover:text-white/70 text-sm font-light transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 hover:text-white/70 text-sm font-light transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-white/40 hover:text-white/70 text-sm font-light transition-colors duration-300">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};