import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Footer } from './Footer';

gsap.registerPlugin(ScrollTrigger);

export const HelpSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
    }

    sectionsRef.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(section,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const faqData = [
    {
      question: "How do I select multiple departments for cross-functional analysis?",
      answer: "Hold the Shift key and click on different C-level officers (CFO, CTO, CMO, etc.). This will activate communication lines between departments and show potential collaboration pathways. Purple lines will appear connecting the selected officers."
    },
    {
      question: "What do the different colored lines represent?",
      answer: "Thin colored lines show hierarchical reporting relationships within departments (each department has its own color). Purple glowing lines represent active communication channels between C-level officers when multiple departments are selected."
    },
    {
      question: "Why don't I see hierarchy lines when I select a department head?",
      answer: "Hierarchy lines only appear when both the manager and their team members are active. If you select a C-level officer, their entire team becomes active and hierarchy lines will show. If lines don't appear, ensure you're clicking directly on the agent card."
    },
    {
      question: "How do I reset the visualization to show no active connections?",
      answer: "Click on any currently selected agent to deselect them. If multiple agents are selected, you may need to Shift+Click each one to deselect them individually, or click on an already selected agent to clear the selection."
    },
    {
      question: "Can I export or save the current visualization state?",
      answer: "Currently, the system is designed for real-time analysis. Export functionality is available in the enterprise version. Contact our sales team for information about advanced features and enterprise licensing."
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen text-white/90"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #010409 10%, #020617 20%, #0a0f1c 35%, #0f172a 50%, #020617 65%, #010409 80%, #000000 100%)'
      }}
    >
      {/* Twinkling Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(120)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute bg-white rounded-full animate-pulse twinkle-star"
            style={{
              width: '1px',
              height: '1px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.3 + Math.random() * 0.7,
              boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)',
              transform: `scale(${0.5 + Math.random() * 0.5})`
            }}
          />
        ))}
        {/* Additional tiny glitter layer */}
        {[...Array(80)].map((_, i) => (
          <div
            key={`glitter-${i}`}
            className="absolute bg-blue-200 rounded-full animate-pulse twinkle-star-blue"
            style={{
              width: '0.5px',
              height: '0.5px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
              opacity: 0.2 + Math.random() * 0.5,
              boxShadow: '0 0 1px rgba(191, 219, 254, 0.6)',
              transform: `scale(${0.3 + Math.random() * 0.4})`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              HELP & SUPPORT
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
            Get assistance with the Corporate Workflow Visualization System
          </p>
        </div>

        {/* Quick Help Cards */}
        <div ref={addToRefs} className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-3">Getting Started</h3>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              New to the system? Learn the basics of navigation and interaction.
            </p>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-6">
              <Info className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-3">Feature Guide</h3>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              Detailed explanations of all system features and capabilities.
            </p>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-3">Troubleshooting</h3>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              Common issues and solutions for optimal system performance.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div ref={addToRefs} className="mb-16">
          <h2 className="text-3xl font-light text-white mb-8 text-center">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <AccordionTrigger className="hover:bg-white/[0.02] px-8">
                  <h3 className="text-lg font-medium text-cyan-400 text-left">
                    {item.question}
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="px-8">
                  <p className="text-white/70 leading-relaxed font-light">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support */}
        <div ref={addToRefs} className="mb-16">
          <h2 className="text-3xl font-light text-white mb-8 text-center">Contact Support</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-medium text-white">Email Support</h3>
              </div>
              <p className="text-white/70 mb-6 font-light leading-relaxed">
                Get detailed assistance via email. We typically respond within 24 hours.
              </p>
              <div className="text-cyan-400 font-mono text-sm">support@thinkingmachines.ai</div>
            </div>

            <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center mr-4">
                  <MessageCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-medium text-white">Live Chat</h3>
              </div>
              <p className="text-white/70 mb-6 font-light leading-relaxed">
                Real-time support for urgent issues and quick questions.
              </p>
              <div className="text-emerald-400 text-sm">Available 9 AM - 6 PM EST</div>
            </div>

            <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-medium text-white">Phone Support</h3>
              </div>
              <p className="text-white/70 mb-6 font-light leading-relaxed">
                Direct phone support for enterprise customers and critical issues.
              </p>
              <div className="text-purple-400 font-mono text-sm">+1 (555) 123-4567</div>
            </div>

            <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-medium text-white">Support Hours</h3>
              </div>
              <p className="text-white/70 mb-6 font-light leading-relaxed">
                Our support team is available during business hours in multiple time zones.
              </p>
              <div className="text-amber-400 text-sm space-y-1">
                <div>EST: 9 AM - 6 PM</div>
                <div>PST: 6 AM - 3 PM</div>
                <div>GMT: 2 PM - 11 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div ref={addToRefs}>
          <h2 className="text-3xl font-light text-white mb-8 text-center">System Status</h2>
          
          <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-medium text-white">Current System Status</h3>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-emerald-400 font-medium">All Systems Operational</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-light text-emerald-400 mb-2">99.9%</div>
                <div className="text-white/60 text-sm font-light">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-cyan-400 mb-2">&lt;50ms</div>
                <div className="text-white/60 text-sm font-light">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-purple-400 mb-2">0</div>
                <div className="text-white/60 text-sm font-light">Active Issues</div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />

      {/* Twinkling Stars Styles */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(0.5);
            filter: brightness(0.8);
          }
          25% { 
            opacity: 1; 
            transform: scale(1.2);
            filter: brightness(1.5);
          }
          50% { 
            opacity: 0.6; 
            transform: scale(0.8);
            filter: brightness(1.2);
          }
          75% { 
            opacity: 0.9; 
            transform: scale(1);
            filter: brightness(1.3);
          }
        }
        
        @keyframes twinkleBlue {
          0%, 100% { 
            opacity: 0.2; 
            transform: scale(0.3);
            filter: brightness(0.7) hue-rotate(0deg);
          }
          33% { 
            opacity: 0.8; 
            transform: scale(1);
            filter: brightness(1.4) hue-rotate(10deg);
          }
          66% { 
            opacity: 0.5; 
            transform: scale(0.6);
            filter: brightness(1.1) hue-rotate(-5deg);
          }
        }
        
        .twinkle-star {
          animation: twinkle 3s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
        
        .twinkle-star-blue {
          animation: twinkleBlue 4s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
        
        /* Ensure consistent sizing across all devices */
        @media (max-width: 768px) {
          .twinkle-star {
            width: 1px !important;
            height: 1px !important;
            max-width: 1px;
            max-height: 1px;
          }
          
          .twinkle-star-blue {
            width: 0.5px !important;
            height: 0.5px !important;
            max-width: 0.5px;
            max-height: 0.5px;
          }
        }
      `}</style>
    </div>
  );
};