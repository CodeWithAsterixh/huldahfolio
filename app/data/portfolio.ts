export interface CaseStudy {
  brief: string;
  process: string;
  results: string;
  btsThumbnails?: string[];
  gear?: string[];
  software?: string[];
  technicalSpecs?: string[];
  workflow?: { title: string; description: string }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  videoUrl?: string; // YouTube, Vimeo, or direct MP4
  caseStudy?: CaseStudy;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const projects: Project[] = [
  {
    id: "solo-dance",
    title: "Solo dance video",
    description: "Cinematic capture of a modern solo performance.",
    thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800",
    category: "Dance",
    videoUrl: "https://videos.pexels.com/video-files/3201164/3201164-uhd_2560_1440_25fps.mp4", // Test video
    caseStudy: {
      brief: "The client wanted a high-contrast, moody solo dance performance captured in a single take to emphasize the raw emotion of the choreography.",
      process: "We used a handheld gimbal setup with a 35mm prime lens to stay close to the dancer while maintaining a cinematic depth of field. The lighting was strictly low-key with a single large softbox.",
      results: "The video went viral on Instagram Reels, gaining 250k+ views in the first week and securing the dancer three international bookings.",
      gear: ["Sony A7S III", "DJI RS 3 Pro Gimbal", "Sony 35mm f/1.4 GM", "Aputure 600d Pro"],
      software: ["Adobe Premiere Pro", "DaVinci Resolve (Color)", "After Effects"],
      technicalSpecs: ["4K 60fps", "10-bit 4:2:2", "S-Log3", "Aspect Ratio 9:16"],
      workflow: [
        { title: "Pre-Production", description: "Choreography walk-through and lighting plot design." },
        { title: "Production", description: "Single-take execution with gimbal tracking." },
        { title: "Post-Production", description: "Dynamic speed ramping and film-grain overlay." },
      ],
    },
  },
  {
    id: "sax-player",
    title: "Sax player",
    description: "Atmospheric street session in Lagos.",
    thumbnail: "https://images.unsplash.com/photo-1525994886773-080587e161c3?auto=format&fit=crop&q=80&w=800",
    category: "Music",
    videoUrl: "https://vimeo.com/76979871", // Random Vimeo demo
    caseStudy: {
      brief: "A street musician needed a professional promo video for his upcoming jazz festival appearance.",
      process: "Captured during the 'blue hour' in downtown Lagos to get that natural cinematic glow. We used a RØDE Shotgun mic to isolate the saxophone from the city noise.",
      results: "Resulted in a 40% increase in lead inquiries for the musician's private event services.",
      gear: ["Blackmagic Pocket 6K", "Sigma 18-35mm f/1.8", "RØDE NTG5", "Tiffen Black Pro-Mist"],
      software: ["DaVinci Resolve", "Izotope RX (Audio cleanup)"],
      technicalSpecs: ["6K RAW", "24fps", "Aspect Ratio 2.39:1"],
    },
  },
  {
    id: "drone-video",
    title: "Drone video",
    description: "Sweeping aerial views of the coastline.",
    thumbnail: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800",
    category: "Commercial",
    videoUrl: "https://images.unsplash.com/video-1508614589041-895b88991e3e.mp4", // Mock direct link
    caseStudy: {
      brief: "A tourism board required high-resolution aerial footage of a hidden beach for their summer campaign.",
      process: "Used a DJI Mavic 3 Pro during sunrise. The challenge was high winds, requiring precise flight control and post-production stabilization.",
      results: "Feature in 3 national travel magazines and 1M+ impressions across social media.",
      gear: ["DJI Mavic 3 Pro", "PolarPro ND Filters"],
      technicalSpecs: ["5.1K 30fps", "D-Log"],
    },
  },
  {
    id: "dentistry-1",
    title: "Dentistry",
    description: "Professional clinic procedure showcase.",
    thumbnail: "https://images.unsplash.com/photo-1606811841660-1b5168c34714?auto=format&fit=crop&q=80&w=800",
    category: "Commercial",
  },
  {
    id: "music-video",
    title: "Music video",
    description: "Fast-paced editing for an indie artist.",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    category: "Music",
  },
  {
    id: "group-dance",
    title: "Group dance video",
    description: "Vibrant choreography coverage.",
    thumbnail: "https://images.unsplash.com/photo-1547153760-18fc21fca830?auto=format&fit=crop&q=80&w=800",
    category: "Dance",
  },
  {
    id: "scenery-video",
    title: "Scenery video",
    description: "Nature documentary-style cinematography.",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    category: "Nature",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Tools",
    skills: ["Adobe Premiere Pro", "Final Cut Pro", "After Effects", "DaVinci Resolve", "CapCut"]
  },
  {
    title: "Video-Editing Skills",
    skills: ["Sound editing", "Animation", "Rhythm", "Color correction", "Multi-camera video editing", "Transitions", "Motion Graphics"]
  },
  {
    title: "Management & Strategy",
    skills: ["Content Strategy", "Platform Optimization", "Social Analytics", "Meta Business Suite", "TikTok/Reels Growth"]
  }
];

export const contactInfo = {
  email: "huldahsweetie@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/huldahpeter" },
    { label: "Instagram", href: "https://www.instagram.com/huldah_1?igsh=MXV1cGFybXV6MnJ3dg==" },
  ],
};
