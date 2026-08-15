import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClubCriteriaMatrix } from './ClubCriteriaMatrix';
import { ClubJoinForm } from './ClubJoinForm';
import { ClubExplorePanel } from './ClubExplorePanel';
import { ClubQuerySection } from './ClubQuerySection';
import { EventDetailDrawer } from './EventDetailDrawer';
import { getCurrentUserEmail } from '../../lib/clubManager';
import { AdminEditModal } from './AdminEditModal';
import SidebarLayout from '../layout/SidebarLayout';

interface ClubDetailTemplateProps {
  club: any;
  accentColorClass: string;
  accentBgClass: string;
}

export const ClubDetailTemplate: React.FC<ClubDetailTemplateProps> = ({ club }) => {
  const navigate = useNavigate();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const isTech = club.originType === 'technical';

  const generateMockProjects = () => {
    const name = club.name.toLowerCase();
    let titles = ['Genesis Protocol', 'Nexus Dashboard', 'Vector Framework', 'System Runtime'];
    let tags = ['Design', 'Engineering'];

    if (name.includes('code')) {
      titles = ['DSA Arena Engine', 'HackSprint 2026', 'Terminal Runtime V2', 'CP Platform Lead'];
      tags = ['C++', 'Rust', 'Algorithm'];
    } else if (name.includes('ai') || name.includes('data')) {
      titles = ['Vision Classifier', 'Sentiment Engine', 'Neural Flow', 'Medical Analyzer'];
      tags = ['PyTorch', 'TensorFlow', 'LLM'];
    } else if (name.includes('cyber')) {
      titles = ['CTF Arena Platform', 'Phishing Simulator', 'SOC Terminal', 'Exploit Labs'];
      tags = ['PenTest', 'Network', 'Crypto'];
    } else if (name.includes('robotic')) {
      titles = ['Mars Rover Proto', 'Servo Controller', 'Bipedal Balance', 'Radar Array'];
      tags = ['Hardware', 'IoT', 'C'];
    } else if (name.includes('open source')) {
      titles = ['React Flow Port', 'Linux Kernel Patches', 'Vite Plugin Toolkit', 'NPM Audit Tool'];
      tags = ['Open Source', 'JavaScript', 'Community'];
    } else if (club.originType === 'cultural') {
      titles = ['Mainstage Event', 'Cultural Night', 'Acoustic Sessions', 'Heritage Walk'];
      tags = ['Art', 'Event', 'Community'];
    } else if (club.originType === 'sports') {
      titles = ['Inter-College Cup', 'Varsity Trials', 'Endurance Camp', 'Championship '];
      tags = ['Fitness', 'Match', 'Training'];
    }

    const images = isTech 
      ? [
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1531297172864-822d1fe48cdc?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop"
        ]
      : club.originType === 'sports' 
      ? [
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1519766304817-4f37bda74a26?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop"
        ]
      : [
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1501281668745-f7f579ce32c8?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1508214751196-bfd1431dd3e5?q=80&w=800&auto=format&fit=crop"
        ];

    return titles.map((title, i) => ({
      title,
      image: images[i % images.length],
      tags: [tags[0], i % 2 === 0 ? tags[1] : tags[2] || tags[1]],
      date: `2026 Q${(i%4)+1}`,
      size: i === 0 ? 'large' : i === 3 ? 'wide' : 'normal'
    }));
  };

  const projects = generateMockProjects();
  const exploreTitle = isTech ? 'System Repository' : club.originType === 'cultural' ? 'Creative Showcase' : 'Performance Highlights';

  return (
    <SidebarLayout>
      <div className="w-full flex flex-col pt-8">
        
        {/* Top Bar for Navigation/Admin */}
        <div className="flex items-center justify-between w-full mb-16">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary hover:text-tertiary transition-colors text-label-caps font-label-caps tracking-widest uppercase bg-surface-container py-2 px-4 rounded-full border border-outline-variant"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Return
          </button>
          
          <button 
            onClick={() => setShowAdminModal(true)}
            className="flex items-center gap-2 text-tertiary hover:bg-tertiary/10 transition-colors text-label-caps font-label-caps tracking-widest uppercase border border-tertiary py-2 px-4 rounded-full"
          >
            <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
            Admin Settings
          </button>
        </div>

        {/* Main Hero Content */}
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center mb-24">
          
          {/* Left Column: Info */}
          <div className="flex-1 flex flex-col items-start text-left justify-center">
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-[1px] w-12 bg-tertiary"></div>
              <span className="text-label-caps font-label-caps text-tertiary tracking-widest uppercase">
                {club.category || 'Domain'} • {club.originType}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[90px] font-headline-xl text-primary mb-8 leading-[0.9] tracking-tight uppercase">
               {club.name}
            </h1>
            
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl border-l-[2px] border-tertiary pl-6 italic mb-12">
              "{club.description || "Entering dedicated infrastructure holding bay. Prepare to initiate deep domain protocols."}"
            </p>

            {club.registrationOpen !== false ? (
              <button 
                onClick={() => setShowJoinModal(true)}
                className="px-8 py-4 rounded-full bg-primary text-on-primary font-label-caps text-label-caps tracking-widest hover:bg-surface-tint transition-colors shadow-md flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">person_add</span>
                Join Application
              </button>
            ) : (
              <button 
                disabled
                className="px-8 py-4 rounded-full bg-surface-variant text-on-surface-variant font-label-caps text-label-caps tracking-widest cursor-not-allowed flex items-center gap-3 border border-outline-variant">
                <span className="material-symbols-outlined text-lg">lock</span>
                Registrations Closed
              </button>
            )}
          </div>

          {/* Right Column: Visuals & Stats */}
          <div className="w-full md:w-[450px] shrink-0 flex flex-col gap-6 animate-in fade-in slide-in-from-right-8 duration-1000">
             <div className="w-full aspect-square arch-card gold-border overflow-hidden bg-surface p-12 flex items-center justify-center shadow-lg relative">
               <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none"></div>
               {club.image ? (
                  <img src={club.image} alt={club.name} className="w-full h-full object-contain relative z-10 drop-shadow-md" />
               ) : (
                  <span className="material-symbols-outlined text-[100px] text-tertiary/50 relative z-10">group</span>
               )}
             </div>

             <div className="grid grid-cols-2 gap-4 w-full mt-4">
               <div className="p-6 rounded-2xl bg-surface border border-outline-variant flex flex-col justify-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-[10px] font-label-caps text-tertiary tracking-widest uppercase mb-2">Active Operatives</span>
                  <span className="text-headline-md font-headline-md text-primary">{club.members || '250'}</span>
               </div>
               <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col justify-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-[10px] font-label-caps text-tertiary tracking-widest uppercase mb-2">Node Lead</span>
                  <span className="text-body-lg font-body-md text-primary font-semibold leading-tight break-words">{club.lead || 'Admin'}</span>
               </div>
             </div>
          </div>
        </div>

        {/* ==============================================================
            CLUB QUERY / CONTACT SECTION
            ============================================================== */}
        <ClubQuerySection 
          clubName={club.name} 
          leadName={club.lead}
          accentBgClass=""
          clubLeads={club.clubLeads}
        />

        {/* ==============================================================
            UPCOMING EVENTS
            ============================================================== */}
        {club.upcomingEvents && club.upcomingEvents.length > 0 && (
          <section className="mb-24 mt-24">
            <div className="flex items-center space-x-4 mb-12">
              <div className="h-[1px] w-12 bg-tertiary"></div>
              <h2 className="text-headline-lg font-headline-lg text-primary uppercase">Upcoming Events</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {club.upcomingEvents.map((event: any, idx: number) => (
                <div key={idx} onClick={() => setSelectedEvent(event)} className="group relative p-8 rounded-2xl bg-surface border border-outline-variant hover:border-tertiary shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                  
                  <div className="flex items-center mb-6">
                    <span className="px-3 py-1 bg-tertiary/10 text-tertiary font-label-caps text-[10px] uppercase tracking-widest border border-tertiary/30 rounded-full">
                      {event.date}
                    </span>
                  </div>
                  <h3 className="text-headline-sm font-headline-md text-primary mb-8 tracking-tight flex-1 group-hover:text-tertiary transition-colors">{event.title}</h3>
                  <button className="py-3 px-4 font-label-caps tracking-widest uppercase text-on-surface-variant bg-surface-container border border-outline-variant rounded-full text-xs flex items-center justify-center gap-3 transition-colors w-full group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary">
                    Access Details
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==============================================================
            JOINING CRITERIA
            ============================================================== */}
        <section className="mb-24 mt-12">
          <div className="flex items-center space-x-4 mb-12">
             <div className="h-[1px] w-12 bg-tertiary"></div>
             <h2 className="text-headline-lg font-headline-lg text-primary uppercase">
               {isTech ? 'Joining Criteria' : 'Growth Roadmap'}
             </h2>
          </div>
          <div className="bg-surface border border-outline-variant rounded-[32px] p-8 md:p-12 shadow-sm">
             {isTech ? <ClubCriteriaMatrix clubName={club.name} customCriteria={club.criteria} /> : (
                 <div className="text-tertiary font-label-caps uppercase tracking-widest p-12 border-2 border-dashed border-outline-variant rounded-2xl text-center bg-background">
                     Roadmap module reconfiguring...
                 </div>
             )}
          </div>
        </section>

      </div>

      {/* Modals & Portals */}
      {showJoinModal && (
        <ClubJoinForm 
          clubName={club.name} 
          category={club.category || 'Node'} 
          originType={club.originType} 
          onClose={() => setShowJoinModal(false)} 
        />
      )}
      
      {showExploreModal && (
        <ClubExplorePanel 
          clubName={club.name} 
          originType={club.originType} 
          title={exploreTitle} 
          projects={projects} 
          onClose={() => setShowExploreModal(false)} 
        />
      )}
      
      {selectedEvent && (
        <EventDetailDrawer 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

      {showAdminModal && (
        <AdminEditModal 
          club={club} 
          onClose={() => setShowAdminModal(false)} 
          onSaved={() => window.location.reload()}
        />
      )}
    </SidebarLayout>
  );
};

export default ClubDetailTemplate;
