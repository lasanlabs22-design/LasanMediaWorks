// All site copy in one place. Pages and components read from here.
import type { IconName } from "@/components/Icon";

export const CONTACT = {
  phone: "+91 7032360404",
  tel: "tel:+917032360404",
  whatsapp: "https://wa.me/917032360404",
  waNumber: "917032360404",
  email: "lasanmediaofficial@gmail.com",
};

export const NAV = [
  { key: "home", href: "/", label: "Home" },
  { key: "articles", href: "/articles", label: "Articles" },
  { key: "strategy", href: "/strategy", label: "Strategy" },
  { key: "services", href: "/services", label: "Services" },
  { key: "about", href: "/about", label: "About" },
  { key: "careers", href: "/careers", label: "Careers" },
] as const;

type MegaItem = { icon: IconName; title: string; desc: string; href: string };
export const MEGA: Record<
  string,
  {
    side: { title: string; text: string; cta: string; href: string };
    items: MegaItem[];
  }
> = {
  strategy: {
    side: {
      title: "FREE Business Audit Report",
      text: "Includes Digital, SEO, SMM, ORM & so on.",
      cta: "Get FREE Audit Report",
      href: "/book-appointment?service=audit",
    },
    items: [
      {
        icon: "target",
        title: "Business Strategy",
        desc: "Tailored solutions for sustainable growth.",
        href: "/strategy#business",
      },
      {
        icon: "spark",
        title: "Brand Strategy",
        desc: "Crafting unique brand identities.",
        href: "/strategy#brand",
      },
      {
        icon: "monitor",
        title: "Digital Strategy",
        desc: "Leveraging tools for online presence.",
        href: "/strategy#digital",
      },
      {
        icon: "sliders",
        title: "Technical Strategy",
        desc: "Identify & optimize tech solutions.",
        href: "/strategy#technical",
      },
      {
        icon: "trend",
        title: "Marketing & Sales",
        desc: "Integrating strategies to boost sales.",
        href: "/strategy#marketing-sales",
      },
      {
        icon: "layers",
        title: "Operational Strategy",
        desc: "Streamlining processes for efficiency.",
        href: "/strategy#operational",
      },
    ],
  },
  services: {
    side: {
      title: "Need Help?",
      text: "Explore our comprehensive service offerings.",
      cta: "View All Services",
      href: "/services",
    },
    items: [
      {
        icon: "search",
        title: "Market Research & Audits",
        desc: "Feasibility Reports & Consumer Insights.",
        href: "/services#research",
      },
      {
        icon: "ad",
        title: "SMM, SEO, PPC",
        desc: "360 Degree digital marketing services.",
        href: "/services#smm-seo-ppc",
      },
      {
        icon: "code",
        title: "Website Dev & CRM",
        desc: "Creative & high performing websites.",
        href: "/services#web-crm",
      },
      {
        icon: "pen",
        title: "Branding & Creative",
        desc: "Logo Designing & Brand Story.",
        href: "/services#branding",
      },
      {
        icon: "users",
        title: "Marketing Workforce",
        desc: "Maximize revenue through automation.",
        href: "/services#workforce",
      },
      {
        icon: "radio",
        title: "Media PR",
        desc: "Enabling business outreach.",
        href: "/services#media-pr",
      },
    ],
  },
  about: {
    side: {
      title: "Know More About LaSän",
      text: "Our Growth Playbook.",
      cta: "Watch Now",
      href: "/about#howwework",
    },
    items: [
      {
        icon: "zap",
        title: "About Us",
        desc: "Learn about leadership & vision.",
        href: "/about#aboutus",
      },
      {
        icon: "handshake",
        title: "Collaborations",
        desc: "Partnerships with effective results.",
        href: "/about#collaborations",
      },
      {
        icon: "book",
        title: "Resources",
        desc: "Explore Blog & Case Studies.",
        href: "/about#resources",
      },
      {
        icon: "cogs",
        title: "How We Work",
        desc: "Frameworks to hit Growth KPIs.",
        href: "/about#howwework",
      },
      {
        icon: "brief",
        title: "Careers",
        desc: "Are you willing to create impact?",
        href: "/about#careers",
      },
      {
        icon: "news",
        title: "Media",
        desc: "Featured on Popular News.",
        href: "/about#media",
      },
    ],
  },
};

export const SLIDES = [
  {
    title: "Unlock Business Challenges With",
    accent: "Winning Strategies.",
    lede: "Strategic decision making and robust implementation frameworks designed for ROI.",
  },
  {
    title: "Strategic Growth, Insightful Research &",
    accent: "Digital Excellence.",
    lede: "We partner with ambitious SMEs and startups to turn challenges into sustainable digital dominance.",
  },
  {
    title: "Elevate Your Growth & Success With",
    accent: "LaSän Media.",
    lede: "We partner with businesses to drive sustainable success through data-driven campaigns.",
  },
];

export const MARQUEE = [
  "Business Strategy",
  "Branding",
  "Digital Marketing",
  "SEO & AI Search",
  "Paid Ads",
  "Websites & CRM",
  "WhatsApp Automation",
  "Hoardings & LED",
  "Media PR",
];

export const PROCESS = [
  {
    title: "Discovery Call",
    text: "We understand your business goals, challenges, and audience.",
  },
  {
    title: "Strategy Creation",
    text: "We craft a custom growth roadmap tailored to your needs.",
  },
  {
    title: "Implementation",
    text: "Our expert team executes the plan with precision and care.",
  },
  {
    title: "Monitor & Optimize",
    text: "We track results and continuously improve for maximum ROI.",
  },
];

export const NUMBERS = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 10, suffix: "X", label: "Average ROI Growth" },
];

export const CASES = [
  {
    name: "Robo Diner",
    img: "/img/stock/case-restaurant.jpg",
    a: ["300%", "Traffic Growth"],
    b: ["150%", "Sales Increase"],
    text: "Strategic SEO and social media marketing transformed their online presence.",
  },
  {
    name: "MS Hospital",
    img: "/img/stock/case-hospital.jpg",
    a: ["500%", "Lead Generation"],
    b: ["5x", "ROI"],
    text: "PPC campaigns and local SEO drove unprecedented patient inquiries.",
  },
  {
    name: "Mom & Me Clinic",
    img: "/img/stock/case-clinic.jpg",
    a: ["400%", "Engagement"],
    b: ["200%", "Revenue"],
    text: "Social media strategy and branding created a loyal community.",
  },
];

export const VALUES = [
  [
    "Integrity",
    "We lead with radical honesty and transparency. Your trust is our most valuable currency.",
  ],
  [
    "Empathy",
    "We step into your shoes to understand your struggles, building solutions that feel personal and human.",
  ],
  [
    "Accountability",
    "Owning the outcome, good or bad. We hold ourselves to higher standards than our clients do.",
  ],
  [
    "Courageous",
    "We push boundaries and challenge the status quo. Innovation requires the bravery to be different.",
  ],
  [
    "Growth Mindset",
    "Static is dead. We are obsessive learners, constantly evolving to stay ahead of the digital curve.",
  ],
  [
    "Customer Centric",
    "Your customers are our North Star. Every pixel and line of code serves their journey.",
  ],
  [
    "Be the Cause",
    "We don't react to the market; we create the shifts. We are the architects of your brand's future.",
  ],
  [
    "Excellence with Velocity",
    "Precision at speed. We deliver high-fidelity growth strategies in the blink of an eye.",
  ],
] as const;

export type Client = { name: string; logo: string };
export const CLIENTS_A: Client[] = [
  { name: "Delhi Public School", logo: "/img/clients/delhi-public-school.png" },
  { name: "Atlantis", logo: "/img/clients/atlantis.png" },
  {
    name: "Sri Venkateshwara Childrens High School",
    logo: "/img/clients/sri-venkateshwara-childrens-high-school.png",
  },
  { name: "Edify School", logo: "/img/clients/edify-school.png" },
  {
    name: "Spring Dale Public School",
    logo: "/img/clients/spring-dale-public-school.png",
  },
  { name: "Polar Bear", logo: "/img/clients/polar-bear.png" },
  { name: "AP Diagnostics", logo: "/img/clients/ap-diagnostics.png" },
  { name: "Robo Liquor Mall", logo: "/img/clients/robo-liquor-mall.png" },
  { name: "Ignite Resto Bar", logo: "/img/clients/ignite-resto-bar.png" },
  { name: "Robo Diner", logo: "/img/clients/robo-diner.png" },
  { name: "Firoz Dental", logo: "/img/clients/firoz-dental.png" },
  {
    name: "Lathas Sri Ankura Fertility",
    logo: "/img/clients/lathas-sri-ankura-fertility.png",
  },
  { name: "MS Hospital", logo: "/img/clients/ms-hospital.png" },
  {
    name: "Sri Padmavathi Multispeciality Hospital",
    logo: "/img/clients/sri-padmavathi-multispeciality-hospital.png",
  },
  {
    name: "Tara Multispeciality Hospital",
    logo: "/img/clients/tara-multispeciality-hospital.png",
  },
  {
    name: "Ganta Neuro Hospitals",
    logo: "/img/clients/ganta-neuro-hospitals.png",
  },
  { name: "Mom and Me Clinic", logo: "/img/clients/mom-and-me-clinic.png" },
  { name: "AJ Dental Care", logo: "/img/clients/aj-dental-care.png" },
  { name: "Medwell Surgicals", logo: "/img/clients/medwell-surgicals.png" },
  {
    name: "Sarayu Natural Healthcare",
    logo: "/img/clients/sarayu-natural-healthcare.png",
  },
  {
    name: "Barat Khadi Bhandhar",
    logo: "/img/clients/barat-khadi-bhandhar.png",
  },
  {
    name: "Kick Bunk Bar and Restaurant",
    logo: "/img/clients/kick-bunk-bar-and-restaurant.png",
  },
  { name: "Leela Gardens", logo: "/img/clients/leela-gardens.png" },
  { name: "Aloha Resorts", logo: "/img/clients/aloha-resorts.png" },
  { name: "Vivaha Events", logo: "/img/clients/vivaha-events.png" },
];
export const CLIENTS_B: Client[] = [
  { name: "Asha Conventions", logo: "/img/clients/asha-conventions.png" },
  { name: "Beauty Basket", logo: "/img/clients/beauty-basket.png" },
  { name: "Rainbow Events", logo: "/img/clients/rainbow-events.png" },
  {
    name: "Sapthapadi Matrimony",
    logo: "/img/clients/sapthapadi-matrimony.png",
  },
  {
    name: "Design and Integration",
    logo: "/img/clients/design-and-integration.png",
  },
  { name: "Blending", logo: "/img/clients/blending.png" },
  {
    name: "Om Prasanthi Fabric Works",
    logo: "/img/clients/om-prasanthi-fabric-works.png",
  },
  {
    name: "Lakshmi Design Emporium",
    logo: "/img/clients/lakshmi-design-emporium.png",
  },
  { name: "Sri Durgis", logo: "/img/clients/sri-durgis.png" },
  { name: "House of Varnam", logo: "/img/clients/house-of-varnam.png" },
  { name: "Aakrithi Boutique", logo: "/img/clients/aakrithi-boutique.png" },
  { name: "Kimai", logo: "/img/clients/kimai.png" },
  { name: "Sri Nikhila Travels", logo: "/img/clients/sri-nikhila-travels.png" },
  { name: "Shizaa", logo: "/img/clients/shizaa.png" },
  { name: "Hotel Rajahamsa", logo: "/img/clients/hotel-rajahamsa.png" },
  { name: "Hotel Kinnera", logo: "/img/clients/hotel-kinnera.png" },
  {
    name: "Star Mandi Restaurant",
    logo: "/img/clients/star-mandi-restaurant.png",
  },
  {
    name: "Spicy Paradise Restaurant",
    logo: "/img/clients/spicy-paradise-restaurant.png",
  },
  { name: "Gokul Buds", logo: "/img/clients/gokul-buds.png" },
  { name: "MS Enterprises", logo: "/img/clients/ms-enterprises.png" },
  { name: "Phoenix", logo: "/img/clients/phoenix.png" },
  { name: "Lod Interiors", logo: "/img/clients/lod-interiors.png" },
  { name: "Vaarahi Developers", logo: "/img/clients/vaarahi-developers.png" },
  { name: "LS Interiors", logo: "/img/clients/ls-interiors.png" },
  { name: "Nakshatra", logo: "/img/clients/nakshatra.png" },
];

export const HELP: {
  icon: IconName;
  title: string;
  text: string;
  href: string;
  img: string;
}[] = [
  {
    icon: "compass",
    title: "Business Strategy",
    text: "Market research, audits and a growth roadmap built around ROI — so every rupee has a job.",
    href: "/strategy",
    img: "/img/stock/s-business.jpg",
  },
  {
    icon: "spark",
    title: "Branding Services",
    text: "Identity, voice and creative that make people remember you — on screens and on the street.",
    href: "/services#branding",
    img: "/img/stock/v-branding.jpg",
  },
  {
    icon: "trend",
    title: "Digital Marketing",
    text: "SEO, social, paid ads, influencers and WhatsApp automation that turn attention into leads.",
    href: "/services#smm-seo-ppc",
    img: "/img/stock/v-smm.jpg",
  },
  {
    icon: "code",
    title: "Technology Solutions",
    text: "Websites, apps, CRM, landing pages and analytics that make growth measurable and repeatable.",
    href: "/services#web-crm",
    img: "/img/stock/v-web.jpg",
  },
];

export const TEAM = [
  {
    name: "Sree Latha",
    role: "CMO & Founder",
    photo: "/img/team/sree-latha.jpg",
  },
  {
    name: "Santhosh Rokaya",
    role: "Co-Founder & CEO",
    photo: "/img/team/santhosh-rokaya.jpg",
  },
  {
    name: "Jagadeesh SH",
    role: "Managing Director",
    photo: "/img/team/jagadeesh-sh.png",
  },
  {
    name: "Mounisha C V",
    role: "General Manager",
    photo: "/img/team/mounisha-cv.png",
  },
  { name: "Dinesh", role: "Business Analyst", photo: "/img/team/dinesh.png" },
  {
    name: "Gayathri K",
    role: "Key Account Manager",
    photo: "/img/team/gayathri-k.png",
  },
];

export const ONLINE = [
  "Digital Marketing",
  "Website, App And CRM",
  "Social Media Marketing",
  "Lead Generation, Sales Funnel",
  "GMB Optimization",
  "Ads (SEO, SMM, Paid Ads)",
  "Landing Pages",
  "WhatsApp Automation",
  "Influencer Marketing",
  "TV Ads, Theater Ads",
  "Flash Shoot",
  "Analytics And Growth",
  "AI Engine Optimisation",
  "PR/Publicity",
  "Offline to Online Integration",
];
export const OFFLINE = [
  "Hoardings",
  "Outdoor Advertising",
  "LED Digital Boards",
  "Transit Ads",
  "Print Media",
  "Event Marketing",
  "Local Engagement",
  "Direct Marketing",
  "Vehicle Branding",
  "Traditional Media",
  "Field Sales",
  "Telecalling",
  "Display Boards",
  "Exhibitions",
  "Corporate Events & B2B",
];

export const TESTIMONIALS = [
  {
    quote:
      "LaSän Media transformed our digital presence completely. Our organic traffic increased by 300% in just 6 months. Their strategic approach and dedicated team made all the difference.",
    name: "Neelima",
    role: "Founder, Robo Diner",
  },
  {
    quote:
      "The team at LaSän understood our brand vision perfectly. Their branding and digital strategy helped us increase sales by 150% within the first year. Highly recommended!",
    name: "Reshma Reddy",
    role: "CEO, Mom & Me",
  },
  {
    quote:
      "Professional, responsive, and results-driven. LaSän Media delivered beyond our expectations. Their SEO and PPC campaigns gave us a 5x ROI. Will definitely work with them again!",
    name: "Dr. Sridhar",
    role: "Director, MS Hospital",
  },
  {
    quote:
      "Working with LaSän Media has been a game-changer for our business. Their social media strategies increased our engagement by 400% and brought us quality leads consistently.",
    name: "Latha",
    role: "Founder, Sree Ankura Fertility",
  },
  {
    quote:
      "The ROI we've seen from our partnership with LaSän Media is outstanding. Their team is proactive, creative, and truly cares about our success. Best decision we ever made!",
    name: "Nagesh",
    role: "CEO, Sree Padmavathi Multispeciality Hospitals",
  },
  {
    quote:
      "From website development to SEO and social media, LaSän Media handled everything flawlessly. Our online sales have doubled since we started working with them.",
    name: "Vasu",
    role: "Founder, Komandur Schools",
  },
];

export const BLUEPRINT: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "search",
    title: "Market Research",
    text: "Deep dive into consumer behavior and market trends.",
  },
  {
    icon: "spark",
    title: "Identity Crafting",
    text: "Building brand personality that resonates emotionally.",
  },
  {
    icon: "rocket",
    title: "Execution & SMM",
    text: "Deploying high-impact campaigns with surgical precision.",
  },
  {
    icon: "bar",
    title: "Scale & Optimize",
    text: "Analyzing real-time data to dominate niches.",
  },
];

export const FAQ = [
  [
    "What Digital Marketing services does LaSän Media offer?",
    "Everything you need to be found and chosen online: SEO, AI engine optimisation, Google Business Profile optimisation, social media marketing, paid ads, lead generation funnels, landing pages, WhatsApp automation, influencer marketing and analytics — 15+ digital growth channels, backed by 15+ offline channels when you want to own the street too.",
  ],
  [
    "Do you provide Graphic Design and Video Editing services?",
    "Yes. Our creative team handles brand identity, social media creatives, ad designs, print and outdoor artwork, reels, video edits and flash shoots — all built to match your brand strategy.",
  ],
  [
    "Can you build a website or redesign my existing one?",
    "Yes. We design and develop new websites, redesign existing ones, and build apps and CRM setups — fast, mobile-first, SEO-ready and wired with tracking so every enquiry is measured.",
  ],
  [
    "What makes LaSän different from other agencies?",
    "We run strategy, digital and offline marketing under one roof, so your hoardings, ads and social media tell one story and feed one pipeline. Every plan starts from your business goals and is measured on ROI — not vanity metrics.",
  ],
  [
    "How quickly can I expect results?",
    "Paid campaigns can start bringing enquiries within the first few weeks, while SEO and brand building compound over a few months. On your discovery call we set realistic milestones for your goals and track progress against them.",
  ],
] as const;

export const INSIGHT_TYPES: {
  icon: IconName;
  label: string;
  title: string;
  text: string;
  examples: string[];
  helps: string;
}[] = [
  {
    icon: "spark",
    label: "Tips",
    title: "Actionable Tips",
    text: "Quick, actionable recommendations you can implement today.",
    examples: [
      "Optimize meta descriptions for higher CTR",
      "Email subject lines that boost opens",
      "Quick fix for broken backlinks",
    ],
    helps: "Save time with proven micro-tactics that deliver results fast.",
  },
  {
    icon: "trend",
    label: "Trends",
    title: "Emerging Trends",
    text: "Market movements, algorithm updates & consumer shifts.",
    examples: [
      "Google SGE impact on SEO",
      "AI-powered personalization",
      "Zero-click search optimization",
    ],
    helps: "Stay ahead of competitors and capitalize on new opportunities.",
  },
  {
    icon: "layers",
    label: "Strategies",
    title: "Proven Strategies",
    text: "Comprehensive frameworks & step-by-step systems.",
    examples: [
      "90-day content marketing roadmap",
      "Topic cluster strategy for authority",
      "Link building playbook",
    ],
    helps: "Replace guesswork with blueprints for sustainable growth.",
  },
];

export const OFFICES = [
  {
    city: "Tirupati, IND",
    hq: true,
    address: "Tirupati, Andhra Pradesh – 517501",
    email: true,
  },
  {
    city: "Bangalore, IND",
    hq: false,
    address: "Koramangala, Bangalore – 560038",
    email: false,
  },
  {
    city: "Hyderabad, IND",
    hq: false,
    address: "Amberpet, Telangana – 500013",
    email: false,
  },
];

export const SEO_TAGS = [
  "Best Digital Marketing Company in Tirupati",
  "Best Digital Marketing Company in Andhra Pradesh",
  "Best Digital Marketing Company in Karnataka",
  "Best Digital Marketing Company in Telangana",
  "SEO Company in Bangalore",
  "PPC Services in Hyderabad",
  "Social Media Marketing in Tirupati",
  "Growth Agency for Startups",
  "Brand Strategy Consultants",
  "Website Development & CRM Experts",
];

export type Solution = {
  id: string;
  icon: IconName;
  word: string;
  title: string;
  accent: string;
  tag: string;
  paras: string[];
  focus: string[];
  stats?: [string, string][];
  img: string;
  link?: [string, string];
};

/* ---------- About page ---------- */

export const FOUNDERS = {
  img: "/img/about/founders.jpg",
  paras: [
    "Sreelatha Royal and Santhosh Rokaya, the Co-Founders of LaSan Media Works, bring over 7 years of combined experience in sales, marketing and digital strategy. With a strong foundation in understanding market dynamics and customer behavior, they have consistently helped businesses grow by aligning creativity with measurable results.",
    "Their approach goes beyond traditional marketing. By blending creative storytelling with data-driven strategies, they craft brand experiences that not only capture attention but also build trust and long-term relationships. Every project they take on is driven by a clear objective to create meaningful impact and sustainable growth for their clients.",
    "At LaSan Media Works, the focus is on delivering tailored solutions that match each brand's unique identity and goals. Whether it's building a brand from scratch or scaling an existing one, their combined expertise ensures a balance between innovation, strategy, and execution.",
  ],
  highlights: [
    "7+ Years Experience",
    "Co-Founders",
    "Sales & Marketing Experts",
    "Data-Driven Strategies",
  ],
};

export const VISION =
  "To build powerful, recognizable, and trusted brands that stand out in competitive markets and create lasting impressions.";
export const MISSION =
  "To deliver creative, strategic, and growth-focused marketing solutions that empower businesses to scale, connect with their audience, and achieve measurable success.";

export const JOURNEY = [
  { year: "2021", text: "LaSän Media Founded" },
  { year: "2022", text: "50+ Clients Served" },
  { year: "2023", text: "Award-Winning Agency" },
  { year: "2024", text: "500+ Campaigns" },
  { year: "2025", text: "Pan-India Presence" },
];

export const ABOUT_TEAM = [
  {
    name: "K Sree Latha Royal",
    role: "Founder & CMO",
    photo: "/img/team/sree-latha.jpg",
  },
  {
    name: "Santhosh Rokaya",
    role: "Co-Founder & CEO",
    photo: "/img/team/santhosh-rokaya.jpg",
  },
  {
    name: "Jagadeesh SH",
    role: "Director",
    photo: "/img/team/jagadeesh-sh.png",
  },
  {
    name: "C V Monisha",
    role: "General Manager",
    photo: "/img/team/mounisha-cv.png",
  },
  { name: "Dinesh", role: "Business Analyst", photo: "/img/team/dinesh.png" },
  {
    name: "Gayathri K",
    role: "Key Account Manager",
    photo: "/img/team/gayathri-k.png",
  },
  { name: "Sidhu", role: "Sales Team Leader", photo: "/img/team/sidhu.png" },
  { name: "Babar", role: "Editor", photo: "/img/team/babar.png" },
  { name: "Sasmith", role: "Videographer", photo: "/img/team/sasmith.png" },
  {
    name: "Susmitha",
    role: "Graphic Designer",
    photo: "/img/team/susmitha.png",
  },
  {
    name: "Lavanya P",
    role: "Social Media Marketing",
    photo: "/img/team/lavanya-p.png",
  },
];

export const PERFORMERS = [1, 2, 3, 4, 5, 6, 7].map(
  (n) => `/img/performers/performer-${n}.jpg`,
);

export const ABOUT_NUMBERS = [
  { value: 150, suffix: "", label: "Brands Empowered" },
  { value: 98, suffix: "%", label: "Client Retention Rate" },
  { value: 500, suffix: "", label: "Campaigns Executed" },
  { value: 4, suffix: "", label: "Years of Excellence" },
];

export const PILLARS: Solution[] = [
  {
    id: "business",
    icon: "target",
    word: "Business",
    title: "Business",
    accent: "Strategy",
    tag: "Tailored solutions for sustainable growth",
    img: "/img/stock/s-business.jpg",
    paras: [
      "Our Business Strategy framework goes beyond traditional consulting. We dive deep into your market landscape, competitive positioning, and operational capabilities to build a roadmap that ensures long-term viability and scalability.",
      "We help you identify untapped opportunities, mitigate risks, and align your resources with clear KPIs. Whether you're a startup or an established enterprise, our data-backed approach delivers measurable outcomes.",
    ],
    focus: [
      "Market Feasibility",
      "Competitive Analysis",
      "Strategic Roadmapping",
      "Risk Mitigation",
    ],
  },
  {
    id: "brand",
    icon: "spark",
    word: "Brand",
    title: "Brand",
    accent: "Strategy",
    tag: "Crafting unique brand identities",
    img: "/img/stock/s-brand.jpg",
    paras: [
      "Your brand is the emotional bridge between your business and your customers. We help you discover, articulate, and amplify your authentic brand story through cohesive experiences that build trust and loyalty.",
      "Through deep audience research and competitive audits, we position your brand uniquely in the marketplace — crafting brand ecosystems that drive recognition and premium value.",
    ],
    focus: [
      "Brand Positioning",
      "Visual Identity",
      "Storytelling",
      "Brand Guidelines",
    ],
  },
  {
    id: "digital",
    icon: "monitor",
    word: "Digital",
    title: "Digital",
    accent: "Strategy",
    tag: "Leveraging tools for online presence",
    img: "/img/stock/s-digital.jpg",
    paras: [
      "Our Digital Strategy framework aligns your technology stack, content marketing, SEO, and paid media into a unified growth engine. We transform scattered digital activities into a cohesive system driving leads and sales.",
      "From omnichannel integration to conversion rate optimization, we ensure every digital touchpoint works harder with real-time analytics and agile iterations.",
    ],
    focus: [
      "SEO & SEM",
      "Content Strategy",
      "Paid Media",
      "Conversion Optimization",
    ],
  },
  {
    id: "technical",
    icon: "sliders",
    word: "Technical",
    title: "Technical",
    accent: "Strategy",
    tag: "Identify & optimize tech solutions",
    img: "/img/stock/s-technical.jpg",
    paras: [
      "Technology should accelerate your business. Our Technical Strategy practice helps you audit, select, and implement the right software, automation tools, and infrastructure to reduce friction and boost productivity.",
      "We specialize in CRM integration, workflow automation, and custom development, bridging the gap between business goals and technical execution.",
    ],
    focus: [
      "Tech Stack Audit",
      "CRM Implementation",
      "Workflow Automation",
      "Custom Development",
    ],
  },
  {
    id: "marketing-sales",
    icon: "trend",
    word: "Sales",
    title: "Marketing",
    accent: "& Sales",
    tag: "Integrating strategies to boost sales",
    img: "/img/stock/s-sales.jpg",
    paras: [
      "Marketing and sales alignment is the holy grail of revenue growth. We design integrated campaigns that nurture leads from first touch to closed deal, combining brand awareness with performance marketing.",
      "Our holistic approach unites social media, email marketing, paid ads, and sales funnel optimization to shorten sales cycles and increase conversion rates.",
    ],
    focus: [
      "Full-funnel Strategy",
      "Lead Generation",
      "Sales Enablement",
      "Retention Marketing",
    ],
  },
  {
    id: "operational",
    icon: "layers",
    word: "Operations",
    title: "Operational",
    accent: "Strategy",
    tag: "Streamlining processes for efficiency",
    img: "/img/stock/s-operational.jpg",
    paras: [
      "Operational excellence is the backbone of sustainable growth. We help you map, analyze, and redesign core processes to eliminate waste, reduce costs, and improve quality and speed.",
      "From resource allocation to performance metrics, we build operational frameworks that scale with your business using lean methodologies and automation insights.",
    ],
    focus: [
      "Process Optimization",
      "Lean Methodologies",
      "KPI Dashboards",
      "Quality Control",
    ],
  },
];

export const SERVICES: Solution[] = [
  {
    id: "research",
    icon: "search",
    word: "Research",
    title: "Market Research",
    accent: "& Audits",
    tag: "Feasibility reports & consumer insights",
    img: "/img/stock/v-research.jpg",
    paras: [
      "Knowledge is power, and we provide the intelligence you need to make confident business decisions. Our comprehensive market research services include deep-dive feasibility studies, consumer behavior analysis, competitive benchmarking, and brand health audits.",
      "We don't just give you data — we translate insights into actionable strategies. From identifying market gaps to validating product ideas, our research frameworks minimize risk and maximize opportunity.",
    ],
    focus: [
      "Feasibility Studies",
      "Consumer Insights",
      "Competitive Analysis",
      "Brand Audits",
      "Trend Forecasting",
    ],
    stats: [
      ["98%", "Accuracy Rate"],
      ["500+", "Projects Audited"],
    ],
  },
  {
    id: "smm-seo-ppc",
    icon: "ad",
    word: "Digital",
    title: "SMM, SEO,",
    accent: "PPC",
    tag: "360° digital marketing services",
    img: "/img/stock/v-smm.jpg",
    paras: [
      "Dominate the digital landscape with our integrated marketing solutions. We combine Social Media Marketing, Search Engine Optimization, and Pay-Per-Click advertising into a unified growth engine that drives traffic, engagement, and conversions.",
      "Our data-driven approach ensures every rupee spent delivers maximum ROI. From viral social campaigns to high-intent search ads, we craft strategies that put your brand in front of the right audience at the right time.",
    ],
    focus: [
      "Social Media Management",
      "SEO Optimization",
      "Google Ads",
      "Retargeting Campaigns",
      "Analytics & Reporting",
    ],
    stats: [
      ["300%", "Avg. ROAS"],
      ["1M+", "Impressions/Month"],
    ],
  },
  {
    id: "web-crm",
    icon: "code",
    word: "Web",
    title: "Website Dev",
    accent: "& CRM",
    tag: "Creative & high performing websites",
    img: "/img/stock/v-web.jpg",
    paras: [
      "Your website is your digital storefront — make it unforgettable. We build modern, responsive, and high-performance websites that not only look stunning but also convert visitors into loyal customers. From custom WordPress development to fully scalable e-commerce platforms.",
      "Plus, we integrate powerful CRM solutions that streamline your sales process, automate follow-ups, and give you a 360° view of your customer journey.",
    ],
    focus: [
      "Custom Web Development",
      "E-commerce Solutions",
      "CRM Integration",
      "UI/UX Design",
      "Hosting & Maintenance",
    ],
    stats: [
      ["50+", "Websites Launched"],
      ["99.9%", "Uptime Guarantee"],
    ],
  },
  {
    id: "branding",
    icon: "pen",
    word: "Brand",
    title: "Branding",
    accent: "& Creative",
    tag: "Logo designing & brand story",
    img: "/img/stock/v-branding.jpg",
    paras: [
      "Your brand is more than a logo — it's a feeling, a promise, an experience. Our creative team crafts compelling brand identities that capture hearts and minds. From logo design and color psychology to brand messaging and visual storytelling.",
      "We help you discover your unique voice and translate it into every touchpoint — packaging, social media, website, and beyond.",
    ],
    focus: [
      "Logo & Identity Design",
      "Brand Strategy",
      "Packaging Design",
      "Social Media Creatives",
      "Brand Guidelines",
    ],
    stats: [
      ["200+", "Brands Created"],
      ["4.9★", "Client Rating"],
    ],
  },
  {
    id: "workforce",
    icon: "users",
    word: "Workforce",
    title: "Marketing",
    accent: "Workforce",
    tag: "Maximize revenue through automation",
    img: "/img/stock/v-workforce.jpg",
    paras: [
      "Scale your marketing efforts without scaling your headcount. Our Marketing Workforce solutions provide you with dedicated, vetted marketing professionals who work as an extension of your team — from campaign managers to content creators and automation specialists.",
      "We help you build and manage high-performing marketing teams, implement automation workflows, and optimize your marketing operations for maximum efficiency.",
    ],
    focus: [
      "Dedicated Marketing Teams",
      "Marketing Automation",
      "Lead Nurturing",
      "Email Campaigns",
      "Performance Tracking",
    ],
    stats: [
      ["40%", "Cost Savings"],
      ["24/7", "Support Available"],
    ],
  },
  {
    id: "media-pr",
    icon: "radio",
    word: "PR",
    title: "Media",
    accent: "& PR",
    tag: "Enabling business outreach",
    img: "/img/stock/v-pr.jpg",
    paras: [
      "Get the spotlight you deserve. Our Media & PR services help you build credibility, manage reputation, and amplify your brand story across top-tier publications, news outlets, and digital platforms.",
      "We have a vast network of media contacts and influencers ready to share your story. Whether you're launching a product or building thought leadership — we make sure the world hears about it.",
    ],
    focus: [
      "Press Release Distribution",
      "Media Relations",
      "Influencer Outreach",
      "Crisis Management",
      "Thought Leadership",
    ],
    stats: [
      ["100+", "Media Features"],
      ["50M+", "Reach"],
    ],
  },
];

export const ABOUT_SECTIONS: Solution[] = [
  {
    id: "collaborations",
    icon: "handshake",
    word: "Collaborations",
    title: "Collaborations",
    accent: "",
    tag: "Partnerships with effective results",
    img: "/img/about/collaborations.jpg",
    paras: [
      "We believe in the power of strategic partnerships. LaSän Media has collaborated with over 150+ brands across industries, from ambitious startups to established enterprises, delivering measurable growth and lasting impact.",
    ],
    focus: [
      "150+ Brand Partners",
      "50+ Influencer Network",
      "Tech Alliances",
      "Strategic Joint Ventures",
    ],
    link: ["Partner with us", "/book-appointment"],
  },
  {
    id: "resources",
    icon: "book",
    word: "Resources",
    title: "Resources",
    accent: "",
    tag: "Explore blog & case studies",
    img: "/img/about/resources.jpg",
    paras: [
      "Knowledge is power, and we're committed to sharing our expertise. Our resource center features in-depth blog posts, white papers, case studies, and marketing templates.",
    ],
    focus: [
      "100+ Blog Posts",
      "25+ Case Studies",
      "Free Templates",
      "Industry Reports",
    ],
    link: ["Explore articles", "/articles"],
  },
  {
    id: "howwework",
    icon: "cogs",
    word: "How We Work",
    title: "How We",
    accent: "Work",
    tag: "Frameworks to hit growth KPIs",
    img: "/img/about/how-we-work.jpg",
    paras: [
      "Our proven 4-step framework ensures clarity, alignment, and results. We start with deep research, craft custom strategies, execute with agility, and optimize continuously.",
    ],
    focus: [
      "Discovery & Research",
      "Strategy & Planning",
      "Execution & Management",
      "Optimization & Reporting",
    ],
    link: ["See our process", "/strategy#process"],
  },
  {
    id: "careers",
    icon: "brief",
    word: "Careers",
    title: "Careers",
    accent: "",
    tag: "Are you willing to create impact?",
    img: "/img/about/careers.jpg",
    paras: [
      "Join a team that's redefining growth. We offer a culture of innovation, continuous learning, and unlimited growth opportunities.",
    ],
    focus: [
      "Open Positions: 5+",
      "Remote & Hybrid",
      "Learning Budget",
      "Growth-Focused Culture",
    ],
    link: ["View careers", "/careers"],
  },
  {
    id: "media",
    icon: "news",
    word: "Media",
    title: "Media",
    accent: "Presence",
    tag: "Featured on popular news",
    img: "/img/about/media.jpg",
    paras: [
      "LaSän Media has been recognized by leading publications and news outlets for our innovative approach to digital growth.",
    ],
    focus: [
      "Featured on 20+ Outlets",
      "Industry Awards 2024",
      "Guest Contributions",
      "Press Releases",
    ],
    link: ["Read our news", "/articles?category=News"],
  },
];

export const CAREER_PERKS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "users",
    title: "Mentorship First",
    text: "Learn from industry veterans who guide you through real-world challenges. Weekly knowledge sessions & skill workshops.",
  },
  {
    icon: "rocket",
    title: "Accelerated Growth",
    text: "Fast-track your career with hands-on projects, cross-functional roles, and clear promotion paths.",
  },
  {
    icon: "heart",
    title: "Inclusive Culture",
    text: "Your voice matters. We celebrate diverse backgrounds and create a safe, collaborative environment.",
  },
  {
    icon: "monitor",
    title: "Cutting-Edge Tools",
    text: "Work with the latest tech stack, analytics platforms, and creative suites to build future-ready solutions.",
  },
];
