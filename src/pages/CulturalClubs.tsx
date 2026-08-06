import React, { useState } from 'react';
import { mockData } from '../data/mockData';
import SidebarLayout from '../components/layout/SidebarLayout';
import { DivisionLayoutEngine } from '../components/shared/DivisionLayoutEngine';
import type { DivisionConfig } from '../components/shared/DivisionLayoutEngine';

export const CulturalClubs: React.FC = () => {
  const { culturalClubs } = mockData;
  const [activeTab, setActiveTab] = useState('clubs');
  const [clubs, setClubs] = useState(culturalClubs);
  
  const handleAddClub = (newClub: any) => setClubs([...clubs, newClub]);

  const config: DivisionConfig = {
    id: 'cultural',
    title: 'COUNCIL',
    subtitle: 'Premium Cultural Network',
    description: 'Where artists, performers, and creative visionaries design the culture.',
    accentHex: '#d4af37', // Gold
    accentRgbClasses: 'text-[#d4af37] bg-[#d4af37] border-[#d4af37] shadow-[#d4af37]/20',
    metrics: [
      { l: "Active Performers", v: "842" },
      { l: "Live Productions", v: "14" },
      { l: "Gallery Archives", v: "156" },
      { l: "Creative Flux", v: "High" }
    ],
    gridTitle: 'Creative Guilds',
    gridSubtitle: 'Explore the operational core of TRIBE’s artistic and cultural productions.',
    iconFallback: 'palette',
    bgMotionEffect: (
      <>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[140%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] blur-[100px] pointer-events-none" />
        <div className="absolute top-[30%] right-[-10%] w-[50%] h-[120%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] blur-[120px] pointer-events-none mix-blend-screen" />
      </>
    )
  };

  return (
    <SidebarLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      category="Cultural"
      accentBgClass="bg-[#a1ff00]"
      accentBorderClass="border-black"
      accentShadowClass="shadow-neo"
      onAddClub={handleAddClub}
    >
       <DivisionLayoutEngine config={config} clubs={clubs} />
    </SidebarLayout>
  );
};

export default CulturalClubs;
