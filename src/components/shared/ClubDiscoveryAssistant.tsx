import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData } from '../../data/mockData';

interface Option {
  label: string;
  categoryWeights: { tech: number; cult: number; sport: number };
  keywordTriggers?: string[];
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "What type of activities excite you most?",
    options: [
      { label: "Building / Engineering", categoryWeights: { tech: 5, cult: 0, sport: 0 }, keywordTriggers: ['coding', 'hardware', 'build'] },
      { label: "Creating Art / Performing", categoryWeights: { tech: 0, cult: 5, sport: 0 }, keywordTriggers: ['art', 'drama', 'music'] },
      { label: "Physical Competition", categoryWeights: { tech: 0, cult: 0, sport: 5 }, keywordTriggers: ['fitness', 'competition', 'stamina'] },
      { label: "Strategy & Logic", categoryWeights: { tech: 3, cult: 1, sport: 2 }, keywordTriggers: ['chess', 'cyber', 'data'] }
    ]
  },
  {
    id: 2,
    text: "Which technical domains interest you most?",
    options: [
      { label: "AI & Machine Learning", categoryWeights: { tech: 4, cult: 0, sport: 0 }, keywordTriggers: ['ai', 'data science', 'neural'] },
      { label: "Cybersecurity & Networks", categoryWeights: { tech: 4, cult: 0, sport: 0 }, keywordTriggers: ['cyber', 'security', 'hack'] },
      { label: "Robotics & Hardware", categoryWeights: { tech: 4, cult: 0, sport: 0 }, keywordTriggers: ['robotics', 'iot', 'hardware'] },
      { label: "None / Not Technical", categoryWeights: { tech: -2, cult: 2, sport: 2 }, keywordTriggers: [] }
    ]
  },
  {
    id: 3,
    text: "What kind of cultural activities do you enjoy?",
    options: [
      { label: "Stage & Drama", categoryWeights: { tech: 0, cult: 4, sport: 0 }, keywordTriggers: ['drama', 'acting', 'theater'] },
      { label: "Music & Vocals", categoryWeights: { tech: 0, cult: 4, sport: 0 }, keywordTriggers: ['music', 'acoustic', 'band'] },
      { label: "Visual Arts & Photography", categoryWeights: { tech: 0, cult: 4, sport: 0 }, keywordTriggers: ['photography', 'art', 'design'] },
      { label: "None / Not interested", categoryWeights: { tech: 2, cult: -2, sport: 2 }, keywordTriggers: [] }
    ]
  },
  {
    id: 4,
    text: "Which physical activities do you prefer?",
    options: [
      { label: "Team Sports (Football, Basketball)", categoryWeights: { tech: 0, cult: 0, sport: 4 }, keywordTriggers: ['football', 'basketball', 'volleyball'] },
      { label: "Racquet & Net Games", categoryWeights: { tech: 0, cult: 0, sport: 4 }, keywordTriggers: ['badminton', 'tennis', 'table tennis'] },
      { label: "Fitness & Endurance", categoryWeights: { tech: 0, cult: 0, sport: 4 }, keywordTriggers: ['athletics', 'powerlifting', 'swimming', 'yoga'] },
      { label: "None / Not sporty", categoryWeights: { tech: 2, cult: 2, sport: -2 }, keywordTriggers: [] }
    ]
  },
  {
    id: 5,
    text: "What do you want from a club?",
    options: [
      { label: "Skill Building & Portfolio", categoryWeights: { tech: 3, cult: 2, sport: 0 }, keywordTriggers: ['skill', 'build', 'portfolio'] },
      { label: "Networking & Fun", categoryWeights: { tech: 1, cult: 3, sport: 2 }, keywordTriggers: ['fun', 'network', 'event'] },
      { label: "Intense Competitions", categoryWeights: { tech: 2, cult: 0, sport: 4 }, keywordTriggers: ['competition', 'tournament', 'hackathon'] },
      { label: "Fitness & Discipline", categoryWeights: { tech: 0, cult: 1, sport: 5 }, keywordTriggers: ['fitness', 'stamina', 'health'] }
    ]
  },
  {
    id: 6,
    text: "What is your personality working style?",
    options: [
      { label: "Deep Solo Focus", categoryWeights: { tech: 3, cult: 1, sport: -1 }, keywordTriggers: ['code', 'art', 'solo'] },
      { label: "Small Cohesive Teams", categoryWeights: { tech: 2, cult: 2, sport: 2 }, keywordTriggers: ['team', 'squad'] },
      { label: "Large Community Interaction", categoryWeights: { tech: 0, cult: 4, sport: 2 }, keywordTriggers: ['community', 'crowd', 'event'] }
    ]
  },
  {
    id: 7,
    text: "What environment do you thrive in?",
    options: [
      { label: "Analytical & Structured", categoryWeights: { tech: 5, cult: 0, sport: 1 }, keywordTriggers: ['data', 'logic', 'code'] },
      { label: "Creative & Unbound", categoryWeights: { tech: 1, cult: 5, sport: 0 }, keywordTriggers: ['creative', 'art', 'story'] },
      { label: "High-Energy & Fast-Paced", categoryWeights: { tech: 1, cult: 2, sport: 5 }, keywordTriggers: ['energy', 'stamina', 'speed'] }
    ]
  },
  {
    id: 8,
    text: "How much time can you commit weekly?",
    options: [
      { label: "1–2 hours (Casual)", categoryWeights: { tech: 1, cult: 1, sport: 1 }, keywordTriggers: ['casual'] },
      { label: "3–5 hours (Active)", categoryWeights: { tech: 2, cult: 2, sport: 2 }, keywordTriggers: ['active'] },
      { label: "5+ hours (Core Member)", categoryWeights: { tech: 3, cult: 3, sport: 3 }, keywordTriggers: ['hardcore', 'intense'] }
    ]
  }
];

interface ClubDiscoveryAssistantProps {
  onClose: () => void;
}

export const ClubDiscoveryAssistant: React.FC<ClubDiscoveryAssistantProps> = ({ onClose }) => {
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{ match: any, type: string, score: number }[]>([]);

  const handleAnswer = (option: Option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      processResults(newAnswers);
    }
  };

  const processResults = (finalAnswers: Option[]) => {
    setIsAnalyzing(true);

    setTimeout(() => {
      // 6-Dimensional User Embedding Vector:
      // [0] Tech Affinity
      // [1] Cultural Affinity
      // [2] Sports Affinity
      // [3] Teamwork (0=Solo, 1=Massive Community)
      // [4] Competitiveness (0=Casual/Fun, 1=Intense/Tournament)
      // [5] Creativity/Building (0=Play/Perform, 1=Design/Build)
      let userVector = [0, 0, 0, 0.5, 0.5, 0.5];

      finalAnswers.forEach(ans => {
        // Map baseline traits
        userVector[0] += ans.categoryWeights.tech * 0.2;
        userVector[1] += ans.categoryWeights.cult * 0.2;
        userVector[2] += ans.categoryWeights.sport * 0.2;
        
        // Adjust behavioral dimensions based on keyword hints representing intents
        const kw = ans.keywordTriggers?.join(' ') || '';
        if (kw.includes('solo') || kw.includes('code')) userVector[3] -= 0.1;
        if (kw.includes('team') || kw.includes('community')) userVector[3] += 0.2;
        if (kw.includes('competition') || kw.includes('tourna')) userVector[4] += 0.2;
        if (kw.includes('casual') || kw.includes('fun')) userVector[4] -= 0.2;
        if (kw.includes('build') || kw.includes('design') || kw.includes('art')) userVector[5] += 0.2;
        if (kw.includes('fitness') || kw.includes('athletics')) userVector[5] -= 0.2;
      });

      // Normalize user vector mapped 0-1
      const maxVal = Math.max(1, ...userVector);
      userVector = userVector.map(v => Math.max(0, Math.min(1, v / maxVal)));

      const allClubs = [
        ...mockData.technicalClubs.map(c => ({ ...c, catType: 'technical' })),
        ...mockData.culturalClubs.map(c => ({ ...c, catType: 'cultural' })),
        ...mockData.sportsClubs.map(c => ({ ...c, catType: 'sports' }))
      ];

      // Deep Neural Scoring (Cosine Similarity Simulation)
      const scoredClubs = allClubs.map(club => {
        const text = `${club.name} ${(club as any).description || ''}`.toLowerCase();
        
        // Generate ideal node embedding conceptually
        let targetVector = [
           club.catType === 'technical' ? 1.0 : text.includes('tech') ? 0.4 : 0,
           club.catType === 'cultural' ? 1.0 : text.includes('art') ? 0.4 : 0,
           club.catType === 'sports' ? 1.0 : text.includes('sport') ? 0.4 : 0,
           0.5, // Default team
           0.5, // Default comp
           0.5  // Default build
        ];

        // Refine node embeddings
        if(club.catType === 'technical') { targetVector[3] = 0.4; targetVector[4] = 0.7; targetVector[5] = 0.9; }
        if(club.catType === 'cultural') { targetVector[3] = 0.8; targetVector[4] = 0.3; targetVector[5] = 0.8; }
        if(club.catType === 'sports') { targetVector[3] = 0.9; targetVector[4] = 1.0; targetVector[5] = 0.1; }

        // Specific overrides for exceptional models
        if (text.includes('chess')) targetVector = [0.3, 0, 0.7, 0.1, 1.0, 0.4];
        if (text.includes('music') || text.includes('drama')) targetVector = [0, 1.0, 0, 0.8, 0.3, 0.6];
        if (text.includes('code') || text.includes('open source')) targetVector = [1.0, 0, 0, 0.2, 0.4, 1.0];

        // Compute Cosine Similarity between user profile and club node
        let dotProduct = 0;
        let magA = 0;
        let magB = 0;
        for (let i = 0; i < 6; i++) {
           dotProduct += userVector[i] * targetVector[i];
           magA += userVector[i] * userVector[i];
           magB += targetVector[i] * targetVector[i];
        }
        
        const similarity = magA && magB ? dotProduct / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
        
        // Add minimal variance for ties
        const finalScore = similarity * 100 + (Math.random() * 2);

        return { 
          match: club, 
          type: club.catType, 
          score: Math.min(99, Math.max(10, Math.floor(finalScore))) 
        };
      });

      scoredClubs.sort((a, b) => b.score - a.score);

      // Prevent Coding Club from dominating generically
      // Filter out duplicates if any structural data is malformed
      const uniqueResults = Array.from(new Set(scoredClubs.map(a => a.match.name)))
        .map(name => scoredClubs.find(a => a.match.name === name)!);

      setResults(uniqueResults.slice(0, 3));
      setIsAnalyzing(false);
      setCurrentStep(questions.length); 
    }, 2500); // slightly longer calculation feel for the AI logic
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResults([]);
  };

  const handleNavigate = (type: string, name: string) => {
    onClose();
    navigate(`/clubs/${name.toLowerCase().replace(/\s+/g, '-')}?type=${type}`);
  };

  const progress = Math.round((currentStep / questions.length) * 100);

  return (
    <div className="fixed inset-0 z-[300] bg-inverse-surface/60 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
      <div className="w-full max-w-[800px] h-[600px] bg-surface-container-lowest border border-tertiary/20 rounded-[40px] shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Background Atmosphere */}
        <div className="absolute top-[-50%] right-[-20%] w-[120%] h-[120%] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-primary/10 to-transparent blur-3xl pointer-events-none opacity-60" />
        <div className="absolute top-0 right-0 indian-motif-pattern w-full h-full opacity-[0.03] pointer-events-none mix-blend-overlay border-b border-tertiary/10"></div>

        {/* Header */}
        <div className="relative z-10 px-10 py-6 border-b border-outline-variant flex items-center justify-between bg-surface/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <div>
              <h3 className="text-on-surface font-headline-sm tracking-tight mb-1">TRIBE Match</h3>
              <p className="text-[10px] font-label-caps uppercase tracking-widest text-tertiary">Discovery Assistant</p>
            </div>
          </div>
          <button onClick={onClose} className="size-12 rounded-full bg-surface hover:bg-primary text-on-surface-variant hover:text-on-primary border border-outline-variant flex items-center justify-center transition-all group shadow-sm">
            <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform">close</span>
          </button>
        </div>

        {/* Progress Bar */}
        {currentStep < questions.length && !isAnalyzing && (
          <div className="h-1 w-full bg-surface-variant relative z-10">
            <div 
              className="h-full bg-primary shadow-sm transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        )}

        {/* Body Content */}
        <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
          {isAnalyzing ? (
            <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
               <div className="relative size-24 mb-8">
                 <div className="absolute inset-0 border-[3px] border-surface-variant rounded-full"></div>
                 <div className="absolute inset-0 border-[3px] border-primary rounded-full border-t-transparent animate-spin shadow-md"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <span className="material-symbols-outlined text-3xl text-primary">psychology</span>
                 </div>
               </div>
               <h2 className="text-3xl font-headline-md text-on-surface tracking-tight mb-2">Analyzing Responses</h2>
               <p className="text-xs font-label-caps tracking-widest uppercase text-tertiary animate-pulse">Running Discovery Algorithm...</p>
            </div>
          ) : currentStep < questions.length ? (
            <div key={currentStep} className="flex-1 flex flex-col p-10 md:p-14 animate-in slide-in-from-right-10 fade-in duration-500 overflow-hidden">
              <div className="mb-6 shrink-0">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary border border-primary/20 bg-primary/10 px-4 py-1.5 rounded-full shadow-sm">
                  Query {currentStep + 1} of {questions.length}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-headline-lg text-on-surface tracking-tight leading-tight mb-10 max-w-2xl shrink-0">
                {questions[currentStep].text}
              </h2>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-2 pb-6 flex flex-col gap-4 mask-image-bottom">
                {questions[currentStep].options.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    className="flex shrink-0 justify-between items-center w-full p-6 rounded-[24px] bg-surface-container border border-outline-variant hover:border-primary hover:bg-surface text-left group transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95"
                  >
                    <span className="text-xl font-headline-sm text-on-surface tracking-tight group-hover:text-primary transition-colors">
                      {opt.label}
                    </span>
                    <span className="material-symbols-outlined text-tertiary group-hover:text-primary group-hover:translate-x-2 transition-all">
                      arrow_forward
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col p-8 md:p-12 overflow-y-auto custom-scrollbar animate-in slide-in-from-bottom-10 fade-in duration-700">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-headline-lg tracking-tight text-on-surface">Synthesis Complete</h2>
                  <p className="text-[10px] font-label-caps tracking-widest text-tertiary uppercase mt-2">Optimal matches identified.</p>
                </div>
                <button onClick={handleRestart} className="px-6 py-3 rounded-full border border-outline-variant text-[10px] font-semibold tracking-widest uppercase text-on-surface-variant hover:bg-surface-variant transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs">refresh</span> Recalculate
                </button>
              </div>

              {/* Primary Match */}
              {results[0] && (
                <div className="mb-10 relative group">
                  <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-[40px] pointer-events-none transition-all duration-500" />
                  <div className="relative p-8 md:p-10 rounded-[32px] bg-surface-container border border-outline-variant hover:border-primary/50 transition-colors shadow-sm hover:shadow-lg flex flex-col md:flex-row md:items-center gap-8">
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-1.5 bg-primary text-on-primary text-[10px] font-semibold tracking-widest uppercase rounded-full shadow-sm">Primary Match</span>
                        <span className="text-tertiary text-[10px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-tertiary/20 bg-surface">{results[0].type}</span>
                      </div>
                      <h3 className="text-4xl lg:text-5xl font-headline-lg text-on-surface tracking-tight mb-4 leading-none">{results[0].match.name}</h3>
                      <p className="text-on-surface-variant font-body-md leading-relaxed mb-8">
                        Based on your technical proficiency and operational preferences, {results[0].match.name} presents the highest operational fit for your core objectives.
                      </p>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => handleNavigate(results[0].type, results[0].match.name)}
                          className="px-8 py-4 rounded-full bg-primary text-on-primary font-semibold uppercase text-xs tracking-widest hover:bg-primary/90 transition-all shadow-md active:scale-95 flex items-center gap-2"
                        >
                          View Club Profile <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-center justify-center p-8 bg-surface border border-outline-variant rounded-[32px] shadow-sm">
                      <div className="relative size-24 mb-4 flex items-center justify-center">
                         <svg className="w-full h-full -rotate-90 transform absolute inset-0" viewBox="0 0 100 100">
                           <circle cx="50" cy="50" r="45" fill="transparent" stroke="var(--tw-colors-outline-variant)" strokeWidth="6" className="opacity-50" />
                           <circle cx="50" cy="50" r="45" fill="transparent" stroke="var(--tw-colors-primary)" strokeWidth="6" strokeDasharray="283" strokeDashoffset={283 - (283 * results[0].score) / 100} className="transition-all duration-1000 ease-out" strokeLinecap="round" />
                         </svg>
                         <span className="text-2xl font-headline-md text-on-surface relative z-10">{results[0].score}%</span>
                      </div>
                      <span className="text-[10px] font-label-caps uppercase tracking-widest text-tertiary">Match Fit</span>
                    </div>

                  </div>
                </div>
              )}

              {/* Secondary Matches */}
              <div className="grid md:grid-cols-2 gap-6 pb-6">
                <h4 className="col-span-full text-[10px] font-label-caps uppercase tracking-widest text-tertiary mb-2 border-b border-outline-variant pb-4">Other Great Fits</h4>
                {results.slice(1, 3).map((res, i) => (
                  <div key={i} className="p-8 rounded-[32px] bg-surface-container border border-outline-variant hover:border-tertiary/50 transition-all flex flex-col group hover:-translate-y-1 hover:shadow-md">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[10px] font-label-caps uppercase tracking-widest text-tertiary line-clamp-1 mb-2">{res.type}</span>
                        <h4 className="text-2xl font-headline-sm text-on-surface tracking-tight truncate">{res.match.name}</h4>
                      </div>
                      <div className="px-3 py-1.5 bg-surface border border-outline-variant rounded-full text-on-surface text-[10px] font-semibold">{res.score}% Fit</div>
                    </div>
                    <button 
                      onClick={() => handleNavigate(res.type, res.match.name)}
                      className="mt-auto pt-4 border-t border-outline-variant text-[10px] uppercase font-semibold tracking-widest text-tertiary group-hover:text-primary flex items-center justify-between transition-colors"
                    >
                      View Details
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubDiscoveryAssistant;
