import React, { useState } from 'react';
import { mockData } from '../data/mockData';
import SidebarLayout from '../components/layout/SidebarLayout';
import { DivisionLayoutEngine } from '../components/shared/DivisionLayoutEngine';
import type { DivisionConfig } from '../components/shared/DivisionLayoutEngine';

export const SportsCommittee: React.FC = () => {
  const { sportsClubs } = mockData;
  const [activeTab, setActiveTab] = useState('clubs');
  const [clubs, setClubs] = useState(sportsClubs);
  
  const handleAddClub = (newClub: any) => setClubs([...clubs, newClub]);

  const config: DivisionConfig = {
    id: 'sports',
    title: 'ARENA',
    subtitle: 'Elite Athletic Committee',
    description: 'Where physical discipline meets velocity and competitive tension.',
    accentHex: '#dc2626', // Red (matching original Sports identity)
    accentRgbClasses: 'text-[#dc2626] bg-[#dc2626] border-[#dc2626] shadow-[#dc2626]/20',
    metrics: [
      { l: "Varsity Athletes", v: "412" },
      { l: "Championships", v: "28" },
      { l: "Active Fixtures", v: "06" },
      { l: "Energy Output", v: "Peak" }
    ],
    gridTitle: 'Athletic Squads',
    gridSubtitle: 'Review varsity team structures, track training metrics, and view upcoming tournament schedules.',
    iconFallback: 'sports_basketball',
    bgMotionEffect: (
      <>
         {/* Kinetic Tension Lines */}
        <div className="absolute top-0 right-0 w-full h-[200%] opacity-20 pointer-events-none transform origin-top-right rotate-45">
          <div className="w-[200%] h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent absolute top-[10%] animate-[slide_3s_ease-in-out_infinite]" />
          <div className="w-[200%] h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent absolute top-[40%] animate-[slide_4s_linear_infinite_reverse]" />
          <div className="w-[200%] h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent absolute top-[70%] animate-[slide_2s_ease-out_infinite]" />
          <div className="w-[200%] h-[2px] bg-white absolute top-[25%] animate-[slide_1s_ease-in_infinite_reverse]" />
        </div>
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[radial-gradient(circle_at_bottom_left,rgba(220,38,38,0.2)_0%,transparent_70%)] blur-[80px]" />
      </>
    )
  };

  return (
    <SidebarLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      category="Sports"
      accentBgClass="bg-pink-400"
      accentBorderClass="border-black"
      accentShadowClass="shadow-neo"
      onAddClub={handleAddClub}
    >
       <DivisionLayoutEngine config={config} clubs={clubs} />
    </SidebarLayout>
  );
};

export default SportsCommittee;
