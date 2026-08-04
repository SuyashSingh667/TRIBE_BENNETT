import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export interface DivisionConfig {
  id: 'technical' | 'cultural' | 'sports';
  title: string;
  subtitle: string;
  description: string;
  accentHex: string;
  accentRgbClasses: string; // e.g. "bg-red-500", "text-red-500"
  metrics: { l: string; v: string; }[];
  gridTitle: string;
  gridSubtitle: string;
  iconFallback: string;
  bgMotionEffect: React.ReactNode;
}

// --------------------------------------------------------------------------
// 3D Visual Elements per Domain
// --------------------------------------------------------------------------
const Particles = ({ color = '#ffffff', count = 5000, speed = 10, pattern = 'sphere' }) => {
  const ref = useRef<any>(null);
  let positions: any = new Float32Array(count * 3);
  if (pattern === 'sphere') {
    positions = random.inSphere(positions, { radius: 2 });
  } else if (pattern === 'box') {
    positions = random.inBox(positions, { sides: [3, 3, 3] });
  }

  const [geoPositions] = useState(() => positions);

  useFrame((state, delta) => {
    if (ref.current) {
      if (pattern === 'sphere') {
        ref.current.rotation.x -= delta / speed;
        ref.current.rotation.y -= delta / (speed * 1.5);
      } else if (pattern === 'box') {
        ref.current.rotation.y += delta / speed;
        ref.current.position.y = Math.sin(state.clock.elapsedTime / 2) * 0.2;
      } else {
         ref.current.position.y -= delta * (speed / 2);
         if (ref.current.position.y < -2) ref.current.position.y = 2;
      }
    }
  });

  return (
    <group rotation={[0, 0, pattern === 'sphere' ? Math.PI / 4 : 0]}>
      <Points ref={ref} positions={geoPositions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color={color} size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
};

// --------------------------------------------------------------------------
// MAIN REUSABLE ENGINE
// --------------------------------------------------------------------------
export const DivisionLayoutEngine: React.FC<{ config: DivisionConfig; clubs: any[] }> = ({ config, clubs }) => {
  const navigate = useNavigate();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="bg-[#050505] min-h-screen text-slate-100 font-display relative overflow-hidden">
      
      {/* =========================================================
          COMMAND CENTER HERO
      ========================================================= */}
      <section className="relative pt-24 pb-20 px-8 md:px-16 border-b border-[#222]">
         
         {/* 3D Canvas Background */}
         <div className="absolute inset-0 z-0 opacity-40">
           <Canvas camera={{ position: [0, 0, 1] }}>
             {config.id === 'technical' && <Particles count={4000} color={config.accentHex} speed={15} pattern="box" />}
             {config.id === 'cultural' && <Particles count={6000} color={config.accentHex} speed={10} pattern="sphere" />}
             {config.id === 'sports' && <Particles count={3000} color={config.accentHex} speed={5} pattern="rain" />}
           </Canvas>
         </div>

         {/* Cinematic overlay CSS motion */}
         <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            {config.bgMotionEffect}
         </div>

         <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
           
           <div className={`flex items-center gap-4 mb-6`}>
             <div className="size-3 rounded-sm animate-pulse" style={{ backgroundColor: config.accentHex, boxShadow: `0 0 15px ${config.accentHex}` }} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] px-3 py-1 rounded-sm border" style={{ color: config.accentHex, backgroundColor: `${config.accentHex}1a`, borderColor: `${config.accentHex}4d` }}>
               Command Center Sync Active
             </span>
           </div>

           <h1 className="text-7xl md:text-[100px] lg:text-[140px] leading-[0.8] font-black tracking-tighter uppercase text-white drop-shadow-2xl mb-8 mix-blend-screen group hover:scale-[1.01] transition-transform duration-700 origin-left">
             {config.title}
           </h1>
           
           <p className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-4 flex flex-wrap justify-center md:justify-start gap-3">
              {config.subtitle.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 0 ? 'text-slate-500' : 'text-slate-300'}>{word}</span>
              ))}
           </p>

           <p className="text-sm font-medium text-slate-400 max-w-xl mb-12 italic border-l-2 pl-4" style={{ borderColor: config.accentHex }}>
             "{config.description}"
           </p>

           {/* Live Division Metrics */}
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full border border-[#222] bg-[#0a0a0a]/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl hover:shadow-[0_40px_100px_rgba(0,0,0,0.5)] transition-shadow duration-700 scale-100 origin-top">
              {config.metrics.map((stat, i) => (
                <div key={i} className={`flex flex-col ${i!==3 ? 'lg:border-r border-[#222]' : ''} px-4 group/stat`}>
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2 group-hover/stat:text-white transition-colors">{stat.l}</span>
                   <span className={`text-2xl font-black`} style={{ color: i % 2 === 1 ? config.accentHex : '#ffffff' }}>{stat.v}</span>
                </div>
              ))}
           </div>
         </div>
      </section>

      {/* =========================================================
          SQUAD / DIVISION GRID
      ========================================================= */}
      <section className="py-24 px-8 md:px-16 max-w-[1400px] mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-8 shadow-[0_0_15px_rgba(255,255,255,0.2)]" style={{ backgroundColor: config.accentHex }}></div>
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white">{config.gridTitle}</h2>
            </div>
            <p className="text-slate-400 font-medium max-w-xl text-sm opacity-80">
              {config.gridSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {clubs.map((club, i) => {
             const isHovered = hoveredIdx === i;
             return (
               <div 
                 key={i} 
                 onClick={() => navigate(`/clubs/${encodeURIComponent(club.name.toLowerCase().replace(/\s+/g, '-'))}?type=${config.id}`)}
                 onMouseEnter={() => setHoveredIdx(i)}
                 onMouseLeave={() => setHoveredIdx(null)}
                 className="relative h-[380px] bg-[#111] rounded-[32px] overflow-hidden border transition-all duration-500 flex flex-col cursor-pointer"
                 style={{ 
                   borderColor: isHovered ? `${config.accentHex}80` : '#222',
                   transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                   boxShadow: isHovered ? `0 20px 50px ${config.accentHex}20` : 'none'
                 }}
               >
                  {/* Image Background */}
                  <div className="absolute inset-0 bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url(${club.image})`, filter: isHovered ? 'none' : 'grayscale(100%)', opacity: isHovered ? 0.7 : 0.3, mixBlendMode: isHovered ? 'normal' : 'luminosity' }} />
                  
                  {/* Heavy overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent transition-opacity duration-500" />
                  
                  <div className="relative z-10 p-8 h-full flex flex-col pointer-events-none">
                    <div className="size-12 rounded-[16px] bg-[#0a0a0a]/80 backdrop-blur border flex items-center justify-center mb-auto transition-colors shadow-xl" style={{ borderColor: isHovered ? config.accentHex : '#333' }}>
                       <span className="material-symbols-outlined transition-colors duration-300" style={{ color: isHovered ? config.accentHex : 'white' }}>{club.icon || config.iconFallback}</span>
                    </div>

                    <div className="transition-transform duration-500" style={{ transform: isHovered ? 'translateY(0)' : 'translateY(16px)' }}>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-3">{club.name}</h3>
                      <p className="text-xs font-medium text-slate-400 line-clamp-3 mb-6 border-l-2 pl-3 transition-colors" style={{ borderColor: isHovered ? config.accentHex : '#333' }}>
                        {club.description}
                      </p>
                      
                      <div className="flex items-center justify-between transition-opacity duration-500 border-t border-[#222] pt-4" style={{ opacity: isHovered ? 1 : 0 }}>
                         <span className="text-[9px] font-black tracking-widest uppercase text-slate-500 bg-[#111] px-2 py-1 rounded border border-[#333]">
                           {club.members || '10+'} Ops
                         </span>
                         <span className="material-symbols-outlined text-white">arrow_forward</span>
                      </div>
                    </div>
                  </div>
               </div>
             );
           })}
        </div>

      </section>
    </div>
  );
};
