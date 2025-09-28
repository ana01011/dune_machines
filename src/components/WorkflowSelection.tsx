import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Building2, 
  Stethoscope, 
  Code, 
  FlaskConical, 
  GraduationCap, 
  Factory, 
  Briefcase, 
  Truck, 
  ShoppingCart, 
  Scale,
  ArrowRight,
  Users,
  Zap,
  Shield,
  BarChart3,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Globe,
  Cpu,
  Heart,
  Microscope,
  Rocket,
  BookOpen,
  Wrench,
  DollarSign,
  Package,
  ChevronRight,
  Filter,
  Search,
  Award,
  Target,
  Layers,
  Activity,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WorkflowHeader } from './WorkflowHeader';
import { Footer } from './Footer';

gsap.registerPlugin(ScrollTrigger);

interface WorkflowType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  agents: number;
  departments: string[];
  features: string[];
  complexity: 'Simple' | 'Moderate' | 'Complex' | 'Enterprise';
  industry: string;
  useCases: string[];
  benefits: string[];
  pricing: string;
  deployment: string;
  sla: string;
  security: string[];
  integrations: string[];
  analytics: string[];
}

interface WorkflowSelectionProps {
  onWorkflowSelect: (workflowId: string) => void;
  onBack: () => void;
}

export const WorkflowSelection: React.FC<WorkflowSelectionProps> = ({ onWorkflowSelect, onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const workflowTypes: WorkflowType[] = [
    {
      id: 'corporate',
      title: 'Corporate Enterprise',
      subtitle: 'Fortune 500 Organizational Management',
      description: 'Complete enterprise hierarchy with C-suite executives, department heads, and cross-functional teams for Fortune 500 companies.',
      detailedDescription: 'Industry-leading corporate workflow system designed for Fortune 500 companies. Features comprehensive organizational mapping, executive dashboards, cross-departmental communication, and real-time collaboration tools.',
      icon: Building2,
      color: 'blue',
      gradient: 'from-blue-600 to-indigo-600',
      agents: 60,
      departments: ['Executive', 'Finance', 'Technology', 'Marketing', 'Operations', 'HR', 'Security'],
      features: ['Multi-level hierarchy', 'Executive dashboards', 'Cross-departmental communication', 'Real-time collaboration', 'Performance analytics', 'Strategic planning'],
      complexity: 'Enterprise',
      industry: 'Corporate',
      useCases: ['Organizational restructuring', 'Strategic planning', 'Team formation', 'Communication mapping', 'Performance optimization'],
      benefits: ['30% efficiency improvement', 'Reduced communication gaps', 'Clear accountability', 'Strategic alignment', 'Data-driven decisions'],
      pricing: 'Enterprise',
      deployment: 'Cloud/On-premise',
      sla: '99.9% uptime',
      security: ['SOC 2 Type II', 'ISO 27001', 'GDPR compliant', 'End-to-end encryption'],
      integrations: ['Salesforce', 'Microsoft 365', 'Slack', 'Jira', 'SAP'],
      analytics: ['Executive KPIs', 'Team performance', 'Communication patterns', 'Resource utilization']
    },
    {
      id: 'medical',
      title: 'Healthcare System',
      subtitle: 'Medical Institution Management',
      description: 'Comprehensive healthcare workflow with medical specialists, nursing staff, and patient care coordination for hospitals and clinics.',
      detailedDescription: 'Advanced healthcare management system for hospitals and medical institutions. Streamlines patient care, medical team coordination, emergency protocols, and resource allocation with HIPAA compliance.',
      icon: Stethoscope,
      color: 'emerald',
      gradient: 'from-emerald-600 to-green-600',
      agents: 45,
      departments: ['Emergency', 'Surgery', 'Internal Medicine', 'Pediatrics', 'Radiology', 'Laboratory', 'Administration'],
      features: ['Patient flow tracking', 'Medical team coordination', 'Emergency protocols', 'Resource allocation', 'HIPAA compliance', 'Clinical workflows'],
      complexity: 'Complex',
      industry: 'Healthcare',
      useCases: ['Patient care coordination', 'Emergency response', 'Resource optimization', 'Quality assurance', 'Compliance management'],
      benefits: ['25% faster patient processing', 'Reduced wait times', 'Improved patient outcomes', 'Better resource utilization', 'Enhanced safety'],
      pricing: 'Custom',
      deployment: 'Secure cloud',
      sla: '99.95% uptime',
      security: ['HIPAA compliant', 'HL7 FHIR', 'SOC 2 Type II', 'Data encryption'],
      integrations: ['Epic', 'Cerner', 'Allscripts', 'MEDITECH', 'athenahealth'],
      analytics: ['Patient outcomes', 'Resource utilization', 'Wait times', 'Quality metrics']
    },
    {
      id: 'software',
      title: 'Software Development',
      subtitle: 'Agile Development Teams',
      description: 'Modern software development workflow with product managers, engineers, designers, and DevOps specialists for tech companies.',
      detailedDescription: 'Cutting-edge software development platform for tech companies. Supports agile methodologies, continuous integration/deployment, code review processes, and cross-functional team collaboration.',
      icon: Code,
      color: 'purple',
      gradient: 'from-purple-600 to-violet-600',
      agents: 35,
      departments: ['Product', 'Engineering', 'Design', 'QA', 'DevOps', 'Security', 'Data'],
      features: ['Agile methodology', 'Sprint planning', 'Code review process', 'CI/CD pipelines', 'Performance monitoring', 'Security scanning'],
      complexity: 'Complex',
      industry: 'Technology',
      useCases: ['Sprint planning', 'Feature development', 'Bug tracking', 'Release management', 'Performance optimization'],
      benefits: ['40% faster delivery', 'Higher code quality', 'Better team collaboration', 'Reduced bugs', 'Automated workflows'],
      pricing: 'Tiered',
      deployment: 'Cloud-native',
      sla: '99.9% uptime',
      security: ['OWASP compliant', 'Code scanning', 'Vulnerability assessment', 'Access controls'],
      integrations: ['GitHub', 'Jira', 'Jenkins', 'Docker', 'Kubernetes', 'AWS'],
      analytics: ['Velocity metrics', 'Code quality', 'Deployment frequency', 'Lead time']
    },
    {
      id: 'research',
      title: 'Research & Development',
      subtitle: 'Scientific Research Management',
      description: 'Academic and industrial research workflow with principal investigators, researchers, and lab technicians for R&D organizations.',
      detailedDescription: 'Advanced research management platform for universities and R&D organizations. Facilitates project tracking, resource management, publication workflows, and collaborative research initiatives.',
      icon: FlaskConical,
      color: 'cyan',
      gradient: 'from-cyan-600 to-blue-600',
      agents: 25,
      departments: ['Research', 'Laboratory', 'Data Analysis', 'Publications', 'Grants', 'Ethics', 'Administration'],
      features: ['Project tracking', 'Resource management', 'Publication workflow', 'Grant coordination', 'Data analysis', 'Collaboration tools'],
      complexity: 'Moderate',
      industry: 'Research',
      useCases: ['Project management', 'Resource allocation', 'Publication tracking', 'Grant applications', 'Collaboration'],
      benefits: ['Faster research cycles', 'Better collaboration', 'Efficient resource use', 'Higher publication rate', 'Grant success'],
      pricing: 'Academic',
      deployment: 'Hybrid cloud',
      sla: '99.5% uptime',
      security: ['Research data protection', 'IP security', 'Access controls', 'Audit trails'],
      integrations: ['ORCID', 'PubMed', 'ResearchGate', 'Mendeley', 'EndNote'],
      analytics: ['Research metrics', 'Publication impact', 'Resource usage', 'Collaboration patterns']
    },
    {
      id: 'education',
      title: 'Educational Institution',
      subtitle: 'Academic Management System',
      description: 'Complete educational workflow with faculty, administrators, support staff, and student services for universities and schools.',
      detailedDescription: 'Comprehensive education management system for universities and schools. Manages academic affairs, student services, faculty coordination, and institutional operations with student privacy protection.',
      icon: GraduationCap,
      color: 'amber',
      gradient: 'from-amber-600 to-orange-600',
      agents: 40,
      departments: ['Academic Affairs', 'Student Services', 'Administration', 'IT', 'Library', 'Facilities', 'Finance'],
      features: ['Course management', 'Student tracking', 'Faculty coordination', 'Resource planning', 'Academic analytics', 'Student support'],
      complexity: 'Complex',
      industry: 'Education',
      useCases: ['Curriculum planning', 'Student support', 'Faculty management', 'Resource allocation', 'Academic planning'],
      benefits: ['Better learning outcomes', 'Efficient operations', 'Improved satisfaction', 'Cost optimization', 'Data insights'],
      pricing: 'Educational',
      deployment: 'Cloud/On-premise',
      sla: '99.7% uptime',
      security: ['FERPA compliant', 'Student privacy', 'Data protection', 'Access controls'],
      integrations: ['Canvas', 'Blackboard', 'Moodle', 'Banner', 'PeopleSoft'],
      analytics: ['Student performance', 'Faculty metrics', 'Resource utilization', 'Enrollment trends']
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing Operations',
      subtitle: 'Industrial Production Management',
      description: 'Industrial manufacturing workflow with production managers, engineers, quality control, and supply chain teams for factories.',
      detailedDescription: 'Advanced manufacturing execution system for industrial operations. Optimizes production scheduling, quality control, supply chain management, and maintenance operations with Industry 4.0 capabilities.',
      icon: Factory,
      color: 'slate',
      gradient: 'from-slate-600 to-gray-600',
      agents: 50,
      departments: ['Production', 'Quality Control', 'Supply Chain', 'Maintenance', 'Engineering', 'Safety', 'Planning'],
      features: ['Production scheduling', 'Quality tracking', 'Supply chain management', 'Predictive maintenance', 'Safety monitoring', 'IoT integration'],
      complexity: 'Enterprise',
      industry: 'Manufacturing',
      useCases: ['Production optimization', 'Quality assurance', 'Supply chain management', 'Maintenance scheduling', 'Safety compliance'],
      benefits: ['20% efficiency increase', 'Reduced downtime', 'Better quality control', 'Cost savings', 'Safety improvement'],
      pricing: 'Enterprise',
      deployment: 'Edge/Cloud hybrid',
      sla: '99.8% uptime',
      security: ['Industrial security', 'OT/IT convergence', 'Cyber-physical security', 'Access controls'],
      integrations: ['SAP', 'Oracle', 'Siemens', 'Rockwell', 'GE Digital'],
      analytics: ['OEE metrics', 'Quality trends', 'Predictive maintenance', 'Supply chain KPIs']
    },
    {
      id: 'consulting',
      title: 'Management Consulting',
      subtitle: 'Professional Services Excellence',
      description: 'Management consulting workflow with partners, senior consultants, analysts, and specialized practice areas for consulting firms.',
      detailedDescription: 'Premium consulting management platform for professional services firms. Manages client engagements, project delivery, knowledge sharing, and resource allocation with enterprise-grade security.',
      icon: Briefcase,
      color: 'indigo',
      gradient: 'from-indigo-600 to-purple-600',
      agents: 30,
      departments: ['Strategy', 'Operations', 'Technology', 'HR', 'Finance', 'Marketing', 'Business Development'],
      features: ['Project management', 'Client engagement', 'Knowledge sharing', 'Resource allocation', 'Time tracking', 'Billing integration'],
      complexity: 'Complex',
      industry: 'Consulting',
      useCases: ['Project delivery', 'Client management', 'Knowledge management', 'Team allocation', 'Performance tracking'],
      benefits: ['Higher client satisfaction', 'Efficient delivery', 'Knowledge leverage', 'Better margins', 'Scalable growth'],
      pricing: 'Professional',
      deployment: 'Secure cloud',
      sla: '99.9% uptime',
      security: ['Client confidentiality', 'Data encryption', 'Access controls', 'Audit trails'],
      integrations: ['Salesforce', 'Microsoft Project', 'Tableau', 'Power BI', 'SharePoint'],
      analytics: ['Project profitability', 'Utilization rates', 'Client satisfaction', 'Knowledge metrics']
    },
    {
      id: 'logistics',
      title: 'Supply Chain & Logistics',
      subtitle: 'Global Distribution Network',
      description: 'Comprehensive logistics workflow with warehouse managers, drivers, dispatchers, and supply chain coordinators for logistics companies.',
      detailedDescription: 'Advanced logistics management system for global supply chains. Optimizes route planning, inventory management, delivery tracking, and warehouse operations with real-time visibility.',
      icon: Truck,
      color: 'orange',
      gradient: 'from-orange-600 to-red-600',
      agents: 35,
      departments: ['Warehouse', 'Transportation', 'Dispatch', 'Inventory', 'Customer Service', 'Planning', 'Quality'],
      features: ['Route optimization', 'Inventory tracking', 'Delivery scheduling', 'Warehouse management', 'Real-time tracking', 'Performance monitoring'],
      complexity: 'Complex',
      industry: 'Logistics',
      useCases: ['Route planning', 'Inventory management', 'Delivery tracking', 'Warehouse optimization', 'Performance monitoring'],
      benefits: ['30% cost reduction', 'Faster delivery', 'Better tracking', 'Higher satisfaction', 'Optimized routes'],
      pricing: 'Volume-based',
      deployment: 'Cloud/Mobile',
      sla: '99.5% uptime',
      security: ['Supply chain security', 'Data protection', 'Mobile security', 'Access controls'],
      integrations: ['SAP', 'Oracle WMS', 'TMS systems', 'EDI', 'GPS tracking'],
      analytics: ['Delivery performance', 'Cost optimization', 'Route efficiency', 'Customer satisfaction']
    },
    {
      id: 'retail',
      title: 'Retail Operations',
      subtitle: 'Omnichannel Commerce Management',
      description: 'Modern retail workflow with store managers, sales associates, inventory specialists, and customer service teams for retail chains.',
      detailedDescription: 'Comprehensive retail management system for omnichannel commerce. Integrates in-store operations, e-commerce, inventory management, and customer experience optimization.',
      icon: ShoppingCart,
      color: 'pink',
      gradient: 'from-pink-600 to-rose-600',
      agents: 40,
      departments: ['Store Operations', 'E-commerce', 'Inventory', 'Customer Service', 'Marketing', 'Merchandising', 'Analytics'],
      features: ['Omnichannel integration', 'Inventory synchronization', 'Customer journey tracking', 'Sales analytics', 'Staff scheduling', 'Promotion management'],
      complexity: 'Complex',
      industry: 'Retail',
      useCases: ['Store management', 'Inventory optimization', 'Customer experience', 'Sales performance', 'Staff coordination'],
      benefits: ['Unified customer experience', 'Inventory optimization', 'Higher conversion rates', 'Better staff efficiency', 'Data-driven insights'],
      pricing: 'Tiered',
      deployment: 'Cloud/Edge',
      sla: '99.7% uptime',
      security: ['PCI DSS compliant', 'Customer data protection', 'Payment security', 'Access controls'],
      integrations: ['Shopify', 'Salesforce Commerce', 'SAP Retail', 'Oracle Retail', 'POS systems'],
      analytics: ['Sales performance', 'Customer behavior', 'Inventory turnover', 'Staff productivity']
    },
    {
      id: 'legal',
      title: 'Legal Practice Management',
      subtitle: 'Law Firm Operations',
      description: 'Professional legal workflow with partners, associates, paralegals, and support staff for law firms and legal departments.',
      detailedDescription: 'Advanced legal practice management system for law firms and corporate legal departments. Manages case workflows, document management, billing, and client relationships with strict confidentiality.',
      icon: Scale,
      color: 'teal',
      gradient: 'from-teal-600 to-cyan-600',
      agents: 25,
      departments: ['Litigation', 'Corporate Law', 'Compliance', 'Research', 'Administration', 'Business Development', 'IT'],
      features: ['Case management', 'Document automation', 'Time tracking', 'Billing integration', 'Client portal', 'Compliance monitoring'],
      complexity: 'Complex',
      industry: 'Legal',
      useCases: ['Case management', 'Document workflow', 'Client communication', 'Billing automation', 'Compliance tracking'],
      benefits: ['Streamlined workflows', 'Better client service', 'Accurate billing', 'Compliance assurance', 'Knowledge management'],
      pricing: 'Professional',
      deployment: 'Secure cloud',
      sla: '99.9% uptime',
      security: ['Attorney-client privilege', 'Data encryption', 'Access controls', 'Audit trails'],
      integrations: ['LexisNexis', 'Westlaw', 'NetDocuments', 'Clio', 'QuickBooks'],
      analytics: ['Case metrics', 'Billing analysis', 'Client satisfaction', 'Resource utilization']
    },
    {
      id: 'startup',
      title: 'Startup Operations',
      subtitle: 'Agile Startup Management',
      description: 'Lean startup workflow with founders, developers, marketers, and growth teams optimized for rapid scaling and agility.',
      detailedDescription: 'Streamlined startup management system designed for rapid growth and agility. Focuses on lean operations, growth metrics, investor relations, and team coordination for emerging companies.',
      icon: Rocket,
      color: 'violet',
      gradient: 'from-violet-600 to-purple-600',
      agents: 15,
      departments: ['Product', 'Engineering', 'Marketing', 'Sales', 'Operations', 'Finance'],
      features: ['Lean operations', 'Growth tracking', 'Investor dashboard', 'Team coordination', 'Rapid scaling', 'Agile workflows'],
      complexity: 'Moderate',
      industry: 'Startup',
      useCases: ['Product development', 'Growth tracking', 'Team scaling', 'Investor relations', 'Market validation'],
      benefits: ['Faster time to market', 'Efficient resource use', 'Clear growth metrics', 'Investor transparency', 'Team alignment'],
      pricing: 'Startup-friendly',
      deployment: 'Cloud-native',
      sla: '99.5% uptime',
      security: ['IP protection', 'Data security', 'Access controls', 'Compliance ready'],
      integrations: ['Slack', 'GitHub', 'Google Workspace', 'Stripe', 'Analytics tools'],
      analytics: ['Growth metrics', 'Product analytics', 'Team performance', 'Financial KPIs']
    },
    {
      id: 'individual',
      title: 'Individual Professional',
      subtitle: 'Personal Productivity System',
      description: 'Personal workflow management for freelancers, consultants, and individual professionals managing projects and clients.',
      detailedDescription: 'Personal productivity and workflow management system for individual professionals. Manages projects, clients, time tracking, and personal productivity with simple yet powerful tools.',
      icon: User,
      color: 'emerald',
      gradient: 'from-emerald-600 to-teal-600',
      agents: 5,
      departments: ['Projects', 'Clients', 'Finance', 'Marketing', 'Administration'],
      features: ['Project management', 'Time tracking', 'Client management', 'Invoice generation', 'Goal tracking', 'Personal analytics'],
      complexity: 'Simple',
      industry: 'Individual',
      useCases: ['Project tracking', 'Client management', 'Time management', 'Financial tracking', 'Goal achievement'],
      benefits: ['Better organization', 'Time efficiency', 'Client satisfaction', 'Financial clarity', 'Goal achievement'],
      pricing: 'Affordable',
      deployment: 'Cloud/Mobile',
      sla: '99.0% uptime',
      security: ['Personal data protection', 'Secure storage', 'Privacy controls', 'Backup systems'],
      integrations: ['Google Calendar', 'PayPal', 'Stripe', 'Dropbox', 'Email clients'],
      analytics: ['Time analysis', 'Project profitability', 'Client metrics', 'Personal productivity']
    }
  ];

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
    }

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selectedCategory, searchTerm]);

  const addToCardsRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Handle smooth navigation
  const handleWorkflowSelect = (workflowId: string) => {
    // Add to browser history for smooth back navigation
    window.history.pushState({ workflow: workflowId }, '', `#workflow-${workflowId}`);
    window.scrollTo(0, 0);
    onWorkflowSelect(workflowId);
  };

  const filteredWorkflows = workflowTypes.filter(workflow => {
    const matchesCategory = selectedCategory === 'all' || workflow.industry === selectedCategory;
    const matchesSearch = workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.departments.some(dept => dept.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Simple': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Moderate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Complex': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Enterprise': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div 
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

      {/* Header */}
      <WorkflowHeader 
        onBack={onBack}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onWorkflowSelect={handleWorkflowSelect}
      />

      {/* Minimal animated background */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/8 to-transparent animate-pulse-smooth"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/8 to-transparent animate-pulse-smooth" style={{animationDelay: '2s'}}></div>
        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-400/6 to-transparent animate-pulse-smooth" style={{animationDelay: '4s'}}></div>
        <div className="absolute right-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-400/6 to-transparent animate-pulse-smooth" style={{animationDelay: '6s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" style={{ paddingTop: '5rem' }}>
        
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mr-4">
              <Layers className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                  ENTERPRISE WORKFLOWS
                </span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-blue-400/80 font-light tracking-wider mt-1">
                INDUSTRY-LEADING SOLUTIONS
              </p>
            </div>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-4xl mx-auto leading-relaxed font-light mb-8">
            Choose from enterprise-grade workflow management systems designed for Fortune 500 companies, 
            healthcare institutions, technology leaders, and individual professionals worldwide.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search workflows, departments, or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 text-sm"
              />
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Filter className="w-4 h-4 text-white/40" />
              <span className="text-white/60 font-light">
                {filteredWorkflows.length} workflows
              </span>
            </div>
          </div>
        </div>

        {/* Workflow Cards Grid - Mobile 2 Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-16">
          {filteredWorkflows.map((workflow, index) => {
            const Icon = workflow.icon;
            
            return (
              <div
                key={workflow.id}
                ref={addToCardsRefs}
                className="group relative bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/20 hover:shadow-xl hover:shadow-white/5 cursor-pointer"
                onMouseEnter={() => setHoveredCard(workflow.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleWorkflowSelect(workflow.id)}
              >
                {/* Reduced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-900/20 opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                <div className="relative p-3 sm:p-4 md:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-slate-700/30 to-slate-800/30 flex items-center justify-center border border-white/10">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-slate-300" />
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getComplexityColor(workflow.complexity)}`}>
                        {workflow.complexity}
                      </div>
                      <div className="text-xs text-white/50 mt-1">
                        {workflow.agents} Agents
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-light text-white mb-1 leading-tight">{workflow.title}</h3>
                    <p className="text-xs font-medium text-slate-300 mb-2 leading-tight">{workflow.subtitle}</p>
                    <p className="text-white/70 text-xs leading-relaxed font-light line-clamp-3">
                      {workflow.description}
                    </p>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-3 sm:mb-4">
                    <div className="bg-black/20 rounded-lg p-2 border border-white/5">
                      <div className="flex items-center mb-1">
                        <Users className="w-3 h-3 text-slate-400 mr-1" />
                        <span className="text-xs text-white/60">Depts</span>
                      </div>
                      <div className="text-sm font-light text-white">{workflow.departments.length}</div>
                    </div>
                    <div className="bg-black/20 rounded-lg p-2 border border-white/5">
                      <div className="flex items-center mb-1">
                        <Activity className="w-3 h-3 text-slate-400 mr-1" />
                        <span className="text-xs text-white/60">SLA</span>
                      </div>
                      <div className="text-sm font-light text-white">{workflow.sla}</div>
                    </div>
                  </div>

                  {/* Key Departments - Mobile Optimized */}
                  <div className="mb-3 sm:mb-4">
                    <h4 className="text-xs font-medium text-white/80 mb-2 flex items-center">
                      <Target className="w-3 h-3 text-slate-400 mr-1" />
                      Departments
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {workflow.departments.slice(0, 3).map((dept, deptIndex) => (
                        <span
                          key={deptIndex}
                          className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/70 font-light"
                        >
                          {dept}
                        </span>
                      ))}
                      {workflow.departments.length > 3 && (
                        <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/50 font-light">
                          +{workflow.departments.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Core Features - Mobile Optimized */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs font-medium text-white/80 mb-2 flex items-center">
                      <Zap className="w-3 h-3 text-slate-400 mr-1" />
                      Features
                    </h4>
                    <div className="space-y-1">
                      {workflow.features.slice(0, 2).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-white/70">
                          <CheckCircle className="w-3 h-3 text-slate-400 mr-2 flex-shrink-0" />
                          <span className="text-xs font-light leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 hover:shadow-lg hover:shadow-slate-500/25 text-white font-light transition-all duration-300 group-hover:scale-105 text-xs sm:text-sm py-2 border border-white/10"
                    onClick={() => handleWorkflowSelect(workflow.id)}
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Stats */}
        <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 md:p-12 mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-4">Enterprise Performance Metrics</h2>
            <p className="text-white/60 font-light text-sm sm:text-base">Industry-leading performance across all workflow systems</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-2">500+</div>
              <div className="text-white/60 font-light text-xs sm:text-sm">Enterprise Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-2">99.9%</div>
              <div className="text-white/60 font-light text-xs sm:text-sm">Average Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-2">50M+</div>
              <div className="text-white/60 font-light text-xs sm:text-sm">Workflows Processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-2">24/7</div>
              <div className="text-white/60 font-light text-xs sm:text-sm">Global Support</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-white/[0.02] to-white/[0.01] backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 border border-white/10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-6">Ready to Transform Your Organization?</h2>
            <p className="text-sm sm:text-base md:text-lg text-white/70 mb-8 sm:mb-10 max-w-3xl mx-auto font-light leading-relaxed">
              Join thousands of organizations already using Thinking Machines to optimize 
              their workflows and achieve unprecedented operational excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/25 text-white font-light px-6 sm:px-8 py-3 text-sm sm:text-base">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                START FREE TRIAL
              </Button>
              <Button variant="outline" className="border-white/20 text-white/80 hover:text-white hover:bg-white/5 font-light px-6 sm:px-8 py-3 text-sm sm:text-base">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
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