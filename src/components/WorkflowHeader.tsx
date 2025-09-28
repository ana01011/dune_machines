import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Globe, Building2, Heart, Cpu, Microscope, BookOpen, Factory, Briefcase, Truck, ShoppingCart, Scale, Rocket, User, Menu, X, ChevronDown, Users } from 'lucide-react';
import { gsap } from 'gsap';

interface WorkflowHeaderProps {
  onBack: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onWorkflowSelect?: (workflowId: string) => void;
}

export const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({ onBack, selectedCategory, onCategoryChange, onWorkflowSelect }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
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

  const categories = [
    { id: 'all', label: 'All', icon: Globe },
    { id: 'Corporate', label: 'Corporate', icon: Building2 },
    { id: 'Healthcare', label: 'Healthcare', icon: Heart },
    { id: 'Technology', label: 'Technology', icon: Cpu },
    { id: 'Research', label: 'Research', icon: Microscope },
    { id: 'Education', label: 'Education', icon: BookOpen },
    { id: 'Manufacturing', label: 'Manufacturing', icon: Factory },
    { id: 'Consulting', label: 'Consulting', icon: Briefcase },
    { id: 'Logistics', label: 'Logistics', icon: Truck },
    { id: 'Retail', label: 'Retail', icon: ShoppingCart },
    { id: 'Legal', label: 'Legal', icon: Scale },
    { id: 'Startup', label: 'Startup', icon: Rocket },
    { id: 'Individual', label: 'Individual', icon: User }
  ];

  const workflows = [
    { 
      id: 'corporate', 
      title: 'Corporate Enterprise', 
      icon: Building2, 
      agents: ['CEO', 'CFO', 'CTO', 'CMO', 'COO', 'CHRO', 'CISO'],
      color: 'blue'
    },
    { 
      id: 'healthcare', 
      title: 'Healthcare System', 
      icon: Heart, 
      agents: ['Chief Medical Officer', 'Head of Surgery', 'Head of Emergency', 'Head of Nursing'],
      color: 'emerald'
    },
    { 
      id: 'technology', 
      title: 'Software Development', 
      icon: Cpu, 
      agents: ['CTO', 'Engineering Director', 'Product Manager', 'Lead Developer'],
      color: 'purple'
    },
    { 
      id: 'research', 
      title: 'Research & Development', 
      icon: Microscope, 
      agents: ['Research Director', 'Principal Investigator', 'Lab Manager', 'Data Scientist'],
      color: 'cyan'
    },
    { 
      id: 'education', 
      title: 'Educational Institution', 
      icon: BookOpen, 
      agents: ['Dean', 'Department Head', 'Faculty Coordinator', 'Student Services'],
      color: 'amber'
    },
    { 
      id: 'manufacturing', 
      title: 'Manufacturing Operations', 
      icon: Factory, 
      agents: ['Operations Manager', 'Production Supervisor', 'Quality Control', 'Safety Officer'],
      color: 'slate'
    },
    { 
      id: 'consulting', 
      title: 'Management Consulting', 
      icon: Briefcase, 
      agents: ['Managing Partner', 'Senior Partner', 'Principal', 'Senior Consultant'],
      color: 'indigo'
    },
    { 
      id: 'logistics', 
      title: 'Supply Chain & Logistics', 
      icon: Truck, 
      agents: ['Logistics Manager', 'Warehouse Supervisor', 'Transportation Coordinator', 'Inventory Manager'],
      color: 'orange'
    },
    { 
      id: 'retail', 
      title: 'Retail Operations', 
      icon: ShoppingCart, 
      agents: ['Store Manager', 'Sales Supervisor', 'Inventory Specialist', 'Customer Service Lead'],
      color: 'pink'
    },
    { 
      id: 'legal', 
      title: 'Legal Practice Management', 
      icon: Scale, 
      agents: ['Managing Partner', 'Senior Associate', 'Paralegal Supervisor', 'Legal Secretary'],
      color: 'teal'
    },
    { 
      id: 'startup', 
      title: 'Startup Operations', 
      icon: Rocket, 
      agents: ['Founder/CEO', 'CTO', 'Head of Growth', 'Lead Developer'],
      color: 'violet'
    },
    { 
      id: 'individual', 
      title: 'Individual Professional', 
      icon: User, 
      agents: ['Project Manager', 'Client Relations', 'Financial Planner', 'Marketing Specialist'],
      color: 'emerald'
    }
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
          {/* Logo and Back */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg text-white/60 hover:text-white/90 hover:bg-white/10 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div ref={logoRef} className="flex items-center">
              <h1 className="text-sm sm:text-lg font-light tracking-[0.15em] sm:tracking-[0.2em] text-white/85">
                THINKING MACHINES
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => window.location.href = '#help'}
                className="text-white/60 hover:text-white/90 text-sm font-light transition-all duration-300 px-3 py-2"
              >
                HELP
              </button>
              <button
                onClick={() => window.location.href = '#pricing'}
                className="text-white/60 hover:text-white/90 text-sm font-light transition-all duration-300 px-3 py-2"
              >
                PRICING
              </button>
              <button
                onClick={() => window.location.href = '#faq'}
                className="text-white/60 hover:text-white/90 text-sm font-light transition-all duration-300 px-3 py-2"
              >
                FAQ
              </button>
            </div>
          </nav>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <div ref={navRef} className="flex items-center space-x-2">
              {categories.slice(0, 8).map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`
                      group relative px-3 py-2 text-xs font-light transition-all duration-300 flex items-center space-x-2 rounded-lg
                      ${isActive 
                        ? 'text-white bg-white/10 border border-white/20' 
                        : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Mobile Navigation Menu */}
          <div className="md:hidden">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.location.href = '#help'}
                className="text-white/60 hover:text-white/90 text-xs font-light transition-all duration-300 px-2 py-1"
              >
                HELP
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white/60 hover:text-white/90 hover:bg-white/10 transition-all duration-300"
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
        <div className="lg:hidden border-t border-white/10 backdrop-blur-xl" style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)'
        }}>
          <div className="px-4 pt-4 pb-6 grid grid-cols-2 gap-2">
            {/* Workflows Section */}
            <div className="col-span-2 mb-4">
              <div className="text-xs text-white/60 font-medium mb-3 tracking-wider">WORKFLOWS</div>
              <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {workflows.map((workflow) => {
                  const Icon = workflow.icon;
                  const isExpanded = expandedWorkflow === workflow.id;
                  
                  return (
                    <div
                      key={workflow.id}
                      className="border border-white/10 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedWorkflow(isExpanded ? null : workflow.id)}
                        className={`w-full text-left px-4 py-3 text-sm font-light transition-all duration-300 flex items-center justify-between rounded-xl text-white/70 hover:text-white/90 hover:bg-white/5 hover:border-${workflow.color}-400/50`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-${workflow.color}-500/20 to-${workflow.color}-600/20 flex items-center justify-center`}>
                            <Icon className={`w-4 h-4 text-${workflow.color}-400`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{workflow.title}</div>
                            <div className="text-xs text-white/50">{workflow.agents.length} Key Roles</div>
                          </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isExpanded && (
                        <div className="px-4 pb-3 border-t border-white/5">
                          <div className="text-xs text-white/60 font-medium mb-2 mt-2">Key Agents:</div>
                          <div className="space-y-1">
                            {workflow.agents.slice(0, 4).map((agent, index) => (
                              <div key={index} className="text-xs text-white/70 flex items-center">
                                <div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-2"></div>
                                {agent}
                              </div>
                            ))}
                            {workflow.agents.length > 4 && (
                              <div className="text-xs text-white/50 flex items-center">
                                <div className="w-1.5 h-1.5 bg-white/20 rounded-full mr-2"></div>
                                +{workflow.agents.length - 4} more roles
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              onWorkflowSelect?.(workflow.id);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`w-full mt-3 px-3 py-2 bg-gradient-to-r from-${workflow.color}-600/20 to-${workflow.color}-700/20 border border-${workflow.color}-400/30 rounded-lg text-xs font-medium text-${workflow.color}-400 hover:bg-${workflow.color}-600/30 transition-all duration-300`}
                          >
                            Explore Workflow
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Categories */}
            <div className="col-span-2 mb-4">
              <div className="text-xs text-white/60 font-medium mb-3 tracking-wider">CATEGORIES</div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        onCategoryChange(category.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`
                        text-left px-4 py-3 text-sm font-light transition-all duration-300 flex items-center space-x-3 rounded-xl border
                        ${isActive 
                          ? 'text-white bg-white/10 border-white/20' 
                          : 'text-white/70 hover:text-white/90 hover:bg-white/5 border-white/10'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};