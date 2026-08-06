import React, { useState } from 'react';
import { mockData } from '../data/mockData';
import SidebarLayout from '../components/layout/SidebarLayout';
import { DivisionLayoutEngine } from '../components/shared/DivisionLayoutEngine';
import type { DivisionConfig } from '../components/shared/DivisionLayoutEngine';

export const TechnicalClubs: React.FC = () => {
  const { technicalClubs } = mockData;
  const [activeTab, setActiveTab] = useState('clubs');
  const [clubs, setClubs] = useState(technicalClubs);
  
  const handleAddClub = (newClub: any) => setClubs([...clubs, newClub]);

  const config: DivisionConfig = {
    id: 'technical',
    title: 'CABINET',
    subtitle: 'Technical Engineering Division',
    description: 'Where builders, researchers, and innovators shape the future.',
    accentHex: '#dc2626', // Red
    accentRgbClasses: 'text-red-500 bg-red-500 border-red-500 shadow-red-500/20',
    metrics: [
      { l: "Active Operatives", v: "1,204" },
      { l: "Open Deployments", v: "34" },
      { l: "Live Sprints", v: "08" },
      { l: "System Load", v: "98.2%" }
    ],
    gridTitle: 'Engineering Nodes',
    gridSubtitle: 'Select a division to view intelligence, integration protocols, and active repositories.',
    iconFallback: 'terminal',
    bgMotionEffect: (
      <>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-1/4 w-[1px] h-[200%] bg-gradient-to-b from-transparent via-red-500 to-transparent animate-[scan_5s_linear_infinite]" />
        <div className="absolute top-0 left-3/4 w-[1px] h-[200%] bg-gradient-to-b from-transparent via-red-500 to-transparent animate-[scan_7s_linear_infinite] delay-700" />
      </>
    )
  };

  return (
    <SidebarLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      category="Technical"
      accentBgClass="bg-[#ffde00]"
      accentBorderClass="border-black"
      accentShadowClass="shadow-neo"
      onAddClub={handleAddClub}
    >
       <DivisionLayoutEngine config={config} clubs={clubs} />
    </SidebarLayout>
  );
};

export default TechnicalClubs;
