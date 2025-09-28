import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  BarChart3,
  Crown,
  Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from './Footer';

gsap.registerPlugin(ScrollTrigger);

export const PricingSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
    }

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

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

  const addToCardsRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const addToSectionsRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

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

      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              ENTERPRISE PRICING
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light">
            Choose the perfect plan for your organization's workflow visualization needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          
          {/* Starter Plan */}
          <div ref={addToCardsRefs} className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 relative">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-light text-white mb-2">STARTER</h3>
              <p className="text-white/60 font-light">Perfect for small teams</p>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-4xl font-light text-white mb-2">
                $99<span className="text-lg text-white/60">/month</span>
              </div>
              <p className="text-white/60 font-light">Up to 25 agents</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                'Basic organizational visualization',
                'Single-click team selection',
                'Department color coding',
                'Basic hierarchy mapping',
                'Email support'
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-white/80">
                  <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <span className="font-light">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-light">
              START FREE TRIAL
            </Button>
          </div>

          {/* Professional Plan - Featured */}
          <div ref={addToCardsRefs} className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border-2 border-cyan-500/50 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-cyan-500 text-black px-4 py-1 rounded-full text-sm font-medium">
                MOST POPULAR
              </div>
            </div>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-light text-white mb-2">PROFESSIONAL</h3>
              <p className="text-white/60 font-light">For growing organizations</p>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-4xl font-light text-white mb-2">
                $299<span className="text-lg text-white/60">/month</span>
              </div>
              <p className="text-white/60 font-light">Up to 100 agents</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                'Advanced workflow visualization',
                'Multi-select team formation',
                'Cross-departmental communication lines',
                'Real-time collaboration tracking',
                'Custom branding options',
                'Priority support & live chat'
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-white/80">
                  <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                  <span className="font-light">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-light">
              START FREE TRIAL
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div ref={addToCardsRefs} className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 relative">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center mx-auto mb-6">
                <Crown className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-light text-white mb-2">ENTERPRISE</h3>
              <p className="text-white/60 font-light">For large corporations</p>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-4xl font-light text-white mb-2">
                Custom<span className="text-lg text-white/60"> pricing</span>
              </div>
              <p className="text-white/60 font-light">Unlimited agents</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                'Complete enterprise solution',
                'Advanced analytics & reporting',
                'API integration capabilities',
                'Custom workflow templates',
                'Dedicated account manager',
                '24/7 phone & email support'
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-white/80">
                  <Check className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                  <span className="font-light">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-light">
              CONTACT SALES
            </Button>
          </div>
        </div>

        {/* Feature Comparison */}
        <div ref={addToSectionsRefs} className="mb-20">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Feature Comparison</h2>
          
          <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/20">
                  <tr>
                    <th className="text-left p-6 text-white/80 font-light">Features</th>
                    <th className="text-center p-6 text-emerald-400 font-light">Starter</th>
                    <th className="text-center p-6 text-cyan-400 font-light">Professional</th>
                    <th className="text-center p-6 text-purple-400 font-light">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ['Maximum Agents', '25', '100', 'Unlimited'],
                    ['Organizational Visualization', '✓', '✓', '✓'],
                    ['Multi-Select Teams', '—', '✓', '✓'],
                    ['Communication Lines', '—', '✓', '✓'],
                    ['Custom Branding', '—', '✓', '✓'],
                    ['API Integration', '—', '—', '✓'],
                    ['Advanced Analytics', '—', '—', '✓']
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 1 ? 'bg-black/10' : ''}>
                      <td className="p-6 text-white/80 font-light">{row[0]}</td>
                      <td className="p-6 text-center text-white/70 font-light">{row[1]}</td>
                      <td className="p-6 text-center text-white/70 font-light">{row[2]}</td>
                      <td className="p-6 text-center text-white/70 font-light">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Enterprise Benefits */}
        <div ref={addToSectionsRefs} className="mb-20">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Why Choose Enterprise?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Advanced security features including SSO integration, audit logs, and compliance with SOC 2, GDPR, and other enterprise standards.',
                features: ['Single Sign-On (SSO) integration', 'Advanced user permissions', 'Comprehensive audit trails', 'Data encryption at rest and in transit'],
                color: 'indigo'
              },
              {
                icon: Rocket,
                title: 'Scalable Performance',
                description: 'Built to handle the largest organizations with thousands of agents, complex hierarchies, and real-time collaboration requirements.',
                features: ['Unlimited organizational size', 'High-performance rendering', 'Global CDN deployment', '99.9% uptime SLA'],
                color: 'purple'
              },
              {
                icon: Zap,
                title: 'Advanced Integration',
                description: 'Seamlessly integrate with your existing HR systems, project management tools, and business intelligence platforms.',
                features: ['REST API access', 'Webhook notifications', 'Custom data connectors', 'Real-time synchronization'],
                color: 'yellow'
              },
              {
                icon: Star,
                title: 'Dedicated Support',
                description: 'Get white-glove service with a dedicated customer success manager, priority support, and custom training for your team.',
                features: ['Dedicated account manager', 'Custom onboarding program', '24/7 priority support', 'Quarterly business reviews'],
                color: 'amber'
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${benefit.color}-500/20 to-${benefit.color}-600/20 flex items-center justify-center mr-4`}>
                    <benefit.icon className={`w-6 h-6 text-${benefit.color}-400`} />
                  </div>
                  <h3 className="text-xl font-medium text-white">{benefit.title}</h3>
                </div>
                <p className="text-white/70 mb-6 font-light leading-relaxed">
                  {benefit.description}
                </p>
                <ul className="text-sm text-white/60 space-y-2">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="font-light">• {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div ref={addToSectionsRefs} className="text-center">
          <div className="bg-gradient-to-r from-white/[0.02] to-white/[0.01] backdrop-blur-sm rounded-2xl p-12 border border-white/10">
            <h2 className="text-3xl font-light text-white mb-6">Ready to Transform Your Workflow?</h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Join thousands of organizations already using Thinking Machines to optimize 
              their corporate workflows and improve team collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white font-light px-8 py-3">
                START FREE TRIAL
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