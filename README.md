# 🏛️ TRIBE — Centralized Campus Clubs & Events Hub

> **Find Your Tribe. Build Your Future.**  
> A comprehensive, modern ecosystem for student club management, event discovery, dynamic scheduling, and AI-assisted organization designed for Bennett University.

[![Live Production](https://img.shields.io/badge/Live_Demo-tribe--app--omega.vercel.app-00DC82?style=for-the-badge&logo=vercel&logoColor=white)](https://tribe-app-omega.vercel.app)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌟 Overview

**TRIBE** solves the fragmented communication and discovery problems across university student clubs. It unifies technical societies, cultural organizations, and sports committees into a cohesive, high-performance web platform featuring real-time event tracking, AI club matching, interactive recruitment applications, and administrative control.

---

## 🚀 Key Features

### 📅 1. Dynamic Global Intel & Master Calendar
- **Live Current-Month Schedule**: Automatically calculates month days, leading day offsets, and highlights today's active date.
- **Master Calendar Drawer**: Full-screen event schedule with category filtering, timing, venues, and registration status.
- **Quick Event Inspection**: One-click slide-out drawers featuring event agendas, speaker details, and registration links.

### 🤖 2. AI Club Discovery Assistant
- **Interactive Multi-Step Questionnaire**: Analyzes student interests (Code, Design, Motion, Leadership), preferred commitment hours, and goals.
- **Snappy Synthesis Engine**: Matches candidates with the most suitable clubs (e.g. *CodeChef Chapter*, *Advaita Music*, *Alexis Dance*, *Astronomy Club*).

### 🏛️ 3. Multi-Council Division Portals
- **💻 Technical Council**: Dev societies, competitive programming clubs, robotics, open-source communities, and hackathons.
- **🎭 Cultural Committee**: Music bands, dance troupes, drama societies, fine arts, and literary clubs.
- **⚽ Sports & Athletics Committee**: University sports teams, fitness clubs, inter-college tournament schedules, and athlete registrations.

### 📝 4. Recruitment & Application Management
- **Custom Join Forms**: Tailored club application workflows with portfolio links, skill matrices, and SOP submissions.
- **Criteria Matrix**: Transparent evaluation requirements (technical prerequisites, interview rounds, probation periods).

### 🛠️ 5. Admin & Management Tools
- **Add / Edit Club Modals**: Modify club branding, leadership contacts, descriptions, and recruitment statuses.
- **Event Creator**: Publish upcoming workshops, hackathons, auditions, and tournaments.
- **Global Search**: Instant fuzzy-matching search bar across all societies, leads, events, and venues.

---

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/), [Vite 8](https://vitejs.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| **Routing & Navigation** | [React Router DOM v7](https://reactrouter.com/) |
| **Styling & Design System**| [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [Base UI](https://base-ui.com/), [Lucide React](https://lucide.dev/) |
| **Graphics & 3D** | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei) |
| **Backend / Storage** | [Supabase SSR / JS](https://supabase.com/), Local Storage State Manager |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📂 Project Architecture

```
TRIBE_BENNETT/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── SidebarLayout.tsx          # Main persistent sidebar & navigation
│   │   ├── shared/
│   │   │   ├── ClubDiscoveryAssistant.tsx # AI club recommendation modal
│   │   │   ├── MasterCalendarModal.tsx    # Full master schedule view
│   │   │   ├── EventDetailDrawer.tsx      # Slide-out event details drawer
│   │   │   ├── AddClubModal.tsx           # Admin club creation modal
│   │   │   ├── AdminEditModal.tsx         # Club details editor
│   │   │   ├── ClubJoinForm.tsx           # Student application workflow
│   │   │   ├── GlobalSearch.tsx           # Instant search modal
│   │   │   ├── ProfilePanel.tsx           # Student profile & joined clubs
│   │   │   └── SettingsPanel.tsx          # System settings & theme controls
│   │   └── ui/
│   │       └── button.tsx                 # Standardized button primitives
│   ├── pages/
│   │   ├── Dashboard.tsx                  # Primary hub with Global Intel & feeds
│   │   ├── TechnicalClubs.tsx             # Technical Council division
│   │   ├── CulturalClubs.tsx              # Cultural Committee division
│   │   ├── SportsCommittee.tsx            # Sports & Athletics division
│   │   └── ClubDetails.tsx                # Dynamic individual club page
│   ├── data/
│   │   └── mockData.ts                    # Core club profiles, events, and rosters
│   ├── lib/
│   │   ├── clubManager.ts                 # Dynamic club & event state manager
│   │   └── utils.ts                       # Classnames & formatting helpers
│   ├── App.tsx                            # Root routing configuration
│   ├── main.tsx                           # Application entry point
│   └── index.css                          # Custom design tokens & motif patterns
├── public/
│   ├── clubs/                             # Club badges and leadership assets
│   └── icons.svg                          # Custom SVG sprite symbols
├── package.json
└── vite.config.ts
```

---

## 💻 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/SuyashSingh667/TRIBE_BENNETT.git
cd TRIBE_BENNETT
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 👤 Author

**Suyash Singh**
- **Portfolio**: [myselfsuyash.vercel.app](https://myselfsuyash.vercel.app)
- **LinkedIn**: [linkedin.com/in/suyashsingh0435](https://www.linkedin.com/in/suyashsingh0435)
- **GitHub**: [@SuyashSingh667](https://github.com/SuyashSingh667)
- **Email**: [suyashsingh667@gmail.com](mailto:suyashsingh667@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
