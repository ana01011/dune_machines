import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Footer } from './Footer';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQSection: React.FC = () => {
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

  const faqData: FAQItem[] = [
    {
      category: "Getting Started",
      question: "What is the Corporate Workflow Visualization System?",
      answer: "The Corporate Workflow Visualization System is an enterprise-grade platform that provides real-time visualization of organizational hierarchies, team dynamics, and cross-departmental communication patterns. It helps organizations understand their structure, optimize workflows, and improve collaboration across departments."
    },
    {
      category: "Getting Started", 
      question: "How do I navigate the organizational chart?",
      answer: "Navigation is intuitive: single-click any agent to activate their team hierarchy, or hold Shift and click multiple C-level officers to create cross-departmental teams. The system uses color coding for different departments and shows both hierarchical reporting lines and communication pathways."
    },
    {
      category: "Features",
      question: "What do the different colored lines represent?",
      answer: "There are two types of lines: Hierarchical lines (thin, colored by department) show direct reporting relationships within the organizational structure. Communication lines (purple, glowing) appear between C-level officers when multiple departments are selected, indicating potential collaboration channels."
    },
    {
      category: "Features",
      question: "How does multi-select team formation work?",
      answer: "Hold the Shift key and click on different C-level officers (CFO, CTO, CMO, etc.) to create custom cross-functional teams. This activates communication lines between departments and visualizes potential collaboration pathways, essential for project planning and cross-departmental initiatives."
    },
    {
      category: "Features",
      question: "Can I customize the organizational structure?",
      answer: "The Professional and Enterprise plans include customization options. You can modify department structures, add custom roles, adjust color schemes, and integrate with your existing HR systems to reflect your actual organizational hierarchy."
    },
    {
      category: "Technical",
      question: "What browsers are supported?",
      answer: "The system works on all modern browsers including Chrome, Firefox, Safari, and Edge. It's optimized for both desktop and mobile devices with responsive design that adapts from mobile screens to 4K displays. Hardware acceleration ensures smooth performance even with large organizational structures."
    },
    {
      category: "Technical",
      question: "How does the system handle large organizations?",
      answer: "The platform is built for enterprise scale, supporting thousands of agents with real-time rendering at 60fps. It uses advanced optimization techniques including virtual scrolling, efficient connection algorithms, and progressive loading to maintain performance regardless of organizational size."
    },
    {
      category: "Technical",
      question: "Is there an API for integration?",
      answer: "Yes, the Enterprise plan includes comprehensive REST API access for integration with HR systems, project management tools, and business intelligence platforms. The API supports real-time synchronization, webhook notifications, and custom data connectors."
    },
    {
      category: "Pricing",
      question: "What's included in the free trial?",
      answer: "All plans include a 14-day free trial with full access to plan features. No credit card required. The trial includes sample organizational data, full functionality testing, and access to our support team to help you evaluate the system for your needs."
    },
    {
      category: "Pricing",
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can change plans at any time. Upgrades take effect immediately with prorated billing. Downgrades take effect at the next billing cycle. Enterprise customers work with their dedicated account manager for plan changes and custom requirements."
    },
    {
      category: "Security",
      question: "How secure is my organizational data?",
      answer: "We implement enterprise-grade security including data encryption at rest and in transit, SOC 2 compliance, GDPR compliance, and regular security audits. Enterprise customers get additional features like SSO integration, advanced user permissions, and comprehensive audit logs."
    }
  ];

  const categories = Array.from(new Set(faqData.map(item => item.category)));

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
              FREQUENTLY ASKED QUESTIONS
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
            Find answers to common questions about the Corporate Workflow Visualization System
          </p>
        </div>

        {/* FAQ Categories */}
        {categories.map((category) => (
          <div key={category} ref={addToRefs} className="mb-16">
            <h2 className="text-2xl font-light text-white mb-8 border-b border-white/10 pb-4">
              {category}
            </h2>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqData
                .filter(item => item.category === category)
                .map((item, index) => {
                  const globalIndex = faqData.indexOf(item);
                  
                  return (
                    <AccordionItem 
                      key={globalIndex}
                      value={`item-${globalIndex}`}
                      className="bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                    >
                      <AccordionTrigger className="hover:bg-white/[0.02] px-8">
                        <h3 className="text-lg font-medium text-white text-left">
                          {item.question}
                        </h3>
                      </AccordionTrigger>
                      <AccordionContent className="px-8">
                        <div className="border-t border-white/5 pt-6">
                          <p className="text-white/70 leading-relaxed font-light">
                            {item.answer}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
            </Accordion>
          </div>
        ))}

        {/* Contact Section */}
        <div ref={addToRefs} className="mt-20">
          <div className="bg-gradient-to-r from-white/[0.02] to-white/[0.01] backdrop-blur-sm rounded-2xl p-12 border border-white/10 text-center">
            <h2 className="text-2xl font-light text-white mb-6">Still Have Questions?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              Our support team is here to help. Get in touch for personalized assistance 
              with your workflow visualization needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white font-light px-8 py-3">
                CONTACT SUPPORT
              </Button>
              <Button variant="outline" className="border-white/20 text-white/80 hover:text-white hover:bg-white/5 font-light px-8 py-3">
                SCHEDULE DEMO
              </Button>
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