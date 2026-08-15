import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalSearch } from '../shared/GlobalSearch';
import { SharedHeaderUserArea } from '../shared/SharedHeaderUserArea';
import { MasterCalendarModal } from '../shared/MasterCalendarModal';
import { ClubDiscoveryAssistant } from '../shared/ClubDiscoveryAssistant';

export interface SidebarLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  accentBorderClass?: string;
  accentShadowClass?: string;
  accentBgClass?: string;
  category?: string;
  onAddClub?: (club: any) => void;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children
}) => {
  const [showMasterCalendar, setShowMasterCalendar] = useState(false);
  const [showDiscoveryAssistant, setShowDiscoveryAssistant] = useState(false);

  useEffect(() => {
    const handleOpen = () => setShowMasterCalendar(true);
    window.addEventListener('open-master-calendar', handleOpen);
    return () => window.removeEventListener('open-master-calendar', handleOpen);
  }, []);

  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container relative">
      
      {/* Background Motifs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-primary/5 to-transparent blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute top-0 right-0 indian-motif-pattern w-full h-full opacity-[0.02] mix-blend-overlay"></div>
      </div>

      {/* Top Navigation - Heritage Realm Style */}
      <header className="bg-surface/80 backdrop-blur-md border-b border-outline-variant sticky top-0 z-50 w-full transition-all">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-[1400px] mx-auto">
          
          {/* Left Side Buttons */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* T Button */}
            <Link to="/" className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center hover:bg-primary/20 transition-all text-primary shadow-sm hover:shadow">
              <span className="font-headline-md text-xl font-semibold">T</span>
            </Link>

            {/* Unsure Pill */}
            <button 
              onClick={() => setShowDiscoveryAssistant(true)}
              className="hidden sm:flex items-center gap-2 bg-surface-container-lowest hover:bg-surface-container px-6 py-3 border border-outline-variant rounded-full shadow-sm hover:shadow transition-all group"
            >
              <span className="material-symbols-outlined text-primary text-lg group-hover:rotate-12 transition-transform">smart_toy</span>
              <span className="text-[11px] font-label-caps tracking-[0.15em] text-on-surface uppercase">Unsure what to join?</span>
            </button>

            {/* Separator */}
            <div className="hidden sm:block w-[1px] h-8 bg-outline-variant mx-2"></div>

            {/* Notifications / User Area handled by SharedHeaderUserArea */}
            <SharedHeaderUserArea />
            
          </div>
          
          {/* Right Side */}
          <div className="flex items-center">
            {/* Master Calendar Button */}
            <button onClick={() => setShowMasterCalendar(true)} className="flex items-center gap-2 bg-primary hover:bg-primary/90 px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all group">
              <span className="material-symbols-outlined text-on-primary text-lg group-hover:scale-110 transition-transform">event_note</span>
              <span className="text-[11px] font-label-caps tracking-widest text-on-primary uppercase">Master Calendar</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-margin-desktop py-12 md:py-24 space-y-24 relative z-10">
        {children}
      </main>


      
      {showMasterCalendar && <MasterCalendarModal onClose={() => setShowMasterCalendar(false)} />}
      {showDiscoveryAssistant && <ClubDiscoveryAssistant onClose={() => setShowDiscoveryAssistant(false)} />}
    </div>
  );
};

export default SidebarLayout;
