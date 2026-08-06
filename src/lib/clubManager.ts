import { mockData } from '../data/mockData';

const CLUBS_STORAGE_KEY = 'tribe_all_clubs';
const APPLICATIONS_STORAGE_KEY = 'tribe_applications';

export interface ClubApplication {
  id: string;
  clubName: string;
  name: string;
  email: string;
  year: string;
  role: string;
  interest: string;
  experience: string;
  submittedAt: string;
}


export interface Club {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  members?: string | number;
  icon?: string;
  gradientClass?: string;
  lead?: string;
  clubLeads?: any[];
  upcomingEvents?: any[];
  originType: 'technical' | 'cultural' | 'sports';
  category?: string;
  registrationOpen?: boolean;
  criteria?: { title: string; desc: string; req: string }[];
}

export function getAllClubs(): Club[] {
  const stored = localStorage.getItem(CLUBS_STORAGE_KEY);
  if (stored) {
    try {
      const parsedClubs = JSON.parse(stored);
      // Auto-migrate JPG to PNG for codechef
      let migrated = false;
      parsedClubs.forEach((c: any) => {
        if (c.image === '/clubs/codechef.jpg') {
          c.image = '/clubs/codechef.png';
          migrated = true;
        }
      });
      if (migrated) {
        localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(parsedClubs));
      }
      return parsedClubs;
    } catch (e) {
      console.error('Failed to parse clubs from local storage', e);
    }
  }

  // If not stored, initialize from mockData
  const allClubs: Club[] = [
    ...mockData.technicalClubs.map(c => ({...c, originType: 'technical'} as Club)),
    ...mockData.culturalClubs.map(c => ({...c, originType: 'cultural'} as Club)),
    ...mockData.sportsClubs.map(c => ({...c, originType: 'sports'} as Club))
  ];
  
  localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(allClubs));
  return allClubs;
}

export function updateClub(updatedClub: Club): void {
  const allClubs = getAllClubs();
  const index = allClubs.findIndex(c => c.name === updatedClub.name);
  if (index !== -1) {
    allClubs[index] = updatedClub;
    localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(allClubs));
  }
}

export function getCurrentUserEmail(): string | null {
  return localStorage.getItem('currentUserEmail');
}

export function setCurrentUserEmail(email: string): void {
  localStorage.setItem('currentUserEmail', email.toLowerCase());
}

export function logout(): void {
  localStorage.removeItem('currentUserEmail');
}

export function saveApplication(app: Omit<ClubApplication, 'id' | 'submittedAt'>): void {
  try {
    const existingStr = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    const existing: ClubApplication[] = existingStr ? JSON.parse(existingStr) : [];
    
    const newApp: ClubApplication = {
      ...app,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString()
    };
    
    existing.push(newApp);
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error("Failed to save application", error);
  }
}

export function getApplications(clubName: string): ClubApplication[] {
  try {
    const existingStr = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    const existing: ClubApplication[] = existingStr ? JSON.parse(existingStr) : [];
    return existing.filter(app => app.clubName === clubName);
  } catch (error) {
    console.error("Failed to get applications", error);
    return [];
  }
}
