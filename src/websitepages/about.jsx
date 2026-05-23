import React, { useState, useEffect, useRef, useMemo } from "react";
import FloatBookButton from "../components/FloatBookButton";
import Navbar from "./navbar";
import Footer from "../components/Footer";

/* ─── Non-Tailwindable CSS ──────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family:'Jost',sans-serif; background:#182318; color:#f4efe5; overflow-x:hidden; cursor:none; }
  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-track { background:#182318; }
  ::-webkit-scrollbar-thumb { background:#c8a96a; }

  /* Cursor */
  .kha-cur  { width:9px; height:9px; background:#c8a96a; border-radius:50%; position:fixed; top:0; left:0; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); }
  .kha-cuf  { width:34px; height:34px; border:1px solid rgba(200,169,106,.4); border-radius:50%; position:fixed; top:0; left:0; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); }

  /* Hero animations */
  @keyframes khaAbHeroZoom { to { transform:scale(1); } }
  .kha-ab-hero-bg { animation:khaAbHeroZoom 12s ease forwards; transform:scale(1.06); }
  @keyframes khaAbFadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  .kha-ab-fade1 { opacity:0; animation:khaAbFadeUp .9s .3s forwards; }
  .kha-ab-fade2 { opacity:0; animation:khaAbFadeUp .9s .5s forwards; }
  .kha-ab-fade3 { opacity:0; animation:khaAbFadeUp .9s .7s forwards; }
  .kha-ab-fade4 { opacity:0; animation:khaAbFadeUp .9s .9s forwards; }

  /* Hero eyebrow */
  .kha-ab-eyebrow::before { content:''; width:28px; height:1px; background:#c8a96a; flex-shrink:0; }

  /* Eyebrow generic */
  .kha-eyebrow { display:inline-flex; align-items:center; gap:.6rem; font-size:.72rem; letter-spacing:.32em; text-transform:uppercase; color:#c8a96a; margin-bottom:1rem; }
  .kha-eyebrow::before { content:''; width:22px; height:1px; background:#c8a96a; }

  /* Divider gem */
  .kha-div-gem { width:5px; height:5px; background:#c8a96a; transform:rotate(45deg); }

  /* Mission image stack */
  .kha-mimg-main { border-radius:90px 90px 6px 6px; }
  .kha-mimg-accent { border-radius:6px 6px 90px 90px; }

  /* Values card hover */
  .kha-val-card { transition:border-color .4s,transform .4s; cursor:default; }
  .kha-val-card:hover { border-color:rgba(200,169,106,.35) !important; transform:translateY(-5px); }

  /* Timeline */
  .kha-timeline { position:relative; padding-left:2.5rem; }
  .kha-timeline::before { content:''; position:absolute; left:0; top:.6rem; bottom:.6rem; width:1px; background:linear-gradient(to bottom,#c8a96a,rgba(200,169,106,.2)); }
  .kha-tl-item { position:relative; margin-bottom:3rem; padding-left:2.5rem; }
  .kha-tl-item::before { content:''; position:absolute; left:-2.5rem; top:.55rem; width:10px; height:10px; border:1px solid #c8a96a; background:#1f2e1f; transform:rotate(45deg); }
  .kha-tl-item.featured::before { background:#c8a96a; width:14px; height:14px; left:-2.7rem; top:.4rem; }

  /* Board cards */
  .kha-board-card { transition:border-color .4s,transform .4s; }
  .kha-board-card:hover { border-color:rgba(200,169,106,.32) !important; transform:translateY(-5px); }
  .kha-bc-img img { filter:saturate(.75); transition:filter .5s,transform .6s; }
  .kha-board-card:hover .kha-bc-img img { filter:saturate(1); transform:scale(1.05); }
  .kha-board-card.featured { position:relative; }
  .kha-board-card.featured::before { content:'President'; position:absolute; top:1rem; right:1rem; padding:.25rem .75rem; background:rgba(200,169,106,.15); border:1px solid rgba(200,169,106,.35); font-size:.62rem; letter-spacing:.2em; text-transform:uppercase; color:#c8a96a; z-index:2; }

  /* Member cards */
  .kha-mem-card { transition:border-color .35s,transform .35s; cursor:none; }
  .kha-mem-card:hover { border-color:rgba(200,169,106,.28) !important; transform:translateY(-4px); }
  .kha-mem-stay::before { content:'🏡'; }
  .kha-mem-loc::before { content:'📍'; }

  /* Filter buttons */
  .kha-mf-btn { transition:all .3s; cursor:none; }
  .kha-mf-btn:hover, .kha-mf-btn.active { border-color:#c8a96a !important; color:#c8a96a !important; background:rgba(200,169,106,.07) !important; }

  /* Partner logo */
  .kha-partner-logo { transition:all .35s; }
  .kha-partner-logo:hover { border-color:rgba(200,169,106,.32) !important; color:#c8a96a !important; }

  /* CTA btn */
  .kha-btn-join:hover { background:#e0c88a !important; transform:translateY(-2px); }

  /* Footer */
  .kha-footer-link:hover { color:#c8a96a !important; }

  /* Breadcrumb */
  .kha-breadcrumb-link:hover { color:#c8a96a !important; }

  /* Reveal */
  .kha-reveal { opacity:0; transform:translateY(36px); transition:opacity .85s ease,transform .85s ease; }
  .kha-reveal.in { opacity:1; transform:translateY(0); }
  .kha-d1{transition-delay:.12s;} .kha-d2{transition-delay:.24s;} .kha-d3{transition-delay:.36s;} .kha-d4{transition-delay:.48s;}

  @media(max-width:1200px){
    .kha-ab-hero-content { padding-left:3rem !important; padding-right:3rem !important; }
  }

  @media(max-width:900px){
    .kha-ab-hero-content { padding-left:1.5rem !important; padding-right:1.5rem !important; }
    .kha-mission-inner { grid-template-columns:1fr !important; }
    .kha-mission-img-stack { height:320px !important; }
    .kha-stats-inner { grid-template-columns:1fr 1fr !important; }
    .kha-values-grid { grid-template-columns:1fr 1fr !important; }
    .kha-board-row1 { grid-template-columns:1fr 1fr !important; }
    .kha-board-row2 { grid-template-columns:1fr 1fr !important; }
    .kha-mem-grid { grid-template-columns:1fr 1fr !important; }
    .kha-footer-grid { grid-template-columns:1fr 1fr !important; }
  }

  @media(max-width:768px){
    body { cursor:auto; }
    .kha-cur { display:none; }
    .kha-cuf { display:none; }
    .kha-ab-hero-content { padding-left:1rem !important; padding-right:1rem !important; padding-bottom:2.5rem !important; }
    .kha-ab-hero-content h1 { font-size:clamp(2rem,4vw,3rem) !important; }
    .kha-mission-inner { gap:1.5rem !important; }
    .kha-mimg-main { width:100% !important; height:300px !important; }
    .kha-mimg-accent { width:100% !important; height:250px !important; }
    .kha-stats-inner { grid-template-columns:1fr !important; gap:0.5rem !important; }
    .kha-values-grid { grid-template-columns:1fr !important; gap:1rem !important; }
    .kha-board-row1 { grid-template-columns:1fr !important; gap:1rem !important; }
    .kha-board-row2 { grid-template-columns:1fr 1fr !important; gap:1rem !important; }
    .kha-mem-grid { grid-template-columns:1fr 1fr !important; gap:0.8rem !important; }
    .kha-footer-grid { grid-template-columns:1fr !important; gap:1.5rem !important; }
    section { padding:1.5rem !important; }
    .px-16 { padding-left:1rem !important; padding-right:1rem !important; }
    .py-28 { padding-top:2rem !important; padding-bottom:2rem !important; }
    .py-24 { padding-top:1.5rem !important; padding-bottom:1.5rem !important; }
  }

  @media(max-width:480px){
    .kha-ab-hero-content h1 { font-size:clamp(1.5rem,3vw,2rem) !important; }
    .kha-eyebrow { font-size:.65rem !important; }
    .kha-board-row1 { grid-template-columns:1fr !important; }
    .kha-board-row2 { grid-template-columns:1fr !important; }
    .kha-mem-grid { grid-template-columns:1fr !important; }
    .kha-mf-btn { font-size:.65rem !important; padding:0.4rem 0.8rem !important; }
    .kha-partner-logo { font-size:0.9rem !important; padding:0.6rem !important; }
  }
`;

const cg = "'Cormorant Garamond',serif";
const jost = "'Jost',sans-serif";

/* ─── Generate 148 members ─────────────────────────────────────────────── */
const BASE_MEMBERS = [
  {
    id: 1,
    name: "Kaveri Ponnappa",
    stay: "Misty Peaks Cottage",
    district: "Kodagu",
    taluk: "Madikeri",
    since: "2014",
    role: "Vice President",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    badges: ["Founding Member", "Eco Certified"],
    isBoard: true,
  },
  {
    id: 2,
    name: "Bopanna Family",
    stay: "Riverside Amara",
    district: "Kodagu",
    taluk: "Virajpet",
    since: "2012",
    role: "Member",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    badges: ["Founding Member"],
    isBoard: false,
  },
  {
    id: 3,
    name: "Suresh Muthappa",
    stay: "Green Haven Estate",
    district: "Kodagu",
    taluk: "Somvarpet",
    since: "2010",
    role: "President",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    badges: ["Founding Member", "Board President", "Eco Certified"],
    isBoard: true,
  },
  {
    id: 13,
    name: "Ponraj & Devaki",
    stay: "Coorg Cardamom House",
    district: "Kodagu",
    taluk: "Madikeri",
    since: "2015",
    role: "Member",
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80",
    badges: ["Eco Certified"],
    isBoard: false,
  },
  {
    id: 14,
    name: "Appachu Nanda",
    stay: "Valley Mist Bungalow",
    district: "Kodagu",
    taluk: "Somvarpet",
    since: "2016",
    role: "Member",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80",
    badges: [],
    isBoard: false,
  },
  {
    id: 15,
    name: "Thimmaiah Family",
    stay: "Kodava Heritage Home",
    district: "Kodagu",
    taluk: "Virajpet",
    since: "2017",
    role: "Member",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&q=80",
    badges: ["Heritage Certified"],
    isBoard: false,
  },
  {
    id: 16,
    name: "Muthamma Cariappa",
    stay: "Coffee Bloom Retreat",
    district: "Kodagu",
    taluk: "Madikeri",
    since: "2019",
    role: "Member",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    badges: ["Eco Certified"],
    isBoard: false,
  },
  {
    id: 17,
    name: "Deva Aiyanna",
    stay: "Pepper Trail Cottage",
    district: "Kodagu",
    taluk: "Somvarpet",
    since: "2020",
    role: "Member",
    avatar:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=100&q=80",
    badges: [],
    isBoard: false,
  },
  {
    id: 18,
    name: "Girija Mandanna",
    stay: "Homestay Nagarhole",
    district: "Kodagu",
    taluk: "Virajpet",
    since: "2021",
    role: "Member",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80",
    badges: ["Wildlife Zone"],
    isBoard: false,
  },
  
];

const _districts = [
  "Belagavi",
  "Mandya",
  "Tumakuru",
  "Raichur",
  "Ballari",
  "Davangere",
  "Gadag",
  "Dharwad",
  "Vijayapura",
  "Kalaburagi",
  "Bidar",
  "Yadgir",
  "Koppal",
  "Bagalkot",
  "Haveri",
  "Kodagu",
  "Chikmagalur",
];
const _stayNames = [
  "Hill View Stay",
  "River Bend Home",
  "Forest Lodge",
  "Heritage Cottage",
  "Farm Rest",
  "Sunset Nook",
  "Valley View",
  "Paddy Field House",
  "Garden Retreat",
  "Old Bungalow",
  "Tea Estate Home",
  "Spice Garden Stay",
  "Waterfall View",
  "Tribal Heritage Home",
  "Rock Garden Stay",
  "Ancient Temple Home",
  "Lakeside Retreat",
];
const _firstNames = [
  "Ramaiah",
  "Girija",
  "Manjunath",
  "Shantha",
  "Devappa",
  "Lalitha",
  "Venkatesha",
  "Kamala",
  "Basappa",
  "Savitri",
  "Mahesh",
  "Radha",
  "Siddappa",
  "Meena",
  "Prakash",
  "Nirmala",
  "Ganapathi",
  "Usha",
  "Rajappa",
  "Leela",
];
const _lastNames = [
  "Gowda",
  "Rao",
  "Naik",
  "Hegde",
  "Sharma",
  "Reddy",
  "Patil",
  "Shetty",
  "Iyer",
  "Nair",
  "Bhat",
  "Joshi",
  "Kulkarni",
  "Murthy",
  "Pillai",
  "Swamy",
];
const _avatarList = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80",
  "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=100&q=80",
  "https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=100&q=80",
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=100&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80",
];

const ALL_MEMBERS = [...BASE_MEMBERS];
for (let i = BASE_MEMBERS.length; i < 148; i++) {
  const yr = 2011 + (i % 12);
  const d = _districts[i % _districts.length];
  ALL_MEMBERS.push({
    id: 100 + i,
    name: `${_firstNames[i % _firstNames.length]} ${_lastNames[i % _lastNames.length]}`,
    stay: `${_stayNames[i % _stayNames.length]} ${Math.floor(i / 17) + 1}`,
    district: d,
    taluk: d,
    since: `${yr}`,
    role: "Member",
    avatar: _avatarList[i % _avatarList.length],
    badges: [],
    isBoard: false,
  });
}

/* ─── Divider helper ────────────────────────────────────────────────────── */
const Divider = () => (
  <div className="flex items-center gap-[.8rem] my-[1.4rem]">
    <div
      style={{
        height: "1px",
        background: "#c8a96a",
        opacity: 0.35,
        width: "50px",
      }}
    ></div>
    <div className="kha-div-gem"></div>
    <div
      style={{
        height: "1px",
        background: "#c8a96a",
        opacity: 0.35,
        width: "50px",
      }}
    ></div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════
   About Page
══════════════════════════════════════════════════════════════════════════ */
const About = () => {
  /* Cursor */
  const curRef = useRef(null),
    curFRef = useRef(null);
  const cxRef = useRef(0),
    cyRef = useRef(0),
    fxRef = useRef(0),
    fyRef = useRef(0);
  useEffect(() => {
    const onMove = (e) => {
      cxRef.current = e.clientX;
      cyRef.current = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = e.clientX + "px";
        curRef.current.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", onMove);
    let raf;
    const tick = () => {
      fxRef.current += (cxRef.current - fxRef.current) * 0.11;
      fyRef.current += (cyRef.current - fyRef.current) * 0.11;
      if (curFRef.current) {
        curFRef.current.style.left = fxRef.current + "px";
        curFRef.current.style.top = fyRef.current + "px";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Reveal observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".kha-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });

  /* Members filter */
  const [activeMF, setActiveMF] = useState("all");
  const filteredMembers = useMemo(() => {
    if (activeMF === "all") return ALL_MEMBERS;
    if (activeMF === "board") return ALL_MEMBERS.filter((m) => m.isBoard);
    return ALL_MEMBERS.filter((m) => m.district === activeMF);
  }, [activeMF]);

  const MF_BTNS = [
    { key: "all", label: "All Members" },
    { key: "Kodagu", label: "Kodagu" },
    { key: "Chikmagalur", label: "Chikmagalur" },
    { key: "Hassan", label: "Hassan" },
    { key: "Mysuru", label: "Mysuru" },
    { key: "Udupi", label: "Udupi" },
    { key: "Dakshina Kannada", label: "D.K." },
    { key: "Uttara Kannada", label: "U.K." },
    { key: "board", label: "Board Members" },
  ];

  const TIMELINE = [
    {
      year: "2010",
      title: "Association Founded",
      featured: true,
      delay: "",
      desc: "Seven homestay operators in Kodagu — frustrated by lack of visibility and government support — form the Karnataka Homestays Association in Madikeri. Registration number KHA/2010/001 is issued by the Karnataka government.",
    },
    {
      year: "2012",
      title: "First Website & Directory",
      featured: false,
      delay: " kha-d1",
      desc: "KHA launches its first online directory, listing 24 homestays across Kodagu and Chikmagalur. It's the first time many of these families have had any online presence at all.",
    },
    {
      year: "2014",
      title: "Karnataka Tourism Affiliation",
      featured: false,
      delay: " kha-d1",
      desc: "KHA becomes the first homestay body officially affiliated with the Karnataka Tourism Department. Membership grows to 47 homestays across 8 districts.",
    },
    {
      year: "2016",
      title: "WhatsApp Booking Initiative",
      featured: false,
      delay: " kha-d2",
      desc: "KHA pioneers the WhatsApp Booking model — the first association in India to formally support direct WhatsApp booking for member homestays without a website. This opens the platform to dozens of rural operators previously excluded.",
    },
    {
      year: "2018",
      title: "Eco-Certification Programme Launched",
      featured: false,
      delay: " kha-d2",
      desc: "KHA introduces a voluntary eco-certification standard for members, recognising sustainably operated homestays. 31 properties earn the certification in the first year. Green Haven Estate wins Karnataka's Best Eco Homestay award.",
    },
    {
      year: "2021",
      title: "Recovery & Digital Rebuild",
      featured: false,
      delay: " kha-d3",
      desc: "Following the pandemic, KHA leads a state-wide recovery campaign for homestay operators, securing partial relief funding and relaunching a rebuilt platform that helps members recover bookings.",
    },
    {
      year: "2024",
      title: "Platform Redesign & 148 Members",
      featured: true,
      delay: " kha-d3",
      desc: "KHA launches its current platform — the most comprehensive homestay directory in Karnataka's history. Membership reaches 148 verified operators across 30 districts and 42 taluks. Over 3,200 guest visits recorded in the year.",
    },
  ];

  const BOARD_ROW1 = [
    {
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      role: "President",
      name: "Suresh Muthappa",
      home: "Green Haven Estate",
      district: "Somvarpet, Kodagu",
      since: "KHA Member since 2010 · Founding Member",
      featured: true,
      sm: false,
    },
    {
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      role: "Vice President — South Karnataka",
      name: "Kaveri Ponnappa",
      home: "Misty Peaks Cottage",
      district: "Madikeri, Kodagu",
      since: "KHA Member since 2014",
      featured: false,
      sm: false,
    },
    {
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      role: "Vice President — Coastal Karnataka",
      name: "Rajesh Shetty",
      home: "Kudremukh Wilderness",
      district: "Kundapur, Udupi",
      since: "KHA Member since 2011",
      featured: false,
      sm: false,
    },
  ];
  const BOARD_ROW2 = [
    {
      img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&q=80",
      role: "General Secretary",
      name: "Nanjunda Gowda",
      home: "Kabini Elephant Watch",
      district: "H.D. Kote, Mysuru",
      since: "Member since 2009",
      featured: false,
      sm: true,
    },
    {
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
      role: "Treasurer",
      name: "Subramaniam Iyer",
      home: "Belur Heritage House",
      district: "Belur, Hassan",
      since: "Member since 2013",
      featured: false,
      sm: true,
    },
    {
      img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&q=80",
      role: "Regional Rep — Malnad",
      name: "Manju Raju",
      home: "Kadumaney Forest Stay",
      district: "Koppa, Chikmagalur",
      since: "Member since 2015",
      featured: false,
      sm: true,
    },
    {
      img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
      role: "Regional Rep — North Karnataka",
      name: "Vasudeva Bhat",
      home: "Sirsi Areca Farm",
      district: "Sirsi, Uttara Kannada",
      since: "Member since 2020",
      featured: false,
      sm: true,
    },
  ];

  return (
    <>
      <style>{STYLES}</style>
      <div className="kha-cur" ref={curRef}></div>
      <div className="kha-cuf" ref={curFRef}></div>

      <Navbar />
      <FloatBookButton />

      {/* ════════════════ HERO ════════════════ */}
      <div
        className="relative overflow-hidden flex items-end"
        style={{ marginTop: "85px", height: "78vh", minHeight: "550px" }}
      >
        <div
          className="kha-ab-hero-bg absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1800&q=85')",
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(155deg,rgba(24,35,24,.6) 0%,rgba(24,35,24,.15) 50%,rgba(24,35,24,.92) 100%)",
          }}
        ></div>

        <div className="kha-ab-hero-content relative z-[2] w-full px-16 pb-20">
          <div
            className="kha-ab-eyebrow kha-ab-fade1 flex items-center gap-[.6rem] mb-[.9rem]"
            style={{
              fontSize: ".72rem",
              letterSpacing: ".32em",
              textTransform: "uppercase",
              color: "#c8a96a",
            }}
          >
            Established 2010 · Mysore, Karnataka
          </div>
          <h1
            className="kha-ab-fade2"
            style={{
              fontFamily: cg,
              fontSize: "clamp(3rem,5.5vw,5rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "#fdfaf4",
              maxWidth: "720px",
              marginBottom: "1.2rem",
            }}
          >
            The Official Voice of
            <br />
            Mysuru{" "}
            <em style={{ fontStyle: "italic", color: "#e0c88a" }}>
              Homestay
            </em>{" "}
            Hosts
          </h1>
          <p
            className="kha-ab-fade3"
            style={{
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "rgba(244,239,229,.7)",
              maxWidth: "520px",
            }}
          >
            A registered association representing authentic homestay operators across Mysuru district and its taluks — protecting hosts, connecting guests, and preserving local culture.
          </p>
        </div>

        {/* Reg badge */}
        <div
          className="kha-ab-fade4 absolute flex flex-col items-end gap-[.4rem] z-[2]"
          style={{ bottom: "4.5rem", right: "4rem" }}
        >
         
          <span
            style={{
              fontSize: ".65rem",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "rgba(244,239,229,.42)",
            }}
          >
            Karnataka Tourism Affiliated
          </span>
        </div>
      </div>

      {/* ════════════════ BREADCRUMB ════════════════ */}
      <div
        className="flex items-center gap-[.6rem] px-16 py-[.9rem]"
        style={{
          background: "#1f2e1f",
          borderBottom: "1px solid rgba(200,169,106,.1)",
        }}
      >
        <a
          href="/"
          className="kha-breadcrumb-link transition-colors duration-300"
          style={{
            fontSize: ".72rem",
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "rgba(244,239,229,.42)",
            textDecoration: "none",
          }}
        >
          Home
        </a>
        <span style={{ color: "rgba(200,169,106,.3)" }}>›</span>
        <span
          style={{
            fontSize: ".72rem",
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "#c8a96a",
          }}
        >
          About the Association
        </span>
      </div>

      {/* ════════════════ MISSION ════════════════ */}
      <section className="px-16 py-28 bg-[#1f2e1f]">
        <div
          className="kha-mission-inner max-w-[1200px] mx-auto grid gap-24 items-center"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          {/* Text */}
          <div>
            <span className="kha-eyebrow kha-reveal">Our Mission</span>
            <h2
              className="kha-reveal kha-d1"
              style={{
                fontFamily: cg,
                fontSize: "clamp(2.2rem,3.5vw,3.2rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: "#f4efe5",
              }}
            >
              Founded to{" "}
              <em style={{ fontStyle: "italic", color: "#e0c88a" }}>Protect</em>
              <br />
              the Authentic Mysuru
              <br />
              Homestay Experience
            </h2>
            <div className="kha-reveal kha-d2">
              <Divider />
            </div>
            <p
              className="kha-reveal kha-d2"
              style={{
                fontSize: ".97rem",
                lineHeight: 1.95,
                fontWeight: 300,
                color: "rgba(244,239,229,.72)",
                marginBottom: "1.2rem",
              }}
            >
              The Mysuru Homestays Association was founded in 2010 by a small
              group of homestay operators who believed that the real
              Mysuru — its forests, its families, its food and its stories —
              was in danger of being lost to impersonal resort tourism.
            </p>
            <p
              className="kha-reveal kha-d3"
              style={{
                fontSize: ".97rem",
                lineHeight: 1.95,
                fontWeight: 300,
                color: "rgba(244,239,229,.72)",
                marginBottom: "1.2rem",
              }}
            >
            Today we represent verified homestay families across Mysuru district and its taluks. We verify, support, and promote authentic homestay operators — whether they have a website or simply a WhatsApp number.

            </p>
            <p
              className="kha-reveal kha-d3"
              style={{
                fontSize: ".97rem",
                lineHeight: 1.95,
                fontWeight: 300,
                color: "rgba(244,239,229,.72)",
              }}
            >
              We do not charge guests. We do not take booking commissions. We
              exist solely to connect the families who open their homes with the
              travellers who are ready to receive what they offer.
            </p>
          </div>

          {/* Visual */}
          <div className="kha-reveal kha-d2 relative">
            <div
              className="kha-mission-img-stack relative"
              style={{ height: "540px" }}
            >
              <img
                className="Mha-mimg-main absolute object-cover"
                src="https://images.pexels.com/photos/33827314/pexels-photo-33827314.jpeg"
                alt="Mysuru homestay"
                style={{ width: "75%", height: "420px", top: 0, right: 0 }}
              />
              <img
                className="kha-mimg-accent absolute object-cover"
                src="/mha.jpg"
                alt="Karnataka landscape"
                style={{
                  width: "55%",
                  height: "280px",
                  bottom: 0,
                  left: 0,
                 
                }}
              />
              <div
                className="absolute text-center px-[1.8rem] py-[1.4rem] "
                style={{
                  top: "40%",
                  left: "5%",
                  transform: "translateY(-50%)",
                  background: "rgba(31,46,31,.92)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(200,169,106,.28)",
                }}
              >
                <span
                  style={{
                    fontFamily: cg,
                    fontSize: "3rem",
                    fontWeight: 300,
                    color: "#c8a96a",
                    lineHeight: 1,
                    display: "block",
                  }}
                >
                  2010
                </span>
                <span
                  style={{
                    fontSize: ".68rem",
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: "#7a9e6e",
                    display: "block",
                    marginTop: ".3rem",
                  }}
                >
                  Year Founded
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ STATS STRIP ════════════════ */}
      <div
        className="kha-reveal px-16 py-10"
        style={{
          background: "#2e4a2e",
          borderTop: "1px solid rgba(200,169,106,.15)",
          borderBottom: "1px solid rgba(200,169,106,.15)",
        }}
      >
        <div
          className="kha-stats-inner max-w-[1100px] mx-auto text-center"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: "1rem",
          }}
        >
          {[
            ["148", "Registered Members"],
            ["42", "Taluks Covered"],
            ["30", "Districts"],
            ["3,200+", "Guests Served"],
            ["14", "Years Active"],
          ].map(([num, lbl], i, arr) => (
            <React.Fragment key={lbl}>
              {i > 0 && (
                <div
                  style={{
                    width: "1px",
                    background: "rgba(200,169,106,.2)",
                    alignSelf: "stretch",
                  }}
                ></div>
              )}
              <div>
                <span
                  style={{
                    fontFamily: cg,
                    fontSize: "2.8rem",
                    fontWeight: 300,
                    color: "#c8a96a",
                    display: "block",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    fontSize: ".68rem",
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: "#adc49a",
                    marginTop: ".4rem",
                    display: "block",
                  }}
                >
                  {lbl}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ════════════════ VALUES ════════════════ */}
      <section className="px-16 py-24 bg-[#182318]">
        <div className="max-w-[1200px] mx-auto">
          <div className="kha-reveal text-center mb-16">
            <span className="kha-eyebrow">What We Stand For</span>
            <h2
              style={{
                fontFamily: cg,
                fontSize: "clamp(2.2rem,3.5vw,3.2rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: "#f4efe5",
                marginTop: ".5rem",
              }}
            >
              Four Principles That{" "}
              <em style={{ fontStyle: "italic", color: "#e0c88a" }}>Guide</em>{" "}
              Everything We Do
            </h2>
          </div>
          <div
            className="kha-values-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "1.2rem",
            }}
          >
            {[
              {
                delay: "",
                icon: "🌿",
                title: "Authenticity First",
                desc: "We list only genuine homestays — homes where a family actually lives. No resort-style properties masquerading as homestays. Every listing is personally verified by KHA before it goes live.",
              },
              {
                delay: " kha-d1",
                icon: "🤝",
                title: "Host Empowerment",
                desc: "We advocate for homestay operators' rights, provide training and support, and ensure fair representation in state tourism policy. A host with only a WhatsApp number deserves the same platform.",
              },
              {
                delay: " kha-d2",
                icon: "♻️",
                title: "Sustainable Tourism",
                desc: "All KHA members commit to responsible tourism practices — minimal plastic, local hiring, community benefit and low environmental impact. We reject tourism that damages the landscapes guests come to experience.",
              },
              {
                delay: " kha-d3",
                icon: "🏛️",
                title: "Cultural Preservation",
                desc: "Karnataka's regional cultures — Kodava, Tulu, Havyaka, Malnad — are lived in our member homes. We believe tourism should strengthen these traditions, not flatten them for commercial palatability.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className={`kha-val-card kha-reveal${v.delay} px-[1.8rem] py-[2.2rem]`}
                style={{
                  border: "1px solid rgba(200,169,106,.12)",
                  background: "rgba(31,46,31,.5)",
                }}
              >
                <span
                  style={{
                    fontSize: "2.4rem",
                    display: "block",
                    marginBottom: "1.2rem",
                  }}
                >
                  {v.icon}
                </span>
                <div
                  style={{
                    fontFamily: cg,
                    fontSize: "1.4rem",
                    fontWeight: 400,
                    color: "#f4efe5",
                    marginBottom: ".6rem",
                  }}
                >
                  {v.title}
                </div>
                <p
                  style={{
                    fontSize: ".88rem",
                    lineHeight: 1.8,
                    color: "rgba(244,239,229,.58)",
                    fontWeight: 300,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      {/* ════════════════ GOVERNING BOARD ════════════════ */}
      <section className="px-16 py-24 bg-[#182318]">
        <div className="max-w-[1200px] mx-auto">
          <div className="kha-reveal mb-14">
            <span className="kha-eyebrow">Leadership</span>
            <h2
              className="kha-reveal kha-d1"
              style={{
                fontFamily: cg,
                fontSize: "clamp(2.2rem,3.5vw,3.2rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: "#f4efe5",
              }}
            >
              Governing Board{" "}
              <em style={{ fontStyle: "italic", color: "#e0c88a" }}>2024–26</em>
            </h2>
            <div className="kha-reveal kha-d2">
              <Divider />
            </div>
          </div>

          {/* Row 1 — President + 2 VPs */}
          <div
            className="kha-board-row1 kha-reveal kha-d1 mb-6"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "1.5rem",
            }}
          >
            {BOARD_ROW1.map((p) => (
              <div
                key={p.name}
                className={`kha-board-card bg-[#1f2e1f] overflow-hidden${p.featured ? " featured" : ""}`}
                style={{
                  border: `1px solid ${p.featured ? "rgba(200,169,106,.22)" : "rgba(200,169,106,.1)"}`,
                }}
              >
                <div
                  className="kha-bc-img relative w-full overflow-hidden"
                  style={{ aspectRatio: "4/5" }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top,rgba(24,35,24,.8) 0%,transparent 55%)",
                    }}
                  ></div>
                </div>
                <div className="px-6 pt-[1.4rem] pb-[1.8rem]">
                  <div
                    style={{
                      fontSize: ".65rem",
                      letterSpacing: ".24em",
                      textTransform: "uppercase",
                      color: "#c8a96a",
                      marginBottom: ".3rem",
                    }}
                  >
                    {p.role}
                  </div>
                  <div
                    style={{
                      fontFamily: cg,
                      fontSize: "1.45rem",
                      fontWeight: 400,
                      color: "#f4efe5",
                      lineHeight: 1.15,
                      marginBottom: ".3rem",
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    className="flex items-center gap-[.3rem] mb-[.7rem]"
                    style={{ fontSize: ".78rem", color: "#7a9e6e" }}
                  >
                    🏡 {p.home}
                  </div>
                  <div
                    className="flex items-center gap-[.3rem]"
                    style={{
                      fontSize: ".78rem",
                      color: "rgba(244,239,229,.45)",
                    }}
                  >
                    📍 {p.district}
                  </div>
                  <div
                    style={{
                      fontSize: ".72rem",
                      letterSpacing: ".12em",
                      color: "rgba(200,169,106,.55)",
                      marginTop: ".5rem",
                      paddingTop: ".5rem",
                      borderTop: "1px solid rgba(200,169,106,.1)",
                    }}
                  >
                    {p.since}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 — Secretary, Treasurer, 2 Regional Reps */}
          <div
            className="kha-board-row2 kha-reveal kha-d2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "1.5rem",
            }}
          >
            {BOARD_ROW2.map((p) => (
              <div
                key={p.name}
                className="kha-board-card bg-[#1f2e1f] overflow-hidden"
                style={{ border: "1px solid rgba(200,169,106,.1)" }}
              >
                <div
                  className="kha-bc-img relative w-full overflow-hidden"
                  style={{ aspectRatio: "1/1" }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top,rgba(24,35,24,.8) 0%,transparent 55%)",
                    }}
                  ></div>
                </div>
                <div className="px-5 pt-[1.4rem] pb-[1.8rem]">
                  <div
                    style={{
                      fontSize: ".65rem",
                      letterSpacing: ".24em",
                      textTransform: "uppercase",
                      color: "#c8a96a",
                      marginBottom: ".3rem",
                    }}
                  >
                    {p.role}
                  </div>
                  <div
                    style={{
                      fontFamily: cg,
                      fontSize: "1.3rem",
                      fontWeight: 400,
                      color: "#f4efe5",
                      lineHeight: 1.15,
                      marginBottom: ".3rem",
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    className="flex items-center gap-[.3rem] mb-[.5rem]"
                    style={{ fontSize: ".78rem", color: "#7a9e6e" }}
                  >
                    🏡 {p.home}
                  </div>
                  <div
                    className="flex items-center gap-[.3rem]"
                    style={{
                      fontSize: ".78rem",
                      color: "rgba(244,239,229,.45)",
                    }}
                  >
                    📍 {p.district}
                  </div>
                  <div
                    style={{
                      fontSize: ".72rem",
                      letterSpacing: ".12em",
                      color: "rgba(200,169,106,.55)",
                      marginTop: ".5rem",
                      paddingTop: ".5rem",
                      borderTop: "1px solid rgba(200,169,106,.1)",
                    }}
                  >
                    {p.since}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ ALL MEMBERS ════════════════ */}
      <section className="px-16 py-24 bg-[#1f2e1f]" id="members">
        <div className="max-w-[1300px] mx-auto">
          <div className="kha-reveal mb-6">
            <span className="kha-eyebrow">Our Members</span>
            <h2
              className="kha-reveal kha-d1"
              style={{
                fontFamily: cg,
                fontSize: "clamp(2.2rem,3.5vw,3.2rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: "#f4efe5",
              }}
            >
              All 148 Association{" "}
              <em style={{ fontStyle: "italic", color: "#e0c88a" }}>Members</em>
            </h2>
            <div className="kha-reveal kha-d2">
              <Divider />
            </div>
            <p
              className="kha-reveal kha-d2"
              style={{
                fontSize: ".95rem",
                lineHeight: 1.88,
                fontWeight: 300,
                color: "rgba(244,239,229,.58)",
                maxWidth: "600px",
              }}
            >
              Every person listed here has been personally verified by KHA and
              operates an authentic homestay open to guests. Browse by district
              or stay type below.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="kha-reveal kha-d1 flex gap-2 flex-wrap mb-10">
            {MF_BTNS.map((btn) => (
              <button
                key={btn.key}
                className={`kha-mf-btn px-5 py-[.48rem]${activeMF === btn.key ? " active" : ""}`}
                style={{
                  border: "1px solid rgba(200,169,106,.2)",
                  color: "rgba(244,239,229,.55)",
                  fontFamily: jost,
                  fontSize: ".72rem",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  background: "transparent",
                }}
                onClick={() => setActiveMF(btn.key)}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Count */}
          <div
            style={{
              fontSize: ".85rem",
              color: "rgba(244,239,229,.42)",
              marginBottom: "2rem",
              letterSpacing: ".06em",
            }}
          >
            <span
              style={{
                color: "#c8a96a",
                fontFamily: cg,
                fontSize: "1.2rem",
                marginRight: ".3rem",
              }}
            >
              {filteredMembers.length}
            </span>{" "}
            members listed
          </div>

          {/* Grid */}
          <div
            className="kha-mem-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "1.2rem",
            }}
          >
            {filteredMembers.map((m) => (
              <div
                key={m.id}
                className="kha-mem-card kha-reveal bg-[#182318] px-6 py-[1.4rem]"
                style={{ border: "1px solid rgba(200,169,106,.08)" }}
              >
                <img
                  src={m.avatar}
                  alt={m.name}
                  loading="lazy"
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid rgba(200,169,106,.22)",
                    marginBottom: ".9rem",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    fontSize: ".62rem",
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: "#c8a96a",
                    marginBottom: ".2rem",
                  }}
                >
                  {m.role}
                </div>
                <div
                  style={{
                    fontFamily: cg,
                    fontSize: "1.2rem",
                    fontWeight: 400,
                    color: "#f4efe5",
                    marginBottom: ".2rem",
                    lineHeight: 1.2,
                  }}
                >
                  {m.name}
                </div>
                <div
                  className="kha-mem-stay flex items-center gap-[.3rem] mb-[.3rem]"
                  style={{ fontSize: ".78rem", color: "#7a9e6e" }}
                >
                  {m.stay}
                </div>
                <div
                  className="kha-mem-loc flex items-center gap-[.3rem] mb-[.6rem]"
                  style={{ fontSize: ".75rem", color: "rgba(244,239,229,.42)" }}
                >
                  {m.taluk}, {m.district}
                </div>
                {m.badges.length > 0 && (
                  <div className="flex gap-1 flex-wrap mb-[.6rem]">
                    {m.badges.map((b) => (
                      <span
                        key={b}
                        className="px-[.55rem] py-[.2rem]"
                        style={{
                          fontSize: ".6rem",
                          letterSpacing: ".12em",
                          textTransform: "uppercase",
                          background: "rgba(200,169,106,.1)",
                          border: "1px solid rgba(200,169,106,.22)",
                          color: "#c8a96a",
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}
                <div
                  style={{
                    fontSize: ".68rem",
                    letterSpacing: ".12em",
                    color: "rgba(200,169,106,.5)",
                    paddingTop: ".6rem",
                    borderTop: "1px solid rgba(200,169,106,.1)",
                  }}
                >
                  Member since {m.since}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ PARTNERS ════════════════ */}
      <div
        className="kha-reveal px-16 py-20 bg-[#182318]"
        style={{ borderTop: "1px solid rgba(200,169,106,.08)" }}
      >
        <div className="max-w-[1100px] mx-auto text-center">
          <span className="kha-eyebrow">Affiliated With</span>
          <h3
            style={{
              fontFamily: cg,
              fontSize: "1.8rem",
              fontWeight: 300,
              color: "#f4efe5",
              marginTop: ".5rem",
            }}
          >
            Recognised by Those Who Matter
          </h3>
          <div className="flex justify-center items-center gap-12 flex-wrap mt-10">
            {[
              "Karnataka Tourism Department",
              "Ministry of Tourism, GoI",
              "Incredible India",
              "Western Ghats Eco Alliance",
              "Responsible Tourism India",
            ].map((p) => (
              <div
                key={p}
                className="kha-partner-logo px-9 py-5"
                style={{
                  border: "1px solid rgba(200,169,106,.15)",
                  background: "rgba(31,46,31,.5)",
                  fontFamily: cg,
                  fontSize: "1.1rem",
                  fontWeight: 300,
                  color: "rgba(244,239,229,.45)",
                  letterSpacing: ".1em",
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════ JOIN CTA ════════════════ */}
      <section
        className="px-16 py-[5.5rem]"
        style={{
          background: "#2e4a2e",
          borderTop: "1px solid rgba(200,169,106,.15)",
          borderBottom: "1px solid rgba(200,169,106,.15)",
        }}
      >
        <div className="max-w-[860px] mx-auto text-center">
          <span
            className="kha-reveal flex items-center justify-center gap-[.6rem] mb-5"
            style={{
              fontSize: ".72rem",
              letterSpacing: ".32em",
              textTransform: "uppercase",
              color: "#c8a96a",
            }}
          >
            <span
              style={{
                width: "22px",
                height: "1px",
                background: "#c8a96a",
                display: "inline-block",
              }}
            ></span>
            For Homestay Owners
          </span>
          <h2
            className="kha-reveal kha-d1"
            style={{
              fontFamily: cg,
              fontSize: "clamp(2rem,4vw,3.2rem)",
              fontWeight: 300,
              color: "#f4efe5",
              marginBottom: "1rem",
            }}
          >
            Become a{" "}
            <em style={{ fontStyle: "italic", color: "#e0c88a" }}>
              MHA Member
            </em>
          </h2>
          <p
            className="kha-reveal kha-d2"
            style={{
              fontSize: ".97rem",
              lineHeight: 1.88,
              color: "rgba(244,239,229,.62)",
              marginBottom: "2.2rem",
              fontWeight: 300,
            }}
          >
           No website needed. If you run an authentic homestay anywhere in Mysuru district — from Kabini to Hunsur to Nanjangud — register with KHA and get listed on the district's most trusted homestay platform.
          </p>
          <a
            href="https://wa.me/919480000000?text=Hello%2C%20I%20want%20to%20list%20my%20homestay%20with%20KHA"
            target="_blank"
            rel="noopener noreferrer"
            className="kha-btn-join kha-reveal kha-d3 inline-block transition-all duration-300 font-semibold"
            style={{
              padding: ".9rem 3rem",
              background: "#c8a96a",
              color: "#182318",
              fontFamily: jost,
              fontSize: ".78rem",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              textDecoration: "none",
              cursor: "none",
            }}
          >
            Register Your Homestay via WhatsApp
          </a>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      
      <Footer cg={cg} />
    </>
  );
};

export default About;