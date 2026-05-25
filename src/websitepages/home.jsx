import React, { useState, useEffect, useRef } from "react";
import {
  UtensilsCrossed,
  Waves,
  Mountain,
  Flame,
  Coffee,
  Bird,
  Moon,
  Leaf,
  Building2,
  Heart,
  MapPin,
  Star,
  Globe,
  Smartphone,
  MessageCircle,
  CheckCircle2,
  Award,
} from "lucide-react";
import FloatBookButton from "../components/FloatBookButton";
import Footer from "../components/Footer";
import Navbar from "./navbar";

/* ─── All non-Tailwindable CSS ──────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  html, body { overflow-x:hidden; max-width:100%; }
  body { font-family:'Jost',sans-serif; background:#182318; color:#f4efe5; cursor:none; }
  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-track { background:#182318; }
  ::-webkit-scrollbar-thumb { background:#c8a96a; }

  .kha-cur  { width:9px; height:9px; background:#c8a96a; border-radius:50%; position:fixed; top:0; left:0; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); }
  .kha-cuf  { width:34px; height:34px; border:1px solid rgba(200,169,106,.4); border-radius:50%; position:fixed; top:0; left:0; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); }

  .kha-reveal { opacity:0; transform:translateY(36px); transition:opacity .85s ease,transform .85s ease; }
  .kha-reveal.in { opacity:1; transform:translateY(0); }
  .kha-d1{transition-delay:.12s;} .kha-d2{transition-delay:.24s;} .kha-d3{transition-delay:.36s;} .kha-d4{transition-delay:.48s;}

  .kha-eyebrow { display:inline-flex; align-items:center; gap:.6rem; font-size:.72rem; letter-spacing:.32em; text-transform:uppercase; color:#c8a96a; margin-bottom:1rem; }
  .kha-eyebrow::before { content:''; width:22px; height:1px; background:#c8a96a; }
  .kha-hero-eyebrow { display:flex; align-items:center; gap:.6rem; font-size:.72rem; letter-spacing:.32em; text-transform:uppercase; color:#c8a96a; margin-bottom:.8rem; }
  .kha-hero-eyebrow::before { content:''; width:28px; height:1px; background:#c8a96a; flex-shrink:0; }
  .kha-cred-eyebrow { display:inline-flex; align-items:center; gap:.6rem; font-size:.72rem; letter-spacing:.32em; text-transform:uppercase; color:#c8a96a; margin-bottom:1rem; }
  .kha-cred-eyebrow::before { content:''; width:22px; height:1px; background:#c8a96a; }

  .kha-slide-bg { transform:scale(1.07); transition:transform 8s ease; width:100%; height:100%; background-size:cover; background-position:center; }
  .kha-slide.active .kha-slide-bg { transform:scale(1); }
  .kha-slide::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(24,35,24,.72) 0%,rgba(24,35,24,.28) 55%,rgba(24,35,24,.55) 100%); }

  @keyframes khaCardIn { to { opacity:1; transform:translateY(0); } }
  .kha-hero-card { animation:khaCardIn 1.1s .7s forwards; opacity:0; transform:translateY(32px); }

  .kha-hero-cta { display:inline-flex; align-items:center; gap:.75rem; text-decoration:none; color:#c8a96a; font-size:.78rem; letter-spacing:.2em; text-transform:uppercase; margin-top:.7rem; }
  .kha-hero-cta::after { content:''; width:36px; height:1px; background:#c8a96a; transition:width .4s; }
  .kha-hero-cta:hover::after { width:64px; }

  @keyframes khaScrollPulse { 0%,100%{opacity:.3;} 50%{opacity:1;} }
  .kha-scroll-line { width:1px; height:50px; background:linear-gradient(to bottom,#c8a96a,transparent); animation:khaScrollPulse 2s infinite; }

  @keyframes khaScrollX { 0%{transform:translateX(0);} 100%{transform:translateX(-50%);} }
  .kha-marquee { display:flex; gap:.9rem; animation:khaScrollX 28s linear infinite; width:max-content; }
  .kha-marquee:hover { animation-play-state:paused; }
  .kha-m-img img { filter:saturate(.6) brightness(.8); transition:filter .5s,transform .5s; }
  .kha-m-img:hover img { filter:saturate(1) brightness(1); transform:scale(1.04); }

  .kha-arch-1 { border-radius:90px 90px 6px 6px; }
  .kha-arch-2 { border-radius:6px 6px 90px 90px; margin-top:2.5rem; }
  .kha-arch-wrap img { transition:transform .8s ease; }
  .kha-arch-wrap:hover img { transform:scale(1.07); }

  @keyframes heroBtnPulse { 0%,100%{box-shadow:0 4px 24px rgba(200,169,106,.35);} 50%{box-shadow:0 8px 36px rgba(200,169,106,.65);} }
  .kha-hero-book-btn { animation:heroBtnPulse 2.8s ease-in-out infinite; }
  .kha-hero-book-btn:hover { background:#e0c88a !important; transform:translateY(-2px); animation-play-state:paused; }

  @keyframes ctaBtnGlow { 0%,100%{box-shadow:0 4px 20px rgba(200,169,106,.3);} 50%{box-shadow:0 8px 40px rgba(200,169,106,.65);} }
  @keyframes shimmer { 0%{left:-100%;} 100%{left:160%;} }
  .kha-cta-anim-btn { animation:ctaBtnGlow 3s ease-in-out infinite; position:relative; overflow:hidden; cursor:none; }
  .kha-cta-anim-btn::before { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent); animation:shimmer 3s ease-in-out infinite 1s; }
  .kha-cta-anim-btn:hover { background:#e0c88a !important; transform:translateY(-2px); animation-play-state:paused; }
  .kha-cta-anim-btn:hover::before { animation-play-state:paused; }
  .kha-cta-anim-btn span { position:relative; z-index:1; }

  @keyframes floatPulse { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
  @keyframes bounceIcon { 0%,100%{transform:translateX(0);} 50%{transform:translateX(4px);} }
  @keyframes ringPulse { 0%{opacity:.7;transform:scale(1);} 70%{opacity:0;transform:scale(1.18);} 100%{opacity:0;transform:scale(1.18);} }
  .kha-float-book { animation:floatPulse 3s ease-in-out infinite; transition:background .3s,transform .2s,box-shadow .3s; }
  .kha-float-book:hover { background:#e0c88a !important; transform:translateY(-3px) scale(1.03) !important; box-shadow:0 16px 48px rgba(200,169,106,.6),0 4px 12px rgba(0,0,0,.4) !important; animation-play-state:paused; }
  .kha-float-icon { animation:bounceIcon 2s ease-in-out infinite; }
  .kha-float-ring  { position:absolute; inset:-6px; border:1.5px solid rgba(200,169,106,.55); pointer-events:none; animation:ringPulse 3s ease-in-out infinite; }
  .kha-float-ring2 { position:absolute; inset:-13px; border:1px solid rgba(200,169,106,.25); pointer-events:none; animation:ringPulse 3s ease-in-out infinite .6s; }

  @keyframes howBtnPulse { 0%,100%{box-shadow:0 0 0 rgba(200,169,106,0);} 50%{box-shadow:0 0 28px rgba(200,169,106,.35);} }
  .kha-how-cta-btn { position:relative; overflow:hidden; animation:howBtnPulse 3.5s ease-in-out infinite; cursor:none; }
  .kha-how-cta-btn::before { content:''; position:absolute; inset:0; background:#c8a96a; transform:translateX(-101%); transition:transform .38s cubic-bezier(.22,1,.36,1); }
  .kha-how-cta-btn:hover { color:#182318 !important; }
  .kha-how-cta-btn:hover::before { transform:translateX(0); }
  .kha-how-cta-btn span { position:relative; z-index:1; }

  .kha-steps { display:grid; grid-template-columns:repeat(4,1fr); gap:2rem; margin-top:3.5rem; position:relative; }
  .kha-steps::before { content:''; position:absolute; top:2.8rem; left:3rem; right:3rem; height:1px; background:linear-gradient(to right,transparent,rgba(200,169,106,.25),transparent); }

  .kha-card-img-wrap { border-radius:52px 52px 0 0; }
  .kha-card { transition:transform .4s,border-color .4s,box-shadow .4s; cursor:none; }
  .kha-card:hover { transform:translateY(-7px); border-color:rgba(200,169,106,.32) !important; box-shadow:0 20px 60px rgba(0,0,0,.35); }
  .kha-card:hover .kha-price-overlay { opacity:1; }
  .kha-card:hover .kha-card-img { transform:scale(1.09); }
  .kha-card-img { transition:transform .7s; }
  .kha-btn-wa:hover { background:rgba(37,211,102,.32) !important; }
  .kha-btn-web:hover { background:rgba(200,169,106,.28) !important; }

  .kha-rtab { padding:.5rem 1.3rem; border:1px solid rgba(200,169,106,.22); color:rgba(244,239,229,.62); font-size:.75rem; letter-spacing:.15em; text-transform:uppercase; background:transparent; cursor:none; transition:all .3s; }
  .kha-rtab:hover, .kha-rtab.active { border-color:#c8a96a; color:#c8a96a; background:rgba(200,169,106,.07); }

  .kha-filter-select, .kha-filter-input { background:transparent; border:none; border-bottom:1px solid rgba(200,169,106,.28); color:#f4efe5; font-family:'Jost',sans-serif; font-size:.9rem; padding:.35rem 0; outline:none; transition:border-color .3s; cursor:none; width:100%; }
  .kha-filter-select:focus, .kha-filter-input:focus { border-color:#c8a96a; }
  .kha-filter-select option, .kha-sort-select option { background:#1f2e1f; color:#f4efe5; }
  .kha-sort-select { background:transparent; border:none; border-bottom:1px solid rgba(200,169,106,.2); color:rgba(244,239,229,.65); font-family:'Jost',sans-serif; font-size:.8rem; padding:.25rem .5rem; outline:none; cursor:none; }
  .kha-filter-btn:hover { background:#e0c88a !important; transform:translateY(-1px); }
  .kha-filter-clear:hover { color:#c8a96a !important; border-color:#c8a96a !important; }

  .kha-cred-block { padding:.75rem 1.2rem; background:rgba(24,35,24,.55); border:1px solid rgba(200,169,106,.2); backdrop-filter:blur(8px); margin-bottom:1.1rem; }
  .kha-cred-title { font-size:13px; font-weight:600; color:#e0c88a; text-align:center; margin-bottom:12px; line-height:1.4; }
  .kha-cred-logos { display:flex; align-items:center; justify-content:center; gap:16px; flex-wrap:wrap; }
  .kha-cred-logos img { height:55px; width:auto; object-fit:contain; flex-shrink:0; }
  @media(max-width:768px){ .kha-cred-logos img { height:44px; } .kha-cred-title { font-size:12px; } }
  @media(max-width:480px){ .kha-cred-logos img { height:36px; gap:10px; } .kha-cred-block { padding:.6rem .8rem; } .kha-cred-title { font-size:11px; } }

  .kha-auth-banner { position:relative; overflow:hidden; }
  .kha-auth-banner::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,#c8a96a,transparent); }
  .kha-lic-card { position:relative; transition:border-color .3s,transform .3s; cursor:default; }
  .kha-lic-card:hover { border-color:rgba(200,169,106,.4) !important; transform:translateY(-4px); }
  .kha-lic-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,rgba(200,169,106,.5),transparent); opacity:0; transition:opacity .3s; }
  .kha-lic-card:hover::after { opacity:1; }
  .kha-dept-item { transition:background .3s,border-color .3s; cursor:default; }
  .kha-dept-item:hover { background:rgba(200,169,106,.1) !important; border-color:rgba(200,169,106,.35) !important; }
  .kha-police-strip { position:relative; }
  .kha-police-strip::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,rgba(200,169,106,.4),transparent); }

  #khaDetailPage { position:fixed; inset:0; z-index:2000; background:#182318; overflow-y:auto; transform:translateX(100%); transition:transform .65s cubic-bezier(.22,1,.36,1); }
  #khaDetailPage.open { transform:translateX(0); }
  #khaDetailPage.open .kha-dp-hero-img { transform:scale(1); }
  .kha-dp-hero-img { transform:scale(1.04); transition:transform 8s ease; }
  .kha-dp-back:hover { color:#c8a96a !important; border-color:#c8a96a !important; }
  .kha-dp-btn-wa:hover { background:rgba(37,211,102,.3) !important; }
  .kha-dp-btn-site:hover { background:rgba(200,169,106,.26) !important; }
  .kha-dp-amen-item:hover { border-color:rgba(200,169,106,.3) !important; }
  .kha-gal-img:hover img { transform:scale(1.07); }
  .kha-gal-img img { transition:transform .6s; }

  .kha-footer-link:hover { color:#c8a96a !important; }
  .kha-btn-join:hover { background:#e0c88a !important; transform:translateY(-2px); }

  @media(max-width:1200px){
    .kha-hero-card { bottom:6% !important; left:4% !important; maxWidth:450px !important; px-[2rem] !important; py-[1.8rem] !important; }
    .kha-hero h1 { fontSize:clamp(2rem,4vw,2.9rem) !important; }
  }

  @media(max-width:900px){
    body { cursor:auto !important; }
    .kha-cur, .kha-cuf { display:none !important; }
    .kha-about-grid { grid-template-columns:1fr !important; }
    .kha-cards-grid { grid-template-columns:1fr !important; }
    .kha-steps { grid-template-columns:1fr 1fr !important; }
    .kha-footer-grid { grid-template-columns:1fr 1fr !important; }
    .kha-filter-bar { flex-direction:column !important; padding:1rem !important; gap:.75rem !important; width:100% !important; box-sizing:border-box !important; }
    .kha-filter-item { min-width:100% !important; flex:1 1 100% !important; }
    .kha-filter-sep { display:none !important; }
    .kha-filter-btn { width:100% !important; }
    .kha-filter-clear { width:100% !important; }
    .kha-stats-inner { grid-template-columns:1fr 1fr !important; }
    .kha-dp-body { padding:2rem 1.5rem 5rem !important; }
    .kha-dp-grid { grid-template-columns:1fr !important; }
    .kha-dp-gallery { height:240px !important; }
    .kha-dp-amen-grid { grid-template-columns:1fr 1fr !important; }
    .kha-trust-bar { padding:.55rem 1.5rem !important; gap:1rem !important; }
    .kha-trust-sep { display:none !important; }
    .kha-ts-inner { gap:1rem !important; flex-direction:column !important; }
    .kha-auth-banner { grid-template-columns:1fr !important; text-align:center !important; }
    .kha-licence-grid { grid-template-columns:1fr !important; }
    .kha-dept-row { grid-template-columns:1fr 1fr !important; }
    .kha-police-strip { flex-direction:column !important; }
    .kha-police-sep { display:none !important; }
    .kha-safety-grid { grid-template-columns:1fr 1fr !important; }
    .kha-float-book { bottom:1.2rem !important; right:1.2rem !important; padding:.7rem 1.3rem !important; font-size:.7rem !important; }
    #khaFloatBook { display:none !important; }
    .kha-hero { margin-top:0 !important; padding-top:90px; box-sizing:border-box; height:auto !important; min-height:100vh; display:flex; flex-direction:column; justify-content:flex-end; }
    .kha-hero-card { position:relative !important; bottom:auto !important; left:auto !important; right:auto !important; max-width:none !important; margin:auto 1rem 2.5rem !important; padding:1.4rem !important; }
    .kha-hero-book-btn { display:none !important; }
    .kha-hero-cta { display:none !important; }
  }

  @media(max-width:768px){
    body { cursor:auto !important; }
    .kha-cur, .kha-cuf { display:none !important; }
    .px-16 { padding-left:1.5rem !important; padding-right:1.5rem !important; }
    .kha-browse-section { padding-left:1rem !important; padding-right:1rem !important; }
    .kha-filter-bar { padding:.9rem .8rem !important; }
    .kha-hero-card { margin:.8rem .8rem 2rem !important; padding:1.2rem !important; }
    .kha-hero-card h1 { fontSize:clamp(1.6rem,3.5vw,2.2rem) !important; lineHeight:1.2 !important; marginBottom:.5rem !important; }
    .kha-hero-eyebrow { fontSize:.65rem !important; }
    .kha-hero-cta { fontSize:.68rem !important; }
    .kha-hero-book-btn { fontSize:.68rem !important; padding:.6rem .8rem !important; }
    .kha-dp-body { padding:1.5rem 1rem 4rem !important; }
    .kha-dp-grid { grid-template-columns:1fr !important; }
    .kha-dp-hero-img { maxHeight:50vh !important; }
    .kha-cards-grid { grid-template-columns:1fr !important; }
    .kha-safety-grid { grid-template-columns:1fr !important; }
    .kha-arch-wrap { aspectRatio:auto !important; }
    .kha-about-grid { gridGap:10rem !important; }
    .kha-ts-inner { gap:.8rem !important; }
  }

  @media(max-width:480px){
    body { cursor:auto !important; }
    .kha-cur, .kha-cuf { display:none !important; }
    .px-16 { padding-left:1rem !important; padding-right:1rem !important; }
    .px-8 { padding-left:.5rem !important; padding-right:.5rem !important; }
    .kha-hero-card { margin:.5rem .6rem 1.5rem !important; padding:.9rem !important; }
    .kha-hero-card h1 { fontSize:clamp(1.2rem,2.5vw,1.8rem) !important; marginBottom:.3rem !important; }
    .kha-hero-eyebrow { fontSize:.6rem !important; marginBottom:.5rem !important; }
    .kha-hero p { fontSize:.85rem !important; }
    .kha-hero-book-btn { fontSize:.65rem !important; padding:.5rem .6rem !important; }
    .kha-cards-grid { grid-template-columns:1fr !important; gap:1rem !important; }
    .kha-dp-amen-grid { grid-template-columns:1fr !important; }
    .kha-safety-grid { grid-template-columns:1fr !important; }
    .kha-filter-bar { padding:1rem !important; }
    .kha-dp-body { padding:1rem .5rem 3rem !important; }
    .kha-filter-select, .kha-filter-input { fontSize:.8rem !important; }
    h2 { fontSize:clamp(1.4rem,2vw,1.8rem) !important; }
    h3 { fontSize:clamp(1.1rem,1.8vw,1.4rem) !important; }
  }
`;

/* ─── Tourist Places ─────────────────────────────────────────────────────── */
const TOURIST_PLACES = [
  { key: "mysore_palace", label: "Mysore Palace", lat: 12.3051, lng: 76.6551 },
  { key: "krs", label: "KRS Dam / Brindavan Gdns", lat: 12.4227, lng: 76.5712 },
  { key: "chamundi", label: "Chamundi Hills", lat: 12.2724, lng: 76.6761 },
  { key: "zoo", label: "Mysore Zoo", lat: 12.2953, lng: 76.6551 },
  {
    key: "nagarahole",
    label: "Nagarahole National Park",
    lat: 12.0473,
    lng: 76.1144,
  },
  { key: "kabini", label: "Kabini Backwaters", lat: 11.9376, lng: 76.3534 },
  { key: "coorg", label: "Coorg / Madikeri", lat: 12.4244, lng: 75.7382 },
  { key: "ooty", label: "Ooty", lat: 11.4102, lng: 76.695 },
  { key: "chikmagalur", label: "Chikmagalur", lat: 13.3161, lng: 75.772 },
  { key: "hassan", label: "Hassan", lat: 13.0072, lng: 76.0962 },
  { key: "wayanad", label: "Wayanad", lat: 11.6854, lng: 76.132 },
  { key: "mangalore", label: "Mangalore", lat: 12.9141, lng: 74.856 },
  { key: "sakleshpur", label: "Sakleshpur", lat: 12.9452, lng: 75.7862 },
  {
    key: "belur_halebidu",
    label: "Belur / Halebidu",
    lat: 13.1683,
    lng: 75.868,
  },
];

/* ─── Haversine distance (km) ────────────────────────────────────────────── */
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return +(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const AICONS = {
  "Meals Included": <UtensilsCrossed size={20} />,
  "Swimming Pool": <Waves size={20} />,
  "Nature Trails": <Mountain size={20} />,
  Bonfire: <Flame size={20} />,
  "Mountain View": <Mountain size={20} />,
  "River Access": <Waves size={20} />,
  "Coffee Estate": <Coffee size={20} />,
  "Wildlife Zone": <Bird size={20} />,
  "Stargazing Deck": <Moon size={20} />,
  "Private Garden": <Leaf size={20} />,
  "Heritage Architecture": <Building2 size={20} />,
  "Yoga Space": <Heart size={20} />,
};

// const HS = [
//   {
//     id: 1,
//     lat: 12.42,
//     lng: 75.74,
//     name: "Hatti Eden Coorg",
//     taluk: "Madikeri",
//     district: "Kodagu",
//     region: "south",
//     price: 7500,
//     rating: 4.5,
//     reviews: 267,
//     amenities: [
//       "Swimming Pool",
//       "Meals Included",
//       "Bonfire",
//       "Nature Trails",
//       "Private Garden",
//     ],
//     hasWebsite: false,
//     phone: "9980940496",
//     img: "https://lh3.googleusercontent.com/d/1IZiu7PzpNhG2cBUUZOOH-6e3zXlACP_d=w1200",
//     imgs: [
//       "https://lh3.googleusercontent.com/d/1IZiu7PzpNhG2cBUUZOOH-6e3zXlACP_d=w1200",
//       "https://lh3.googleusercontent.com/d/1IZiu7PzpNhG2cBUUZOOH-6e3zXlACP_d=w800",
//       "https://lh3.googleusercontent.com/d/1IZiu7PzpNhG2cBUUZOOH-6e3zXlACP_d=w800",
//       "https://lh3.googleusercontent.com/d/1IZiu7PzpNhG2cBUUZOOH-6e3zXlACP_d=w800",
//       "https://lh3.googleusercontent.com/d/1IZiu7PzpNhG2cBUUZOOH-6e3zXlACP_d=w800",
//     ],
//     type: "Nature Resort",
//     desc: "Nestled amidst 5 acres of lush greenery in Coorg, Hatti Eden offers a perfect blend of nature and comfort — just 200km from Bangalore. Spread across sprawling gardens with an outdoor swimming pool, evening campfire, indoor games (table tennis & foosball), and an in-house restaurant, this is the ideal retreat for families and groups. Handpicked by Tata Coffee. Located on SH-90, Virajpet-Mysore road, near Nagarahole Tiger Reserve gate, Madikeri, Gonikoppa.",
//     host: {
//       name: "Suresh Kumar",
//       since: "Host · Hatti Eden Coorg",
//       avatar:
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
//       desc: "Suresh Kumar runs Hatti Eden Coorg — a 5-acre nature retreat near the Nagarahole Tiger Reserve. The property is designed for families and groups seeking a peaceful escape from the city, with a strong focus on comfort, fresh food, and genuine Coorg hospitality. Contact: Suhas — 9980940496.",
//     },
//     guestReviews: [
//       {
//         name: "Arjun Mehta",
//         stars: 5,
//         date: "March 2026",
//         text: "The pool, the campfire, the food — everything was perfect. A proper nature escape just a few hours from Bangalore. Will be back with the whole family.",
//       },
//       {
//         name: "Priya Srinivas",
//         stars: 5,
//         date: "January 2026",
//         text: "So peaceful and well-maintained. The staff were warm and helpful throughout. The evening campfire under the open sky was truly magical.",
//       },
//       {
//         name: "Rahul & Shruti",
//         stars: 4,
//         date: "December 2025",
//         text: "Great property for a group trip. Rooms are spacious, the pool is clean, and the food is delicious. Loved that it's pet-friendly too!",
//       },
//     ],
//   },
//   {
//     id: 2,
//     lat: 12.1949851,
//     lng: 75.8040022,
//     name: "Riverside Amara",
//     taluk: "Virajpet",
//     district: "Kodagu",
//     region: "south",
//     price: 5500,
//     rating: 4.7,
//     reviews: 61,
//     amenities: [
//       "Meals Included",
//       "River Access",
//       "Nature Trails",
//       "Wildlife Zone",
//       "Bonfire",
//     ],
//     hasWebsite: false,
//     phone: "9480100002",
//     img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
//     imgs: [
//       "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
//       "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=500&q=80",
//       "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80",
//       "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&q=80",
//       "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=80",
//     ],
//     type: "Family Homestay",
//     desc: "A traditional Kodava family home beside the Cauvery tributary, Riverside Amara has been welcoming guests for over a decade. The host family has lived on this riverbank for four generations and will take you on private nature trails through the adjacent forest reserve. Evenings are spent around a bonfire with stories of the old Kodava way of life.",
//     host: {
//       name: "Bopanna Family",
//       since: "Host since 2012",
//       avatar:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
//       desc: "The Bopanna family has farmed this riverside land for generations. Grandfather Chinnappa still tends the paddy fields each morning. Their home-cooked meals — especially the bamboo shoot curry — are legendary among KHA guests.",
//     },
//     guestReviews: [
//       {
//         name: "Deepa Nair",
//         stars: 5,
//         date: "February 2026",
//         text: "The river at dawn is something else entirely. I sat on the bank with a cup of tea while kingfishers hunted below me. Pure therapy.",
//       },
//       {
//         name: "Vikram Sharma",
//         stars: 4,
//         date: "November 2025",
//         text: "Simple, clean and genuinely warm. The family treated us like relatives visiting from the city. Great value for the experience.",
//       },
//     ],
//   },
//   {
//     id: 3,
//     lat: 12.58,
//     lng: 75.87,
//     name: "Green Haven Estate",
//     taluk: "Somvarpet",
//     district: "Kodagu",
//     region: "south",
//     price: 9200,
//     rating: 4.8,
//     reviews: 112,
//     amenities: [
//       "Swimming Pool",
//       "Coffee Estate",
//       "Meals Included",
//       "Mountain View",
//       "Yoga Space",
//       "Private Garden",
//     ],
//     hasWebsite: true,
//     website: "https://example.com",
//     phone: "9480100003",
//     img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
//     imgs: [
//       "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
//       "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&q=80",
//       "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=500&q=80",
//       "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=500&q=80",
//       "https://images.unsplash.com/photo-1482192505345-5852310ed21d?w=500&q=80",
//     ],
//     type: "Eco Stay",
//     desc: "An award-winning eco homestay on a 40-acre coffee and pepper estate, Green Haven is KHA's most decorated property. The infinity pool overlooks three districts on clear mornings. All food is farm-to-table, electricity is solar, and the design blends seamlessly into the hillside. A yoga deck overlooking the valley makes mornings here genuinely restorative.",
//     host: {
//       name: "Suresh & Anita Muthappa",
//       since: "Host since 2010",
//       avatar:
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
//       desc: "Suresh is an agricultural engineer who returned to Kodagu after a corporate career to build something meaningful. Anita leads the yoga sessions every morning and oversees the kitchen garden. Together they've won Mysore's Best Eco Homestay award three times.",
//     },
//     guestReviews: [
//       {
//         name: "Nandita Rao",
//         stars: 5,
//         date: "April 2026",
//         text: "The infinity pool at sunrise with mountains beyond — I've never experienced anything more perfectly calm. This is my annual retreat now.",
//       },
//       {
//         name: "Akshay Kulkarni",
//         stars: 5,
//         date: "March 2026",
//         text: "Anita's morning yoga followed by fresh papaya from the garden. If there's a better way to start a day, I haven't found it.",
//       },
//       {
//         name: "Meena & Thomas",
//         stars: 4,
//         date: "January 2026",
//         text: "Exceptional property. The food quality is extraordinary — everything from the estate. Only reason for 4 stars is it books up very quickly!",
//       },
//     ],
//   },
//   {
//     id: 4,
//     lat: 13.32,
//     lng: 75.78,
//     name: "Cloudwalker Bungalow",
//     taluk: "Chikmagalur",
//     district: "Chikmagalur",
//     region: "malnad",
//     price: 8000,
//     rating: 4.9,
//     reviews: 97,
//     amenities: [
//       "Mountain View",
//       "Meals Included",
//       "Nature Trails",
//       "Bonfire",
//       "Heritage Architecture",
//     ],
//     hasWebsite: true,
//     website: "https://example.com",
//     phone: "9480100004",
//     img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
//     imgs: [
//       "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
//       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
//       "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=500&q=80",
//       "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&q=80",
//       "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80",
//     ],
//     type: "Heritage Bungalow",
//     desc: "A colonial-era British bungalow lovingly restored on the slopes of Baba Budan Giri. Original fireplaces, pressed tin ceilings and hand-carved doorframes have been preserved with meticulous care. The vegetable gardens supply the kitchen directly. On clear evenings the mist rolls in at precisely 5pm — guests gather on the verandah to watch it arrive.",
//     host: {
//       name: "Rajendra & Meghna Hegde",
//       since: "Host since 2016",
//       avatar:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
//       desc: "Rajendra is an architect who spent five years restoring this 1920s bungalow. His wife Meghna runs the kitchen and is renowned for her Malnad-style breakfast. They live on the property and are hands-on hosts who genuinely love showing guests the hills.",
//     },
//     guestReviews: [
//       {
//         name: "Shalini Bhat",
//         stars: 5,
//         date: "April 2026",
//         text: "Waking to the mist at this altitude is unlike anything. The bungalow is immaculate and the hosts are extraordinary people. Already rebooked.",
//       },
//       {
//         name: "Dr. Krishnamurthy",
//         stars: 5,
//         date: "February 2026",
//         text: "The heritage restoration is absolutely faithful — you feel transported to another era entirely. The fireplace evenings are unforgettable.",
//       },
//     ],
//   },
//   {
//     id: 5,
//     lat: 13.13,
//     lng: 75.58,
//     name: "Mullayanagiri Nest",
//     taluk: "Mudigere",
//     district: "Chikmagalur",
//     region: "malnad",
//     price: 4200,
//     rating: 4.6,
//     reviews: 43,
//     amenities: ["Nature Trails", "Meals Included", "Mountain View"],
//     hasWebsite: false,
//     phone: "9480100005",
//     img: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
//     imgs: [
//       "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
//       "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=500&q=80",
//       "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&q=80",
//       "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&q=80",
//       "https://images.unsplash.com/photo-1482192505345-5852310ed21d?w=500&q=80",
//     ],
//     type: "Family Homestay",
//     desc: "Simple and soul-nourishing. Run by a retired schoolteacher and his family who will guide you to Mysore's highest peak at sunrise, then serve you hot akki roti and coconut chutney on your return. This is honest, unpretentious hospitality that makes the mountains feel like home.",
//     host: {
//       name: "Shivakumar Family",
//       since: "Host since 2018",
//       avatar:
//         "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&q=80",
//       desc: "Retired teacher Shivakumar has been walking these hills for 40 years. He knows every trail, every bird call and every wildflower by name. His daughter Sowmya manages bookings via WhatsApp and his wife's cooking is the talk of all who visit.",
//     },
//     guestReviews: [
//       {
//         name: "Arun Patel",
//         stars: 5,
//         date: "March 2026",
//         text: "The sunrise trek with Shivakumar sir was worth the entire trip. He told us about every plant we passed. Extraordinary knowledge, extraordinary host.",
//       },
//       {
//         name: "Kavitha R",
//         stars: 4,
//         date: "December 2025",
//         text: "Affordable, genuine, beautiful location. The food is simple but delicious. Don't expect luxury — expect something better.",
//       },
//     ],
//   },
//   {
//     id: 6,
//     lat: 13.53,
//     lng: 75.36,
//     name: "Kadumaney Forest Stay",
//     taluk: "Koppa",
//     district: "Chikmagalur",
//     region: "malnad",
//     price: 6300,
//     rating: 4.7,
//     reviews: 58,
//     amenities: ["River Access", "Nature Trails", "Wildlife Zone", "Bonfire"],
//     hasWebsite: false,
//     phone: "9480100006",
//     img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
//     imgs: [
//       "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
//       "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&q=80",
//       "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80",
//       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
//       "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=80",
//     ],
//     type: "Jungle Stay",
//     desc: "Deep in the Bhadra buffer zone, Kadumaney Forest Stay is as close to wilderness as a bed-and-breakfast can be. Leopard pugmarks have been spotted on the property trail. The Bhadra river flows 200 metres away. Giant squirrels and hornbills are daily visitors. This is for the traveller who wants to feel genuinely immersed in the Western Ghats.",
//     host: {
//       name: "Manju & Geetha Raju",
//       since: "Host since 2015",
//       avatar:
//         "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&q=80",
//       desc: "Manju is a trained wildlife naturalist who spent eight years with the forest department before starting the homestay. He leads night walks and dawn bird watches. Geetha's Malnad cooking is prepared over a wood fire and is the real reason guests return.",
//     },
//     guestReviews: [
//       {
//         name: "Rohan Desai",
//         stars: 5,
//         date: "January 2026",
//         text: "I heard a leopard call at 3am from my room. I lay there perfectly still, heart racing. By morning I was back for coffee. Best travel memory of my life.",
//       },
//       {
//         name: "Sandhya & Prasad",
//         stars: 5,
//         date: "November 2025",
//         text: "Manju's night walk was extraordinary. We saw civets, a flying squirrel, countless frogs. He explained the ecosystem so beautifully.",
//       },
//     ],
//   },
//   {
//     id: 7,
//     lat: 12.95,
//     lng: 75.79,
//     name: "Sakleshpur Spice Home",
//     taluk: "Sakleshpur",
//     district: "Hassan",
//     region: "south",
//     price: 3500,
//     rating: 4.5,
//     reviews: 36,
//     amenities: ["Meals Included", "Nature Trails", "Coffee Estate"],
//     hasWebsite: false,
//     phone: "9480100007",
//     img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
//     imgs: [
//       "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
//       "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=500&q=80",
//       "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&q=80",
//       "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&q=80",
//       "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&q=80",
//     ],
//     type: "Farm Stay",
//     desc: "A modest and magnificent pepper-and-cardamom farm run by a warm family who will teach you to cook authentic Malnad cuisine over a wood fire. The aroma of cardamom in the morning air is reason enough to visit. This is the most honest farm-to-table experience in Hassan district.",
//     host: {
//       name: "Nagesh Gowda Family",
//       since: "Host since 2019",
//       avatar:
//         "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&q=80",
//       desc: "Nagesh has farmed spices and coffee for 30 years. He'll take you through the estate explaining each spice plant, its harvest time and its culinary uses. His wife Pushpa's cooking class is a highlight every guest mentions in their reviews.",
//     },
//     guestReviews: [
//       {
//         name: "Vandana Krishnan",
//         stars: 5,
//         date: "February 2026",
//         text: "Learning to make Neer dosa from scratch with Pushpa while cardamom perfumed the air around us. I could not have imagined this morning.",
//       },
//       {
//         name: "Ramesh T",
//         stars: 4,
//         date: "October 2025",
//         text: "Very simple accommodation but the experience is rich. Great budget option for the Sakleshpur hills. Food was genuinely outstanding.",
//       },
//     ],
//   },
//   {
//     id: 8,
//     lat: 13.17,
//     lng: 75.87,
//     name: "Belur Heritage House",
//     taluk: "Belur",
//     district: "Hassan",
//     region: "south",
//     price: 5000,
//     rating: 4.6,
//     reviews: 52,
//     amenities: ["Meals Included", "Mountain View", "Heritage Architecture"],
//     hasWebsite: true,
//     website: "https://example.com",
//     phone: "9480100008",
//     img: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&q=80",
//     imgs: [
//       "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&q=80",
//       "https://images.unsplash.com/photo-1482192505345-5852310ed21d?w=500&q=80",
//       "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=500&q=80",
//       "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&q=80",
//       "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=500&q=80",
//     ],
//     type: "Heritage Stay",
//     desc: "A 120-year-old Haveli, steps from Belur's legendary Chennakeshava temple complex. Stay with the Iyer family and wake to temple bells drifting through ancient stone corridors. The home features original teak pillars, a lotus pond in the central courtyard and walls that have absorbed a century of incense.",
//     host: {
//       name: "Subramaniam Iyer Family",
//       since: "Host since 2013",
//       avatar:
//         "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
//       desc: "The Iyer family has occupied this haveli for five generations. Subramaniam is a retired history professor and leads private temple tours that no guidebook covers. His explanations of the Hoysala carvings are extraordinary.",
//     },
//     guestReviews: [
//       {
//         name: "Ananya Shah",
//         stars: 5,
//         date: "March 2026",
//         text: "Woke to temple bells at 5:30am. Walked to the temple in 3 minutes with Subramaniam sir as my guide. I cried at the beauty of the carvings. Perfect trip.",
//       },
//       {
//         name: "Mohan & Leela",
//         stars: 4,
//         date: "January 2026",
//         text: "The haveli itself is breathtaking. The food is authentic Brahmin cooking — some of the best I've had. Highly recommend.",
//       },
//     ],
//   },
//   {
//     id: 9,
//     lat: 12.87,
//     lng: 74.88,
//     name: "Coastal Breeze Home",
//     taluk: "Mangaluru",
//     district: "Dakshina Kannada",
//     region: "coastal",
//     price: 4500,
//     rating: 4.4,
//     reviews: 29,
//     amenities: ["Meals Included", "Swimming Pool", "River Access"],
//     hasWebsite: false,
//     phone: "9480100009",
//     img: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
//     imgs: [
//       "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
//       "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&q=80",
//       "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&q=80",
//       "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80",
//       "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=500&q=80",
//     ],
//     type: "Coastal Stay",
//     desc: "A traditional Tulu Nadu tiled house 200 metres from the Arabian Sea. Fish for breakfast caught that morning, coconut toddy at sunset on the open terrace, and the unending sound of waves through your window. This is coastal Mysore unplugged — no pretence, just the sea.",
//     host: {
//       name: "D'Souza Family",
//       since: "Host since 2017",
//       avatar:
//         "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80",
//       desc: "The D'Souza family has fished these waters for three generations. They'll take you out on their boat at dawn and cook whatever is caught for breakfast. Their fish curry recipe has never left the family kitchen.",
//     },
//     guestReviews: [
//       {
//         name: "Preethi Menon",
//         stars: 5,
//         date: "April 2026",
//         text: "Ate the freshest fish of my life for breakfast. Slept to the sound of waves. Woke to a pink horizon. This is what coastal Mysore means.",
//       },
//       {
//         name: "Rohit & Divya",
//         stars: 4,
//         date: "February 2026",
//         text: "Lovely family, beautiful location. Simple but perfectly comfortable. The food is the star — absolutely incredible coastal cooking.",
//       },
//     ],
//   },
//   {
//     id: 10,
//     lat: 13.23,
//     lng: 75.24,
//     name: "Kudremukh Wilderness",
//     taluk: "Kundapur",
//     district: "Udupi",
//     region: "coastal",
//     price: 6800,
//     rating: 4.8,
//     reviews: 78,
//     amenities: [
//       "Nature Trails",
//       "Wildlife Zone",
//       "Meals Included",
//       "River Access",
//       "Stargazing Deck",
//     ],
//     hasWebsite: true,
//     website: "https://example.com",
//     phone: "9480100010",
//     img: "https://images.unsplash.com/photo-1482192505345-5852310ed21d?w=800&q=80",
//     imgs: [
//       "https://images.unsplash.com/photo-1482192505345-5852310ed21d?w=800&q=80",
//       "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80",
//       "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=500&q=80",
//       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
//       "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=80",
//     ],
//     type: "Jungle Stay",
//     desc: "The last homestay before the Kudremukh National Park boundary. Your host Rajesh has been a forest guide for 22 years and will show you things no guidebook lists. The stargazing deck is one of the darkest sky locations in coastal Mysore. Lion-tailed macaques, Malabar giant squirrels and Nilgiri langurs visit the garden daily.",
//     host: {
//       name: "Rajesh Shetty",
//       since: "Host since 2011",
//       avatar:
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
//       desc: "Former Kudremukh National Park naturalist guide Rajesh Shetty turned his family home into a wildlife homestay after retirement. He has documented 312 bird species in the region and his night walks are sought after by wildlife photographers from across India.",
//     },
//     guestReviews: [
//       {
//         name: "Vinay Kapoor",
//         stars: 5,
//         date: "March 2026",
//         text: "Rajesh showed me a lion-tailed macaque family at close range at dusk. I've been wildlife watching for 20 years and this was special.",
//       },
//       {
//         name: "Shreya Nair",
//         stars: 5,
//         date: "January 2026",
//         text: "The stargazing deck on a moonless night. I saw the Milky Way for the first time properly. I wept. Rajesh explained every constellation. 11/10.",
//       },
//     ],
//   },
//   {
//     id: 11,
//     lat: 14.62,
//     lng: 74.84,
//     name: "Sirsi Areca Farm",
//     taluk: "Sirsi",
//     district: "Uttara Kannada",
//     region: "north",
//     price: 3500,
//     rating: 4.5,
//     reviews: 31,
//     amenities: ["Meals Included", "Nature Trails", "Bonfire"],
//     hasWebsite: false,
//     phone: "9480100011",
//     img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
//     imgs: [
//       "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
//       "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&q=80",
//       "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&q=80",
//       "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=500&q=80",
//       "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=500&q=80",
//     ],
//     type: "Farm Stay",
//     desc: "An areca nut and banana farm in the quiet interiors of Uttara Kannada. Simple rooms, extraordinary food and the kind of silence you cannot buy. The Havyaka Brahmin cuisine prepared by the host family is reason enough to make the journey — recipes unchanged for a hundred years.",
//     host: {
//       name: "Vasudeva Bhat Family",
//       since: "Host since 2020",
//       avatar:
//         "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80",
//       desc: "The Bhat family has farmed areca and paddy in Sirsi for generations. Their Havyaka cooking — particularly the jackfruit dishes — has already earned a loyal following among KHA guests.",
//     },
//     guestReviews: [
//       {
//         name: "Anand Rao",
//         stars: 5,
//         date: "April 2026",
//         text: "The Havyaka meal served on banana leaf. I had thirds. Then fourths. I'm not exaggerating when I say it's the best food I've eaten in Mysore.",
//       },
//       {
//         name: "Preeti & Sunil",
//         stars: 4,
//         date: "March 2026",
//         text: "Very new to hosting but incredibly sincere. Beautiful farm, peaceful location, and food that would make anyone reconsider city life.",
//       },
//     ],
//   },
//   {
//     id: 12,
//     lat: 11.94,
//     lng: 76.35,
//     name: "Kabini Elephant Watch",
//     taluk: "H.D. Kote",
//     district: "Mysuru",
//     region: "south",
//     price: 12000,
//     rating: 5.0,
//     reviews: 145,
//     amenities: [
//       "Wildlife Zone",
//       "River Access",
//       "Meals Included",
//       "Mountain View",
//       "Stargazing Deck",
//       "Nature Trails",
//     ],
//     hasWebsite: true,
//     website: "https://example.com",
//     phone: "9480100012",
//     img: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
//     imgs: [
//       "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
//       "https://images.unsplash.com/photo-1482192505345-5852310ed21d?w=500&q=80",
//       "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&q=80",
//       "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80",
//       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
//     ],
//     type: "Wildlife Stay",
//     desc: "KHA's most booked property — a premium wildlife homestay on the Kabini backwaters with an unbroken 5.0 rating from 145 guests. Herds of elephants cross 300 metres from the property every evening without fail. The property has three suites, a riverside dining deck and a naturalist-guided jeep safari included with every stay.",
//     host: {
//       name: "Nanjunda & Padma Gowda",
//       since: "Host since 2009",
//       avatar:
//         "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80",
//       desc: "Nanjunda worked with Mysore's elephant conservation programme for 15 years and built this homestay as a way to share his passion. Padma's South Mysore cooking and Nanjunda's wildlife knowledge together create an experience that has earned 145 consecutive 5-star reviews.",
//     },
//     guestReviews: [
//       {
//         name: "Dr. Prashant Anand",
//         stars: 5,
//         date: "April 2026",
//         text: "I've stayed at Kabini three times. The elephant crossing at sunset never loses its power. Nanjunda's knowledge of each individual herd member is extraordinary.",
//       },
//       {
//         name: "Aisha & Rohan",
//         stars: 5,
//         date: "March 2026",
//         text: "Our honeymoon. Elephants at sunset. Stars over the backwater. Padma's cooking. We could not have asked for more from this world.",
//       },
//       {
//         name: "The Krishnan Family",
//         stars: 5,
//         date: "February 2026",
//         text: "Our 10-year-old has wanted to see elephants since he was 2. The look on his face when the herd appeared. We will never forget it.",
//       },
//     ],
//   },
// ];

const HS = [
  // ── DOC 2 — Real entries with proper images ──────────────
  {
    id: 1,
    lat: 12.3093357,
    lng: 76.5778982,
    name: "Kukkeshree Homestay",
    taluk: "Mysuru",
    district: "Mysuru",
    region: "mysuru",
    price: 2500,
    rating: 4.5,
    reviews: 40,
    amenities: ["Meals Included", "Private Garden", "Nature Trails", "Bonfire"],
    hasWebsite: false,
    phone: "9480100001",
    mapLink: "https://maps.app.goo.gl/oDqoZrocnkduhm1K9",
    img: "https://homestayinmysore.com/assets/img/about1.jpeg",
    imgs: [
      "https://homestayinmysore.com/assets/img/about1.jpeg",
      "https://homestayinmysore.com/assets/img/gal5.jpeg",
      "https://homestayinmysore.com/assets/img/gal4.jpeg",
      "https://homestayinmysore.com/assets/img/gal0.jpeg",
      "https://homestayinmysore.com/assets/img/gal3.jpeg",
    ],
    type: "Family Homestay",
    desc: "A warm and welcoming family homestay in the heart of Mysuru. Experience authentic Karnataka hospitality with home-cooked meals and a beautifully maintained garden. Ideal for travellers looking for a peaceful, local experience close to Mysuru's heritage sites.",
    host: {
      name: "Kukkeshree Family",
      since: "Host since 2018",
      avatar: "https://homestayinmysore.com/assets/img/about1.jpeg",
      desc: "A gracious Mysuru family who take pride in offering guests an authentic local experience. They are happy to guide you to nearby temples, markets and sightseeing spots.",
    },
    guestReviews: [
      {
        name: "Ravi Kumar",
        stars: 5,
        date: "March 2026",
        text: "Felt like home from the first moment. The meals were incredible and the family so warm.",
      },
      {
        name: "Sneha Patil",
        stars: 4,
        date: "January 2026",
        text: "Great location in Mysuru, very clean and comfortable. Lovely hosts.",
      },
    ],
  },
  {
    id: 2,
    lat: 12.2918212,
    lng: 76.5870609,
    name: "Sky House Homestay",
    taluk: "Mysuru",
    district: "Mysuru",
    region: "mysuru",
    price: 3000,
    rating: 4.6,
    reviews: 55,
    amenities: ["Meals Included", "Mountain View", "Private Garden", "Bonfire"],
    hasWebsite: false,
    phone: "9480100002",
    mapLink: "https://maps.app.goo.gl/XyRnfBXRUPJkSsJv9",
    img: "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
    imgs: [
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
    ],
    type: "Family Homestay",
    desc: "Sky House Homestay offers a breezy elevated setting with lovely views across Mysuru. Spacious rooms, wholesome home-cooked food and evening bonfires make this a favourite among repeat visitors. A perfect base to explore Mysuru city and its surrounding countryside.",
    host: {
      name: "Sky House Family",
      since: "Host since 2019",
      avatar:
        "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
      desc: "A friendly family passionate about making every guest feel at home. They are knowledgeable about local Mysuru attractions and will happily share their favourite spots.",
    },
    guestReviews: [
      {
        name: "Ananya Reddy",
        stars: 5,
        date: "February 2026",
        text: "The view from the terrace in the morning was stunning. Hosts were incredibly helpful.",
      },
      {
        name: "Prashanth M",
        stars: 4,
        date: "December 2025",
        text: "Clean, cosy and great food. Will definitely come back.",
      },
    ],
  },
  {
    id: 3,
    lat: 12.2602005,
    lng: 76.0980538,
    name: "Hatti Eden Resort",
    taluk: "Madikeri",
    district: "Kodagu",
    region: "south",
    price: 6500,
    rating: 4.8,
    reviews: 92,
    amenities: [
      "Meals Included",
      "Swimming Pool",
      "Coffee Estate",
      "Nature Trails",
      "Mountain View",
      "Bonfire",
    ],
    hasWebsite: true,
    website: "https://www.hattieden.com",
    phone: "9148059513",
    mapLink: "https://maps.app.goo.gl/ZcQkhiXQFpQ5kHHfA",
    img: "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/_SNF9853_7f2a117c",
    imgs: [
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/_SNF9853_7f2a117c",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_3333/x_0,y_260,w_5000,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-swimming-pool-1",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/facade-1",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-facade-day-view",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-restaurant",
    ],
    type: "Resort Stay",
    desc: "Nestled deep in the coffee hills of Coorg, Hatti Eden is a lush resort-style stay surrounded by aromatic coffee and pepper estates. Wake up to misty mornings, sip fresh estate coffee and unwind by the pool with the Western Ghats as your backdrop.",
    host: {
      name: "Hatti Eden Host Family",
      since: "Host since 2015",
      avatar:
        "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/_SNF9904",
      desc: "Passionate Coorg hosts who have built Hatti Eden with love for their land and guests. They lead estate walks and share the story of coffee cultivation in the region.",
    },
    guestReviews: [
      {
        name: "Deepika Nair",
        stars: 5,
        date: "April 2026",
        text: "Woke up to coffee aroma and mist every morning. A dream stay in Coorg.",
      },
      {
        name: "Sanjay & Meena",
        stars: 5,
        date: "March 2026",
        text: "The pool overlooking the estate was unreal. Incredible food and very attentive hosts.",
      },
    ],
  },
  {
    id: 4,
    lat: 12.2836122,
    lng: 76.6263656,
    name: "Moodalamane Mysuru",
    taluk: "Mysuru",
    district: "Mysuru",
    region: "mysuru",
    price: 3500,
    rating: 4.7,
    reviews: 68,
    amenities: [
      "Meals Included",
      "Private Garden",
      "Nature Trails",
      "Heritage Architecture",
    ],
    hasWebsite: false,
    phone: "9480100004",
    mapLink: "https://maps.app.goo.gl/jvLBx9WaHFJsqKtAA",
    img: "https://a0.muscache.com/im/pictures/da06792f-6cc4-44fa-bfcf-cf3cf1293f85.jpg?im_w=720",
    imgs: [
      "https://a0.muscache.com/im/pictures/da06792f-6cc4-44fa-bfcf-cf3cf1293f85.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/d06feef1-3c98-4dc4-8b22-c89e81eb4ff4.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/206e4cf3-4fa6-476d-bac9-2f8ab301d9b4.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/dbd68cf4-8506-45b0-a8df-f94758e369cd.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/785c7036-73a9-4567-901a-03a1c2872ca6.jpg?im_w=720",
    ],
    type: "Heritage Stay",
    desc: "Moodalamane is a cherished heritage home on the outskirts of Mysuru, offering guests a rare glimpse into traditional Karnataka architecture and way of life. The heritage interiors, shaded courtyard and home-cooked meals make every stay deeply memorable.",
    host: {
      name: "Moodalamane Family",
      since: "Host since 2016",
      avatar:
        "https://a0.muscache.com/im/pictures/da06792f-6cc4-44fa-bfcf-cf3cf1293f85.jpg?im_w=240",
      desc: "An old Mysuru family proud of their heritage home. They love sharing stories of the house's history and guiding guests through local culture and cuisine.",
    },
    guestReviews: [
      {
        name: "Kavitha Rao",
        stars: 5,
        date: "March 2026",
        text: "The heritage home is absolutely stunning. Felt like stepping back in time.",
      },
      {
        name: "Arun & Sudha",
        stars: 4,
        date: "February 2026",
        text: "Beautiful property, lovely family and authentic Mysuru food. Highly recommended.",
      },
    ],
  },
  {
    id: 5,
    lat: 12.21946,
    lng: 76.5727542,
    name: "Aastha Homestay",
    taluk: "Mysuru",
    district: "Mysuru",
    region: "mysuru",
    price: 2000,
    rating: 4.4,
    reviews: 32,
    amenities: ["Meals Included", "Private Garden"],
    hasWebsite: false,
    phone: "9480100005",
    mapLink: "https://maps.app.goo.gl/2pfRbzUhiVKUEoFS6",
    img: "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/191c7eb5-5aa4-49bf-9004-c7d019ba3a66.jpeg?im_w=720",
    imgs: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/191c7eb5-5aa4-49bf-9004-c7d019ba3a66.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/58800670-577e-40b0-afed-e91785e8beeb.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/f3e94ec6-c852-4b51-8231-101a1930b4a0.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/70b163dd-16cf-4092-92ed-456380c2afec.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/4d11161e-5ddc-47d4-bff3-32e07062d1b3.jpeg?im_w=720",
    ],
    type: "Family Homestay",
    desc: "Aastha Homestay is a simple, sincere and welcoming family home in the quiet southern reaches of Mysuru. The hosts take great pride in serving fresh, home-cooked Karnataka meals and ensuring every guest feels genuinely looked after.",
    host: {
      name: "Aastha Host Family",
      since: "Host since 2020",
      avatar:
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/191c7eb5-5aa4-49bf-9004-c7d019ba3a66.jpeg?im_w=240",
      desc: "A warm and caring family who believe in honest, no-frills hospitality. Their cooking is a highlight for every guest who visits.",
    },
    guestReviews: [
      {
        name: "Vinod Kumar",
        stars: 5,
        date: "January 2026",
        text: "Simple and perfect. The food was the best part — genuine home cooking.",
      },
      {
        name: "Rekha S",
        stars: 4,
        date: "November 2025",
        text: "Very affordable and clean. Hosts were kind and helpful throughout.",
      },
    ],
  },
  {
    id: 6,
    lat: 12.3040626,
    lng: 76.5841982,
    name: "Bolak Homestay",
    taluk: "Mysuru",
    district: "Mysuru",
    region: "mysuru",
    price: 2800,
    rating: 4.5,
    reviews: 47,
    amenities: ["Meals Included", "Private Garden", "Bonfire", "Nature Trails"],
    hasWebsite: false,
    phone: "9480100006",
    mapLink: "https://maps.app.goo.gl/PkFf4SftowRda2nV9",
    img: "https://homestayinmysore.com/assets/img/lavis.JPG",
    imgs: [
      "https://homestayinmysore.com/assets/img/lavis.JPG",
      "https://homestayinmysore.com/assets/img/gal3.jpeg",
      "https://homestayinmysore.com/assets/img/room1%20king.jpeg",
      "https://homestayinmysore.com/assets/img/family%20room.jpeg",
      "https://homestayinmysore.com/assets/img/room2%20king.jpeg",
    ],
    type: "Family Homestay",
    desc: "Bolak Homestay offers a relaxed, homely atmosphere in Mysuru with a lovely garden, evening bonfires and warm family meals. A great choice for those looking to slow down, connect with a local family and explore Mysuru at a comfortable pace.",
    host: {
      name: "Bolak Family",
      since: "Host since 2017",
      avatar: "https://homestayinmysore.com/assets/img/about1.jpeg",
      desc: "A hospitable Mysuru family who love meeting travellers from all over. They are happy to arrange sightseeing, suggest local eateries and make your stay as comfortable as possible.",
    },
    guestReviews: [
      {
        name: "Suresh Babu",
        stars: 5,
        date: "April 2026",
        text: "The bonfire evenings with the family were the highlight of our trip. Superb hosts.",
      },
      {
        name: "Priya & Kiran",
        stars: 4,
        date: "February 2026",
        text: "Very welcoming family. Food was excellent and rooms were clean and comfortable.",
      },
    ],
  },
  {
    id: 7,
    lat: 11.9927484,
    lng: 76.3408142,
    name: "Kabini Kaanana Homestay",
    taluk: "H.D. Kote",
    district: "Mysuru",
    region: "wildlife",
    price: 3500,
    rating: 4.8,
    reviews: 86,
    amenities: [
      "Meals Included",
      "Wildlife Zone",
      "River Access",
      "Nature Trails",
      "Bonfire",
    ],
    hasWebsite: true,
    website: "https://www.kabinikaanana.com",
    phone: "7026299299",
    mapLink: "https://maps.app.goo.gl/o7KG68pP4fNfo8PE6",
    img: "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=1920&q=75",
    imgs: [
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-sunrise.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-kaanana-bonfire-evening.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-kaanana-homestay-room.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-karnataka-home-cooked-food.webp&w=1920&q=75",
    ],
    type: "Wildlife Stay",
    desc: "Kabini Kaanana Homestay sits at the edge of the legendary Kabini backwaters, offering guests an unparalleled wildlife experience. Elephants, deer and exotic birds are regular visitors to the property. Evenings by the Kabini river with a bonfire are simply unforgettable.",
    host: {
      name: "Kaanana Host Family",
      since: "Host since 2013",
      avatar:
        "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=400&q=75",
      desc: "A family with deep roots in the Kabini region. They have an intimate knowledge of local wildlife and will take you on private nature walks along the river bank.",
    },
    guestReviews: [
      {
        name: "Dr. Nandish Kumar",
        stars: 5,
        date: "April 2026",
        text: "Spotted elephants from the property on our first evening. The hosts made it magical.",
      },
      {
        name: "Rohini & Ajay",
        stars: 5,
        date: "March 2026",
        text: "Best wildlife homestay experience we've ever had. Food, nature and hospitality — all perfect.",
      },
    ],
  },
  {
    id: 8,
    lat: 12.1287517,
    lng: 76.2592309,
    name: "Junglebliss Homestay",
    taluk: "Hunsur",
    district: "Mysuru",
    region: "rural",
    price: 4000,
    rating: 4.7,
    reviews: 61,
    amenities: [
      "Meals Included",
      "Nature Trails",
      "Wildlife Zone",
      "Bonfire",
      "River Access",
    ],
    hasWebsite: false,
    phone: "9480100008",
    mapLink: "https://maps.app.goo.gl/BQPnNW76vHCotHPF6",
    img: "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-sunrise.webp&w=1920&q=75",
    imgs: [
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-sunrise.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-kaanana-bonfire-evening.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-kaanana-homestay-room.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-karnataka-home-cooked-food.webp&w=1920&q=75",
    ],
    type: "Jungle Stay",
    desc: "True to its name, Junglebliss Homestay immerses you completely in the wilderness near Hunsur. Dense forest surrounds the property, with a stream running nearby. Night sounds, morning bird calls and forest walks guided by the host make this a truly wild escape.",
    host: {
      name: "Junglebliss Host Family",
      since: "Host since 2016",
      avatar:
        "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=400&q=75",
      desc: "Nature lovers who built this homestay to share their forest with like-minded travellers. They lead guided treks, bird-watching walks and evening campfire sessions.",
    },
    guestReviews: [
      {
        name: "Gopal Shetty",
        stars: 5,
        date: "February 2026",
        text: "Woke to the sound of birds and a stream. The jungle walk at dawn was extraordinary.",
      },
      {
        name: "Meghna & Vivek",
        stars: 5,
        date: "January 2026",
        text: "Perfect jungle getaway. The hosts are passionate and knowledgeable about the forest.",
      },
    ],
  },
  {
    id: 9,
    lat: 12.4383013,
    lng: 76.5117554,
    name: "By The Blues",
    taluk: "Mysuru",
    district: "Mysuru",
    region: "mysuru",
    price: 4500,
    rating: 4.6,
    reviews: 53,
    amenities: [
      "Meals Included",
      "Swimming Pool",
      "Private Garden",
      "Yoga Space",
    ],
    hasWebsite: true,
    website: "https://example.com",
    phone: "9480100009",
    mapLink: "https://maps.app.goo.gl/yJpkZ8XTex2APZLU6",
    img: "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-swimming-pool-1",
    imgs: [
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-swimming-pool-1",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/_SNF9853_7f2a117c",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/facade-1",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-facade-day-view",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-restaurant",
    ],
    type: "Boutique Stay",
    desc: "By The Blues is a serene boutique homestay in the northern reaches of Mysuru district, offering a pool, yoga space and beautifully landscaped gardens. A calm, curated retreat for travellers who want something a little more elevated while staying connected to nature.",
    host: {
      name: "By The Blues Host Family",
      since: "Host since 2021",
      avatar:
        "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-swimming-pool-1",
      desc: "Creative hosts who have designed every corner of this property with care. They offer yoga sessions at sunrise, guided garden walks and farm-fresh meals.",
    },
    guestReviews: [
      {
        name: "Ishaan Verma",
        stars: 5,
        date: "April 2026",
        text: "The pool and the yoga session in the morning — I needed this more than I knew. Perfect stay.",
      },
      {
        name: "Divya & Rohan",
        stars: 4,
        date: "March 2026",
        text: "Beautiful property, thoughtfully designed. The food and the garden are both exceptional.",
      },
    ],
  },

  // ── DOC 1 — Missing entries added below ──────────────────
  {
    id: 10,
    lat: 12.1949851,
    lng: 75.8040022,
    name: "Riverside Amara",
    taluk: "Virajpet",
    district: "Kodagu",
    region: "south",
    price: 5500,
    rating: 4.7,
    reviews: 61,
    amenities: [
      "Meals Included",
      "River Access",
      "Nature Trails",
      "Wildlife Zone",
      "Bonfire",
    ],
    hasWebsite: false,
    phone: "9480100002",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=500&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=80",
    ],
    type: "Family Homestay",
    desc: "A traditional Kodava family home beside the Cauvery tributary, Riverside Amara has been welcoming guests for over a decade. The host family has lived on this riverbank for four generations and will take you on private nature trails through the adjacent forest reserve. Evenings are spent around a bonfire with stories of the old Kodava way of life.",
    host: {
      name: "Bopanna Family",
      since: "Host since 2012",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      desc: "The Bopanna family has farmed this riverside land for generations. Grandfather Chinnappa still tends the paddy fields each morning. Their home-cooked meals — especially the bamboo shoot curry — are legendary among KHA guests.",
    },
    guestReviews: [
      {
        name: "Deepa Nair",
        stars: 5,
        date: "February 2026",
        text: "The river at dawn is something else entirely. I sat on the bank with a cup of tea while kingfishers hunted below me. Pure therapy.",
      },
      {
        name: "Vikram Sharma",
        stars: 4,
        date: "November 2025",
        text: "Simple, clean and genuinely warm. The family treated us like relatives visiting from the city. Great value for the experience.",
      },
    ],
  },
  {
    id: 11,
    lat: 12.58,
    lng: 75.87,
    name: "Green Haven Estate",
    taluk: "Somvarpet",
    district: "Kodagu",
    region: "south",
    price: 9200,
    rating: 4.8,
    reviews: 112,
    amenities: [
      "Swimming Pool",
      "Coffee Estate",
      "Meals Included",
      "Mountain View",
      "Yoga Space",
      "Private Garden",
    ],
    hasWebsite: true,
    website: "https://example.com",
    phone: "9480100003",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=500&q=80",
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=500&q=80",
      "https://images.unsplash.com/photo-1482192505345-5852310ed21d?w=500&q=80",
    ],
    type: "Eco Stay",
    desc: "An award-winning eco homestay on a 40-acre coffee and pepper estate, Green Haven is KHA's most decorated property. The infinity pool overlooks three districts on clear mornings. All food is farm-to-table, electricity is solar, and the design blends seamlessly into the hillside. A yoga deck overlooking the valley makes mornings here genuinely restorative.",
    host: {
      name: "Suresh & Anita Muthappa",
      since: "Host since 2010",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
      desc: "Suresh is an agricultural engineer who returned to Kodagu after a corporate career to build something meaningful. Anita leads the yoga sessions every morning and oversees the kitchen garden. Together they've won Mysore's Best Eco Homestay award three times.",
    },
    guestReviews: [
      {
        name: "Nandita Rao",
        stars: 5,
        date: "April 2026",
        text: "The infinity pool at sunrise with mountains beyond — I've never experienced anything more perfectly calm. This is my annual retreat now.",
      },
      {
        name: "Akshay Kulkarni",
        stars: 5,
        date: "March 2026",
        text: "Anita's morning yoga followed by fresh papaya from the garden. If there's a better way to start a day, I haven't found it.",
      },
      {
        name: "Meena & Thomas",
        stars: 4,
        date: "January 2026",
        text: "Exceptional property. The food quality is extraordinary — everything from the estate. Only reason for 4 stars is it books up very quickly!",
      },
    ],
  },
  {
    id: 12,
    lat: 13.32,
    lng: 75.78,
    name: "Cloudwalker Bungalow",
    taluk: "Chikmagalur",
    district: "Chikmagalur",
    region: "malnad",
    price: 8000,
    rating: 4.9,
    reviews: 97,
    amenities: [
      "Mountain View",
      "Meals Included",
      "Nature Trails",
      "Bonfire",
      "Heritage Architecture",
    ],
    hasWebsite: true,
    website: "https://example.com",
    phone: "9480100004",
    img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=500&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80",
    ],
    type: "Heritage Bungalow",
    desc: "A colonial-era British bungalow lovingly restored on the slopes of Baba Budan Giri. Original fireplaces, pressed tin ceilings and hand-carved doorframes have been preserved with meticulous care. The vegetable gardens supply the kitchen directly. On clear evenings the mist rolls in at precisely 5pm — guests gather on the verandah to watch it arrive.",
    host: {
      name: "Rajendra & Meghna Hegde",
      since: "Host since 2016",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      desc: "Rajendra is an architect who spent five years restoring this 1920s bungalow. His wife Meghna runs the kitchen and is renowned for her Malnad-style breakfast. They live on the property and are hands-on hosts who genuinely love showing guests the hills.",
    },
    guestReviews: [
      {
        name: "Shalini Bhat",
        stars: 5,
        date: "April 2026",
        text: "Waking to the mist at this altitude is unlike anything. The bungalow is immaculate and the hosts are extraordinary people. Already rebooked.",
      },
      {
        name: "Dr. Krishnamurthy",
        stars: 5,
        date: "February 2026",
        text: "The heritage restoration is absolutely faithful — you feel transported to another era entirely. The fireplace evenings are unforgettable.",
      },
    ],
  },
  {
    id: 13,
    lat: 13.13,
    lng: 75.58,
    name: "Mullayanagiri Nest",
    taluk: "Mudigere",
    district: "Chikmagalur",
    region: "malnad",
    price: 4200,
    rating: 4.6,
    reviews: 43,
    amenities: ["Nature Trails", "Meals Included", "Mountain View"],
    hasWebsite: false,
    phone: "9480100005",
    img: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=500&q=80",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&q=80",
      "https://images.unsplash.com/photo-1482192505345-5852310ed21d?w=500&q=80",
    ],
    type: "Family Homestay",
    desc: "Simple and soul-nourishing. Run by a retired schoolteacher and his family who will guide you to Karnataka's highest peak at sunrise, then serve you hot akki roti and coconut chutney on your return. This is honest, unpretentious hospitality that makes the mountains feel like home.",
    host: {
      name: "Shivakumar Family",
      since: "Host since 2018",
      avatar:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&q=80",
      desc: "Retired teacher Shivakumar has been walking these hills for 40 years. He knows every trail, every bird call and every wildflower by name. His daughter Sowmya manages bookings via WhatsApp and his wife's cooking is the talk of all who visit.",
    },
    guestReviews: [
      {
        name: "Arun Patel",
        stars: 5,
        date: "March 2026",
        text: "The sunrise trek with Shivakumar sir was worth the entire trip. He told us about every plant we passed. Extraordinary knowledge, extraordinary host.",
      },
      {
        name: "Kavitha R",
        stars: 4,
        date: "December 2025",
        text: "Affordable, genuine, beautiful location. The food is simple but delicious. Don't expect luxury — expect something better.",
      },
    ],
  },
  {
    id: 14,
    lat: 13.53,
    lng: 75.36,
    name: "Kadumaney Forest Stay",
    taluk: "Koppa",
    district: "Chikmagalur",
    region: "malnad",
    price: 6300,
    rating: 4.7,
    reviews: 58,
    amenities: ["River Access", "Nature Trails", "Wildlife Zone", "Bonfire"],
    hasWebsite: false,
    phone: "9480100006",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=80",
    ],
    type: "Jungle Stay",
    desc: "Deep in the Bhadra buffer zone, Kadumaney Forest Stay is as close to wilderness as a bed-and-breakfast can be. Leopard pugmarks have been spotted on the property trail. The Bhadra river flows 200 metres away. Giant squirrels and hornbills are daily visitors. This is for the traveller who wants to feel genuinely immersed in the Western Ghats.",
    host: {
      name: "Manju & Geetha Raju",
      since: "Host since 2015",
      avatar:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&q=80",
      desc: "Manju is a trained wildlife naturalist who spent eight years with the forest department before starting the homestay. He leads night walks and dawn bird watches. Geetha's Malnad cooking is prepared over a wood fire and is the real reason guests return.",
    },
    guestReviews: [
      {
        name: "Rohan Desai",
        stars: 5,
        date: "January 2026",
        text: "I heard a leopard call at 3am from my room. I lay there perfectly still, heart racing. By morning I was back for coffee. Best travel memory of my life.",
      },
      {
        name: "Sandhya & Prasad",
        stars: 5,
        date: "November 2025",
        text: "Manju's night walk was extraordinary. We saw civets, a flying squirrel, countless frogs. He explained the ecosystem so beautifully.",
      },
    ],
  },
  {
    id: 15,
    lat: 12.95,
    lng: 75.79,
    name: "Sakleshpur Spice Home",
    taluk: "Sakleshpur",
    district: "Hassan",
    region: "south",
    price: 3500,
    rating: 4.5,
    reviews: 36,
    amenities: ["Meals Included", "Nature Trails", "Coffee Estate"],
    hasWebsite: false,
    phone: "9480100007",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=500&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&q=80",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&q=80",
    ],
    type: "Farm Stay",
    desc: "A modest and magnificent pepper-and-cardamom farm run by a warm family who will teach you to cook authentic Malnad cuisine over a wood fire. The aroma of cardamom in the morning air is reason enough to visit. This is the most honest farm-to-table experience in Hassan district.",
    host: {
      name: "Nagesh Gowda Family",
      since: "Host since 2019",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&q=80",
      desc: "Nagesh has farmed spices and coffee for 30 years. He'll take you through the estate explaining each spice plant, its harvest time and its culinary uses. His wife Pushpa's cooking class is a highlight every guest mentions in their reviews.",
    },
    guestReviews: [
      {
        name: "Vandana Krishnan",
        stars: 5,
        date: "February 2026",
        text: "Learning to make Neer dosa from scratch with Pushpa while cardamom perfumed the air around us. I could not have imagined this morning.",
      },
      {
        name: "Ramesh T",
        stars: 4,
        date: "October 2025",
        text: "Very simple accommodation but the experience is rich. Great budget option for the Sakleshpur hills. Food was genuinely outstanding.",
      },
    ],
  },
  {
    id: 16,
    lat: 13.17,
    lng: 75.87,
    name: "Belur Heritage House",
    taluk: "Belur",
    district: "Hassan",
    region: "south",
    price: 5000,
    rating: 4.6,
    reviews: 52,
    amenities: ["Meals Included", "Mountain View", "Heritage Architecture"],
    hasWebsite: true,
    website: "https://example.com",
    phone: "9480100008",
    img: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&q=80",
      "https://images.unsplash.com/photo-1482192505345-5852310ed21d?w=500&q=80",
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=500&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&q=80",
      "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=500&q=80",
    ],
    type: "Heritage Stay",
    desc: "A 120-year-old Haveli, steps from Belur's legendary Chennakeshava temple complex. Stay with the Iyer family and wake to temple bells drifting through ancient stone corridors. The home features original teak pillars, a lotus pond in the central courtyard and walls that have absorbed a century of incense.",
    host: {
      name: "Subramaniam Iyer Family",
      since: "Host since 2013",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
      desc: "The Iyer family has occupied this haveli for five generations. Subramaniam is a retired history professor and leads private temple tours that no guidebook covers. His explanations of the Hoysala carvings are extraordinary.",
    },
    guestReviews: [
      {
        name: "Ananya Shah",
        stars: 5,
        date: "March 2026",
        text: "Woke to temple bells at 5:30am. Walked to the temple in 3 minutes with Subramaniam sir as my guide. I cried at the beauty of the carvings. Perfect trip.",
      },
      {
        name: "Mohan & Leela",
        stars: 4,
        date: "January 2026",
        text: "The haveli itself is breathtaking. The food is authentic Brahmin cooking — some of the best I've had. Highly recommend.",
      },
    ],
  },
  {
    id: 17,
    lat: 12.87,
    lng: 74.88,
    name: "Coastal Breeze Home",
    taluk: "Mangaluru",
    district: "Dakshina Kannada",
    region: "coastal",
    price: 4500,
    rating: 4.4,
    reviews: 29,
    amenities: ["Meals Included", "Swimming Pool", "River Access"],
    hasWebsite: false,
    phone: "9480100009",
    img: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&q=80",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80",
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=500&q=80",
    ],
    type: "Coastal Stay",
    desc: "A traditional Tulu Nadu tiled house 200 metres from the Arabian Sea. Fish for breakfast caught that morning, coconut toddy at sunset on the open terrace, and the unending sound of waves through your window. This is coastal Karnataka unplugged — no pretence, just the sea.",
    host: {
      name: "D'Souza Family",
      since: "Host since 2017",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80",
      desc: "The D'Souza family has fished these waters for three generations. They'll take you out on their boat at dawn and cook whatever is caught for breakfast. Their fish curry recipe has never left the family kitchen.",
    },
    guestReviews: [
      {
        name: "Preethi Menon",
        stars: 5,
        date: "April 2026",
        text: "Ate the freshest fish of my life for breakfast. Slept to the sound of waves. Woke to a pink horizon. This is what coastal Karnataka means.",
      },
      {
        name: "Rohit & Divya",
        stars: 4,
        date: "February 2026",
        text: "Lovely family, beautiful location. Simple but perfectly comfortable. The food is the star — absolutely incredible coastal cooking.",
      },
    ],
  },
  {
    id: 18,
    lat: 13.23,
    lng: 75.24,
    name: "Kudremukh Wilderness",
    taluk: "Kundapur",
    district: "Udupi",
    region: "coastal",
    price: 6800,
    rating: 4.8,
    reviews: 78,
    amenities: [
      "Nature Trails",
      "Wildlife Zone",
      "Meals Included",
      "River Access",
      "Stargazing Deck",
    ],
    hasWebsite: true,
    website: "https://example.com",
    phone: "9480100010",
    img: "https://images.unsplash.com/photo-1482192505345-5852310ed21d?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1482192505345-5852310ed21d?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80",
      "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=500&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=80",
    ],
    type: "Jungle Stay",
    desc: "The last homestay before the Kudremukh National Park boundary. Your host Rajesh has been a forest guide for 22 years and will show you things no guidebook lists. The stargazing deck is one of the darkest sky locations in coastal Karnataka. Lion-tailed macaques, Malabar giant squirrels and Nilgiri langurs visit the garden daily.",
    host: {
      name: "Rajesh Shetty",
      since: "Host since 2011",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
      desc: "Former Kudremukh National Park naturalist guide Rajesh Shetty turned his family home into a wildlife homestay after retirement. He has documented 312 bird species in the region and his night walks are sought after by wildlife photographers from across India.",
    },
    guestReviews: [
      {
        name: "Vinay Kapoor",
        stars: 5,
        date: "March 2026",
        text: "Rajesh showed me a lion-tailed macaque family at close range at dusk. I've been wildlife watching for 20 years and this was special.",
      },
      {
        name: "Shreya Nair",
        stars: 5,
        date: "January 2026",
        text: "The stargazing deck on a moonless night. I saw the Milky Way for the first time properly. I wept. Rajesh explained every constellation. 11/10.",
      },
    ],
  },
  {
    id: 19,
    lat: 14.62,
    lng: 74.84,
    name: "Sirsi Areca Farm",
    taluk: "Sirsi",
    district: "Uttara Kannada",
    region: "north",
    price: 3500,
    rating: 4.5,
    reviews: 31,
    amenities: ["Meals Included", "Nature Trails", "Bonfire"],
    hasWebsite: false,
    phone: "9480100011",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&q=80",
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=500&q=80",
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=500&q=80",
    ],
    type: "Farm Stay",
    desc: "An areca nut and banana farm in the quiet interiors of Uttara Kannada. Simple rooms, extraordinary food and the kind of silence you cannot buy. The Havyaka Brahmin cuisine prepared by the host family is reason enough to make the journey — recipes unchanged for a hundred years.",
    host: {
      name: "Vasudeva Bhat Family",
      since: "Host since 2020",
      avatar:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80",
      desc: "The Bhat family has farmed areca and paddy in Sirsi for generations. Their Havyaka cooking — particularly the jackfruit dishes — has already earned a loyal following among KHA guests.",
    },
    guestReviews: [
      {
        name: "Anand Rao",
        stars: 5,
        date: "April 2026",
        text: "The Havyaka meal served on banana leaf. I had thirds. Then fourths. I'm not exaggerating when I say it's the best food I've eaten in Karnataka.",
      },
      {
        name: "Preeti & Sunil",
        stars: 4,
        date: "March 2026",
        text: "Very new to hosting but incredibly sincere. Beautiful farm, peaceful location, and food that would make anyone reconsider city life.",
      },
    ],
  },
  {
    id: 20,
    lat: 11.94,
    lng: 76.35,
    name: "Kabini Elephant Watch",
    taluk: "H.D. Kote",
    district: "Mysuru",
    region: "wildlife",
    price: 12000,
    rating: 5.0,
    reviews: 145,
    amenities: [
      "Wildlife Zone",
      "River Access",
      "Meals Included",
      "Mountain View",
      "Stargazing Deck",
      "Nature Trails",
    ],
    hasWebsite: true,
    website: "https://example.com",
    phone: "9480100012",
    img: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
    imgs: [
      "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
      "https://images.unsplash.com/photo-1482192505345-5852310ed21d?w=500&q=80",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    ],
    type: "Wildlife Stay",
    desc: "KHA's most booked property — a premium wildlife homestay on the Kabini backwaters with an unbroken 5.0 rating from 145 guests. Herds of elephants cross 300 metres from the property every evening without fail. The property has three suites, a riverside dining deck and a naturalist-guided jeep safari included with every stay.",
    host: {
      name: "Nanjunda & Padma Gowda",
      since: "Host since 2009",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80",
      desc: "Nanjunda worked with Mysore's elephant conservation programme for 15 years and built this homestay as a way to share his passion. Padma's South Mysore cooking and Nanjunda's wildlife knowledge together create an experience that has earned 145 consecutive 5-star reviews.",
    },
    guestReviews: [
      {
        name: "Dr. Prashant Anand",
        stars: 5,
        date: "April 2026",
        text: "I've stayed at Kabini three times. The elephant crossing at sunset never loses its power. Nanjunda's knowledge of each individual herd member is extraordinary.",
      },
      {
        name: "Aisha & Rohan",
        stars: 5,
        date: "March 2026",
        text: "Our honeymoon. Elephants at sunset. Stars over the backwater. Padma's cooking. We could not have asked for more from this world.",
      },
      {
        name: "The Krishnan Family",
        stars: 5,
        date: "February 2026",
        text: "Our 10-year-old has wanted to see elephants since he was 2. The look on his face when the herd appeared. We will never forget it.",
      },
    ],
  },
];

const HERO_VIDEO = "/herovideo.mp4";

const MARQUEE_IMGS = [
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&q=70",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=70",
  "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=400&q=70",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=70",
  "https://images.unsplash.com/photo-1482192505345-5852310ed21d?w=400&q=70",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=70",
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&q=70",
];

const REGIONS = [
  { key: "all", label: "All Mysore" },
  { key: "south", label: "South Mysore" },
  { key: "coastal", label: "Coastal Mysore" },
  { key: "north", label: "North Mysore" },
  { key: "central", label: "Central Mysore" },
  { key: "malnad", label: "Malnad Region" },
];

function Stars({ rating, size = "1rem" }) {
  return (
    <>
      {Array.from({ length: Math.floor(rating) }, (_, i) => (
        <Star
          key={i}
          size={size === "1rem" ? 16 : size === ".85rem" ? 14 : 18}
          style={{ color: "#c8a96a", fill: "#c8a96a" }}
        />
      ))}
    </>
  );
}

function HsCard({ h, onOpen, distance }) {
  const wa = `https://wa.me/91${h.phone}?text=Hello%2C%20I%20found%20${encodeURIComponent(h.name)}%20on%20KHA%20and%20would%20like%20to%20book.`;
  return (
    <div
      className="kha-card kha-reveal bg-[#1f2e1f] overflow-hidden"
      style={{ border: "1px solid rgba(200,169,106,.1)" }}
      onClick={() => onOpen(h.id)}
    >
      <div
        className="kha-card-img-wrap w-full overflow-hidden relative"
        style={{ aspectRatio: "4/3" }}
      >
        <img
          src={h.img}
          alt={h.name}
          loading="lazy"
          className="kha-card-img w-full h-full object-cover"
        />
        <div className="absolute top-[.9rem] left-[.9rem] flex gap-1 flex-wrap z-[2]">
          <span
            className="px-3 py-[.3rem] backdrop-blur-md"
            style={{
              fontSize: ".64rem",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              background: "rgba(24,35,24,.72)",
              border: "1px solid rgba(200,169,106,.32)",
              color: "#c8a96a",
            }}
          >
            {h.type}
          </span>
          {h.hasWebsite ? (
            <span
              className="px-3 py-[.3rem] backdrop-blur-md"
              style={{
                fontSize: ".64rem",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                background: "rgba(46,74,46,.85)",
                border: "1px solid rgba(122,158,110,.4)",
                color: "#adc49a",
              }}
            >
              Has Website
            </span>
          ) : (
            <span
              className="px-3 py-[.3rem] backdrop-blur-md"
              style={{
                fontSize: ".64rem",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                background: "rgba(37,211,102,.15)",
                border: "1px solid rgba(37,211,102,.38)",
                color: "#4ade80",
              }}
            >
              WhatsApp Only
            </span>
          )}
        </div>

        {/* ── Distance badge (shows only when a tourist place is selected) ── */}
        {distance !== null && (
          <div
            className="absolute bottom-[.9rem] right-[.9rem] z-[2] flex items-center gap-[.35rem] px-3 py-[.3rem] backdrop-blur-md"
            style={{
              fontSize: ".64rem",
              letterSpacing: ".12em",
              background: "rgba(24,35,24,.82)",
              border: "1px solid rgba(200,169,106,.38)",
              color: "#c8a96a",
            }}
          >
            <MapPin size={10} />
            {distance} km away
          </div>
        )}

        <div
          className="kha-price-overlay absolute inset-0 flex flex-col items-center justify-center gap-[.6rem] opacity-0 transition-opacity duration-300 z-[3]"
          style={{
            background: "rgba(24,35,24,.9)",
            backdropFilter: "blur(4px)",
          }}
        >
          <span
            style={{
              fontSize: ".7rem",
              letterSpacing: ".25em",
              textTransform: "uppercase",
              color: "#7a9e6e",
            }}
          >
            Starting from
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "3.2rem",
              fontWeight: 300,
              color: "#c8a96a",
              lineHeight: 1,
            }}
          >
            ₹{h.price.toLocaleString("en-IN")}
          </span>
          <span
            style={{
              fontSize: ".75rem",
              letterSpacing: ".12em",
              color: "#adc49a",
            }}
          >
            per night · direct booking
          </span>
          <div className="flex gap-[.6rem] mt-[.6rem] flex-wrap justify-center">
            {h.hasWebsite && (
              <a
                href={h.website}
                target="_blank"
                rel="noopener noreferrer"
                className="kha-btn-web flex items-center gap-2 px-5 py-[.6rem] transition-all duration-300"
                style={{
                  background: "rgba(200,169,106,.15)",
                  border: "1px solid rgba(200,169,106,.38)",
                  color: "#c8a96a",
                  fontSize: ".7rem",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  cursor: "none",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Globe size={14} /> Visit Website
              </a>
            )}
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="kha-btn-wa flex items-center gap-2 px-5 py-[.6rem] transition-all duration-300"
              style={{
                background: "rgba(37,211,102,.18)",
                border: "1px solid rgba(37,211,102,.4)",
                color: "#4ade80",
                fontSize: ".7rem",
                letterSpacing: ".15em",
                textTransform: "uppercase",
                textDecoration: "none",
                cursor: "none",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle size={14} />{" "}
              {h.hasWebsite ? "WhatsApp" : "Book via WhatsApp"}
            </a>
          </div>
        </div>
      </div>

      <div className="px-6 pt-[1.4rem] pb-7">
        <div
          className="kha-card-taluk flex items-center gap-[.4rem] mb-[.35rem]"
          style={{
            fontSize: ".7rem",
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#7a9e6e",
          }}
        >
          <MapPin size={12} /> {h.taluk}, {h.district}
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "1.55rem",
            fontWeight: 400,
            color: "#f4efe5",
            marginBottom: ".28rem",
            lineHeight: 1.2,
          }}
        >
          {h.name}
        </div>
        <div className="flex items-center gap-[.5rem] mb-[.9rem]">
          <div className="flex gap-[.2rem]">
            <Stars rating={h.rating} size=".85rem" />
          </div>
          <span
            style={{ fontSize: ".85rem", color: "#c8a96a", fontWeight: 500 }}
          >
            {h.rating}
          </span>
          <span style={{ fontSize: ".75rem", color: "rgba(244,239,229,.42)" }}>
            ({h.reviews} reviews)
          </span>
        </div>
        <div className="flex gap-[.8rem] flex-wrap mb-[1rem]">
          {h.amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              className="flex items-center gap-[.3rem]"
              style={{ fontSize: ".75rem", color: "rgba(244,239,229,.55)" }}
            >
              <span style={{ color: "#c8a96a" }}>✦</span> {a}
            </span>
          ))}
        </div>

        {/* ── Nearby tourist places ── */}
        <div
          style={{
            borderTop: "1px solid rgba(200,169,106,.1)",
            paddingTop: ".85rem",
          }}
        >
          <p
            style={{
              fontSize: ".62rem",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "rgba(200,169,106,.5)",
              marginBottom: ".55rem",
            }}
          >
            Nearby attractions
          </p>
          <div className="flex flex-col gap-[.38rem]">
            {TOURIST_PLACES.map((p) => ({
              ...p,
              dist: haversine(h.lat, h.lng, p.lat, p.lng),
            }))
              .sort((a, b) => a.dist - b.dist)
              .slice(0, 3)
              .map((p) => (
                <div key={p.key} className="flex items-center justify-between">
                  <span
                    className="flex items-center gap-[.4rem]"
                    style={{
                      fontSize: ".74rem",
                      color: "rgba(244,239,229,.5)",
                    }}
                  >
                    <MapPin
                      size={9}
                      style={{ color: "#c8a96a", flexShrink: 0 }}
                    />
                    {p.label}
                  </span>
                  <span
                    style={{
                      fontSize: ".72rem",
                      color: "#c8a96a",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      marginLeft: ".5rem",
                    }}
                  >
                    {p.dist} km
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const cg = "'Cormorant Garamond',serif";
const jost = "'Jost',sans-serif";

const Home = () => {
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

  const [floatVisible, setFloatVisible] = useState(true);
  useEffect(() => {
    const onScroll = () => {
      const browse = document.getElementById("browse");
      if (browse) {
        const r = browse.getBoundingClientRect();
        setFloatVisible(!(r.top < window.innerHeight && r.bottom > 0));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    const onScroll = () => {
      const bg = document.querySelector(".kha-testi-bg");
      if (!bg) return;
      const r = bg.parentElement.getBoundingClientRect();
      bg.style.transform = `translateY(${(-r.top / (r.height + window.innerHeight)) * 70}px)`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [detailId, setDetailId] = useState(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDetailId(null);
        document.body.style.overflow = "";
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const [activeRegion, setActiveRegion] = useState("all");
  const [fTaluk, setFTaluk] = useState("");
  const [fPrice, setFPrice] = useState("");
  const [fAmenity, setFAmenity] = useState("");
  const [fSearch, setFSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [fPlace, setFPlace] = useState(""); // ← tourist place filter

  const availableTaluks = [
    "Mysore",
    "Nanjangud",
    "H.D. Kote",
    "K.R. Nagar",
    "Hunsur",
    "Sargur",
    "Piriyapatna",
  ];

  const filtered = (() => {
    const maxP = parseInt(fPrice) || Infinity;
    const s = fSearch.toLowerCase();
    const place = TOURIST_PLACES.find((p) => p.key === fPlace);

    let list = HS.filter((h) => {
      if (activeRegion !== "all" && h.region !== activeRegion) return false;
      if (fTaluk && h.taluk !== fTaluk) return false;
      if (h.price > maxP) return false;
      if (fAmenity && !h.amenities.includes(fAmenity)) return false;
      if (
        s &&
        !h.name.toLowerCase().includes(s) &&
        !h.taluk.toLowerCase().includes(s) &&
        !h.district.toLowerCase().includes(s)
      )
        return false;
      return true;
    }).map((h) => ({
      ...h,
      _distance: place ? haversine(place.lat, place.lng, h.lat, h.lng) : null,
    }));

    // When a tourist place is selected → always sort nearest first
    if (place) {
      list = [...list].sort((a, b) => a._distance - b._distance);
    } else {
      if (sortBy === "price-asc")
        list = [...list].sort((a, b) => a.price - b.price);
      if (sortBy === "price-desc")
        list = [...list].sort((a, b) => b.price - a.price);
      if (sortBy === "rating")
        list = [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  })();

  const clearFilters = () => {
    setFTaluk("");
    setFPrice("");
    setFAmenity("");
    setFSearch("");
    setSortBy("default");
    setActiveRegion("all");
    setFPlace("");
  };

  const openDetail = (id) => {
    setDetailId(id);
    document.body.style.overflow = "hidden";
    setTimeout(
      () => document.getElementById("khaDetailPage")?.scrollTo(0, 0),
      50,
    );
  };
  const closeDetail = (e) => {
    e?.preventDefault();
    setDetailId(null);
    document.body.style.overflow = "";
  };
  const detail = detailId ? HS.find((h) => h.id === detailId) : null;
  const scrollToBrowse = (e) => {
    e.preventDefault();
    document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
  };

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
      <div
        style={{
          width: "5px",
          height: "5px",
          background: "#c8a96a",
          transform: "rotate(45deg)",
        }}
      ></div>
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

  return (
    <>
      <style>{STYLES}</style>
      <div className="kha-cur" ref={curRef}></div>
      <div className="kha-cuf" ref={curFRef}></div>

      <Navbar />
      <FloatBookButton />

      {/* ════ HERO ════ */}
      <section
        className="kha-hero relative w-full h-screen overflow-hidden"
        id="hero"
        style={{ marginTop: "90px" }}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(24,35,24,.72) 0%, rgba(24,35,24,.28) 55%, rgba(24,35,24,.55) 100%)",
            }}
          ></div>
        </div>

        <div
          className="kha-hero-card absolute z-10 bottom-[9%] left-[6%] px-[2.8rem] py-[2.4rem]"
          style={{
            background: "rgba(24,35,24,.5)",
            backdropFilter: "blur(28px) saturate(1.5)",
            border: "1px solid rgba(200,169,106,.28)",
            maxWidth: "510px",
          }}
        >
          <div className="kha-hero-eyebrow">
            Mysuru District Homestay Owners Association(R)
          </div>
          <h1
            style={{
              fontFamily: cg,
              fontSize: "2.9rem",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#fdfaf4",
              marginBottom: ".8rem",
            }}
          >
            Mysuru's{" "}
            <em style={{ fontStyle: "italic", color: "#e0c88a" }}>Finest</em>
            <br />
            Homestays — One Place
          </h1>
          <div className="kha-cred-block">
            <p className="kha-cred-title">
              "Department of Tourism — Government of Karnataka Approved
              Homestays"
            </p>
            <div className="kha-cred-logos">
              <img src="/gov-logo.png" alt="Karnataka Tourism" />
              <img src="/mha.jpg" alt="MDHOA Logo" />
              <img src="/image.png" alt="Government of Karnataka" />
            </div>
          </div>
          <p
            className="kha-hero-para"
            style={{
              fontSize: ".95rem",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(244,239,229,.82)",
              marginBottom: "1.3rem",
            }}
          >
            All homestays listed on this platform
            are registered, verified, and operated by honorable members of the
            Mysuru District Homestay Owners Association (Registered). Book
            directly with verified homestay promoters through WhatsApp — no OTA
            commissions, no hidden charges, only safe and responsible stays in
            Mysuru District
          </p>
          <a
            href="#browse"
            className="kha-hero-book-btn inline-flex items-center gap-[.7rem] mt-4 px-8 py-[.82rem] font-semibold"
            onClick={scrollToBrowse}
            style={{
              background: "#c8a96a",
              color: "#182318",
              fontFamily: jost,
              fontSize: ".76rem",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,.1)",
              cursor: "none",
            }}
          >
            🏡 Click Here to Book a Homestay
          </a>
          <a href="#browse" className="kha-hero-cta" onClick={scrollToBrowse}>
            Browse All Homestays
          </a>
        </div>

        <div className="absolute bottom-[2.2rem] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-[.5rem]">
          <div className="kha-scroll-line"></div>
          <span
            style={{
              fontSize: ".65rem",
              letterSpacing: ".32em",
              textTransform: "uppercase",
              color: "rgba(200,169,106,.55)",
            }}
          >
            Scroll to explore
          </span>
        </div>
      </section>

      {/* ════ TRUST STRIP ════ */}
      <div
        className="kha-reveal px-16 py-10"
        style={{
          background: "#2e4a2e",
          borderTop: "1px solid rgba(200,169,106,.15)",
          borderBottom: "1px solid rgba(200,169,106,.15)",
        }}
      >
        <div className="kha-ts-inner max-w-[1100px] mx-auto flex items-center justify-center gap-8 flex-wrap">
          {[
            {
              icon: "/image.png",
              title: "Government Approved",
              desc: "Officially recognised by the Department of Tourism, Government of Karnataka. All listings comply with MDHOA tourism regulations.",
            },
            {
              icon: "/mha.jpg",
              title:
                "Managed by Mysuru District Homestay Owners Association(R)",
              desc: "MDHOA is the registered representative body of homestay across Mysuru — not a private aggregator.",
            },
            {
              icon: "/verify.jpg",
              title: "Verified & Certified Stays",
              desc: "Every property is  inspected and certified by Mysuru District Homestay Owners Association(R) officers before going live on this platform.",
            },
          ].map((ts) => (
            <div
              key={ts.title}
              className="flex items-center gap-4 flex-1 min-w-[220px] max-w-[340px] px-[1.8rem] py-[1.4rem]"
              style={{
                border: "1px solid rgba(200,169,106,.22)",
                background: "rgba(200,169,106,.07)",
              }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: "65px",
                  height: "65px",
                  border: "1px solid rgba(200,169,106,.4)",
                  borderRadius: "50%",
                  background: "rgba(200,169,106,.1)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={ts.icon}
                  alt={ts.title}
                  style={{
                    width: "65px",
                    height: "65px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div>
                <span
                  style={{
                    fontSize: ".72rem",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "#c8a96a",
                    display: "block",
                    marginBottom: ".25rem",
                  }}
                >
                  {ts.title}
                </span>
                <span
                  style={{
                    fontSize: ".82rem",
                    color: "rgba(244,239,229,.65)",
                    lineHeight: 1.55,
                  }}
                >
                  {ts.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════ CREDENTIALS ════ */}
      <div
        className="kha-reveal bg-[#1f2e1f] px-16 py-[5.5rem]"
        style={{
          borderTop: "1px solid rgba(200,169,106,.15)",
          borderBottom: "1px solid rgba(200,169,106,.15)",
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          <span className="kha-cred-eyebrow kha-reveal">
            Official Credentials & Licences
          </span>
          <h2
            className="kha-reveal"
            style={{
              fontFamily: cg,
              fontSize: "clamp(2rem,3.5vw,2.9rem)",
              fontWeight: 300,
              color: "#f4efe5",
            }}
          >
            Recognized by the{" "}
            <em style={{ fontStyle: "italic", color: "#e0c88a" }}>
              Department of Tourism, Government of Karnataka
            </em>
          </h2>
          <p
            className="kha-reveal"
            style={{
              fontSize: ".97rem",
              color: "rgba(244,239,229,.55)",
              fontWeight: 300,
              lineHeight: 1.85,
              maxWidth: "720px",
              marginBottom: "3rem",
            }}
          >
            MDHOA is officially recognised by The Department of Tourism,
            Government of Karnataka, ensuring every homestay is registered,
            inspected, and approved by the relevant authorities & Mysore
            District Homestay Owners Association(R).
          </p>
          <div
            className="kha-auth-banner kha-reveal grid gap-10 items-center px-[2.8rem] py-[2.2rem] mb-10"
            style={{
              gridTemplateColumns: "auto 1fr auto",
              background: "rgba(200,169,106,.06)",
              border: "1px solid rgba(200,169,106,.32)",
            }}
          >
            <div
              className="flex flex-col items-center justify-center flex-shrink-0 gap-1"
              style={{
                width: "88px",
                height: "88px",
                borderRadius: "50%",
                border: "2px solid rgba(200,169,106,.5)",
                background: "rgba(200,169,106,.08)",
              }}
            >
              <img
                src="/image.png"
                alt="Association Logo"
                style={{
                  height: "88px",
                  width: "auto",
                  objectFit: "contain",
                  marginTop: "29px",
                }}
              />
              <span
                style={{
                  fontSize: ".52rem",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "#c8a96a",
                  textAlign: "center",
                }}
              >
                Govt. of
                <br />
                Karnataka
              </span>
            </div>
            <div>
              <span
                className="inline-block mb-[.65rem] px-3 py-[.22rem]"
                style={{
                  fontSize: ".66rem",
                  letterSpacing: ".28em",
                  textTransform: "uppercase",
                  color: "#c8a96a",
                  background: "rgba(200,169,106,.1)",
                  border: "1px solid rgba(200,169,106,.25)",
                }}
              >
                Primary Recognition
              </span>
              <div
                style={{
                  fontFamily: cg,
                  fontSize: "1.55rem",
                  fontWeight: 300,
                  color: "#fdfaf4",
                  lineHeight: 1.2,
                  marginBottom: ".35rem",
                }}
              >
                Department of Tourism ,Government of Karnataka — Registered
                Representative Body
              </div>
              <div
                style={{
                  fontSize: ".88rem",
                  color: "rgba(244,239,229,.58)",
                  fontWeight: 300,
                  lineHeight: 1.75,
                }}
              >
                MDHOA is the officially registered homestay association in
                Mysuru, recognised under state tourism policies and operating
                under the guidance of the Department of Tourism, Government of
                Karnataka.
              </div>
            </div>
          </div>
          <div
            className="kha-safety-grid kha-reveal grid gap-4 px-8 py-[1.8rem]"
            style={{
              gridTemplateColumns: "repeat(4,1fr)",
              background: "rgba(200,169,106,.04)",
              border: "1px solid rgba(200,169,106,.12)",
            }}
          >
            {[
              ["7", "Govt. Dept. Licences"],
              ["14", "Years of Operation"],
              ["31", "Districts Covered"],
              ["100%", "Police-Cleared Hosts"],
            ].map(([num, lbl]) => (
              <div key={lbl} className="text-center">
                <span
                  style={{
                    fontFamily: cg,
                    fontSize: "2.6rem",
                    fontWeight: 300,
                    color: "#c8a96a",
                    display: "block",
                    lineHeight: 1,
                    marginBottom: ".3rem",
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    fontSize: ".68rem",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "rgba(244,239,229,.48)",
                    display: "block",
                  }}
                >
                  {lbl}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ BROWSE ════ */}
      <section
        className="kha-browse-section px-16 py-[6rem] bg-[#182318]"
        id="browse"
      >
        <div className="kha-reveal max-w-[1300px] mx-auto mb-10 flex justify-between items-end flex-wrap gap-6">
          <div>
            <span className="kha-eyebrow">Explore</span>
            <h2
              style={{
                fontFamily: cg,
                fontSize: "clamp(2.2rem,3.8vw,3.4rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: "#f4efe5",
              }}
            >
              All Mysore{" "}
              <em style={{ fontStyle: "italic", color: "#e0c88a" }}>
                Homestays
              </em>
            </h2>
          </div>
          <p
            style={{
              fontSize: ".9rem",
              color: "rgba(244,239,229,.48)",
              maxWidth: "320px",
              textAlign: "right",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Filter by district, taluk, price or amenities — then book via the
            homestay's website or WhatsApp.
          </p>
        </div>

        {/* ── FILTER BAR ── */}
        <div
          className="kha-filter-bar kha-reveal kha-d1 max-w-[1300px] mx-auto mb-[1.2rem] flex items-end gap-[1.2rem] flex-wrap px-8 py-6"
          style={{
            background: "rgba(31,46,31,.72)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(200,169,106,.15)",
          }}
        >
          {[
            {
              lbl: "Nearest To",
              el: (
                <select
                  className="kha-filter-select"
                  value={fPlace}
                  onChange={(e) => setFPlace(e.target.value)}
                >
                  <option value="">Any Location</option>
                  {TOURIST_PLACES.map((p) => (
                    <option key={p.key} value={p.key}>
                      {p.label}
                    </option>
                  ))}
                </select>
              ),
            },
            {
              lbl: "Taluk",
              el: (
                <select
                  className="kha-filter-select"
                  value={fTaluk}
                  onChange={(e) => setFTaluk(e.target.value)}
                >
                  <option value="">All Taluks</option>
                  {availableTaluks.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              ),
            },
            {
              lbl: "Max Price / Night",
              el: (
                <select
                  className="kha-filter-select"
                  value={fPrice}
                  onChange={(e) => setFPrice(e.target.value)}
                >
                  <option value="">Any Price</option>
                  <option value="3000">Under ₹3,000</option>
                  <option value="5000">Under ₹5,000</option>
                  <option value="8000">Under ₹8,000</option>
                  <option value="12000">Under ₹12,000</option>
                  <option value="20000">Under ₹20,000</option>
                </select>
              ),
            },
            {
              lbl: "Amenities",
              el: (
                <select
                  className="kha-filter-select"
                  value={fAmenity}
                  onChange={(e) => setFAmenity(e.target.value)}
                >
                  <option value="">Any Amenities</option>
                  {[
                    "Meals Included",
                    "Swimming Pool",
                    "Nature Trails",
                    "Bonfire",
                    "Mountain View",
                    "River Access",
                    "Coffee Estate",
                    "Wildlife Zone",
                  ].map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              ),
            },
            {
              lbl: "Search",
              el: (
                <input
                  className="kha-filter-input"
                  type="text"
                  placeholder="Name or location…"
                  value={fSearch}
                  onChange={(e) => setFSearch(e.target.value)}
                />
              ),
            },
          ].map(({ lbl, el }, i, arr) => (
            <React.Fragment key={lbl}>
              <div className="kha-filter-item flex flex-col gap-[.35rem] flex-1 min-w-[140px]">
                <label
                  style={{
                    fontSize: ".68rem",
                    letterSpacing: ".25em",
                    textTransform: "uppercase",
                    color: "#c8a96a",
                    opacity: 0.85,
                  }}
                >
                  {lbl}
                </label>
                {el}
              </div>
              {i < arr.length - 1 && (
                <div
                  className="kha-filter-sep"
                  style={{
                    width: "1px",
                    height: "44px",
                    background: "rgba(200,169,106,.18)",
                    flexShrink: 0,
                  }}
                ></div>
              )}
            </React.Fragment>
          ))}
          <button
            className="kha-filter-btn transition-all duration-200 font-semibold px-8 py-[.72rem] flex-shrink-0 cursor-none"
            style={{
              background: "#c8a96a",
              color: "#182318",
              fontFamily: jost,
              fontSize: ".75rem",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              border: "none",
              whiteSpace: "nowrap",
            }}
          >
            Search
          </button>
          <button
            onClick={clearFilters}
            className="kha-filter-clear transition-all duration-300 px-5 py-[.72rem] flex-shrink-0 cursor-none"
            style={{
              background: "transparent",
              color: "rgba(200,169,106,.65)",
              fontFamily: jost,
              fontSize: ".75rem",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              border: "1px solid rgba(200,169,106,.22)",
              whiteSpace: "nowrap",
            }}
          >
            Clear
          </button>
        </div>

        {/* ── Active place banner ── */}
        {fPlace &&
          (() => {
            const place = TOURIST_PLACES.find((p) => p.key === fPlace);
            return (
              <div
                className="max-w-[1300px] mx-auto mb-4 flex items-center gap-3 px-5 py-3"
                style={{
                  background: "rgba(200,169,106,.07)",
                  border: "1px solid rgba(200,169,106,.2)",
                }}
              >
                <MapPin size={14} style={{ color: "#c8a96a", flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: ".82rem",
                    color: "#c8a96a",
                    letterSpacing: ".04em",
                  }}
                >
                  Showing homestays nearest to <strong>{place.label}</strong> —
                  sorted by distance
                </span>
                <button
                  onClick={() => setFPlace("")}
                  style={{
                    marginLeft: "auto",
                    background: "transparent",
                    border: "none",
                    color: "rgba(200,169,106,.55)",
                    fontSize: ".75rem",
                    cursor: "none",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                  }}
                >
                  ✕ Clear
                </button>
              </div>
            );
          })()}

        {/* ── Region tabs ── */}
        <div className="kha-reveal kha-d2 max-w-[1300px] mx-auto flex gap-2 flex-wrap mb-8">
          {REGIONS.map((r) => (
            <button
              key={r.key}
              className={`kha-rtab${activeRegion === r.key ? " active" : ""}`}
              onClick={() => setActiveRegion(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* ── Results count + sort ── */}
        <div className="kha-reveal kha-d2 max-w-[1300px] mx-auto flex justify-between items-center mb-6">
          <div
            style={{
              fontSize: ".85rem",
              color: "rgba(244,239,229,.5)",
              letterSpacing: ".08em",
            }}
          >
            <span
              style={{ color: "#c8a96a", fontFamily: cg, fontSize: "1.2rem" }}
            >
              {filtered.length}
            </span>{" "}
            homestays found
            {fPlace && (
              <span
                style={{ color: "rgba(200,169,106,.5)", marginLeft: ".5rem" }}
              >
                · sorted by distance
              </span>
            )}
          </div>
          <select
            className="kha-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            disabled={!!fPlace}
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* ── Cards grid ── */}
        {filtered.length === 0 ? (
          <div className="max-w-[1300px] mx-auto text-center py-16">
            <h3
              style={{
                fontFamily: cg,
                fontSize: "2.2rem",
                fontWeight: 300,
                color: "#f4efe5",
                marginBottom: ".8rem",
              }}
            >
              No homestays found
            </h3>
            <p style={{ fontSize: ".95rem", color: "rgba(244,239,229,.5)" }}>
              Try adjusting your filters — there are 148 wonderful stays
              waiting.
            </p>
          </div>
        ) : (
          <div
            className="kha-cards-grid max-w-[1300px] mx-auto grid gap-6"
            style={{ gridTemplateColumns: "repeat(3,1fr)" }}
          >
            {filtered.map((h) => (
              <HsCard
                key={h.id}
                h={h}
                onOpen={openDetail}
                distance={h._distance}
              />
            ))}
          </div>
        )}
      </section>

      {/* ════ BROWSE CTA BAND ════ */}
      <div
        className="kha-reveal text-center py-[2.8rem] px-16"
        style={{
          background:
            "linear-gradient(135deg,rgba(200,169,106,.12) 0%,rgba(46,74,46,.4) 100%)",
          borderTop: "1px solid rgba(200,169,106,.18)",
          borderBottom: "1px solid rgba(200,169,106,.18)",
        }}
      >
        <div className="max-w-[700px] mx-auto">
          <h3
            style={{
              fontFamily: cg,
              fontSize: "1.9rem",
              fontWeight: 300,
              color: "#f4efe5",
              marginBottom: ".4rem",
            }}
          >
            Ready to Experience{" "}
            <em style={{ fontStyle: "italic", color: "#e0c88a" }}>
              Real Mysore?
            </em>
          </h3>
          <p
            style={{
              fontSize: ".9rem",
              color: "rgba(244,239,229,.65)",
              marginBottom: "1.3rem",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            148 verified, government-approved homestays across every district —
            from Coorg's coffee hills to Kabini's wildlife shores. Book directly
            with host families.
          </p>
          <a
            href="#browse"
            className="kha-cta-anim-btn inline-flex items-center gap-[.8rem] px-[2.6rem] py-[.9rem] font-semibold"
            onClick={scrollToBrowse}
            style={{
              background: "#c8a96a",
              color: "#182318",
              fontFamily: jost,
              fontSize: ".78rem",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            <span>🏡 Click Here to Explore &amp; Book Homestays</span>
          </a>
        </div>
      </div>

      {/* ════ ABOUT ════ */}
      <section className="px-16 py-[6rem] bg-[#1f2e1f]" id="about">
        <div
          className="kha-about-grid max-w-[1200px] mx-auto grid gap-20 items-center"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <div className="kha-reveal grid grid-cols-2 gap-[1.1rem]">
            {[
              {
                src: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=600&q=80",
                label: "Coorg, Kodagu",
                cls: "kha-arch-1",
              },
              {
                src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
                label: "Chikmagalur",
                cls: "kha-arch-2",
              },
            ].map(({ src, label, cls }) => (
              <div
                key={label}
                className={`kha-arch-wrap ${cls} overflow-hidden relative`}
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={src}
                  alt={label}
                  className="w-full h-full object-cover"
                />
                <span
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-[.9rem] py-[.38rem]"
                  style={{
                    fontSize: ".65rem",
                    letterSpacing: ".25em",
                    textTransform: "uppercase",
                    color: "#e0c88a",
                    background: "rgba(24,35,24,.65)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div>
            <span className="kha-eyebrow kha-reveal">Who We Are</span>
            <h2
              className="kha-reveal kha-d1"
              style={{
                fontFamily: cg,
                fontSize: "clamp(2.2rem,3.8vw,3.4rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: "#f4efe5",
              }}
            >
              The Official Voice of
              <br />
              Mysore's{" "}
              <em style={{ fontStyle: "italic", color: "#e0c88a" }}>
                Homestay
              </em>{" "}
              Hosts
            </h2>
            <div className="kha-reveal kha-d2">
              <Divider />
            </div>
            <p
              className="kha-reveal kha-d2"
              style={{
                fontSize: ".97rem",
                lineHeight: 1.9,
                fontWeight: 300,
                color: "rgba(244,239,229,.78)",
                marginBottom: "1.4rem",
              }}
            >
              The Mysore District Homestay Owners Association (MDHOA) is the
              registered body representing authentic homestay operators across
              all taluks of Mysore. We bring together families who open their
              homes — from the royal heritage of Mysuru district to its rich
              culture and timeless beauty.
            </p>
            <p
              className="kha-reveal kha-d3"
              style={{
                fontSize: ".97rem",
                lineHeight: 1.9,
                fontWeight: 300,
                color: "rgba(244,239,229,.78)",
                marginBottom: "1.4rem",
              }}
            >
              Whether a homestay has a polished website or simply a WhatsApp
              number, every member is verified, reviewed and listed here —
              giving guests one trusted platform to discover the real Mysore.
            </p>
            <div
              className="kha-reveal kha-d3 grid grid-cols-2 gap-[1.1rem] mt-8 pt-8"
              style={{ borderTop: "1px solid rgba(200,169,106,.18)" }}
            >
              {[
                {
                  icon: <CheckCircle2 size={20} />,
                  name: "Verified Members",
                  desc: "Every listing personally verified by KHA",
                },
                {
                  icon: <Leaf size={20} />,
                  name: "Eco Committed",
                  desc: "Sustainable & responsible tourism first",
                },
                {
                  icon: <Smartphone size={20} />,
                  name: "WhatsApp Booking",
                  desc: "Book any stay — even without a website",
                },
                {
                  icon: <Award size={20} />,
                  name: "State Recognised",
                  desc: "Mysore Tourism affiliated body",
                },
              ].map((f) => (
                <div key={f.name} className="flex items-start gap-[.9rem]">
                  <span
                    style={{
                      fontSize: "1.3rem",
                      flexShrink: 0,
                      marginTop: ".1rem",
                      color: "#7a9e6e",
                    }}
                  >
                    {f.icon}
                  </span>
                  <div>
                    <span
                      style={{
                        fontSize: ".78rem",
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "#7a9e6e",
                        display: "block",
                        marginBottom: ".2rem",
                      }}
                    >
                      {f.name}
                    </span>
                    <span
                      style={{
                        fontSize: ".88rem",
                        color: "rgba(244,239,229,.6)",
                        lineHeight: 1.5,
                      }}
                    >
                      {f.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ TESTIMONIAL PARALLAX ════ */}
      <div
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: "82vh" }}
      >
        <div
          className="kha-testi-bg absolute inset-0 bg-fixed bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80')",
            filter: "brightness(.3) saturate(.75)",
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom,rgba(24,35,24,.6),rgba(24,35,24,.22),rgba(24,35,24,.65))",
          }}
        ></div>
        <div className="relative z-[2] w-full text-center px-16 py-20">
          <span
            style={{
              fontFamily: cg,
              fontSize: "10rem",
              lineHeight: 0.4,
              color: "#c8a96a",
              opacity: 0.28,
              display: "block",
              marginBottom: "1.3rem",
            }}
          >
            "
          </span>
          <p
            className="kha-reveal"
            style={{
              fontFamily: cg,
              fontSize: "clamp(1.6rem,3.2vw,2.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#fdfaf4",
              maxWidth: "820px",
              margin: "0 auto 2rem",
              lineHeight: 1.55,
            }}
          >
            Through Mysuru Homestay Association, travelers discover authentic
            stays hosted by local families — from wildlife escapes in Kabini to
            peaceful countryside homes in Hunsur and Nanjangud. Real
            hospitality, local culture, and experiences no hotel can replicate.
          </p>
          <div className="kha-reveal kha-d1 flex items-center justify-center gap-5 mb-8">
            <div
              style={{
                width: "38px",
                height: "1px",
                background: "#c8a96a",
                opacity: 0.6,
              }}
            ></div>
            <div>
              <div
                style={{
                  fontSize: ".82rem",
                  letterSpacing: ".25em",
                  textTransform: "uppercase",
                  color: "#c8a96a",
                }}
              >
                Mysuru HomeStays Association
              </div>
              <div
                style={{
                  fontSize: ".74rem",
                  letterSpacing: ".12em",
                  color: "#adc49a",
                }}
              >
                Mysore, Karnataka
              </div>
            </div>
            <div
              style={{
                width: "38px",
                height: "1px",
                background: "#c8a96a",
                opacity: 0.6,
              }}
            ></div>
          </div>
          <a
            href="/explore"
            className="kha-cta-anim-btn kha-reveal kha-d2 inline-flex items-center gap-[.8rem] px-[2.6rem] py-[.9rem] font-semibold"
            style={{
              background: "#c8a96a",
              color: "#182318",
              fontFamily: jost,
              fontSize: ".78rem",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              textDecoration: "none",
              marginTop: "2rem",
            }}
          >
            <span>🏡 Click Here to Book Your Homestay</span>
          </a>
        </div>
      </div>

      {/* ════ MARQUEE ════ */}
      <div className="bg-[#182318] py-14 overflow-hidden">
        <div className="kha-marquee">
          {[...MARQUEE_IMGS, ...MARQUEE_IMGS].map((src, i) => (
            <div
              key={i}
              className="kha-m-img flex-shrink-0 overflow-hidden"
              style={{ width: "270px", height: "175px" }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* ════ DETAIL PAGE ════ */}
      <div id="khaDetailPage" className={detail ? "open" : ""}>
        {detail &&
          (() => {
            const h = detail;
            const wa = `https://wa.me/91${h.phone}?text=Hello%2C%20I%20found%20${encodeURIComponent(h.name)}%20on%20KHA%20and%20would%20like%20to%20book%20a%20stay.%20Please%20share%20availability.`;
            return (
              <>
                <div
                  className="relative overflow-hidden"
                  style={{ height: "72vh" }}
                >
                  <img
                    className="kha-dp-hero-img w-full h-full object-cover"
                    src={h.img}
                    alt={h.name}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom,rgba(24,35,24,.2) 0%,rgba(24,35,24,.05) 40%,rgba(24,35,24,.9) 100%)",
                    }}
                  ></div>
                  <a
                    href="#"
                    className="kha-dp-back absolute z-10 flex items-center gap-[.6rem] transition-all duration-300"
                    style={{
                      top: "96px",
                      left: "4rem",
                      textDecoration: "none",
                      color: "rgba(244,239,229,.75)",
                      fontSize: ".82rem",
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      background: "rgba(24,35,24,.6)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(200,169,106,.22)",
                      padding: ".55rem 1.4rem",
                      cursor: "none",
                    }}
                    onClick={closeDetail}
                  >
                    ← Back to All Homestays
                  </a>
                  <div className="absolute bottom-0 left-0 right-0 px-20 pb-14 pt-12">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <span
                        style={{
                          padding: ".35rem .95rem",
                          fontSize: ".68rem",
                          letterSpacing: ".2em",
                          textTransform: "uppercase",
                          background: "rgba(24,35,24,.72)",
                          border: "1px solid rgba(200,169,106,.38)",
                          color: "#c8a96a",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        {h.type}
                      </span>
                      {h.hasWebsite ? (
                        <span
                          style={{
                            padding: ".35rem .95rem",
                            fontSize: ".68rem",
                            letterSpacing: ".2em",
                            textTransform: "uppercase",
                            background: "rgba(46,74,46,.82)",
                            border: "1px solid rgba(122,158,110,.42)",
                            color: "#adc49a",
                            backdropFilter: "blur(10px)",
                          }}
                        >
                          <Globe
                            size={14}
                            style={{ display: "inline", marginRight: ".3rem" }}
                          />{" "}
                          Has Official Website
                        </span>
                      ) : (
                        <span
                          style={{
                            padding: ".35rem .95rem",
                            fontSize: ".68rem",
                            letterSpacing: ".2em",
                            textTransform: "uppercase",
                            background: "rgba(37,211,102,.15)",
                            border: "1px solid rgba(37,211,102,.4)",
                            color: "#4ade80",
                            backdropFilter: "blur(10px)",
                          }}
                        >
                          <MessageCircle
                            size={14}
                            style={{ display: "inline", marginRight: ".3rem" }}
                          />{" "}
                          WhatsApp Booking
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: cg,
                        fontSize: "clamp(2.6rem,5vw,4.4rem)",
                        fontWeight: 300,
                        color: "#fdfaf4",
                        lineHeight: 1.05,
                        marginBottom: ".55rem",
                      }}
                    >
                      {h.name}
                    </div>
                    <div
                      className="flex items-center gap-[.5rem]"
                      style={{
                        fontSize: ".92rem",
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: "#adc49a",
                      }}
                    >
                      <MapPin size={16} /> {h.taluk} · {h.district} District,
                      Mysore
                    </div>
                  </div>
                </div>

                <div className="kha-dp-body max-w-[1200px] mx-auto px-20 py-16 pb-28">
                  <div
                    className="kha-dp-grid grid gap-16 items-start"
                    style={{ gridTemplateColumns: "1fr 380px" }}
                  >
                    <div>
                      <div
                        className="flex items-center gap-[.9rem] mb-9 pb-8 flex-wrap"
                        style={{
                          borderBottom: "1px solid rgba(200,169,106,.12)",
                        }}
                      >
                        <div className="flex gap-[.2rem]">
                          <Stars rating={h.rating} size=".85rem" />
                        </div>
                        <span
                          style={{
                            fontSize: "1.15rem",
                            color: "#c8a96a",
                            fontWeight: 500,
                            fontFamily: cg,
                          }}
                        >
                          {h.rating}
                        </span>
                        <span
                          style={{
                            fontSize: ".88rem",
                            color: "rgba(244,239,229,.45)",
                          }}
                        >
                          ({h.reviews} verified guest reviews)
                        </span>
                        <div
                          className="ml-auto flex items-center gap-[.4rem]"
                          style={{
                            fontSize: ".75rem",
                            letterSpacing: ".14em",
                            textTransform: "uppercase",
                            color: "#7a9e6e",
                          }}
                        >
                          <CheckCircle2 size={14} /> KHA Verified Member
                        </div>
                      </div>
                      <h3
                        style={{
                          fontFamily: cg,
                          fontSize: "1.65rem",
                          fontWeight: 300,
                          color: "#f4efe5",
                          marginBottom: "1.1rem",
                        }}
                      >
                        About This Homestay
                      </h3>
                      <p
                        style={{
                          fontSize: "1rem",
                          lineHeight: 2,
                          fontWeight: 300,
                          color: "rgba(244,239,229,.75)",
                          marginBottom: "3rem",
                        }}
                      >
                        {h.desc}
                      </p>
                      <h3
                        style={{
                          fontFamily: cg,
                          fontSize: "1.65rem",
                          fontWeight: 300,
                          color: "#f4efe5",
                          marginBottom: "1.1rem",
                        }}
                      >
                        Photo Gallery
                      </h3>
                      <div
                        className="kha-dp-gallery mb-12 overflow-hidden rounded-[4px]"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "2fr 1fr 1fr",
                          gridTemplateRows: "1fr 1fr",
                          gap: ".6rem",
                          height: "370px",
                        }}
                      >
                        {h.imgs.map((src, i) => (
                          <div
                            key={i}
                            className="kha-gal-img overflow-hidden"
                            style={i === 0 ? { gridRow: "1/3" } : {}}
                          >
                            <img
                              src={src}
                              alt={`Photo ${i + 1}`}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <h3
                        style={{
                          fontFamily: cg,
                          fontSize: "1.65rem",
                          fontWeight: 300,
                          color: "#f4efe5",
                          marginBottom: "1.1rem",
                          marginTop: "2.8rem",
                        }}
                      >
                        Amenities & Features
                      </h3>
                      <div
                        className="kha-dp-amen-grid grid gap-[.8rem] mb-12"
                        style={{ gridTemplateColumns: "repeat(3,1fr)" }}
                      >
                        {h.amenities.map((a) => (
                          <div
                            key={a}
                            className="kha-dp-amen-item flex items-center gap-[.9rem] px-5 py-4 transition-all duration-300"
                            style={{
                              background: "rgba(31,46,31,.7)",
                              border: "1px solid rgba(200,169,106,.1)",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "1.35rem",
                                flexShrink: 0,
                                color: "#c8a96a",
                              }}
                            >
                              {AICONS[a]}
                            </span>
                            <span
                              style={{
                                fontSize: ".85rem",
                                color: "rgba(244,239,229,.78)",
                                letterSpacing: ".04em",
                              }}
                            >
                              {a}
                            </span>
                          </div>
                        ))}
                      </div>
                      <h3
                        style={{
                          fontFamily: cg,
                          fontSize: "1.65rem",
                          fontWeight: 300,
                          color: "#f4efe5",
                          marginBottom: "1.1rem",
                          marginTop: "2.8rem",
                        }}
                      >
                        Location
                      </h3>
                      <div
                        className="flex items-center gap-6 px-8 py-6 mb-12"
                        style={{
                          background: "rgba(31,46,31,.65)",
                          border: "1px solid rgba(200,169,106,.12)",
                        }}
                      >
                        <span style={{ fontSize: "2.2rem", flexShrink: 0 }}>
                          <Globe size={32} />
                        </span>
                        <div>
                          <div
                            style={{
                              fontSize: "1.05rem",
                              fontWeight: 500,
                              color: "#f4efe5",
                            }}
                          >
                            {h.taluk}, {h.district} District
                          </div>
                          <div
                            style={{
                              fontSize: ".85rem",
                              color: "rgba(244,239,229,.5)",
                              marginTop: ".2rem",
                            }}
                          >
                            Mysore, India · Western Ghats Region
                          </div>
                          <div className="flex gap-2 mt-3 flex-wrap">
                            {[h.district, `${h.taluk} Taluk`, "Mysore"].map(
                              (tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1"
                                  style={{
                                    border: "1px solid rgba(200,169,106,.2)",
                                    fontSize: ".68rem",
                                    letterSpacing: ".15em",
                                    textTransform: "uppercase",
                                    color: "rgba(244,239,229,.52)",
                                  }}
                                >
                                  {tag}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                      <h3
                        style={{
                          fontFamily: cg,
                          fontSize: "1.65rem",
                          fontWeight: 300,
                          color: "#f4efe5",
                          marginBottom: "1.1rem",
                          marginTop: "2.8rem",
                        }}
                      >
                        Nearby Attractions
                      </h3>
                      <div
                        className="grid gap-[.6rem] mb-12"
                        style={{ gridTemplateColumns: "1fr 1fr" }}
                      >
                        {TOURIST_PLACES.map((p) => ({
                          ...p,
                          dist: haversine(h.lat, h.lng, p.lat, p.lng),
                        }))
                          .sort((a, b) => a.dist - b.dist)
                          .map((p) => (
                            <div
                              key={p.key}
                              className="flex items-center justify-between px-4 py-[.75rem]"
                              style={{
                                background: "rgba(31,46,31,.6)",
                                border: "1px solid rgba(200,169,106,.08)",
                                transition: "border-color .2s",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.borderColor =
                                  "rgba(200,169,106,.28)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.borderColor =
                                  "rgba(200,169,106,.08)")
                              }
                            >
                              <span
                                className="flex items-center gap-[.55rem]"
                                style={{
                                  fontSize: ".82rem",
                                  color: "rgba(244,239,229,.62)",
                                }}
                              >
                                <MapPin
                                  size={12}
                                  style={{ color: "#c8a96a", flexShrink: 0 }}
                                />
                                {p.label}
                              </span>
                              <span
                                className="flex-shrink-0 px-[.6rem] py-[.18rem] ml-2"
                                style={{
                                  fontSize: ".7rem",
                                  fontWeight: 700,
                                  color:
                                    p.dist <= 30
                                      ? "#4ade80"
                                      : p.dist <= 80
                                        ? "#c8a96a"
                                        : "rgba(244,239,229,.38)",
                                  background:
                                    p.dist <= 30
                                      ? "rgba(37,211,102,.1)"
                                      : p.dist <= 80
                                        ? "rgba(200,169,106,.1)"
                                        : "transparent",
                                  border: `1px solid ${p.dist <= 30 ? "rgba(37,211,102,.25)" : p.dist <= 80 ? "rgba(200,169,106,.2)" : "transparent"}`,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {p.dist} km
                              </span>
                            </div>
                          ))}
                      </div>

                      <h3
                        style={{
                          fontFamily: cg,
                          fontSize: "1.65rem",
                          fontWeight: 300,
                          color: "#f4efe5",
                          marginBottom: "1.1rem",
                          marginTop: "2.8rem",
                        }}
                      >
                        Your Host
                      </h3>
                      <div
                        className="flex items-start gap-[1.4rem] px-8 py-[1.8rem] mb-12"
                        style={{
                          background: "rgba(31,46,31,.65)",
                          border: "1px solid rgba(200,169,106,.12)",
                        }}
                      >
                        <div
                          className="flex-shrink-0 overflow-hidden rounded-full"
                          style={{
                            width: "70px",
                            height: "70px",
                            border: "2px solid rgba(200,169,106,.3)",
                          }}
                        >
                          <img
                            src={h.host.avatar}
                            alt={h.host.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div
                            style={{
                              fontFamily: cg,
                              fontSize: "1.4rem",
                              fontWeight: 300,
                              color: "#f4efe5",
                            }}
                          >
                            {h.host.name}
                          </div>
                          <div
                            style={{
                              fontSize: ".75rem",
                              letterSpacing: ".15em",
                              textTransform: "uppercase",
                              color: "#7a9e6e",
                              marginTop: ".2rem",
                            }}
                          >
                            {h.host.since}
                          </div>
                          <div
                            style={{
                              fontSize: ".9rem",
                              lineHeight: 1.8,
                              color: "rgba(244,239,229,.62)",
                              marginTop: ".6rem",
                              fontWeight: 300,
                            }}
                          >
                            {h.host.desc}
                          </div>
                        </div>
                      </div>
                      <h3
                        style={{
                          fontFamily: cg,
                          fontSize: "1.65rem",
                          fontWeight: 300,
                          color: "#f4efe5",
                          marginBottom: "1.1rem",
                          marginTop: "2.8rem",
                        }}
                      >
                        Guest Reviews
                      </h3>
                      <div className="flex flex-col gap-5 mb-12">
                        {h.guestReviews.map((r, i) => (
                          <div
                            key={i}
                            className="px-[1.8rem] py-[1.6rem]"
                            style={{
                              background: "rgba(31,46,31,.55)",
                              border: "1px solid rgba(200,169,106,.1)",
                            }}
                          >
                            <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                              <span
                                style={{
                                  fontSize: ".9rem",
                                  fontWeight: 500,
                                  color: "#f4efe5",
                                }}
                              >
                                {r.name}
                              </span>
                              <div className="flex items-center gap-[.6rem]">
                                <div className="flex gap-[.15rem]">
                                  <Stars rating={r.stars} size=".82rem" />
                                </div>
                                <span
                                  style={{
                                    fontSize: ".75rem",
                                    color: "rgba(244,239,229,.35)",
                                    letterSpacing: ".08em",
                                  }}
                                >
                                  {r.date}
                                </span>
                              </div>
                            </div>
                            <p
                              style={{
                                fontSize: ".92rem",
                                lineHeight: 1.85,
                                color: "rgba(244,239,229,.68)",
                                fontWeight: 300,
                              }}
                            >
                              {r.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="sticky top-[100px]">
                      <div
                        className="px-[2.4rem] py-[2.2rem]"
                        style={{
                          background: "rgba(31,46,31,.82)",
                          border: "1px solid rgba(200,169,106,.22)",
                          backdropFilter: "blur(20px)",
                        }}
                      >
                        <div
                          className="text-center pb-[1.6rem] mb-[1.6rem]"
                          style={{
                            borderBottom: "1px solid rgba(200,169,106,.12)",
                          }}
                        >
                          <span
                            style={{
                              fontSize: ".7rem",
                              letterSpacing: ".28em",
                              textTransform: "uppercase",
                              color: "#7a9e6e",
                              display: "block",
                              marginBottom: ".3rem",
                            }}
                          >
                            Starting from
                          </span>
                          <span
                            style={{
                              fontFamily: cg,
                              fontSize: "3.6rem",
                              fontWeight: 300,
                              color: "#c8a96a",
                              lineHeight: 1,
                            }}
                          >
                            ₹{h.price.toLocaleString("en-IN")}
                          </span>
                          <span
                            style={{
                              fontSize: ".82rem",
                              color: "#adc49a",
                              letterSpacing: ".12em",
                              display: "block",
                              marginTop: ".2rem",
                            }}
                          >
                            per night · direct booking
                          </span>
                        </div>
                        <p
                          className="text-center mb-6"
                          style={{
                            fontSize: ".85rem",
                            lineHeight: 1.8,
                            color: "rgba(244,239,229,.55)",
                          }}
                        >
                          {h.hasWebsite
                            ? "This homestay has an official website for full booking details and availability."
                            : "This homestay books exclusively via WhatsApp. Tap below to start a conversation with the host family directly."}
                        </p>
                        {h.hasWebsite && (
                          <a
                            href={h.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="kha-dp-btn-site flex items-center justify-center gap-[.7rem] w-full py-4 mb-[.7rem] transition-all duration-300"
                            style={{
                              background: "rgba(200,169,106,.14)",
                              border: "1px solid rgba(200,169,106,.38)",
                              color: "#c8a96a",
                              fontFamily: jost,
                              fontSize: ".82rem",
                              letterSpacing: ".2em",
                              textTransform: "uppercase",
                              textDecoration: "none",
                              cursor: "none",
                            }}
                          >
                            <Globe size={16} /> Visit Official Website
                          </a>
                        )}
                        <a
                          href={wa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="kha-dp-btn-wa flex items-center justify-center gap-[.7rem] w-full py-4 mb-6 transition-all duration-300"
                          style={{
                            background: "rgba(37,211,102,.18)",
                            border: "1px solid rgba(37,211,102,.42)",
                            color: "#4ade80",
                            fontFamily: jost,
                            fontSize: ".82rem",
                            letterSpacing: ".2em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            cursor: "none",
                          }}
                        >
                          <MessageCircle size={16} /> Book via WhatsApp
                        </a>
                        <div
                          className="flex flex-col gap-3 pt-6"
                          style={{
                            borderTop: "1px solid rgba(200,169,106,.1)",
                          }}
                        >
                          {[
                            ["Type", h.type, false],
                            ["District", h.district, false],
                            ["Taluk", h.taluk, false],
                            [
                              `Rating`,
                              `${h.rating} ★ · ${h.reviews} reviews`,
                              true,
                            ],
                            [
                              "Booking",
                              h.hasWebsite
                                ? "Website + WhatsApp"
                                : "WhatsApp Only",
                              false,
                            ],
                          ].map(([lbl, val, gold]) => (
                            <div
                              key={lbl}
                              className="flex justify-between items-center"
                            >
                              <span
                                style={{
                                  fontSize: ".75rem",
                                  letterSpacing: ".12em",
                                  textTransform: "uppercase",
                                  color: "rgba(244,239,229,.42)",
                                }}
                              >
                                {lbl}
                              </span>
                              <span
                                style={{
                                  fontSize: ".9rem",
                                  color: gold
                                    ? "#c8a96a"
                                    : "rgba(244,239,229,.75)",
                                }}
                              >
                                {val}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div
                          className="flex items-center gap-3 mt-[1.6rem] p-[1.1rem]"
                          style={{
                            background: "rgba(200,169,106,.07)",
                            border: "1px solid rgba(200,169,106,.15)",
                          }}
                        >
                          <Award size={20} style={{ color: "#c8a96a" }} />
                          <div
                            style={{
                              fontSize: ".8rem",
                              lineHeight: 1.65,
                              color: "rgba(244,239,229,.55)",
                            }}
                          >
                            <strong
                              style={{
                                color: "#c8a96a",
                                display: "block",
                                fontSize: ".72rem",
                                letterSpacing: ".15em",
                                textTransform: "uppercase",
                                marginBottom: ".15rem",
                              }}
                            >
                              MHA Certified
                            </strong>
                            This homestay is a verified member of the Mysore
                            Homestays Association and meets all our quality
                            standards.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
      </div>
    </>
  );
};

export default Home;
