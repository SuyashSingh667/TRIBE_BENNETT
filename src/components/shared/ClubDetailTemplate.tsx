import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { getClubVisuals, Starfield, RoadmapProgression } from './ClubVisualProfiles';
import { ClubCriteriaMatrix } from './ClubCriteriaMatrix';
import { ClubJoinForm } from './ClubJoinForm';
import { ClubExplorePanel } from './ClubExplorePanel';
import { ClubQuerySection } from './ClubQuerySection';
import { EventDetailDrawer } from './EventDetailDrawer';

interface ClubDetailTemplateProps {
  club: any;
  accentColorClass: string;
  accentBgClass: string;
}

export const ClubDetailTemplate: React.FC<ClubDetailTemplateProps> = ({ club, accentColorClass: _accentColorClass, accentBgClass }) => {
  const navigate = useNavigate();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const isTech = club.originType === 'technical';
  const viz = getClubVisuals(club.name, club.originType);

  // Generate Insane Mock Projects based on Club Domain
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
      date: `2025 Q${(i%4)+1}`,
      size: i === 0 ? 'large' : i === 3 ? 'wide' : 'normal'
    }));
  };

  const projects = generateMockProjects();

  const exploreLabel = isTech ? 'Explore Repository' : club.originType === 'cultural' ? 'Explore Showcase' : 'View Highlights';
  const exploreTitle = isTech ? 'System Repository' : club.originType === 'cultural' ? 'Creative Showcase' : 'Performance Highlights';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 font-display relative overflow-x-hidden">
      
      {/* ==============================================================
          1. IMMERSIVE HERO SECTION
          ============================================================== */}
      <section className="relative w-full min-h-[85vh] flex flex-col pt-24 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Dynamic Club World Background */}
        <div className="absolute inset-0 z-0">
           {viz.heroBg}
        </div>
        
        {/* 3D Particles Contextual Mapping */}
        <div className="absolute inset-0 z-0 opacity-40">
           <Canvas camera={{ position: [0, 0, 1] }}>
             <Starfield color={viz.particlesColor} />
           </Canvas>
        </div>

        {/* Hero Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-0" />

        <div className="relative z-10 max-w-[1200px] w-full mx-auto my-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          
          {/* Badge & Identity Text */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 mb-10 text-slate-500 hover:text-white transition-colors cursor-pointer w-fit group border border-[#222] px-4 py-2 rounded-full hover:bg-white/5 backdrop-blur-sm"
            >
              <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
              <span className="font-bold uppercase tracking-widest text-[10px]">Return</span>
            </button>

            <span className="px-4 py-1.5 border border-white/20 bg-black/40 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-xl">
              [ {club.category || 'Domain'} ] // {club.originType}
            </span>

            <h1 className="text-6xl md:text-[90px] lg:text-[110px] leading-[0.85] font-black tracking-tighter uppercase text-white drop-shadow-2xl mix-blend-screen group">
               {club.name}
            </h1>
            
            <p className="text-sm md:text-md text-red-500 font-bold uppercase tracking-[0.3em] mt-6 mb-8 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">
              {viz.tagline}
            </p>

            <p className="text-lg text-slate-300 font-medium leading-relaxed max-w-xl text-balance backdrop-blur-sm">
              {club.description || "Entering dedicated infrastructure holding bay. Prepare to initiate deep domain protocols."}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-10">
              <button 
                onClick={() => setShowJoinModal(true)}
                className="px-8 py-3.5 rounded-full bg-white text-black font-black hover:bg-slate-200 transition-all active:scale-95 uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] flex items-center gap-3">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>
                Join Application
              </button>
              <button 
                onClick={() => setShowExploreModal(true)}
                className="px-8 py-3.5 rounded-full bg-black/50 backdrop-blur-md hover:bg-white hover:text-black text-white font-bold transition-all border border-[#333] active:scale-95 uppercase tracking-widest text-xs">
                {exploreLabel}
              </button>
            </div>
          </div>

          {/* Emble/Live Experience Element floating right */}
          <div className="w-full md:w-[450px] shrink-0 relative animate-in fade-in slide-in-from-right-10 duration-1000">
             {/* If we have a custom live panel from themes, show it. Otherwise fall back to the image */}
             {viz.livePanel ? (
               <div className="w-full relative z-10 group perspective-1000">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-[#111] rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  <div className="relative transform-gpu transition-all duration-700 hover:rotate-y-[-5deg] hover:scale-105">
                     {viz.livePanel}
                  </div>
               </div>
             ) : (
               <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-[#222] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10 bg-[#111]">
                 {club.image && <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url(${club.image})`}} />}
               </div>
             )}

             {/* Floating Stats */}
             <div className="absolute -bottom-8 -left-8 md:-left-16 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-[#222] shadow-2xl flex flex-col z-20 animate-bounce" style={{animationDuration: '3s'}}>
                <span className="text-[9px] text-slate-500 font-black tracking-widest uppercase mb-1">Active Operatives</span>
                <span className="text-xl font-black text-white">{club.members || 'Unknown'}</span>
             </div>
             <div className="absolute -top-12 -right-8 p-4 rounded-2xl bg-[#111]/80 backdrop-blur-xl border border-red-900/30 shadow-[0_0_20px_rgba(220,38,38,0.2)] flex flex-col z-20 animate-pulse">
                <span className="text-[9px] text-red-500 font-black tracking-widest uppercase mb-1">Node Lead</span>
                <span className="text-sm font-black text-white">{club.lead || 'Admin'}</span>
             </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">

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
          <section className="mb-32">
            <div className="flex items-center gap-3 mb-10">
              <div className={`w-3 h-8 ${accentBgClass} shadow-[0_0_15px_rgba(255,255,255,0.2)]`}></div>
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white">Upcoming Events</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {club.upcomingEvents.map((event: any, idx: number) => (
                <div key={idx} onClick={() => setSelectedEvent(event)} className="relative p-8 rounded-[32px] bg-[#0a0a0a] border border-[#333] hover:border-white transition-all group overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] cursor-pointer">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] rounded-full pointer-events-none group-hover:bg-red-500/10 transition-colors"></div>
                  
                  <p className="text-red-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">emergency_recording</span>
                    {event.date}
                  </p>
                  <h3 className="text-2xl font-black text-white leading-tight mb-8 uppercase tracking-tighter">{event.title}</h3>
                  <button className="text-[10px] font-black tracking-widest uppercase text-slate-500 group-hover:text-white flex items-center gap-2 transition-colors border-t border-[#222] pt-4 w-full justify-between">
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
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-10">
             <div className="w-3 h-8 bg-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"></div>
             <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white">
               {isTech ? 'Joining Criteria' : 'Growth Roadmap'}
             </h2>
          </div>
          {isTech ? <ClubCriteriaMatrix clubName={club.name} /> : <RoadmapProgression />}
        </section>

      </div>

      {/* Lightbox / Imprint Zoom Modal (Removed) */}

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
        <EventDetailDrawer event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};

export default ClubDetailTemplate;
