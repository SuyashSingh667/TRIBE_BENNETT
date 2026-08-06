import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import ClubDetailTemplate from '../components/shared/ClubDetailTemplate';
import { getAllClubs } from '../lib/clubManager';

const ClubDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type') || 'technical';

  // Find club across all categories from local storage
  const allClubs = getAllClubs();

  const club = allClubs.find(
    c => c.name.toLowerCase().replace(/\s+/g, '-') === id
  );

  if (!club) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4 uppercase tracking-tighter">Node Not Found</h1>
        <button onClick={() => navigate(-1)} className="px-6 py-2 bg-white hover:bg-slate-200 text-black rounded-full transition font-bold uppercase tracking-widest text-xs">Return to Directory</button>
      </div>
    );
  }

  // Determine accent classes based on originType
  let accentColorClass = 'text-slate-300';
  let accentBgClass = 'bg-slate-300';

  if (club.originType === 'cultural' || type === 'cultural') {
    accentColorClass = 'text-[#d4af37]';
    accentBgClass = 'bg-[#d4af37]';
  } else if (club.originType === 'sports' || type === 'sports') {
    accentColorClass = 'text-[#dc2626]';
    accentBgClass = 'bg-[#dc2626]';
  }

  return (
    <ClubDetailTemplate 
      club={club} 
      accentBgClass={accentBgClass} 
      accentColorClass={accentColorClass} 
    />
  );
};

export default ClubDetails;
