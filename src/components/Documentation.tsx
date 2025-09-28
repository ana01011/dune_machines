import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Users, 
  Network, 
  MousePointer, 
  Layers, 
  Zap, 
  Shield, 
  Target,
  CheckCircle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export const Documentation: React.FC = () => {
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

  return (
    <div 
      ref={containerRef}
      className="min-h-screen text-white/90"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #010409 10%, #020617 20%, #0a0f1c 35%, #0f172a 50%, #020617 65%, #010409 80%, #000000 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              SYSTEM DOCUMENTATION
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light">
            Enterprise-grade organizational visualization and workflow management
          </p>
        </div>

        {/* Overview Section */}
        <div ref={addToRefs} className="mb-20">
          <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-3xl font-light text-white">System Overview</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-lg text-white/70 leading-relaxed font-light">
                  The Thinking Machines Corporate Workflow system provides real-time visualization 
                  of organizational hierarchies, team dynamics, and cross-departmental communication 
                  patterns. Built for enterprise environments requiring sophisticated workflow analysis.
                </p>
                
                <div className="space-y-4">
                  {[
                    'Real-time organizational mapping',
                    'Dynamic team formation visualization', 
                    'Cross-departmental communication tracking',
                    'Enterprise-grade security and compliance'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center text-white/80">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      <span className="font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-medium text-white mb-6">Key Capabilities</h3>
                <div className="space-y-3 text-white/70">
                  <div className="flex justify-between">
                    <span>Organizational Structure</span>
                    <span className="text-cyan-400">60+ agents</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Department Coverage</span>
                    <span className="text-cyan-400">6 major departments</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hierarchy Levels</span>
                    <span className="text-cyan-400">4 management tiers</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Real-time Updates</span>
                    <span className="text-emerald-400">60fps rendering</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Guide */}
        <div ref={addToRefs} className="mb-20">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mr-4">
              <MousePointer className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-3xl font-light text-white">Interaction Guide</h2>
          </div>

          <Tabs defaultValue="single-click" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="single-click" className="text-sm font-light">Single Click</TabsTrigger>
              <TabsTrigger value="multi-select" className="text-sm font-light">Multi-Select</TabsTrigger>
            </TabsList>
            
            <TabsContent value="single-click" className="space-y-6">
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center flex-shrink-0">
                    <MousePointer className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-light text-white mb-4">Single Click Selection</h3>
                    <p className="text-white/70 mb-6 leading-relaxed font-light">
                      Click any agent to activate their entire reporting hierarchy. This reveals 
                      all team members and subordinates within that organizational branch.
                    </p>
                    
                    <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                      <h4 className="text-cyan-400 font-medium mb-4">Visual Effects</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center text-white/80">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                            <span className="font-light">Selected agent highlights</span>
                          </div>
                          <div className="flex items-center text-white/80">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                            <span className="font-light">Team members activate</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center text-white/80">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                            <span className="font-light">Connection lines appear</span>
                          </div>
                          <div className="flex items-center text-white/80">
                            <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                            <span className="font-light">Department colors intensify</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="multi-select" className="space-y-6">
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <div className="text-2xl font-bold text-purple-400">⇧</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-light text-white mb-4">Multi-Select (Shift + Click)</h3>
                    <p className="text-white/70 mb-6 leading-relaxed font-light">
                      Hold Shift and click multiple C-level officers to create custom cross-departmental 
                      teams. This enables visualization of inter-departmental communication patterns.
                    </p>
                    
                    <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                      <h4 className="text-purple-400 font-medium mb-4">Advanced Features</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center text-white/80">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                            <span className="font-light">Multiple department activation</span>
                          </div>
                          <div className="flex items-center text-white/80">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                            <span className="font-light">Communication pathways</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center text-white/80">
                            <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                            <span className="font-light">Cross-departmental lines</span>
                          </div>
                          <div className="flex items-center text-white/80">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                            <span className="font-light">Team formation analysis</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Connection Types */}
        <div ref={addToRefs} className="mb-20">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mr-4">
              <Network className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-3xl font-light text-white">Connection Types</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-slate-400 rounded-full mr-3"></div>
                <h3 className="text-xl font-light text-white">Hierarchical Lines</h3>
              </div>
              <p className="text-white/70 mb-6 font-light leading-relaxed">
                Vertical and stepped connections showing direct reporting relationships 
                within the organizational structure.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-slate-400 rounded-full mr-3"></div>
                  <span className="text-white/70 font-light">Thin lines when inactive</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full mr-3"></div>
                  <span className="text-white/70 font-light">Department color when active</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></div>
                  <span className="text-white/70 font-light">Shows manager-subordinate flow</span>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-purple-400 rounded-full mr-3"></div>
                <h3 className="text-xl font-light text-white">Communication Lines</h3>
              </div>
              <p className="text-white/70 mb-6 font-light leading-relaxed">
                Horizontal connections between C-level officers indicating 
                cross-departmental collaboration and communication channels.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-slate-600 rounded-full mr-3"></div>
                  <span className="text-white/70 font-light">Nearly invisible when inactive</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white/70 font-light">Bright purple when active</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-purple-300 rounded-full mr-3"></div>
                  <span className="text-white/70 font-light">Indicates collaboration potential</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Department Structure */}
        <div ref={addToRefs} className="mb-20">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mr-4">
              <Layers className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-3xl font-light text-white">Department Structure</h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                id: 'finance',
                title: 'Finance Department',
                color: 'emerald',
                description: 'Financial strategy, risk management, and treasury operations',
                roles: ['CFO', 'Finance Director', 'Risk Director', 'Treasury Director', 'Senior Accountant', 'Financial Analyst']
              },
              {
                id: 'technology',
                title: 'Technology Department', 
                color: 'cyan',
                description: 'Software engineering, AI/ML, and infrastructure management',
                roles: ['CTO', 'Engineering Director', 'AI Director', 'Infrastructure Director', 'Senior Engineer', 'ML Engineer']
              },
              {
                id: 'marketing',
                title: 'Marketing Department',
                color: 'pink', 
                description: 'Brand strategy, digital marketing, and content creation',
                roles: ['CMO', 'Brand Director', 'Digital Director', 'Content Director', 'Brand Manager', 'Performance Marketer']
              },
              {
                id: 'operations',
                title: 'Operations Department',
                color: 'violet',
                description: 'Process optimization, supply chain, and quality assurance', 
                roles: ['COO', 'Operations Director', 'Supply Director', 'Quality Director', 'Operations Manager', 'Process Analyst']
              }
            ].map((dept) => (
              <AccordionItem key={dept.id} value={dept.id} className="bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <AccordionTrigger className="hover:bg-white/[0.02] px-8">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 bg-${dept.color}-400 rounded-full mr-4`}></div>
                    <div className="text-left">
                      <h3 className="text-lg font-light text-white">{dept.title}</h3>
                      <p className="text-sm text-white/60 font-light">{dept.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-8">
                  <div className="grid md:grid-cols-3 gap-4">
                    {dept.roles.map((role, index) => (
                      <div key={index} className="bg-black/20 rounded-lg p-3 border border-white/5">
                        <span className="text-white/80 font-light text-sm">{role}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Best Practices */}
        <div ref={addToRefs} className="mb-20">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center mr-4">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-3xl font-light text-white">Best Practices</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Project Team Formation',
                description: 'Use Shift+Click to select relevant department heads for cross-functional projects.',
                example: 'Select CTO + CMO + CFO for digital transformation initiatives',
                color: 'cyan'
              },
              {
                title: 'Workflow Analysis', 
                description: 'Single-click department heads to understand team structures and reporting lines.',
                example: 'Ideal for organizational restructuring and efficiency analysis',
                color: 'emerald'
              },
              {
                title: 'Communication Mapping',
                description: 'Visualize communication patterns between departments for better coordination.',
                example: 'Essential for understanding inter-departmental dependencies',
                color: 'purple'
              },
              {
                title: 'Risk Assessment',
                description: 'Identify critical communication paths and potential bottlenecks in workflows.',
                example: 'Helps in business continuity planning and risk mitigation',
                color: 'rose'
              }
            ].map((practice, index) => (
              <div key={index} className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className={`text-lg font-medium text-${practice.color}-400 mb-3`}>{practice.title}</h3>
                <p className="text-white/70 mb-4 font-light leading-relaxed">{practice.description}</p>
                <div className="text-sm text-white/50 font-light italic">
                  {practice.example}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reference */}
        <div ref={addToRefs}>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mr-4">
              <Zap className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-3xl font-light text-white">Quick Reference</h2>
          </div>

          <div className="bg-gradient-to-r from-white/[0.02] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-medium text-yellow-400 mb-6">Keyboard Shortcuts</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-light">Single Select</span>
                    <code className="text-white/60 bg-black/20 px-3 py-1 rounded-md font-mono text-sm">Click</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-light">Multi Select</span>
                    <code className="text-white/60 bg-black/20 px-3 py-1 rounded-md font-mono text-sm">Shift + Click</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-light">Deselect All</span>
                    <code className="text-white/60 bg-black/20 px-3 py-1 rounded-md font-mono text-sm">Click Selected</code>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-yellow-400 mb-6">Visual Indicators</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full mr-4"></div>
                    <span className="text-white/80 font-light">Active agent (bright border)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mr-4"></div>
                    <span className="text-white/80 font-light">Communication line (purple glow)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-slate-400 rounded-full mr-4"></div>
                    <span className="text-white/80 font-light">Hierarchy line (department color)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};