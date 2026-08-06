import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClubCriteriaMatrix } from './ClubCriteriaMatrix';
import { ClubJoinForm } from './ClubJoinForm';
import { ClubExplorePanel } from './ClubExplorePanel';
import { ClubQuerySection } from './ClubQuerySection';
import { EventDetailDrawer } from './EventDetailDrawer';
import { getCurrentUserEmail } from '../../lib/clubManager';
import { AdminEditModal } from './AdminEditModal';

interface ClubDetailTemplateProps {
  club: any;
  accentColorClass: string;
  accentBgClass: string;
}

export const ClubDetailTemplate: React.FC<ClubDetailTemplateProps> = ({ club, accentBgClass }) => {
  const navigate = useNavigate();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const currentUserEmail = getCurrentUserEmail();

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
    <div className="min-h-screen bg-[#fdfaf6] text-black font-display relative overflow-x-hidden selection:bg-pink-400 selection:text-black">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.05 }} />

      <section className="relative w-full pt-12 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden z-10">
        <div className="max-w-[1200px] w-full mx-auto my-auto flex flex-col gap-12">
          
          {/* Top Bar for Navigation/Admin */}
          <div className="flex items-center justify-between w-full">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-black border-[3px] border-black px-6 py-2 rounded-xl bg-white shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover transition-all cursor-pointer uppercase font-black tracking-widest text-xs"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Return
            </button>
            
            <button 
              onClick={() => setShowAdminModal(true)}
              className="flex items-center gap-2 text-black bg-pink-400 border-[3px] border-black px-6 py-2 rounded-xl shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover transition-all cursor-pointer uppercase font-black tracking-widest text-xs"
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              Admin Settings
            </button>
          </div>

          {/* Main Hero Content */}
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Left Column: Info */}
            <div className="flex-1 flex flex-col items-start text-left justify-center">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-4 py-1.5 border-[3px] border-black bg-[#ffde00] text-black text-[10px] font-black uppercase tracking-widest shadow-neo-sm rounded-lg flex items-center gap-2 w-max">
                  <span>{club.category || 'Domain'}</span>
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  <span>{club.originType}</span>
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[80px] font-black tracking-tighter uppercase text-black mb-8 leading-[0.9]">
                 {club.name}
              </h1>
              
              <p className="text-black text-xl md:text-2xl font-bold mb-12 leading-relaxed max-w-2xl border-l-[6px] border-black pl-6">
                {club.description || "Entering dedicated infrastructure holding bay. Prepare to initiate deep domain protocols."}
              </p>

              {club.registrationOpen !== false ? (
                <button 
                  onClick={() => setShowJoinModal(true)}
                  className="px-8 py-4 rounded-xl bg-[#ffde00] border-[3px] border-black text-black font-black uppercase tracking-widest text-sm shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover transition-all active:scale-95 flex items-center gap-3">
                  <span className="material-symbols-outlined font-black">person_add</span>
                  Join Application
                </button>
              ) : (
                <button 
                  disabled
                  className="px-8 py-4 rounded-xl bg-gray-300 border-[3px] border-gray-400 text-gray-500 font-black uppercase tracking-widest text-sm cursor-not-allowed flex items-center gap-3">
                  <span className="material-symbols-outlined font-black">lock</span>
                  Registrations Closed
                </button>
              )}
            </div>

            {/* Right Column: Visuals & Stats */}
            <div className="w-full md:w-[450px] shrink-0 flex flex-col gap-6 animate-in fade-in slide-in-from-right-10 duration-1000">
               <div className="w-full aspect-square rounded-[32px] overflow-hidden border-[4px] border-black shadow-neo bg-white p-10 flex items-center justify-center">
                 {club.image ? (
                    <img src={club.image} alt={club.name} className="w-full h-full object-contain" />
                 ) : (
                    <span className="material-symbols-outlined text-[100px] text-gray-800">group</span>
                 )}
               </div>

               <div className="grid grid-cols-2 gap-6 w-full">
                 <div className="p-6 rounded-[24px] bg-white border-[4px] border-black shadow-neo flex flex-col justify-center">
                    <span className="text-[10px] text-black font-black tracking-widest uppercase mb-2">Active Operatives</span>
                    <span className="text-4xl font-black text-black">{club.members || '250'}</span>
                 </div>
                 <div className="p-6 rounded-[24px] bg-pink-400 border-[4px] border-black shadow-neo flex flex-col justify-center">
                    <span className="text-[10px] text-black font-black tracking-widest uppercase mb-2">Node Lead</span>
                    <span className="text-xl font-black text-black leading-tight break-words">{club.lead || 'Admin'}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 pb-32 mt-12">
        {/* ==============================================================
            2. CLUB QUERY / CONTACT SECTION
            ============================================================== */}
        <ClubQuerySection 
          clubName={club.name} 
          leadName={club.lead}
          accentBgClass={accentBgClass}
          clubLeads={club.clubLeads}
        />

        {/* ==============================================================
            3. UPCOMING EVENTS / LIVE ACTIVITY
            ============================================================== */}
        {club.upcomingEvents && club.upcomingEvents.length > 0 && (
          <section className="mb-24 mt-24">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-4 h-12 bg-black"></div>
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-black">Upcoming Events</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {club.upcomingEvents.map((event: any, idx: number) => (
                <div key={idx} onClick={() => setSelectedEvent(event)} className="relative p-8 rounded-[24px] bg-white border-[4px] border-black transition-all group overflow-hidden cursor-pointer shadow-neo hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-neo-hover flex flex-col">
                  
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-pink-400 text-black font-black text-[10px] uppercase tracking-[0.2em] border-[2px] border-black rounded-lg">
                      {event.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-black leading-tight mb-8 uppercase tracking-tighter flex-1">{event.title}</h3>
                  <button className="py-3 px-4 font-black tracking-widest uppercase text-black bg-[#ffde00] border-[3px] border-black rounded-xl text-xs flex items-center justify-center gap-3 transition-colors w-full group-hover:bg-black group-hover:text-white">
                    Access Details
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==============================================================
            4. INTEGRATION PROTOCOLS / CRITERIA
            ============================================================== */}
        <section className="mb-24 mt-24">
          <div className="flex items-center gap-4 mb-12">
             <div className="w-4 h-12 bg-black"></div>
             <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-black">
               {isTech ? 'Joining Criteria' : 'Growth Roadmap'}
             </h2>
          </div>
          <div className="bg-white border-[4px] border-black rounded-[24px] p-8 shadow-neo">
             {isTech ? <ClubCriteriaMatrix clubName={club.name} customCriteria={club.criteria} /> : (
                 <div className="text-black font-bold uppercase tracking-widest p-8 border-2 border-dashed border-black rounded-xl text-center">
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
    </div>
  );
};

export default ClubDetailTemplate;
