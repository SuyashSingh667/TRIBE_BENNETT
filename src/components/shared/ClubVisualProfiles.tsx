import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// -------------------------------------------------------------
// 3D & THEME ASSETS
// -------------------------------------------------------------

// Particle Mesh for Canvas Backgrounds
export const Starfield = ({ color = '#ffffff' }) => {
  const ref = useRef<any>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));
  useFrame((_state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color={color} size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
};

// -------------------------------------------------------------
// INDIVIDUAL CLUB VISUAL PRESETS
// -------------------------------------------------------------

export const getClubVisuals = (clubName: string, clubCategory: string) => {
  const name = clubName.toLowerCase();
  
  // Default fallback (Generic Premium)
  const profile = {
     heroBg: <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#0a0a0a]" />,
     particlesColor: '#444444',
     accentRgb: '255, 255, 255',
     livePanel: <GenericLivePanel />,
     tagline: "INNOVATION & EXPLORATION",
  };

  if (clubCategory !== 'technical') return profile;

  if (name.includes('code') || name.includes('coding')) {
    return {
       heroBg: (
         <div className="absolute inset-0 bg-[#050505]">
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.1)_95%)] bg-[length:10px_10px]" />
            <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-xl">
               <span className="text-[400px] font-black text-white/10 tracking-tighter">\{';'}</span>
            </div>
         </div>
       ),
       particlesColor: '#aaaaaa',
       accentRgb: '255, 255, 255',
       livePanel: <CodingLivePanel />,
       tagline: "ALGORITHMIC EXCELLENCE & LOGIC ARCHITECTURE",
    };
  }
  
  if (name.includes('ai') || name.includes('machine') || name.includes('data')) {
    return {
       heroBg: (
         <div className="absolute inset-0 bg-[#0a0505]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.15)_0%,transparent_70%)]" />
         </div>
       ),
       particlesColor: '#dc2626',
       accentRgb: '220, 38, 38',
       livePanel: <AILivePanel />,
       tagline: "NEURAL MAPPING & PREDICTIVE INTELLIGENCE",
    };
  }

  if (name.includes('cyber') || name.includes('security')) {
    return {
       heroBg: (
         <div className="absolute inset-0 bg-[#000000]">
            <div className="absolute h-[200%] w-full animate-[scan_8s_linear_infinite] bg-[linear-gradient(to_bottom,transparent,rgba(220,38,38,0.2),transparent)] opacity-30" />
            <div className="absolute right-10 top-20 text-[8px] text-red-500/40 font-mono tracking-widest break-all w-64 opacity-50">
               {Array.from({length:20}).map((_,_i) => `0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase().padStart(6,'0')} `)}
            </div>
         </div>
       ),
       particlesColor: '#ff0000',
       accentRgb: '220, 38, 38',
       livePanel: <CyberLivePanel />,
       tagline: "THREAT MITIGATION & CRYPTOGRAPHIC DEFENSE",
    };
  }

  if (name.includes('robotic') || name.includes('hardware')) {
    return {
       heroBg: (
         <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] to-[#1a1a1a]">
            {/* Geometric Mesh Lines */}
            <svg className="absolute w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
         </div>
       ),
       particlesColor: '#666666',
       accentRgb: '200, 200, 200',
       livePanel: <RoboticsLivePanel />,
       tagline: "KINEMATIC SYSTEMS & HARDWARE ENGINEERING",
    };
  }
  
  if (name.includes('block') || name.includes('web3')) {
    return {
       heroBg: (
         <div className="absolute inset-0 bg-[#0a0a0a]">
            <div className="absolute inset-0 flex items-center justify-center gap-12 opacity-10 blur-sm">
               <div className="size-32 border-4 border-white rotate-45" />
               <div className="w-64 h-2 bg-white" />
               <div className="size-32 border-4 border-white rotate-45" />
            </div>
         </div>
       ),
       particlesColor: '#ffffff',
       accentRgb: '255, 255, 255',
       livePanel: <BlockchainLivePanel />,
       tagline: "DECENTRALIZED PROTOCOLS & LEDGER SYSTEMS",
    };
  }

  if (name.includes('open source') || name.includes('git')) {
    return {
       heroBg: (
         <div className="absolute inset-0 bg-[#080808]">
            <div className="absolute left-[-10%] top-0 h-full w-[40%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
         </div>
       ),
       particlesColor: '#aaaaaa',
       accentRgb: '255, 255, 255',
       livePanel: <OpenSourceLivePanel />,
       tagline: "GLOBAL COLLABORATION & REPOSITORY ENGINEERING",
    };
  }

  return profile;
};

// -------------------------------------------------------------
// LIVE PANEL COMPONENTS (Interactive / Animated Sections)
// -------------------------------------------------------------

const GenericLivePanel = () => (
  <div className="h-64 flex items-center justify-center bg-[#111] border border-[#222] rounded-[32px]">
    <div className="text-center font-black uppercase tracking-widest text-slate-500">Live Telemetry Offline</div>
  </div>
);

const CodingLivePanel = () => {
  const [code, setCode] = useState<string[]>([]);
  useEffect(() => {
    const lines = [
      "const compileMatrix = async (nodes: Edge[]) => {",
      "  return nodes.reduce((acc, curr) => {",
      "    if(curr.flux > 0.9) acc.push(curr.id);",
      "    return acc;",
      "  }, []);",
      "};",
      "// Resolving dependencies...",
      "compileMatrix(activeSession).then(init);",
    ];
    let i = 0;
    const interval = setInterval(() => {
      setCode(prev => [...prev.slice(-5), lines[i % lines.length]]);
      i++;
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full min-h-[250px] p-8 bg-[#050505] border border-[#222] rounded-[32px] font-mono text-sm relative overflow-hidden flex flex-col justify-end shadow-inner">
      <div className="absolute top-4 right-6 text-[10px] text-green-500 animate-pulse">● LIVE TERM</div>
      {code.map((line, i) => (
        <div key={i} className="text-slate-400 mb-2 typewriter-line whitespace-pre opacity-80">{line}</div>
      ))}
      <div className="text-white mt-2 animate-pulse">_</div>
    </div>
  );
};

const AILivePanel = () => (
  <div className="h-full min-h-[250px] p-8 bg-[#0a0505] border border-red-900/30 rounded-[32px] relative overflow-hidden flex items-center justify-center gap-8 shadow-2xl">
     <div className="absolute top-4 right-6 text-[10px] text-red-500 animate-pulse uppercase font-black tracking-widest">● Neural Active</div>
     <div className="flex flex-col gap-4 w-full max-w-sm z-10">
       {[ {l: 'Vision Model Precision', v: 98}, {l: 'LLM Latency', v: 42}, {l: 'Data Flux Pipeline', v: 88} ].map((stat, i) => (
         <div key={i}>
           <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">
             <span>{stat.l}</span>
             <span className="text-white">{stat.v}{i===1?'ms':'%'}</span>
           </div>
           <div className="h-1 w-full bg-[#222] rounded overflow-hidden">
             <div className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]" style={{width: `${stat.v}%`, transition: 'width 2s ease'}} />
           </div>
         </div>
       ))}
     </div>
  </div>
);

const CyberLivePanel = () => (
  <div className="h-full min-h-[250px] p-8 bg-black border border-[#222] rounded-[32px] relative overflow-hidden flex flex-col shadow-2xl">
    <div className="absolute top-4 right-6 text-[10px] text-red-500 animate-pulse uppercase font-black tracking-widest">● SOC Monitor</div>
    <div className="flex-1 flex flex-col justify-end text-xs font-mono">
       {[
         "[WARN] Unauthorized root attempt detected IP 192.168.0.x",
         "[INFO] Firewall routing updated via proxy net",
         "[CRIT] Packet loss anomaly in sector 7G",
         "[OK] Handshake secured. End-to-end encrypted."
       ].map((log, i) => (
         <div key={i} className={`mb-3 ${log.includes('CRIT') || log.includes('WARN') ? 'text-red-500' : 'text-slate-500'} opacity-80 border-b border-[#222] pb-2`}>
           <span className="text-white/30 mr-2">{new Date().toISOString().split('T')[1].slice(0,8)}</span> {log}
         </div>
       ))}
    </div>
  </div>
);

const RoboticsLivePanel = () => (
   <div className="h-full min-h-[250px] p-8 bg-[#111] border border-[#222] rounded-[32px] relative overflow-hidden flex items-center justify-around shadow-2xl">
     <div className="absolute top-4 right-6 text-[10px] text-slate-400 animate-pulse uppercase font-black tracking-widest">● Servo Diagnostics</div>
     <div className="size-32 rounded-full border-[4px] border-dashed border-[#444] animate-[spin_10s_linear_infinite] flex items-center justify-center">
       <div className="size-20 rounded-full border-[2px] border-white flex items-center justify-center text-[10px] font-black tracking-widest uppercase">Motor 1</div>
     </div>
     <div className="w-24 h-1 bg-[#333]">
       <div className="h-full bg-white w-1/2 animate-pulse" />
     </div>
     <div className="size-32 rounded-full border-[4px] border-dashed border-[#444] animate-[spin_8s_linear_infinite_reverse] flex items-center justify-center">
       <div className="size-20 rounded-full border-[2px] border-white flex items-center justify-center text-[10px] font-black tracking-widest uppercase">Motor 2</div>
     </div>
   </div>
);

const BlockchainLivePanel = () => (
   <div className="h-full min-h-[250px] p-8 bg-[#0a0a0a] border border-[#222] rounded-[32px] relative overflow-hidden flex flex-col justify-center items-center shadow-2xl">
      <div className="flex items-center gap-4">
        {[2091, 2092, 2093].map((block, i) => (
          <React.Fragment key={block}>
            <div className={`p-4 border ${i===2?'border-white bg-white/10':'border-[#333]'} rounded-xl w-32 flex flex-col items-center justify-center transition-all`}>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Block</span>
               <span className="text-xl font-black text-white">#{block}</span>
            </div>
            {i < 2 && <div className="w-12 h-0.5 bg-[#444] relative"><div className={`absolute top-0 right-0 size-2 bg-white rounded-full -translate-y-[3px] animate-ping`} /></div>}
          </React.Fragment>
        ))}
      </div>
   </div>
);

const OpenSourceLivePanel = () => (
   <div className="h-full min-h-[250px] p-8 bg-[#111] border border-[#222] rounded-[32px] relative overflow-hidden flex flex-col shadow-2xl">
     <div className="absolute top-4 right-6 text-[10px] text-green-500 animate-pulse uppercase font-black tracking-widest">● Merge Pipeline</div>
     <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Commit Activity Matrix</h4>
     <div className="flex-1 grid grid-cols-12 gap-2 opacity-60">
       {Array.from({length: 48}).map((_, i) => {
         const intensity = Math.random();
         const bg = intensity > 0.8 ? 'bg-white' : intensity > 0.4 ? 'bg-slate-400' : 'bg-[#222]';
         return <div key={i} className={`rounded-sm ${bg} hover:bg-red-500 transition-colors`} />
       })}
     </div>
   </div>
);

export const RoadmapProgression = () => (
  <div className="relative pt-12 pb-8">
    <div className="absolute left-[39px] top-12 bottom-8 w-0.5 bg-gradient-to-b from-white via-[#444] to-transparent z-0" />
    <div className="flex flex-col gap-12 relative z-10">
      {[
        { stage: 'Phase I', role: 'Apprentice / Junior Core', desc: 'Onboarding, technical assessment, and foundational task execution.', req: 'Basic domain knowledge' },
        { stage: 'Phase II', role: 'Operative / Project Member', desc: 'Active contribution to ongoing club projects and hackathons.', req: 'Consistent commit history' },
        { stage: 'Phase III', role: 'Architect / Senior Core', desc: 'System design, event facilitation, and junior operative mentoring.', req: 'Project leadership proof' },
        { stage: 'Phase IV', role: 'Lead Director', desc: 'Full club strategy, ecosystem integration, and external representations.', req: 'Elected excellence' }
      ].map((s, i) => (
        <div key={i} className="flex gap-8 items-start group">
          <div className="w-20 h-20 shrink-0 bg-[#0a0a0a] border-4 border-[#222] group-hover:border-white rounded-2xl flex flex-col items-center justify-center transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] relative">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{s.stage}</span>
            <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-6 h-0.5 bg-[#444] group-hover:bg-white transition-colors" />
          </div>
          <div className="flex flex-col p-6 rounded-3xl bg-[#111] border border-[#222] group-hover:border-[#444] w-full transition-all group-hover:-translate-y-1 shadow-xl">
             <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">{s.role}</h3>
             <p className="text-sm font-medium text-slate-400 mb-4">{s.desc}</p>
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-t border-[#222] pt-4 mt-auto">
                <span className="text-white">Req:</span> {s.req}
             </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
