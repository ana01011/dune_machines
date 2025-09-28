import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, DollarSign, MessageSquare, Menu, X, ArrowLeft, Layers } from 'lucide-react';
import { gsap } from 'gsap';

interface HeaderProps {
  onSectionChange: (section: string) => void;
  currentSection: string;
  onBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSectionChange, currentSection, onBack }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current && logoRef.current && navRef.current) {
      gsap.fromTo(headerRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
      
      gsap.fromTo(logoRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
      );
      
      gsap.fromTo(navRef.current.children,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, []);

  const navigationItems = [
    { id: 'workflow', label: 'WORKFLOW', icon: null },
    { id: 'help', label: 'HELP', icon: HelpCircle },
    { id: 'pricing', label: 'PRICING', icon: DollarSign },
    { id: 'faq', label: 'FAQ', icon: MessageSquare }
  ];

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            {/* Back Arrow */}
            <button
              onClick={onBack}
              className="p-2 rounded-lg text-white/60 hover:text-white/90 hover:bg-white/10 transition-all duration-300 mr-3"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-shrink-0">
              <h1 
                ref={logoRef}
                className="text-sm sm:text-lg font-light cursor-pointer transition-all duration-500 hover:text-white/90 tracking-[0.15em] sm:tracking-[0.2em]"
                style={{
                  fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
                  fontWeight: '300',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)'
                }}
                onClick={onBack}
              >
                THINKING MACHINES
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div ref={navRef} className="flex items-center space-x-8">
              {navigationItems.map((item) => {
                // Only show non-workflow navigation items when in workflow section
                if (currentSection === 'workflow' && item.id === 'workflow') {
                  return null;
                }
                
                if (currentSection === 'workflow') {
                  // Show only help, pricing, faq when in workflow
                  if (!['help', 'pricing', 'faq'].includes(item.id)) {
                    return null;
                  }
                  
                  const Icon = item.icon;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSectionChange(item.id)}
                      className="group relative px-4 py-2 text-sm font-light transition-all duration-300 flex items-center space-x-2 text-white/60 hover:text-white/90"
                      style={{
                        fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
                        fontWeight: '300',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      <span>{item.label}</span>
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </button>
                  );
                } else {
                  // Normal navigation for other sections
                  const Icon = item.icon;
                  const isActive = currentSection === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSectionChange(item.id)}
                      className={`
                        group relative px-4 py-2 text-sm font-light transition-all duration-300 flex items-center space-x-2
                        ${isActive 
                          ? 'text-white' 
                          : 'text-white/60 hover:text-white/90'
                        }
                      `}
                      style={{
                        fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
                        fontWeight: '300',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/80"></div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </button>
                  );
                }
              })}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white/60 hover:text-white/90 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/10"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 backdrop-blur-xl shadow-2xl" style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)'
        }}>
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navigationItems.map((item) => {
              // Only show non-workflow navigation items when in workflow section
              if (currentSection === 'workflow' && item.id === 'workflow') {
                return null;
              }
              
              if (currentSection === 'workflow') {
                // Show only help, pricing, faq when in workflow
                if (!['help', 'pricing', 'faq'].includes(item.id)) {
                  return null;
                }
              }
              
              const Icon = item.icon;
              const isActive = currentSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-3
                    ${isActive 
                      ? 'text-white bg-white/10' 
                      : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                    }
                  `}
                  style={{
                    fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
                    fontWeight: '300',
                    letterSpacing: '0.05em'
                  }}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};