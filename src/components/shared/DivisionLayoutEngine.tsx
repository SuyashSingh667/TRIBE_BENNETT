import React from 'react';
import { useNavigate } from 'react-router-dom';

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

export const DivisionLayoutEngine: React.FC<{ config: DivisionConfig; clubs: any[] }> = ({ config, clubs }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen text-on-surface font-body-md relative overflow-hidden flex flex-col w-full">
      
      {/* =========================================================
          COMMAND CENTER HERO (M3 Style)
      ========================================================= */}
      <section className="relative w-full min-h-[600px] flex items-center justify-center text-center shadow-md animate-in fade-in duration-700 pt-12 pb-24">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBW8jvhVZGleZvJTRJzQ7Y1L7Rh4oMM-5YmO47bxFQ4tDXDFmVsvKO--Q7EYMYMTVry9SPoGys5uMmZJb5WzhDxk171fqNH_6ou9YvnysTeYQc_I-XnqKwx3j2gaxYKYJYpbIsSLnbOw66Vq_zARZY0fnzFM2MrgfvC-mFEICo6061sE2VAA70zaZ8FYJWnv1H7lyU3w4XccXwLeQ2dZnrZSvrAJVXbdeUjjddRgHuUyNLYUm9PZwEmTcRblCwvFYordc')", backgroundPosition: 'center 30%' }}></div>
          <div className="absolute inset-0 bg-primary/30 mix-blend-multiply"></div>
          <div className="texture-overlay"></div>
        </div>
        
        <div className="relative z-10 px-6 py-12 bg-background/80 backdrop-blur-sm border border-outline-variant rounded-lg max-w-4xl shadow-xl mx-4 mt-12 flex flex-col items-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-[1px] w-12 bg-tertiary"></div>
            <span className="text-label-caps font-label-caps text-tertiary tracking-widest uppercase">{config.subtitle}</span>
            <div className="h-[1px] w-12 bg-tertiary"></div>
          </div>
          
          <h1 className="text-headline-lg-mobile md:text-[80px] leading-none font-headline-xl text-primary mb-6 uppercase text-center">
            {config.title}
          </h1>
          
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto italic mb-12">
            "{config.description}"
          </p>
          
          {/* Live Division Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {config.metrics.map((stat, i) => (
              <div key={i} className="flex flex-col p-4 bg-surface/50 border border-outline-variant/50 rounded-lg hover:bg-surface transition-colors duration-300 backdrop-blur-md">
                <span className="text-label-caps font-label-caps text-tertiary mb-2">{stat.l}</span>
                <span className="text-headline-md font-headline-md text-primary">{stat.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SQUAD / DIVISION GRID (M3 Style)
      ========================================================= */}
      <section className="py-24 px-6 md:px-margin-desktop max-w-[1400px] mx-auto relative z-10 w-full">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-[1px] w-12 bg-tertiary"></div>
            <span className="text-label-caps font-label-caps text-tertiary tracking-widest uppercase">{config.gridSubtitle}</span>
            <div className="h-[1px] w-12 bg-tertiary"></div>
          </div>
          <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-primary">{config.gridTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {clubs.map((club, i) => (
             <div 
               key={i} 
               onClick={() => navigate(`/clubs/${encodeURIComponent(club.name.toLowerCase().replace(/\s+/g, '-'))}?type=${config.id}`)}
               className="group relative h-[420px] arch-card gold-border overflow-hidden bg-surface flex flex-col cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
             >
                <div className="w-full h-[55%] relative shrink-0 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <img src={club.image} alt={club.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                
                <div className="relative z-20 p-6 flex flex-col flex-1 bg-surface border-t border-tertiary/20">
                  <div className="size-12 rounded-full bg-background border border-tertiary flex items-center justify-center shadow-sm absolute -top-6 left-1/2 -translate-x-1/2 z-20 text-primary group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined">{club.icon || config.iconFallback}</span>
                  </div>

                  <div className="text-center mt-6">
                    <h3 className="text-headline-sm font-headline-md text-on-surface uppercase tracking-tight mb-2">{club.name}</h3>
                    <p className="text-body-sm font-body-md text-on-surface-variant line-clamp-3">
                      {club.description}
                    </p>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-center pt-4 text-tertiary font-label-caps text-label-caps group-hover:text-primary transition-colors">
                     <span className="tracking-widest uppercase">{club.members || '10+'} Ops</span>
                     <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                  </div>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};
