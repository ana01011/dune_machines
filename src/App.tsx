import React from 'react';
import { useState } from 'react';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { WorkflowSelection } from './components/WorkflowSelection';
import { OrganizationChart } from './components/OrganizationChart';
import { MedicalChart } from './components/MedicalChart';
import { Documentation } from './components/Documentation';
import { HelpSection } from './components/HelpSection';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showWorkflowSelection, setShowWorkflowSelection] = useState(false);
  const [currentSection, setCurrentSection] = useState('workflow');
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);

  // Scroll to top when changing sections
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSection, selectedWorkflow, showWorkflowSelection]);

  // Handle back navigation
  const handleBack = () => {
    if (selectedWorkflow) {
      // If in a specific workflow, go back to workflow selection
      setSelectedWorkflow(null);
      setShowWorkflowSelection(true);
      setCurrentSection('workflow');
    } else if (showWorkflowSelection) {
      // If in workflow selection, go back to welcome
      setShowWorkflowSelection(false);
      setShowWelcome(true);
      setCurrentSection('workflow');
    } else if (currentSection !== 'workflow') {
      // If in other sections, go back to workflow
      setCurrentSection('workflow');
      if (selectedWorkflow) {
        // Stay in selected workflow
      } else {
        setShowWorkflowSelection(true);
      }
    }
    window.scrollTo(0, 0);
  };

  // Handle section changes
  const handleSectionChange = (section: string) => {
    if (section === 'workflow') {
      if (selectedWorkflow) {
        setCurrentSection('workflow');
      } else {
        setShowWorkflowSelection(true);
        setCurrentSection('workflow');
      }
    } else {
      setCurrentSection(section);
    }
    window.scrollTo(0, 0);
  };

  // Handle browser back button and navigation
  React.useEffect(() => {
    const handlePopState = () => {
      // Handle back navigation smoothly
      if (selectedWorkflow) {
        setSelectedWorkflow(null);
        setShowWorkflowSelection(true);
      } else if (showWorkflowSelection) {
        setShowWorkflowSelection(false);
        setShowWelcome(true);
      }
      // Scroll to top on navigation
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedWorkflow, showWorkflowSelection]);

  // Handle hash navigation for workflows
  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#workflows') {
        setSelectedWorkflow(null);
        setShowWorkflowSelection(true);
        setShowWelcome(false);
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (showWelcome) {
    return <WelcomeScreen onComplete={() => {
      setShowWelcome(false);
      setShowWorkflowSelection(true);
    }} />;
  }

  if (showWorkflowSelection) {
    return <WorkflowSelection 
      onWorkflowSelect={(workflowId) => {
        setSelectedWorkflow(workflowId);
        setShowWorkflowSelection(false);
      }} 
      onBack={() => {
        setShowWelcome(true);
        setShowWorkflowSelection(false);
      }}
    />;
  }

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'workflow':
        if (selectedWorkflow === 'corporate') {
          return <OrganizationChart />;
        } else if (selectedWorkflow === 'medical') {
          return <MedicalChart />;
        } else {
          return (
            <>
              <WorkflowSelection 
                onWorkflowSelect={(workflowId) => {
                  setSelectedWorkflow(workflowId);
                }} 
                onBack={handleBack}
              />
            </>
          );
        }
      case 'help':
        return <HelpSection />;
      case 'pricing':
        return <PricingSection />;
      case 'faq':
        return <FAQSection />;
      default:
        if (selectedWorkflow === 'corporate') {
          return <OrganizationChart />;
        } else if (selectedWorkflow === 'medical') {
          return <MedicalChart />;
        } else {
          return (
            <>
              <WorkflowSelection 
                onWorkflowSelect={(workflowId) => {
                  setSelectedWorkflow(workflowId);
                }} 
                onBack={handleBack}
              />
            </>
          );
        }
    }
  };

  return (
    <div className="min-h-screen">
      {!showWelcome && (
        <Header 
          onSectionChange={handleSectionChange}
          currentSection={currentSection} 
          onBack={handleBack}
        />
      )}
      {renderCurrentSection()}
    </div>
  );
}

export default App;