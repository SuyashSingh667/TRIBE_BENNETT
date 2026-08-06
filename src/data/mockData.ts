export const mockData = {
  landing: {
    hero: {
      tagline: "Next-Gen Communities",
      title: "TRIBE",
      description: "The definitive platform for creators, builders, and visionaries to unite in high-performance digital environments.",
      avatars: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBQKH6dElwz-rA2RsqBcosbDFpm_l4mXYmh9_aNW3ltf6-e_TGEWbUvNIUj0dCWQ1sWKOVXAmkeoBqaOU7CnqPt0XYHDSiqx7HqpI_DaFJMqcEaI3ICB7NpzE1-TO50EEc5sM59GAmWQH7w4bly7JuoWqyytoTgyy2fFLlXZB_O3AGQW5tPiQFshww_gLsSLJ0BCH6j1hxF1xUeD3QcobOkT-IqpkFq2SiDY_STc3JG0sOFfAj7fcLw0och7Y8cV1vv06qhC7r5jQ",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDaGM63runLmvcLyVJmQAtwnz9pbJ1cJ4BMW7NQWg5PrFF7O8gnBss90L32xa4CT6oab_LadlQMZu1l4CmeKmtELlTI7y_i0BpSXbEa8IHsiGRpM9mAWlxPc27hbskc8b8GvNu_sTsKLnOWy_D-eRi_oBta59bq2IT69_0JccFrpxCy_sH9D8vzSX7lZumlK5hXkFwn9uk1544FwoX9JunjqkwX7GI18tzUZa-PvHaYnxc2Q4T7SNELeqFtURLemFvP5Wo5rMTpEA",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDpc7D0jD6WwrIUgGLeG6Uy4-lc3f5vz589_wZ6D4jRqtaaPS17NqbR7VPK7FKjHb0QupYyne_MTgdTNUfyiQ2ocHnLAIx7CCU2mZU-WJxeK-4IPqMzzvakOaOETWupLpfAdEdbDYXKPFXt-dcbFujSkFx3uK414NbNoKA94sxMbHtQz-gflyL_AQkqWBQg_i_PflXUnwrMJFPODJBz0Y1zfEagtyvLJYfJsk9fmL-GJtJgmL3cLMzTjvb26Fblbs--z02COedvsw"
      ],
      waitlistCount: "+12k",
      waitlistText: "Joined the waitlist this week"
    },
    registration: {
      title: "Start your journey",
      subtitle: "Create an account to access the private beta.",
      actionText: "Create Free Account"
    },
    stats: [
      { value: "50k+", label: "Active Communities" },
      { value: "1.2M", label: "Monthly Users" },
      { value: "24/7", label: "Uptime Support" },
      { value: "99%", label: "User Satisfaction" }
    ]
  },
  user: {
    name: "Alex Rivera",
    role: "Premium Member",
    techRole: "Lead Architect",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkB9Id3ueXavOYHRY4LYGdOfqKibfvP8yG_qwvDIAheJVmOGbJX9mYPrt10ForQLhxgzr9a15nkILoc6ve1DAjPD4i1zIVClJ8_OWXxTtrlNTCr-IWht9vvpUlvL6bslnluwgc_wr2w39sdml5OlZos4oPr55PGANOO_NvOu7EkYb7UYJSvhFnzKVmkZShAezemfJ6tuPtIqjFJPWKNE18xdwGZHRPspX1BsMQQafxGiifbyUCQ5mPRLhXhL73bnYbN3HI-OlFOQ"
  },
  dashboard: {
    hero: {
      title: "Explore Your Realm.",
      description: "Welcome back to the TRIBE dashboard. Your personal hub for technical innovation, cultural expression, and athletic excellence."
    },
    cards: [
      {
        id: "technical",
        title: "TECHNICAL",
        description: "Innovation, software architecture, and the future of digital engineering.",
        icon: "developer_mode",
        bgIcon: "terminal",
        actionText: "Enter Terminal",
        gradientClass: "from-primary/20 to-background-dark/80",
        borderClass: "border-primary/20",
        shadowClass: "shadow-primary/10",
        textClass: "text-primary",
        bgClass: "bg-primary/20",
        path: "/technical"
      },
      {
        id: "cultural",
        title: "CULTURAL",
        description: "Exploring arts, human expression, and global cultural perspectives.",
        icon: "theater_comedy",
        bgIcon: "palette",
        actionText: "Discover Arts",
        gradientClass: "from-purple-500/20 to-background-dark/80",
        borderClass: "border-purple-500/20",
        shadowClass: "shadow-purple-500/10",
        textClass: "text-purple-400",
        bgClass: "bg-purple-500/20",
        path: "/cultural"
      },
      {
        id: "sports",
        title: "SPORTS",
        description: "Physical peak performance, competitive spirit, and athletic training.",
        icon: "sports_basketball",
        bgIcon: "fitness_center",
        actionText: "View Training",
        gradientClass: "from-green-500/20 to-background-dark/80",
        borderClass: "border-green-500/20",
        shadowClass: "shadow-green-500/10",
        textClass: "text-green-400",
        bgClass: "bg-green-500/20",
        path: "/sports"
      }
    ],
    stats: [
      {
        label: "Activity Streak",
        value: "12 Days",
        icon: "bolt",
        iconContainerClass: "bg-primary/10 text-primary"
      },
      {
        label: "Community Reach",
        value: "1.2k People",
        icon: "groups",
        iconContainerClass: "bg-purple-500/10 text-purple-400"
      },
      {
        label: "Total Badges",
        value: "24 Earned",
        icon: "emoji_events",
        iconContainerClass: "bg-green-500/10 text-green-400"
      },
      {
        label: "Last Action",
        value: "Tech Sync",
        icon: "history",
        iconContainerClass: "bg-slate-500/10 text-slate-400"
      }
    ]
  },
  culturalClubs: [
    { name: "Advaita", image: "/clubs/advaita.png", description: "The premier cultural festival club focusing on grand celebrations and cultural integration.", upcomingEvents: [{title: "Annual Fest Prep", date: "Oct 12"}, {title: "Member Orientation", date: "Sep 20"}] },
    { name: "Alexis Club", image: "/clubs/alexis.png", description: "Compassion and social welfare society working towards community development.", upcomingEvents: [{title: "Blood Donation Drive", date: "Nov 02"}, {title: "Orphanage Visit", date: "Nov 15"}] },
    { name: "Ansha", image: "/clubs/ansha.png", description: "Focusing on creative expression through visual arts, photography, and storytelling.", upcomingEvents: [{title: "Lens Workshop", date: "Sep 25"}] },
    { name: "Astronomy Club", image: "/clubs/astronomy.png", description: "For stargazers and space enthusiasts to explore the cosmos together.", upcomingEvents: [{title: "Star Gazing Night", date: "Oct 05"}, {title: "Telescope Setup", date: "Oct 10"}] },
    { name: "Nature Club", image: "/clubs/nature.png", description: "Hiking, planting drives, and mental health and environmental awareness.", upcomingEvents: [] },
    { name: "Music Society", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpq2Du1il7JRnL_QjEGOTU24nAvJelM4gxcFMz1mSY3-A-At4PPWfOW-dTHNRw5uwDvmMfIl7FW5if2AHwGNv5mk_RswUf3OiQbMKwVd77TZqkj3-e6s9HI6Lu41O-qs5ZDXbTzbiFWwPw5fPshITIynal76fD17_5jQmpTOrNWHV_FzUm_5gjQZFJNYJ3jOqZZmx7G-KdT_L0chs6Uq7LfSM66bxw3NxQ5fv2zy7tXbWIXG5JMvd6mkxQl8tfpp4ayoGoBy4k2g", description: "Bringing together vocalists and instrumentalists for magical harmonies.", upcomingEvents: [{title: "Acoustic Night", date: "Oct 14"}] },
    { name: "Drama Guild", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCS7JATSEy-G67kHEKKo9T5-3cgbcUKg0nYNqxKrM8xGh0hJbz96IhjkOwqK0RiVmlC2aWEWS8XcRizblFzWfkXJ4MNqXetPIX14ZdqEHgRRA_y87HXA8YGJc4u6VTUNBd25ge9jFC3d3hl8w2Lil93AJnW0TBPvhF-epbWlOcBh9xopNIjWdJDL6Xcez9pzNaYNOPuIkH8-y2ykfgYljuDtJvlJAeIoqhSbMcy7gHUrk1iC0qgS9IHaqh8EUw8SjW_tmgKkj54lw", description: "Theatrical performances and script-writing for aspiring actors.", upcomingEvents: [{title: "Street Play", date: "Nov 20"}, {title: "Auditions", date: "Sep 15"}] },
    { name: "Art Circle", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbV3OSkEh6gWfXkdKq0GFG82uuv8OZBjJVZ3GUtkbiijuVvzNaijBvNlwR04Q7kGuwGd6KRJ5Dal7-kbIujufOdod0duTBNpLoslzZACbxqXKpgIA7KTOUPhFf40d0D3SXILBomvaw6YSUkwl46nMFoRbFzwMviJbz0ieC92Mu-mfd-ilBmXqJyhfp-4LusvIzeBW4eXTGLY8sCIlRAN1vh2Nyl3xdNSxcjlvaaCi-30w6F-elJXrfI6Z_e0WYfuWxosLQoIlEJg", description: "Painting, sketching, and digital arts community.", upcomingEvents: [] },
    { name: "Literary Club", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrQEdkRDq_4H0jqwyB4WtvbIgnd1a1MsxpEaDR-E6MByJA-b1aSQdvF6_-Y7E7QiLbLVpnNKV3JGQpU1Ob7wq9rvXFaSTM0bcHr41MVq4i1yj7F7tO9ygjAtjJTULQyBJWHyUgy86uZYyGAarlJ1vcXGdQCl6AaeMefWFylMPZ1nLmmXNTe-aUBjidYl-9lOgpSqHcpSx3xVwnvxw7WzZ1vZwwof45vYtNzOgcohfqfEbYnTBGHjmKmNVxxd1wyo4PBQEZHJTDgw", description: "Debates, poetry slams, and book discussions.", upcomingEvents: [{title: "Debate Competition", date: "Oct 18"}] },
    { name: "Heritage Club", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJE5lPJHqoLSFzw62jPNJsm5LCZs5N39m1jEEq58nIf_5RxOuSAG6EPkgBj1ZANnF2RaYKYLsxj6234VRsrKCfJjC_SnHXgNJPQDtDaMZ5q1EvUcAfE5k1Ka6yI3kF05N8eSd2uPol-Lely7TV-VD8pkooxsdUtfvCP-o2PP_FSpzOlxazKmj2LytLCgaD-NHS9DfN9ANcv0rP8n_7coJBNalrHk1jLS6qXAqxJwCaFxjaz0UrGz3Ii-4z3oCiuVBD2JcvMapmmw", description: "Preserving and displaying historical truths and heritage arts.", upcomingEvents: [] },
    { name: "Photography", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZsNsSIsKf1-8uWqL017jznhz2ijNHQoH-uD_Rt8tU6ejihM2lRPf7bj7m2Fm_UY0PBSBt-JSpG0ku0WSbukLkrXP8UehsDqOyQW9PSREwNozqAqNs6epqjHt3t5olKXusUkHiAHPJD7LaamQyu7YsuvTazeMmQcmp_Q_C24ckHzLz1vflDFfvLS8njPUoloI-q9iVkBXnToK-msn58AAGzTGzNwCdvKD54cIdQU7DWovragAgC2zK7DYwZYirCDMUiooI33nZug", description: "Capturing moments through the lens of creativity.", upcomingEvents: [{title: "Photo Walk", date: "Oct 22"}] },
    { name: "Film Society", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9_qOGLoCxxw7B9x8XoE_BUDlc1Cg402DRSXQej5kpSRBlp6PXFuFzOtQ1B2hCqyqMCL75MYc-SXwO4WrrKiWqKYlb8A7t8cDRQSUymBIwz_Xbn2DdU1kXYKGqQfVyQ7Mh1hjc4SRUdox1-qbuaI7Bmz9IJ-9_QsuC1tfyWh_sS-W_s1nZ5KfYhsx-uISdsVodTX6ppYJxsOcjU9J6O6pQ6hyKOhtrzcAS2fe-OtA6fRxY9uxWT4Qy7cqJawNN00l7cwh-UZS9ww", description: "Analyzing masterpieces and producing short films.", upcomingEvents: [{title: "Short Film Contest", date: "Nov 01"}] },
    { name: "Fashion House", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC97R1lJ9bEnXCdikRzD10-vTxg-DSa5_LxL_-sPLd-7pT0iDJP9AZJrFlYroCczGVb4GxGbu0VuShLMarcr_3loDSKZr58A-Jn6YXBsWXErtRndUq-fFVGuvyD-6IG0OgSGBfkRStPB60k-Jh2K3Nzw1cj2rRiP8fKBxNoEEaAIQU8ZIjglH7lb3xLyPfjujw5BsbWaqGdHzrvYuMgEtbmOb1lEQj6dcBof_adtRGLxyjXaaLPclYh9nfiphhQn_MMJ6eWcH-JLg", description: "Exploring styling, apparel design, and runway events.", upcomingEvents: [] },
    { name: "Culinary Arts", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6WbYqbR_6C6wA4f6tapSq15HC6Wzg85sjrPkihd2bM6Gv7pVbRIRA20SiMc1VzeoTxwxLUEOk24cHGC64xsZwkyGWcynWsiQYeTh9ua5V3DvnzBDfNHHPsnnNQkHtZF5FAjxZf3O-reKa825Qo6vblMcXKQJbaOK2gn9QTInmldfB_JtasnV2GSBuM6EIm22gr2USgPuaa_J2F6BTWHCxPFIJ7tSvDWVNO4yYyJiy3f71i3vpjt_PCQJgCuxFBcbhgNwPOdAWtw", description: "Baking, cooking, and culinary competitions.", upcomingEvents: [] },
    { name: "Gaming Guild", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop", description: "E-sports, game design, and casual multiplayer tournaments.", upcomingEvents: [{title: "Valorant Tournament", date: "Nov 15"}] },
    { name: "Anime Club", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2574&auto=format&fit=crop", description: "Manga reading sessions and anime screenings.", upcomingEvents: [] },
    { name: "Dance Club", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2674&auto=format&fit=crop", description: "Experience the rhythm and express yourself through diverse dance forms.", upcomingEvents: [{title: "Flash Mob", date: "Sep 28"}, {title: "Choreography Session", date: "Oct 01"}] },
    { name: "Fitness Society", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2670&auto=format&fit=crop", description: "Gym workouts, marathons, and healthy lifestyle promotion.", upcomingEvents: [] },
    { name: "Entrepreneurship", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2574&auto=format&fit=crop", description: "Incubating startups and business model discussions.", upcomingEvents: [{title: "Pitch Deck Day", date: "Dec 01"}] },
    { name: "Poetry Society", image: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=2673&auto=format&fit=crop", description: "Spoken word, slam poetry, and creative verse writing.", upcomingEvents: [] },
    { name: "Aero Club", image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2670&auto=format&fit=crop", description: "Design, build, and fly remote-controlled aircraft.", upcomingEvents: [] },
    { name: "Finance & Invest", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2670&auto=format&fit=crop", description: "Stock market trading simulation and financial literacy.", upcomingEvents: [] },
    { name: "Media Cell", image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=2671&auto=format&fit=crop", description: "Video editing, journalism, and campus reporting.", upcomingEvents: [] },
    { name: "Design Studio", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2600&auto=format&fit=crop", description: "UI/UX, graphic design, and brand identity creation.", upcomingEvents: [] },
    { name: "Hackers Space", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop", description: "A haven for code junkies breaking into systems legally.", upcomingEvents: [{title: "CTF Challenge", date: "Dec 10"}] }
  ],
  globalEvents: [
    { id: '1', date: 'MAY 12', day: 12, month: 5, year: 2026, time: '18:00 - 20:00', title: 'Open Source Contribution Workshop', org: 'Hack Club', type: 'Workshop', description: 'Learn how to contribute to open-source projects.' },
    { id: '2', date: 'MAY 18', day: 18, month: 5, year: 2026, time: '10:00 - 17:00', title: 'Global Node Summit', org: 'Tribe Core', type: 'Summit', description: 'Annual gathering of all node leads and administrators.' },
    { id: '3', date: 'MAY 24', day: 24, month: 5, year: 2026, time: '14:00 - 16:00', title: 'Project Review Phase', org: 'Evaluation Committee', type: 'Review', description: 'Mandatory review for all ongoing projects.' }
  ],
  technicalClubs: [
    {
      name: "CODECHEF",
      description: "Competitive Programming",
      members: 250,
      icon: "code",
      gradientClass: "from-slate-600 to-slate-900",
      image: "/clubs/codechef.png",
      lead: "Suyash Singh",
      clubLeads: [
        {
          role: 'President',
          name: 'Suyash Singh',
          phone: '+91 9580235002',
          email: 'suyashsingh33333@gmail.com',
          img: '/clubs/suyash.jpg'
        },
        {
          role: 'Vice President',
          name: 'Harshita Dhamijha',
          phone: '+91 7544891893',
          email: 'harshitadhamijha22@gmail.com',
          img: '/clubs/harshita.jpg'
        }
      ],
      upcomingEvents: [
        { title: "Starters 120 Coding Contest", date: "May 20" },
        { title: "Algorithm Workshop series", date: "May 24" }
      ]
    },
    {
      name: "Coding Club",
      description: "Algorithmic Excellence",
      members: 140,
      icon: "code",
      gradientClass: "from-slate-600 to-slate-900",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop"
    },
    {
      name: "Robotics Society",
      description: "Hardware & Automation",
      members: "185",
      icon: "smart_toy",
      gradientClass: "from-slate-600 to-slate-900",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop"
    },
    {
      name: "AI/ML Group",
      description: "Neural Networks",
      members: "312",
      icon: "psychology",
      gradientClass: "from-slate-600 to-slate-900",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2670&auto=format&fit=crop"
    },
    {
      name: "Cyber Security",
      description: "Ethical Hacking",
      members: "145",
      icon: "lock",
      gradientClass: "from-slate-600 to-slate-900",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
    },
    {
      name: "Open Source",
      description: "Community Projects",
      members: "402",
      icon: "terminal",
      gradientClass: "from-slate-600 to-slate-900",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop"
    },
    {
      name: "Cloud Tech",
      description: "Infrastructure",
      members: "156",
      icon: "cloud",
      gradientClass: "from-slate-600 to-slate-900",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2670&auto=format&fit=crop"
    },
    {
      name: "Data Science",
      description: "Big Data Insights",
      members: 300,
      icon: "database",
      gradientClass: "from-slate-500 to-slate-800",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
    },
    {
      name: "Blockchain",
      description: "Web3 & Crypto",
      members: "94",
      icon: "currency_bitcoin",
      gradientClass: "from-amber-600 to-yellow-900",
      image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2669&auto=format&fit=crop"
    },
    {
      name: "IoT Lab",
      description: "Connected Devices",
      members: "122",
      icon: "settings_input_component",
      gradientClass: "from-slate-600 to-slate-900",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop"
    },
    {
      name: "AR/VR Studio",
      description: "Immersive Media",
      members: "68",
      icon: "view_in_ar",
      gradientClass: "from-indigo-600 to-purple-800",
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2670&auto=format&fit=crop"
    }
  ],
  sportsClubs: [
    { name: "Football", image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=2690&auto=format&fit=crop" },
    { name: "Basketball", image: "https://images.unsplash.com/photo-1519766304817-4f37bda74a26?q=80&w=2670&auto=format&fit=crop" },
    { name: "Cricket", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2666&auto=format&fit=crop" },
    { name: "Badminton", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2670&auto=format&fit=crop" },
    { name: "Swimming", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=2670&auto=format&fit=crop" },
    { name: "Tennis", image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2675&auto=format&fit=crop" },
    { name: "Table Tennis", image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=2670&auto=format&fit=crop" },
    { name: "Volleyball", image: "https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=2670&auto=format&fit=crop" },
    { name: "Athletics", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2670&auto=format&fit=crop" },
    { name: "Chess", image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=2671&auto=format&fit=crop" },
    { name: "Powerlifting", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop" },
    { name: "Martial Arts", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2670&auto=format&fit=crop" },
    { name: "Yoga", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2720&auto=format&fit=crop" },
    { name: "Archery", image: "https://images.unsplash.com/photo-1511216113906-8f57bb83e776?q=80&w=2670&auto=format&fit=crop" },
    { name: "Cycling", image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=2670&auto=format&fit=crop" },
    { name: "Rugby", image: "https://images.unsplash.com/photo-1514801111663-71ab5eadeced?q=80&w=2671&auto=format&fit=crop" },
    { name: "Gymnastics", image: "https://images.unsplash.com/photo-1566846175114-1e08db41f6e2?q=80&w=2672&auto=format&fit=crop" },
    { name: "Rowing", image: "https://images.unsplash.com/photo-1530869375179-8dc6f6c96825?q=80&w=2670&auto=format&fit=crop" },
    { name: "Fencing", image: "https://images.unsplash.com/photo-1627481358653-af7ccfdedd2b?q=80&w=2670&auto=format&fit=crop" },
    { name: "E-Sports", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop" },
    { name: "Squash", image: "https://images.unsplash.com/photo-1622329384596-f0f7f3cb5ab6?q=80&w=2574&auto=format&fit=crop" },
    { name: "Golf", image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2670&auto=format&fit=crop" },
    { name: "Skating", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?q=80&w=2670&auto=format&fit=crop" },
    { name: "Boxing", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2670&auto=format&fit=crop" },
    { name: "Handball", image: "https://images.unsplash.com/photo-1526435073003-88bcfe23ea19?q=80&w=2670&auto=format&fit=crop" }
  ]
};
