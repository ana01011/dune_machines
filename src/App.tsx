import React from 'react';
import { useState } from 'react';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AIModelSelection } from './components/AIModelSelection';
import { WorkflowSelection } from './components/WorkflowSelection';
import { OrganizationChart } from './components/OrganizationChart';
import { MedicalChart } from './components/MedicalChart';
import { OmniusChat } from './components/OmniusChat';
import { Documentation } from './components/Documentation';
import { HelpSection } from './components/HelpSection';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showWorkflowSelection, setShowWorkflowSelection] = useState(false);
  const [selectedAI, setSelectedAI] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState('workflow');
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);

  // Scroll to top when changing sections
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSection, selectedWorkflow, showWorkflowSelection, selectedAI]);

  // Handle back navigation
  const handleBack = () => {
    if (selectedAI) {
      // If in AI chat, go back to welcome
      setSelectedAI(null);
      setShowWelcome(true);
      setCurrentSection('workflow');
    } else if (selectedWorkflow) {
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
      if (selectedAI) {
        // Stay in AI chat
      } else if (selectedWorkflow) {
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
      if (selectedAI) {
        setCurrentSection('workflow');
      } else if (selectedWorkflow) {
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
      if (selectedAI) {
        setSelectedAI(null);
        setShowWelcome(true);
      } else if (selectedWorkflow) {
        setSelectedWorkflow(null);
        setShowWorkflowSelection(true);
      } else if (showWorkflowSelection) {
        setShowWorkflowSelection(false);
        setShowWelcome(true);
      } else if (showWorkflowSelection) {
        setShowWorkflowSelection(false);
        setShowWelcome(true);
      }
      // Scroll to top on navigation
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedWorkflow, showWorkflowSelection, selectedAI]);

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

  // Show AI Chat Interface
  if (selectedAI) {
    if (selectedAI === 'omnius') {
      return <OmniusChat 
        onBack={handleBack} 
        onNavigateToWorkflows={() => {
          setSelectedAI(null);
          setShowWorkflowSelection(true);
          setShowWelcome(false);
        }} 
      />;
    }
    // Add other AI interfaces here later
    return <div>AI Interface for {selectedAI} coming soon...</div>;
  }
  if (showWelcome) {
    return <WelcomeScreen onComplete={(aiId?: string) => {
      if (aiId) {
        setSelectedAI(aiId);
        setShowWelcome(false);
      } else {
        setShowWelcome(false);
        setShowWorkflowSelection(true);
      }
    }} />;
  }

  if (showWorkflowSelection) {
    return <WorkflowSelection 
      onWorkflowSelect={(workflowId) => {
        setSelectedWorkflow(workflowId);
        setShowWorkflowSelection(false);
      }} 
      onBack={handleBack}
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