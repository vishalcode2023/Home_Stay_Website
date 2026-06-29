import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";
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
  ChevronRight,
  ArrowLeft,
  Users,
  Bed,
  Bath,
  Wifi,
  Wind,
  Tv,
  Link,
} from "lucide-react";
import FloatBookButton from "../components/FloatBookButton";
import Footer from "../components/Footer";
import Navbar from "./navbar";
import Homerules from "./Homerules";

/* PERF: Cloudinary helper + responsive srcSet generator (same pattern as
   Explore.jsx). Cloudinary URLs get resized/format-optimized at request
   time; non-Cloudinary URLs (local /images/*.jpg etc.) pass through
   untouched so nothing breaks for assets that don't live on Cloudinary. */
const cl = (url, w = 800) => {
  if (!url || !url.startsWith("https://res.cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/w_${w},f_auto,q_auto,c_fill/`);
};
const clSrcSet = (url, widths = [400, 600, 800, 1000, 1400]) => {
  if (!url || !url.startsWith("https://res.cloudinary.com")) return undefined;
  return widths.map((w) => `${cl(url, w)} ${w}w`).join(", ");
};

/* PERF: shared matchMedia hook — one listener for every RoomListCard
   instead of each card attaching its own `resize` listener. */
const MOBILE_QUERY = "(max-width: 768px)";
let mqlSingleton = null;
function getMql() {
  if (typeof window === "undefined") return null;
  if (!mqlSingleton) mqlSingleton = window.matchMedia(MOBILE_QUERY);
  return mqlSingleton;
}
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => getMql()?.matches ?? false);
  useEffect(() => {
    const mql = getMql();
    if (!mql) return;
    const fn = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", fn);
    return () => mql.removeEventListener("change", fn);
  }, []);
  return isMobile;
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  html, body { overflow-x: hidden; max-width: 100%; }
  body {  background: #182318; color: #f4efe5; cursor: none; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #182318; }
  ::-webkit-scrollbar-thumb { background: #c8a96a; }

  .kha-cur { width:9px; height:9px; background:#c8a96a; border-radius:50%; position:fixed; top:0; left:0; pointer-events:none; z-index:9999; transform:translate3d(-50%,-50%,0); }
  .kha-cuf { width:34px; height:34px; border:1px solid rgba(200,169,106,.4); border-radius:50%; position:fixed; top:0; left:0; pointer-events:none; z-index:9998; transform:translate3d(-50%,-50%,0); }

  .kha-reveal { opacity:0; transform:translateY(36px); transition:opacity .85s ease,transform .85s ease; }
  .kha-reveal.in { opacity:1; transform:translateY(0); }
  .kha-d1{transition-delay:.12s;} .kha-d2{transition-delay:.24s;} .kha-d3{transition-delay:.36s;}

  .kha-eyebrow { display:inline-flex; align-items:center; gap:.6rem; font-size:.72rem; letter-spacing:.32em; text-transform:uppercase; color:#c8a96a; margin-bottom:5rem; }
  .kha-eyebrow::before { content:''; width:22px; height:1px; background:#c8a96a; }
  .kha-hero-eyebrow { display:flex; align-items:center; gap:.6rem; font-size:.72rem; letter-spacing:.32em; text-transform:uppercase; color:#c8a96a; margin-bottom:.8rem; }
  .kha-hero-eyebrow::before { content:''; width:28px; height:1px; background:#c8a96a; flex-shrink:0; }

  .kha-cred-block { padding:.75rem 1.2rem; background:rgba(24,35,24,.55); border:1px solid rgba(200,169,106,.2); backdrop-filter:blur(8px); margin-bottom:1.1rem; }
  .kha-cred-title { font-size:13px; font-weight:600; color:#e0c88a; text-align:center; margin-bottom:12px; line-height:1.4; }
  .kha-cred-logos { display:flex; align-items:center; justify-content:center; gap:16px; flex-wrap:wrap; }
  .kha-cred-logos img { height:55px; width:auto; object-fit:contain; flex-shrink:0; transform: scale(1.2);  }

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
  .kha-hero-book-btn { animation:heroBtnPulse 2.8s ease-in-out infinite; position:relative; overflow:hidden; }
  .kha-hero-book-btn span { position:relative; z-index:1; }
  .kha-hero-book-btn:hover { background:#e0c88a !important; transform:translateY(-2px); animation-play-state:paused; }

  @keyframes ctaBtnGlow { 0%,100%{box-shadow:0 4px 20px rgba(200,169,106,.3);} 50%{box-shadow:0 8px 40px rgba(200,169,106,.65);} }
  @keyframes shimmer { 0%{left:-100%;} 100%{left:160%;} }
  .kha-cta-anim-btn { animation:ctaBtnGlow 3s ease-in-out infinite; position:relative; overflow:hidden; cursor:none; }
  .kha-cta-anim-btn::before { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent); animation:shimmer 3s ease-in-out infinite 1s; z-index:0; }
  .kha-cta-anim-btn:hover { background:#e0c88a !important; transform:translateY(-2px); }
  .kha-cta-anim-btn span { position:relative; z-index:1; }

  /* Explore cards */
  .kha-card { transition:transform .4s,border-color .4s,box-shadow .4s; cursor:none; }
  .kha-card:hover { transform:translateY(-7px); border-color:rgba(200,169,106,.32) !important; box-shadow:0 20px 60px rgba(0,0,0,.35); }
  .kha-card:hover .kha-card-img { transform:scale(1.09); }
  .kha-card-img { transition:transform .7s; }
  .kha-card-img-wrap { border-radius:52px 52px 0 0; }
  .kha-card:hover .kha-price-overlay { opacity:1; }

  /* Trust strip */
  .kha-trust-card { display:flex; align-items:flex-start; gap:1rem; flex:1 1 260px; max-width:360px; padding:1.6rem 1.8rem; border:1px solid rgba(200,169,106,.22); background:rgba(200,169,106,.07); }
  .kha-trust-icon { width:62px; height:62px; border:1px solid rgba(200,169,106,.4); border-radius:50%; background:rgba(200,169,106,.1); overflow:hidden; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
  .kha-trust-icon img { width:62px; height:62px; object-fit:contain; }

  /* Detail + Room slides */
  #khaDetailPage { position:fixed; inset:0; z-index:2000; background:#182318; overflow-y:auto; overflow-x:hidden; transform:translateX(100%); transition:transform .65s cubic-bezier(.22,1,.36,1); }
  #khaDetailPage.open { transform:translateX(0); }
  #khaRoomPage { position:fixed; inset:0; z-index:3000; background:#182318; overflow-y:auto; overflow-x:hidden; transform:translateX(100%); transition:transform .6s cubic-bezier(.22,1,.36,1); }
  #khaRoomPage.open { transform:translateX(0); }

  /* Room list cards */
  .kha-room-card { display:flex; overflow:hidden; border:1px solid rgba(200,169,106,.12); background:#1f2e1f; transition:border-color .35s,transform .35s,box-shadow .35s; cursor:none; border-radius:4px; }
  .kha-room-card:hover { border-color:rgba(200,169,106,.42); transform:translateY(-4px); box-shadow:0 18px 50px rgba(0,0,0,.45); }
  .kha-room-card:hover .kha-room-img { transform:scale(1.06); }
  .kha-room-img { transition:transform .7s; }

  /* PERF: static hover/layout rules for RoomListCard extracted into real
     CSS classes (identical values to the original inline styles) so the
     browser can cache rule application instead of recomputing fresh style
     objects on every render/hover state change. */
  .kha-rlc2 {
    display:grid;
    overflow:hidden;
    background:#1c2d1c;
    box-shadow:0 4px 20px rgba(0,0,0,.25);
    transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s cubic-bezier(.22,1,.36,1),background .4s cubic-bezier(.22,1,.36,1);
    cursor:pointer;
    position:relative;
    grid-template-columns:340px 1fr;
  }
  .kha-rlc2:hover { background:rgba(31,46,31,.95); transform:translateY(-5px); box-shadow:0 24px 64px rgba(0,0,0,.5); }
  .kha-rlc2-img-wrap { position:relative; overflow:hidden; height:440px; }
  .kha-rlc2-img { width:100%; height:100%; object-fit:cover; transition:transform .8s cubic-bezier(.22,1,.36,1); transform:scale(1); }
  .kha-rlc2:hover .kha-rlc2-img { transform:scale(1.08); }
  .kha-rlc2-watermark { opacity:.12; transition:opacity .4s; }
  .kha-rlc2:hover .kha-rlc2-watermark { opacity:.22; }
  .kha-rlc2-title { color:#e8e2d4; transition:color .3s; }
  .kha-rlc2:hover .kha-rlc2-title { color:#fdfaf4; }
  .kha-rlc2-tagrow { border-top:1px solid rgba(200,169,106,.08); transition:border-color .3s; }
  .kha-rlc2:hover .kha-rlc2-tagrow { border-color:rgba(200,169,106,.2); }
  @media(max-width:768px){
    .kha-rlc2 { grid-template-columns:1fr; }
    .kha-rlc2:hover { transform:none; }
    .kha-rlc2-img-wrap { height:200px; }
  }

  /* 6-img mosaic */
  .kha-mosaic { display:grid; grid-template-columns:2fr 1fr 1fr; grid-template-rows:230px 180px; gap:.55rem; border-radius:4px; overflow:hidden; margin-bottom:2.4rem; }
  .kha-mosaic-main { grid-row:1/3; overflow:hidden; }
  .kha-mosaic-cell { overflow:hidden; }
  .kha-mosaic img { width:100%; height:100%; object-fit:cover; transition:transform .6s; }
  .kha-mosaic-main:hover img,.kha-mosaic-cell:hover img { transform:scale(1.06); }

  /* Amenity items */
  .kha-amen-item { display:flex; align-items:center; gap:.75rem; padding:.85rem 1.1rem; background:rgba(31,46,31,.7); border:1px solid rgba(200,169,106,.1); transition:border-color .3s; }
  .kha-amen-item:hover { border-color:rgba(200,169,106,.3); }

  /* Shared buttons */
  .kha-back-btn { display:inline-flex; align-items:center; gap:.55rem; text-decoration:none; color:rgba(244,239,229,.72); font-size:.76rem; letter-spacing:.2em; text-transform:uppercase; background:rgba(31,46,31,.7); border:1px solid rgba(200,169,106,.22); padding:.5rem 1.4rem; transition:color .3s,border-color .3s; cursor:none; }
  .kha-back-btn:hover { color:#c8a96a; border-color:#c8a96a; }
  .kha-btn-wa { display:flex; align-items:center; justify-content:center; gap:.6rem; padding:.85rem 1.6rem; background:rgba(37,211,102,.18); border:1px solid rgba(37,211,102,.42); color:#4ade80;  font-size:.78rem; letter-spacing:.18em; text-transform:uppercase; text-decoration:none; transition:background .3s; cursor:none; }
  .kha-btn-wa:hover { background:rgba(37,211,102,.32); }
  .kha-btn-web { display:flex; align-items:center; justify-content:center; gap:.6rem; padding:.85rem 1.6rem; background:rgba(200,169,106,.14); border:1px solid rgba(200,169,106,.38); color:#c8a96a; font-size:.78rem; letter-spacing:.18em; text-transform:uppercase; text-decoration:none; transition:background .3s; cursor:none; }
  .kha-btn-web:hover { background:rgba(200,169,106,.28); }

  /* Explore cards grid */
  .kha-cards-grid { grid-template-columns: repeat(3,1fr); }

  /* Credentials */
  .kha-cred-outer { padding: 5.5rem 4rem; }

  /* Detail two-col */
  .kha-detail-two-col { grid-template-columns: 420px 1fr; }

  /* ─── Detail page topbar ─── */
  .dp-topbar { padding: .85rem 3rem; }

  /* ─── Detail page inner ─── */
  .dp-inner-wrap { padding: 3rem 3rem 6rem; }

  /* ─── Room detail inner ─── */
  .rdp-inner { padding: 3rem 3rem 6rem 1rem; }

  @media(max-width:900px){
    body { cursor:auto !important; }
    .kha-cur,.kha-cuf { display:none !important; }
    .kha-about-grid { grid-template-columns:1fr !important; }
    .kha-cards-grid { grid-template-columns:repeat(2,1fr) !important; }
    .kha-ts-inner { flex-direction:column !important; align-items:stretch !important; }
    .kha-trust-card { max-width:100% !important; }
    .kha-detail-grid { grid-template-columns:1fr !important; }
    .kha-detail-two-col { grid-template-columns:1fr !important; }
    .kha-mosaic { grid-template-rows:180px 140px !important; }
    .kha-hero { margin-top:0 !important; padding-top:90px; box-sizing:border-box; height:auto !important; min-height:100vh; display:flex; flex-direction:column; justify-content:flex-end; }
    .kha-hero-card { position:relative !important; bottom:auto !important; left:auto !important; max-width:none !important; margin:auto 1rem 2.5rem !important; padding:1.4rem !important; }
    .kha-hero-book-btn { display:none !important; }

    /* Detail page topbar */
    .dp-topbar { padding:.75rem 1.2rem !important; gap:.7rem !important; }
    .dp-topbar-name { font-size:.95rem !important; }
    .dp-topbar-ratings { display:none !important; }

    /* Detail page inner padding */
    .dp-inner-wrap { padding:1.5rem 1rem 5rem !important; }
    .rdp-inner { padding:1.5rem 1rem 5rem !important; }

    /* Detail two-col — stack vertically on mobile */
    .kha-detail-two-col { grid-template-columns:1fr !important; gap:1.5rem !important; }

    /* Left sticky col — unstick on mobile */
    .kha-detail-left-sticky { position:static !important; top:auto !important; }

    /* Room detail right col grid */
    .kha-room-detail-grid { grid-template-columns:1fr !important; gap:1.5rem !important; }
    .kha-room-booking-sticky { position:static !important; top:auto !important; }

    /* Hero strip in detail */
    .kha-detail-hero-strip { height:220px !important; }
    .kha-detail-hero-bottom { left:1.2rem !important; right:1.2rem !important; bottom:1.2rem !important; }

    .kha-rl-card { grid-template-columns:1fr !important; }
    .kha-rl-card-img { height:200px !important; }
    .kha-cred-outer { padding:3rem 0 !important; }
    .kha-cred-inner { grid-template-columns:1fr !important; gap:1.4rem !important; padding:1.8rem !important; text-align:center; }
    .kha-cred-logo { margin:0 auto !important; }
    .kha-cred-text { font-size:1.15rem !important; }
    .kha-browse-section { padding-left:1.2rem !important; padding-right:1.2rem !important; padding-top:4rem !important; padding-bottom:4rem !important; }

    /* Mosaic on mobile */
    .kha-mosaic { grid-template-columns:1fr 1fr !important; grid-template-rows:160px 120px !important; }
    .kha-mosaic-main { grid-row:auto !important; grid-column:1/3 !important; }

    /* Room nearby attractions — 1 col */
    .kha-nearby-grid { grid-template-columns:1fr !important; }

    /* Amenity grid */
    .kha-amen-grid { grid-template-columns:1fr !important; }

    /* Booking card full width on mobile */
    .kha-booking-card { width:100% !important; }
  }

  @media(max-width:768px){
    body { cursor:auto !important; }
    .kha-cur,.kha-cuf { display:none !important; }
    .px-16 { padding-left:1.5rem !important; padding-right:1.5rem !important; }
    .kha-browse-section { padding-left:1rem !important; padding-right:1rem !important; }
    .kha-cards-grid { grid-template-columns:repeat(2,1fr) !important; gap:1rem !important; }
    .kha-mosaic { grid-template-columns:1fr 1fr !important; grid-template-rows:160px 120px 120px !important; }
    .kha-mosaic-main { grid-row:auto !important; grid-column:1/3 !important; }
    .kha-rl-card { grid-template-columns:1fr !important; }
    .kha-rl-card-img { height:190px !important; }
    .kha-cred-inner { grid-template-columns:1fr !important; gap:1.2rem !important; padding:1.5rem !important; text-align:center; }
    .kha-cred-logo { margin:0 auto !important; }
    .kha-cred-text { font-size:1.05rem !important; }

    /* Detail page topbar compact */
    .dp-topbar { padding:.65rem 1rem !important; }
    .dp-topbar-back-text { display:none !important; }
    .dp-topbar-back-icon { display:inline-flex !important; }

    /* Inner padding tighter */
    .dp-inner-wrap { padding:1.2rem .9rem 5rem !important; }
    .rdp-inner { padding:1.2rem .9rem 5rem !important; }
  }

  @media(max-width:560px){
    body { cursor:auto !important; }
    .kha-cur,.kha-cuf { display:none !important; }
    .kha-cards-grid { grid-template-columns:1fr !important; }
    .kha-browse-section { padding-left:.9rem !important; padding-right:.9rem !important; padding-top:3rem !important; padding-bottom:3rem !important; }
    .kha-cred-inner { padding:1.2rem !important; }
    .kha-cred-text { font-size:1rem !important; }
    .dp-inner-wrap { padding:1rem .75rem 5rem !important; }
    .rdp-inner { padding:1rem .75rem 5rem !important; }
    .kha-detail-hero-strip { height:180px !important; }
  }

  @media(max-width:480px){
    body { cursor:auto !important; }
    .kha-cur,.kha-cuf { display:none !important; }
    .px-16 { padding-left:1rem !important; padding-right:1rem !important; }
    .kha-mosaic { grid-template-columns:1fr !important; grid-template-rows:repeat(6,150px) !important; }
    .kha-mosaic-main { grid-row:auto !important; grid-column:auto !important; }
    .kha-rl-card { grid-template-columns:1fr !important; }
    .kha-rl-card-img { height:180px !important; }
  }

  /* Respect reduced-motion preference without altering default visuals */
  @media (prefers-reduced-motion: reduce) {
    .kha-cur, .kha-cuf { display:none; }
    .kha-reveal { transition:none; opacity:1; transform:none; }
    .kha-hero-book-btn, .kha-cta-anim-btn, .kha-marquee, .kha-scroll-line { animation:none; }
    * { scroll-behavior:auto !important; }
  }
`;

const cg = "'Cormorant Garamond',serif";
const jost = "'Jost',sans-serif";

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

function haversine(la1, ln1, la2, ln2) {
  const R = 6371,
    dLa = ((la2 - la1) * Math.PI) / 180,
    dLn = ((ln2 - ln1) * Math.PI) / 180;
  const a =
    Math.sin(dLa / 2) ** 2 +
    Math.cos((la1 * Math.PI) / 180) *
      Math.cos((la2 * Math.PI) / 180) *
      Math.sin(dLn / 2) ** 2;
  return +(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
}

/* PERF: module-level memoized "nearest places" lookup, shared by HsCard and
   RoomDetail. Previously each component re-ran the full map+sort of
   TOURIST_PLACES (14 haversine calls) on every single render with zero
   caching. Now it's computed once per (lat,lng) and reused. */
const _nearestCache = new Map();
function nearestPlaces(lat, lng) {
  const key = `${lat},${lng}`;
  let cached = _nearestCache.get(key);
  if (!cached) {
    cached = TOURIST_PLACES.map((p) => ({
      ...p,
      dist: haversine(lat, lng, p.lat, p.lng),
    })).sort((a, b) => a.dist - b.dist);
    _nearestCache.set(key, cached);
  }
  return cached;
}

const AICONS = {
  "Meals Included": <UtensilsCrossed size={17} />,
  "Swimming Pool": <Waves size={17} />,
  "Nature Trails": <Mountain size={17} />,
  Bonfire: <Flame size={17} />,
  "Mountain View": <Mountain size={17} />,
  "River Access": <Waves size={17} />,
  "Coffee Estate": <Coffee size={17} />,
  "Wildlife Zone": <Bird size={17} />,
  "Stargazing Deck": <Moon size={17} />,
  "Heritage Architecture": <Building2 size={17} />,
  "Yoga Space": <Heart size={17} />,
  "Air Conditioning": <Wind size={17} />,
  "Free WiFi": <Wifi size={17} />,
  "Smart TV": <Tv size={17} />,
  "Private Bathroom": <Bath size={17} />,
};

/* ── 3 Room types — each with its own 6 images ── */
const ROOM_TYPES = {
  // Kukkeshree — id: 1
  1: [
    {
      key: "deluxe",
      name: "ನೆಲಮಳಿಗೆ (Nela Maalige) – Ground Floor 2BHK",
      tag: "Most Popular",
      tagBg: "rgba(200,169,106,.16)",
      tagBorder: "rgba(200,169,106,.4)",
      tagColor: "#c8a96a",
      accentColor: "#c8a96a",
      multiplier: 1,
      guests: 2,
      beds: 2,
      sqft: 280,
      desc: "ನೆಲಮಳಿಗೆ is a fully furnished ground floor 2BHK...",
      amenities: [
        "Fully equipped Italian-style kitchen",
        "2 bedrooms with one attached Toilet & Common bathroom",
        "Solar + gas geyser",
        "Smart TV & WiFi",
        "Covered parking",
        "Swiggy / Zomato / Ola / Uber accessible",
        "Floor plan Available on Request",
      ],
      imgs: [
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568052/nela1_tcnuw9.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568051/nela2_hmycql.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568052/nela3_mplrru.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568054/nela4_vgutqh.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568054/nela5_ujuxqf.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568052/nela6_k86nct.png",
      ],
    },
    {
      key: "family",
      name: "ಮಹಡಿಮನೆ (Mahadimane) – First Floor 2BHK",
      tag: "Best for Families",
      tagBg: "rgba(122,158,110,.15)",
      tagBorder: "rgba(122,158,110,.4)",
      tagColor: "#adc49a",
      accentColor: "#7a9e6e",
      multiplier: 1.55,
      guests: 4,
      beds: 2,
      sqft: 420,
      desc: "ಮಹಡಿಮನೆ is a first floor 2BHK homestay...",
      amenities: [
        "Fully equipped kitchen",
        "2 bedrooms with attached bathrooms",
        "Solar / geyser hot water",
        "Smart TV & WiFi",
        "Covered parking",
        "Online delivery & cab services available",
      ],
      imgs: [
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568040/mad1_oc3yub.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568042/mad2_ppf8j2.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568044/mad3_l7oow3.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568041/mad4_an47qg.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568042/mad5_fo87g5.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568042/mad2_ppf8j2.png",
      ],
    },
    {
      key: "suite",
      name: "ತಾರಸಿಮನೆ (Thaarasimane) – Studio (Top Floor)",
      tag: "Premium",
      tagBg: "rgba(200,169,106,.28)",
      tagBorder: "#c8a96a",
      tagColor: "#fdfaf4",
      accentColor: "#e0c88a",
      multiplier: 2.1,
      guests: 2,
      beds: 1,
      sqft: 520,
      desc: "ತಾರಸಿಮನೆ is a compact studio apartment on the top floor...",
      amenities: [
        "Compact kitchen with induction stove",
        "Indian toilet / Bathroom with solar / geyser hot water",
        "Smart TV & WiFi",
        "Covered parking",
        "Swiggy / Zomato / Ola / Uber serviceable",
      ],
      imgs: [
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568065/thar1_dl5jec.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568064/thar2_t50syx.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568065/thar3_u4jqm0.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568065/thar4_yqiooz.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568066/thar5_z6sipg.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568067/thar6_b16ndu.png",
      ],
    },
  ],

  // Sky House — id: 2
  2: [
    {
      key: "1bhk_garden",
      name: "1 BHK Family Room – Garden View",
      tag: "Best Value",
      tagBg: "rgba(200,169,106,.16)",
      tagBorder: "rgba(200,169,106,.4)",
      tagColor: "#c8a96a",
      accentColor: "#c8a96a",
      multiplier: 1,
      guests: 5,
      beds: 1,
      sqft: 320,
      desc: "A spacious ground floor 1BHK with a beautiful garden view, ideal for families, couples, and small groups visiting Mysore. Non-air-conditioned with excellent natural ventilation. Fully equipped for a comfortable self-catering stay with modern conveniences throughout.",
      amenities: [
        "Ground Floor Accommodation",
        "Free WiFi",
        "Smart TV",
        "Private Bathroom",
        "Free Parking",
        "Washing Machine",
        "24hr Hot Water",
        "Electric Kettle",
        "Fully Equipped Kitchen",
        "Garden View",
        "Accommodates up to 5 Guests",
      ],
      imgs: [
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568054/skyhouse-1bhk-2_iljusy.jpg",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568057/skyhouse-1bhk-3_p5knff.jpg",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568057/skyhouse-1bhk-4_zl5t6b.jpg",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568055/skyhouse-1bhk-5_ogghem.jpg",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568056/skyhouse-1bhk-6_h77p4u.jpg",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568059/skyhouse-1bhk-7_gqwijk.jpg",
      ],
    },
    {
      key: "2bhk_ac",
      name: "2 BHK Deluxe AC Apartment",
      tag: "Most Popular",
      tagBg: "rgba(122,158,110,.15)",
      tagBorder: "rgba(122,158,110,.4)",
      tagColor: "#adc49a",
      accentColor: "#7a9e6e",
      multiplier: 1.6,
      guests: 4,
      beds: 2,
      sqft: 480,
      desc: "A premium second floor 2BHK apartment with air conditioning in both bedrooms and a private sit-out balcony. Perfect for families, corporate travelers, and groups wanting extra privacy and comfort. Two bathrooms and a fully equipped kitchen included.",
      amenities: [
        "Air Conditioning",
        "Private Balcony",
        "Free WiFi",
        "Smart TV",
        "Private Bathroom",
        "Free Parking",
        "24hr Hot Water",
        "Electric Kettle",
        "Fully Equipped Kitchen",
        "Private Sit‑Out Balcony",
        "Second Floor Apartment",
      ],
      imgs: [
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568058/skyhouse-2bhk-1_ho7ft8.jpg",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568057/skyhouse-2bhk-2_sbx9ip.jpg",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568058/skyhouse-2bhk-3_abjly7.jpg",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568068/skyhouse-2bhk-4_rubmr7.jpg",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568059/skyhouse-2bhk-5_pa0pxt.jpg",
      ],
    },
  ],

  // Kracadawna — id: 3
  3: [
    {
      key: "dragonfly",
      name: "The Dragonfly Room",
      tag: "Most Popular",
      tagBg: "rgba(200,169,106,.16)",
      tagBorder: "rgba(200,169,106,.4)",
      tagColor: "#c8a96a",
      accentColor: "#c8a96a",
      multiplier: 1,
      guests: 4,
      beds: 1,
      sqft: 340,
      desc: "A cozy room with a loft, queen-size bed, single bed, and attached bathroom with a small curated library. Easily houses 4 adults. Stay includes organic farm-to-table meals (3 a day), bed tea/coffee, guided farm walk, and a boat ride on the Nugu river. Minimum 2-night stay.",
      amenities: [
        "Meals Included",
        "Free WiFi",
        "Private Bathroom",
        "Nature Trails",
        "Wildlife Zone",
        "Stargazing Deck",
      ],
      imgs: [
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568027/krac-dragonfly-1_diyejb.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568029/krac-dragonfly-2_hwrw1e.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568029/krac-dragonfly-3_ggkb5m.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568030/krac-dragonfly-4_itwdff.png",
      ],
    },
    {
      key: "firefly",
      name: "The Firefly Room",
      tag: "Best for Families",
      tagBg: "rgba(122,158,110,.15)",
      tagBorder: "rgba(122,158,110,.4)",
      tagColor: "#adc49a",
      accentColor: "#7a9e6e",
      multiplier: 1,
      guests: 4,
      beds: 1,
      sqft: 340,
      desc: "A warm, character-filled room with a loft, queen-size bed, single bed, attached bathroom, and an in-room library. Identical in comfort to the Dragonfly but with its own unique personality. All stays include organic meals, farm walk, and Nugu river boat ride. Minimum 2-night stay.",
      amenities: [
        "Meals Included",
        "Free WiFi",
        "Private Bathroom",
        "Nature Trails",
        "Wildlife Zone",
        "Stargazing Deck",
      ],
      imgs: [
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568030/krac-firefly-1_ytrpc4.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568031/krac-firefly-2_ge2wtc.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568033/krac-firefly-3_jf0wgw.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568033/krac-firefly-4_tfo5zg.png",
      ],
    },
    {
      key: "day_visit",
      name: "Day Visit Experience",
      tag: "No Overnight",
      tagBg: "rgba(200,169,106,.28)",
      tagBorder: "#c8a96a",
      tagColor: "#fdfaf4",
      accentColor: "#e0c88a",
      multiplier: 0.36,
      guests: 6,
      beds: 0,
      sqft: 0,
      desc: "Join Kracadawna for a full farm day (10:30am – 3pm). Includes welcome refreshments, guided farm tour, organic lunch with freshly harvested vegetables, herbal tea, and seasonal activities like fruit picking, composting, jaggery making (winter), and harvest. Minimum 6 members required.",
      amenities: [
        "Meals Included",
        "Nature Trails",
        "Wildlife Zone",
        "Yoga Space",
      ],
      imgs: [
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568038/krac-dayvisit-2_zdhkij.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568036/krac-dayvisit-3_lmpepf.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568038/krac-dayvisit-4_m0rlwx.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568038/krac-dayvisit-5_neozax.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568039/krac-dayvisit-6_nlokr8.png",
      ],
    },
  ],

  4: [
    {
      key: "nature_cottage",
      name: "The Serene Nature Cottages",
      tag: "Category 1",
      tagBg: "rgba(200,169,106,.16)",
      tagBorder: "rgba(200,169,106,.4)",
      tagColor: "#c8a96a",
      accentColor: "#c8a96a",
      multiplier: 1,
      guests: 4,
      beds: 2,
      sqft: null,
      desc: "For smaller groups or standalone travelers searching for an intimate nature retreat, 1000 Silvers presents independent Nature Cottages. These standalone structural units balance modern climate comfort with a direct view of the farm's chess-patterned flagstone lawns.",
      amenities: [
        "Four-poster canopy bed with double bunk beds",
        "Full air conditioning",
        "Wall-mounted Smart TV",
        "Mini-refrigerator",
        "Dressing area",
        "Private brick-lined veranda sit-out",
        "View of chess-patterned flagstone lawns",
      ],
      imgs: [
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568060/Sliverhomestay1_xmyixc.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568067/Sliverhomestay2_rdsi4g.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568061/Sliverhomestay3_uvfthp.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568061/Sliverhomestay4_akl9rx.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568061/Sliverhomestay5_hvydve.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568062/Sliverhomestay6_ieay0j.png",
      ],
    },
    {
      key: "ac_villa",
      name: "Premium 2 BHK AC Villa",
      tag: "Category 2",
      tagBg: "rgba(122,158,110,.15)",
      tagBorder: "rgba(122,158,110,.4)",
      tagColor: "#adc49a",
      accentColor: "#7a9e6e",
      multiplier: 1.8,
      guests: 8,
      beds: 6,
      sqft: null,
      desc: "Purposefully engineered for guest clusters, family staycations, and group gatherings as a single, fully integrated booking. The villa blends vast social seating interiors with serene green window views and accommodates up to 8 guests.",
      amenities: [
        "2 king-size beds & 4 bunk beds",
        "Full air conditioning",
        "Sunlit luxury seating hall",
        "Traditional wooden sofas & premium accent carpets",
        "Wall-mounted Smart LED TV",
        "WiFi",
        "Green window views",
      ],
      imgs: [
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568062/Sliverhomestay7_lub9tr.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568062/Sliverhomestay8_ohmrpm.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568063/Sliverhomestay10_hrttwx.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568061/Sliverhomestay4_akl9rx.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568061/Sliverhomestay5_hvydve.png",
      ],
    },
    {
      key: "event_venue",
      name: "Elite Event & Celebration Venue",
      tag: "Events & Functions",
      tagBg: "rgba(200,169,106,.28)",
      tagBorder: "#c8a96a",
      tagColor: "#fdfaf4",
      accentColor: "#e0c88a",
      multiplier: null,
      guests: null,
      beds: 0,
      sqft: null,
      desc: "Beyond standard holiday stays, 1000 Silvers acts as a premier venue for private or corporate retreats, birthday bashes, pre-wedding cocktail functions, and social reunions. Our extensive infrastructure is configured to host vibrant family events flawlessly.",
      amenities: [
        "Grand Outdoor Event Lawns",
        "Bonfire Pit & Karaoke Stage",
        "Gourmet Culinary Serving Window",
        "High-Power Sound Speakers",
        "Stage Mood Lighting",
        "Custom Gazebos",
        "Banquet Seating Layouts",
        "Formal Stage Frames",
      ],
      eventFeatures: [
        {
          title: "Grand Outdoor Event Lawns",
          desc: "Vast perfectly manicured grass lawns ready to accommodate dynamic banquet seating layouts, custom gazebos, and formal stage frames for group programs.",
        },
        {
          title: "Bonfire Pit & Karaoke Stage",
          desc: "Unwind under the Mysuru starlight by our specialized brick sunken fire pit, flanked by an integrated presentation audio setup, high-power sound speakers, and vibrant stage mood lighting blocks.",
        },
        {
          title: "Gourmet Culinary Serving Window",
          desc: "A modern counter server hub linking kitchen setups directly with outdoor paths for fluid catering transitions.",
        },
      ],
      imgs: [
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568033/event1_koddhb.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568033/event_ajrtgt.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568033/event3_xcptfw.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568061/Sliverhomestay4_akl9rx.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568061/Sliverhomestay5_hvydve.png",
      ],
    },
  ],

  5: [
    {
      key: "second_floor_2bhk",
      name: "Second Floor 2BHK",
      tag: "Most Popular",
      tagBg: "rgba(200,169,106,.16)",
      tagBorder: "rgba(200,169,106,.4)",
      tagColor: "#c8a96a",
      accentColor: "#c8a96a",
      multiplier: 1,
      guests: 4,
      beds: 2,
      sqft: null,
      desc: "A fully furnished second-floor 2BHK designed for families seeking comfort, privacy, and convenience. Spacious and well-ventilated with a unique blend of modern and vintage charm, along with a beautiful sit-out area. Suitable for both short-term and long-term stays.",
      amenities: [
        "2-bedroom with one attached bathroom (accessible from both rooms with safety lock)",
        "Fully equipped kitchen with oven, gas stove & cylinder, refrigerator, hot water kettle, and utensils",
        "Solar + Gas geyser",
        "TV & WiFi",
        "Spacious and beautiful lounge area",
        "AC available at additional charge",
        "Restaurants within 5–8 min walk",
        "Swiggy, Zomato, Blinkit, Zepto, Ola, and Uber accessible",
      ],
      imgs: [
        "/images/mol.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568049/mol1_genjin.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568049/mol2_ts3l8h.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568049/mol3_hyse65.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568049/mol4_sjmwzm.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568050/mol5_wyqgsp.png",
      ],
    },
    {
      key: "first_floor_2bhk",
      name: "Moodalamane 1 – First Floor 2BHK",
      tag: "Best for Families",
      tagBg: "rgba(122,158,110,.15)",
      tagBorder: "rgba(122,158,110,.4)",
      tagColor: "#adc49a",
      accentColor: "#7a9e6e",
      multiplier: 1,
      guests: 8,
      beds: 2,
      sqft: null,
      desc: "A bright, airy, and peaceful first-floor 2BHK homestay. Well-ventilated and naturally lit, perfect for families looking for a calm and homely stay. Located in a safe residential locality. Up to 4 additional guests can be accommodated at extra charges.",
      amenities: [
        "2-bedroom with one attached bathroom and one common washroom",
        "Fully equipped kitchen with oven, gas stove & cylinder, refrigerator, and electric kettle",
        "Solar + Gas geyser",
        "TV & WiFi",
        "Air cooler and ceiling fan in one room; ceiling and pedestal fan in other room",
        "Restaurants within 5–8 min walk",
        "Swiggy, Zomato, Blinkit, Zepto, Ola, and Uber accessible",
      ],
      imgs: [
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568050/mol6_vzv8sm.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568050/mol7_m1rhsg.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568050/mol8_rwuygz.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568050/mol9_vvzgz5.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568051/mol10_v4wffd.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568051/mol11_czg8q9.png",
      ],
    },
  ],

  // Aastha Homestay — id: 6
  6: [
    {
      key: "family_room",
      name: "Family Room",
      tag: "Best for Families",
      tagBg: "rgba(122,158,110,.15)",
      tagBorder: "rgba(122,158,110,.4)",
      tagColor: "#adc49a",
      accentColor: "#7a9e6e",
      multiplier: 1,
      guests: 3,
      beds: 1,
      sqft: null,
      desc: "Spacious and well-appointed family rooms set across a lush 1-acre property with mango groves, coconut trees, and sapota. Features a charming all-round verandah, sprawling garden, and in-house dining. 3 identical rooms available. Check-in: 12:00 PM | Check-out: 11:00 AM.",
      amenities: [
        "1 Queen size bed + 1 sofa-cum-bed",
        "Accommodates up to 3 guests",
        "Air Conditioning",
        "In-house kitchen and dining serving delicious cuisine",
        "Breakfast included",
        "All-round verandah",
        "Sprawling garden area",
        "Outdoor sports: cricket, badminton, and others",
        "Evening campfire setup (weather permitting)",
        "Securely fenced 1-acre property",
      ],
      imgs: [
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568028/ask_r0zha5.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568028/ask1_upiuxy.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568028/ask2_xfvdrq.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568027/ask3_q8jded.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568029/ask4_rd8dpf.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568029/ask5_n6qhrc.png",
      ],
    },
  ],

  // Bolak Homestay — id: 7
  7: [
    {
      key: "heritage_suite",
      name: "The Heritage Suite",
      tag: "AC Suite",
      tagBg: "rgba(200,169,106,.16)",
      tagBorder: "rgba(200,169,106,.4)",
      tagColor: "#c8a96a",
      accentColor: "#c8a96a",
      multiplier: 1,
      guests: 2,
      beds: 1,
      sqft: null,
      desc: "A spotless, minimalist AC suite featuring joined platform twin beds forming a vast King setup, set on mirror-sheen dark vitrified floors with pristine white linens. Designed around 'Pure Illumination' — large open casement layouts maximizing natural daylight and fresh air flow.",
      amenities: [
        "King-size platform bed setup with pristine white linens",
        "Air Conditioning",
        "Mirror-sheen dark vitrified floors",
        "Modular kitchenette with electric kettle, induction, water pitcher, granite counter",
        "Private 2-seater dining table",
        "Pristine western restroom with high-pressure hot water",
        "Smart TV",
        "WiFi",
      ],
      imgs: [
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568031/bol_jgonwe.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568030/bol1_yqcxw5.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568030/bol2_femzvk.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568031/bol3_aenoam.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568031/bol_jgonwe.png",
      ],
    },
    {
      key: "royal_balcony_suite",
      name: "Royal Balcony Suite",
      tag: "Non-AC Suite",
      tagBg: "rgba(122,158,110,.15)",
      tagBorder: "rgba(122,158,110,.4)",
      tagColor: "#adc49a",
      accentColor: "#7a9e6e",
      multiplier: 0.8,
      guests: 2,
      beds: 1,
      sqft: null,
      desc: "A non-AC suite with a sleek hardwood wardrobe and wall-mounted Smart TV, opening outwards to a wide covered terrace verandah. Positioned in a peaceful high-end block in Bogadi, close to prominent dining streets and heritage landmarks. Hosted personally by Rohini Chengappa.",
      amenities: [
        "Matching hardwood wardrobe",
        "Wall-mounted Smart TV",
        "Wide covered terrace verandah",
        "Modular kitchenette with electric kettle, induction, granite counter",
        "Private 2-seater dining table",
        "Pristine western restroom with high-pressure hot water",
        "WiFi",
        "Near Mysuru Palace (8.6 km), Chamundi Hills (14.0 km), Devaraja Bazaar (7.8 km)",
      ],
      imgs: [
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568031/bol_jgonwe.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568030/bol1_yqcxw5.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568030/bol2_femzvk.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568031/bol3_aenoam.png",
        "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568031/bol_jgonwe.png",
      ],
    },
  ],
};

/* ── Homestay data ── */
const HS = [
  {
    id: 1,
    lat: 12.3093357,
    lng: 76.5778982,
    name: "Kukkeshree Homestay",
    taluk: "Mysuru",
    district: "Mysuru",
    region: "mysuru",
    price: 2500,
    rating: 4.9,
    reviews: 40,
    amenities: ["Meals Included", "Private Garden", "Nature Trails", "Bonfire"],
    hasWebsite: false,
    phone: "9480100001",
    img: "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568051/nela2_hmycql.png",
    imgs: [
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568052/nela1_tcnuw9.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568051/nela2_hmycql.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568052/nela3_mplrru.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568054/nela4_vgutqh.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568054/nela5_ujuxqf.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568052/nela6_k86nct.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568040/mad1_oc3yub.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568042/mad2_ppf8j2.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568044/mad3_l7oow3.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568041/mad4_an47qg.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568042/mad5_fo87g5.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568042/mad2_ppf8j2.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568065/thar1_dl5jec.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568064/thar2_t50syx.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568065/thar3_u4jqm0.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568065/thar4_yqiooz.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568066/thar5_z6sipg.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568067/thar6_b16ndu.png",
    ],
    type: "Family Homestay",
    location:
      "Vijayanagar 4th Stage, near NPS School , Mysuru • 2 km from Ring Road • 15 minutes from Mysore Palace",
    desc: "Kukkeshree Homestay is a Government-approved, fully compliant homestay designed exclusively for families. The owner resides on the property, ensuring safety, accountability, and support at all times.This is not a boutique hotel, but a peaceful residential home where guests can enjoy a calm and comfortable stay. The property is well-ventilated, located in a quiet neighborhood, and ideal for both short-term and long-term stays.Guests have access to entire private spaces and can cook their own meals, making it a true homely experience.",
    host: {
      name: "Mr. Nagendra N",
      since: "Host since 2022",
      avatar: "/images/kukeprofile.png",
      desc: "A gracious Mysuru family who take pride in offering guests an authentic experience.",
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
    lat: 12.3156,
    lng: 76.6553,
    name: "Sky House Homestay",
    taluk: "Mysuru",
    district: "Mysuru",
    region: "mysuru",
    price: 2800,
    rating: 4.8,
    reviews: 32,
    amenities: ["Free WiFi", "Air Conditioning"],
    hasWebsite: false,
    phone: "9480100003",
    img: "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568054/skyhouse-1bhk-2_iljusy.jpg",
    imgs: [
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568054/skyhouse-1bhk-2_iljusy.jpg",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568057/skyhouse-1bhk-3_p5knff.jpg",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568057/skyhouse-1bhk-4_zl5t6b.jpg",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568055/skyhouse-1bhk-5_ogghem.jpg",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568056/skyhouse-1bhk-6_h77p4u.jpg",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568059/skyhouse-1bhk-7_gqwijk.jpg",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568058/skyhouse-2bhk-1_ho7ft8.jpg",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568057/skyhouse-2bhk-2_sbx9ip.jpg",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568058/skyhouse-2bhk-3_abjly7.jpg",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568068/skyhouse-2bhk-4_rubmr7.jpg",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568059/skyhouse-2bhk-5_pa0pxt.jpg",
    ],
    type: "Family Homestay",
    location:
      "Mysuru City • Close to Mysore Palace, Chamundi Hills & Brindavan Gardens",
    desc: "Sky House Homestay offers a warm, homely atmosphere with modern comforts at an affordable price. Ideal for families, couples, corporate travelers, and small groups visiting Mysore. Choose from a garden-view ground floor 1BHK or a premium 2BHK AC apartment with a private sit-out balcony. Free parking, 24-hour hot water, and complimentary Wi-Fi included across all rooms.",
    host: {
      name: "B S Krishan Kanth",
      since: "Host since 2023",
      avatar: "/images/hon.png",
      desc: "A welcoming Mysuru family offering a true home-away-from-home experience for all guests.",
    },
    guestReviews: [
      {
        name: "Priya Nair",
        stars: 5,
        date: "April 2026",
        text: "Very clean and comfortable. The garden view room was so peaceful.",
      },
      {
        name: "Rahul Mehta",
        stars: 5,
        date: "March 2026",
        text: "The 2BHK apartment was spacious and perfectly located for sightseeing.",
      },
    ],
  },
  {
    id: 3,
    lat: 12.02,
    lng: 76.33,
    name: "Kracadawna Wilderness Farm",
    taluk: "H.D. Kote",
    district: "Mysuru",
    region: "mysuru",
    price: 5500,
    rating: 4.9,
    reviews: 58,
    amenities: [
      "Meals Included",
      "Nature Trails",
      "Wildlife Zone",
      "Coffee Estate",
    ],
    hasWebsite: false,
    phone: "8861537500",
    img: "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568027/krac-dragonfly-1_diyejb.png",
    imgs: [
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568027/krac-dragonfly-1_diyejb.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568029/krac-dragonfly-2_hwrw1e.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568029/krac-dragonfly-3_ggkb5m.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568030/krac-dragonfly-4_itwdff.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568030/krac-firefly-1_ytrpc4.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568031/krac-firefly-2_ge2wtc.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568033/krac-firefly-3_jf0wgw.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568033/krac-firefly-4_tfo5zg.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568038/krac-dayvisit-2_zdhkij.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568036/krac-dayvisit-3_lmpepf.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568038/krac-dayvisit-4_m0rlwx.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568038/krac-dayvisit-5_neozax.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568039/krac-dayvisit-6_nlokr8.png",
    ],
    type: "Wilderness Farm Stay",
    location:
      "Nugu Valley, H.D. Kote • Near Nagarahole National Park • Off-grid organic farm",
    desc: "Nestled in Nugu Valley, Kracadawna is a naturally generated woodland organic farm protected since 1986. Escape city life and immerse yourself in regenerative agriculture, farm-to-table organic meals, and the wild beauty of a wet deciduous forest. Frequent visitors include elephants, paradise flycatchers, hornbills, and golden-back woodpeckers. All meals — vegan, vegetarian, and pescatarian options available — are freshly harvested from the farm. Minimum 2-night stay. No alcohol. No outside food. WiFi available in rooms. Poor mobile network — a true digital detox.",
    host: {
      name: "Azad Cariappa",
      since: "Host since 2018",
      avatar: "/images/krac-host.jpg",
      desc: "Azad and Harshitha run this working family farm with a passion for sustainable living, organic food, and sharing their unique lifestyle with guests.",
    },
    guestReviews: [
      {
        name: "Meera Krishnan",
        stars: 5,
        date: "February 2026",
        text: "The most unique stay of my life. Woke up to birds, ate the freshest food, and learned so much about organic farming.",
      },
      {
        name: "Sameer Joshi",
        stars: 5,
        date: "December 2025",
        text: "Truly off the beaten path. Azad and his team are incredible hosts. The farm walk and boat ride on Nugu river were unforgettable.",
      },
    ],
  },
  {
    id: 4,
    lat: 12.18,
    lng: 76.47,
    name: "1000 Silvers Farm Stay",
    taluk: "HD Kote",
    district: "Mysuru",
    region: "mysuru",
    price: null,
    rating: null,
    reviews: null,
    amenities: [
      "Premium Indoor Games Pavilion",
      "Children's Playground & Open Gym",
      "High Wooden Watchtower (Machan)",
      "Bonfire Pit & Karaoke Stage",
      "Grand Outdoor Event Lawns",
      "Gourmet Culinary Serving Window",
    ],
    hasWebsite: false,
    phone: "9444866776",
    img: "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568060/Sliverhomestay1_xmyixc.png",
    imgs: [
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568060/Sliverhomestay1_xmyixc.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568067/Sliverhomestay2_rdsi4g.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568061/Sliverhomestay3_uvfthp.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568061/Sliverhomestay4_akl9rx.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568061/Sliverhomestay5_hvydve.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568062/Sliverhomestay6_ieay0j.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568062/Sliverhomestay7_lub9tr.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568062/Sliverhomestay8_ohmrpm.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568063/Sliverhomestay10_hrttwx.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568033/event1_koddhb.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568033/event_ajrtgt.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568033/event3_xcptfw.png",
    ],
    type: "Farm Stay",
    location: "HD Kote Road, Mysuru • Along the HD Kote and Mysore Highway",
    desc: "1000 Silvers Farm Stay is a tranquil, pet-friendly retreat located in the countryside of Mysore, India, specifically situated along the HD Kote and Mysore highway. It is designed as an exclusive farmhouse experience, often catering to individual groups to ensure privacy. Approved by the Tourism Department.",
    host: {
      name: "Harsha",
      since: "Estate Owner",
      avatar: null,
      desc: "Direct reservations via Harsha — estate owner and host at 1000 Silvers Farm Stay.",
    },
    guestReviews: [],
  },
  {
    id: 5,
    lat: 12.295,
    lng: 76.638,
    name: "Moodalamane Homestay",
    taluk: "Mysuru",
    district: "Mysuru",
    region: "mysuru",
    price: null,
    rating: null,
    reviews: null,
    amenities: ["Free WiFi", "TV", "Fully Equipped Kitchen", "Solar Geyser"],
    hasWebsite: false,
    phone: null,
    img: "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568049/mol2_ts3l8h.png",
    imgs: [
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568049/mol1_genjin.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568049/mol2_ts3l8h.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568049/mol3_hyse65.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568049/mol4_sjmwzm.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568050/mol5_wyqgsp.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568050/mol6_vzv8sm.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568050/mol7_m1rhsg.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568050/mol8_rwuygz.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568050/mol9_vvzgz5.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568051/mol10_v4wffd.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568051/mol11_czg8q9.png",
    ],
    type: "Family Homestay",
    location:
      "L137, Adithya, KHB 2nd Stage, Kuvempunagar, Mysuru, Karnataka 570023 • 4.5 km from Zoo and Mysuru Palace",
    desc: "Moodalamane Homestay offers a peaceful and comfortable stay designed especially for families. A residential-style homestay where guests enjoy privacy, safety, and a homely atmosphere. The owner resides on the ground floor, ensuring safety and support. Only families are allowed. Perfect for short-term and long-term stays.",
    host: {
      name: "Owner",
      since: "Host",
      avatar: null,
      desc: "A caring and responsible Mysuru family committed to safe, verified, and peaceful family tourism.",
    },
    guestReviews: [],
  },
  {
    id: 6,
    lat: 12.355,
    lng: 76.62,
    name: "Aastha Homestay",
    taluk: "Mysuru",
    district: "Mysuru",
    region: "mysuru",
    price: null,
    rating: 5.0,
    reviews: 124,
    amenities: [
      "Meals Included",
      "Private Garden",
      "Outdoor Sports",
      "Bonfire",
      "Air Conditioning",
    ],
    hasWebsite: false,
    phone: "9480568332",
    img: "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568028/ask_r0zha5.png",
    imgs: [
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568028/ask_r0zha5.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568028/ask1_upiuxy.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568028/ask2_xfvdrq.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568027/ask3_q8jded.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568029/ask4_rd8dpf.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568029/ask5_n6qhrc.png",
    ],
    type: "Farm Homestay",
    location: "Mananthavadi Rd, Salundi, Mysuru, Karnataka 570008",
    desc: "Aastha Homestay is a home away from home spread across 1 acre with mango groves, coconut trees, and sapota. Securely fenced with an all-round verandah. Guests enjoy delicious home-cooked meals, outdoor sports, evening campfires, and a lush garden atmosphere.",
    host: {
      name: "Vishu Kumar B G",
      since: "Host",
      avatar: null,
      desc: "Vishu Kumar and Sangeetha Vishu warmly welcome guests to their charming family property.",
    },
    guestReviews: [],
  },
  {
    id: 7,
    lat: 12.32,
    lng: 76.61,
    name: "Bolak Homestay",
    taluk: "Mysuru",
    district: "Mysuru",
    region: "mysuru",
    price: null,
    rating: null,
    reviews: null,
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Smart TV",
      "Self Catering Kitchen",
    ],
    hasWebsite: true,
    phone: "9448336870",
    img: "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568031/bol_jgonwe.png",
    imgs: [
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568031/bol_jgonwe.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568030/bol1_yqcxw5.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568030/bol2_femzvk.png",
      "https://res.cloudinary.com/dmapa99lk/image/upload/v1782568031/bol3_aenoam.png",
    ],
    type: "Premium Villa Homestay",
    location: "Bogadi Sector, Tree-Lined Residential Zone, Mysuru, Karnataka",
    desc: "Bolak Homestay is a premium independent multi-level villa sanctuary in the peaceful upscale residential hub of heritage Mysuru. Hosted personally by Rohini Chengappa, it combines complete independent seclusion with professional concierge support. Large open casement layouts maximize natural daylight and fresh air throughout.",
    host: {
      name: "Rohini Chengappa",
      since: "Host",
      avatar: null,
      desc: "Rohini personally manages the property, ensuring professional and caring hospitality for every guest.",
    },
    guestReviews: [],
  },
];

const HERO_VIDEO =
  "https://res.cloudinary.com/dgx8lyile/video/upload/v1782567342/herovideo_web_un9ee2.mp4";
const MARQUEE_IMGS = [
  "/images/skyhouse-2bhk-1.jpg",
  "/images/nela1.jpg",
  "/images/skyhouse-1bhk-1.jpg",
  "/images/nela3.jpg",
  "/images/krac-dragonfly-1.jpg",
  "/images/krac-dragonfly-2.jpg",
  "/images/krac-dragonfly-3.jpg",
  "/images/mad1.png",
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const Stars = memo(function Stars({ rating, sz = 14 }) {
  if (!rating) return null;
  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      {Array.from({ length: Math.floor(rating) }, (_, i) => (
        <Star key={i} size={sz} style={{ color: "#c8a96a", fill: "#c8a96a" }} />
      ))}
    </span>
  );
});

function Badge({ children, bg, border, color }) {
  return (
    <span
      style={{
        padding: ".28rem .85rem",
        fontSize: ".62rem",
        letterSpacing: ".18em",
        textTransform: "uppercase",
        background: bg,
        border: `1px solid ${border}`,
        color,
      }}
    >
      {children}
    </span>
  );
}

/* ─── Explore Card ─────────────────────────────────────────────────────────── */
const HsCard = memo(function HsCard({ h, onOpen }) {
  /* PERF: top-2 nearest places via the shared memoized lookup instead of
     mapping + sorting all 14 TOURIST_PLACES fresh on every render. */
  const top2 = useMemo(
    () => nearestPlaces(h.lat, h.lng).slice(0, 2),
    [h.lat, h.lng],
  );
  const handleClick = useCallback(() => onOpen(h.id), [onOpen, h.id]);
  const srcSet = useMemo(() => clSrcSet(h.img), [h.img]);

  return (
    <div
      className="kha-card bg-[#1f2e1f] overflow-hidden kha-reveal"
      style={{ border: "1px solid rgba(200,169,106,.1)" }}
      onClick={handleClick}
    >
      <div
        className="kha-card-img-wrap w-full overflow-hidden relative"
        style={{ aspectRatio: "4/3" }}
      >
        <img
          src={cl(h.img, 480)}
          srcSet={srcSet}
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          alt={h.name}
          loading="lazy"
          decoding="async"
          width="480"
          height="360"
          className="kha-card-img w-full h-full object-cover"
        />
        <div
          style={{
            position: "absolute",
            top: ".9rem",
            left: ".9rem",
            display: "flex",
            gap: ".4rem",
            flexWrap: "wrap",
            zIndex: 2,
          }}
        >
          <Badge
            bg="rgba(24,35,24,.78)"
            border="rgba(200,169,106,.32)"
            color="#c8a96a"
          >
            {h.type}
          </Badge>
          {h.hasWebsite ? (
            <Badge
              bg="rgba(46,74,46,.85)"
              border="rgba(122,158,110,.4)"
              color="#adc49a"
            >
              Has Website
            </Badge>
          ) : (
            <Badge
              bg="rgba(37,211,102,.15)"
              border="rgba(37,211,102,.38)"
              color="#4ade80"
            >
              WhatsApp Only
            </Badge>
          )}
        </div>
        <div
          className="kha-price-overlay absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 transition-opacity duration-300"
          style={{
            background: "rgba(24,35,24,.9)",
            backdropFilter: "blur(4px)",
            zIndex: 3,
          }}
        >
          <span
            style={{
              fontSize: ".68rem",
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: "#7a9e6e",
            }}
          >
            Starting from
          </span>
          <span
            style={{
              fontFamily: cg,
              fontSize: "2.9rem",
              fontWeight: 300,
              color: "#c8a96a",
              lineHeight: 1,
            }}
          >
            {h.price != null
              ? `₹${h.price.toLocaleString("en-IN")}`
              : "Contact for Price"}
          </span>
          <span
            style={{
              fontSize: ".74rem",
              color: "rgba(244,239,229,.5)",
              letterSpacing: ".1em",
            }}
          >
            per night · Unique Stays available
          </span>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".55rem",
              marginTop: ".5rem",
              padding: ".7rem 1.8rem",
              background: "#c8a96a",
              color: "#182318",
              fontFamily: jost,
              fontSize: ".74rem",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            View Rooms <ChevronRight size={14} />
          </div>
        </div>
      </div>

      <div style={{ padding: "1.3rem 1.4rem 1.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".35rem",
            fontSize: ".68rem",
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#7a9e6e",
            marginBottom: ".3rem",
          }}
        >
          <MapPin size={10} />
          {h.taluk}, {h.district}
        </div>
        <div
          style={{
            fontFamily: cg,
            fontSize: "1.5rem",
            fontWeight: 400,
            color: "#f4efe5",
            lineHeight: 1.2,
            marginBottom: ".3rem",
          }}
        >
          {h.name}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            marginBottom: ".85rem",
          }}
        >
          <Stars rating={h.rating} sz={13} />
          {h.rating && (
            <span
              style={{ fontSize: ".84rem", color: "#c8a96a", fontWeight: 500 }}
            >
              {h.rating}
            </span>
          )}
          {h.reviews && (
            <span
              style={{ fontSize: ".74rem", color: "rgba(244,239,229,.38)" }}
            >
              ({h.reviews})
            </span>
          )}
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(200,169,106,.1)",
            paddingTop: ".75rem",
          }}
        >
          {top2.map((p) => (
            <div
              key={p.key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: ".3rem",
              }}
            >
              <span
                style={{
                  fontSize: ".72rem",
                  color: "rgba(244,239,229,.45)",
                  display: "flex",
                  alignItems: "center",
                  gap: ".35rem",
                }}
              >
                <MapPin size={9} style={{ color: "#c8a96a" }} />
                {p.label}
              </span>
              <span
                style={{
                  fontSize: ".7rem",
                  color: "#c8a96a",
                  fontWeight: 600,
                }}
              >
                {p.dist} km
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

/* ─── Room list card (inside detail slide) ─────────────────────────────────── */
const RoomListCard = memo(function RoomListCard({ room, h, onOpen, index }) {
  const price =
    h.price != null
      ? Math.round((h.price * room.multiplier) / 100) * 100
      : null;
  const [hovered, setHovered] = useState(false);
  /* PERF: shared matchMedia hook instead of a per-card `resize` listener. */
  const isMobile = useIsMobile();

  const roomImgs = room.imgs && room.imgs.length > 0 ? room.imgs : h.imgs;
  const imgSrc = roomImgs[0] || h.img;
  const srcSet = useMemo(() => clSrcSet(imgSrc), [imgSrc]);

  const handleClick = useCallback(() => onOpen(room.key), [onOpen, room.key]);
  const onEnter = useCallback(() => setHovered(true), []);
  const onLeave = useCallback(() => setHovered(false), []);

  return (
    <div
      className="kha-rlc2"
      onClick={handleClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        border: `1px solid ${hovered ? room.tagBorder : "rgba(200,169,106,.14)"}`,
      }}
    >
      {/* Left accent bar — top bar on mobile */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: isMobile ? 0 : "auto",
          bottom: isMobile ? "auto" : 0,
          width: isMobile ? "auto" : "3px",
          height: isMobile ? "3px" : "auto",
          background: `linear-gradient(to ${isMobile ? "right" : "bottom"}, ${room.accentColor}, transparent)`,
          opacity: hovered ? 1 : 0.6,
          transition: "opacity .4s",
          zIndex: 2,
        }}
      />

      {/* ── Image ── */}
      <div className="kha-rlc2-img-wrap">
        <img
          src={cl(imgSrc, 680)}
          srcSet={srcSet}
          sizes="(max-width: 768px) 100vw, 340px"
          alt={room.name}
          loading="lazy"
          decoding="async"
          width="680"
          height="440"
          className="kha-rlc2-img"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg,rgba(24,35,24,.1) 0%,rgba(24,35,24,.65) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "90px",
            background: `linear-gradient(to top,rgba(28,45,28,1),transparent)`,
          }}
        />
        <div
          className="kha-rlc2-watermark"
          style={{
            position: "absolute",
            top: "-.5rem",
            right: ".8rem",
            fontFamily: cg,
            fontSize: isMobile ? "4.5rem" : "6rem",
            fontWeight: 300,
            lineHeight: 1,
            color: room.accentColor,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <div style={{ position: "absolute", top: ".85rem", left: ".85rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".4rem",
              padding: ".3rem .95rem",
              fontSize: ".6rem",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              background: room.tagBg,
              border: `1px solid ${room.tagBorder}`,
              color: room.tagColor,
              backdropFilter: "blur(8px)",
            }}
          >
            {index === 2 && <Star size={9} style={{ fill: room.tagColor }} />}
            {room.tag}
          </span>
        </div>
        <div style={{ position: "absolute", bottom: ".85rem", left: ".95rem" }}>
          <div
            style={{
              fontSize: ".58rem",
              letterSpacing: ".24em",
              textTransform: "uppercase",
              color: "rgba(244,239,229,.5)",
              marginBottom: ".1rem",
            }}
          >
            from
          </div>
          <div
            style={{
              fontFamily: cg,
              fontSize: isMobile ? "1.6rem" : "1.9rem",
              fontWeight: 300,
              color: room.accentColor,
              lineHeight: 1,
            }}
          >
            {price != null
              ? `₹${price.toLocaleString("en-IN")}`
              : "Contact for Price"}
            <span
              style={{
                fontSize: ".72rem",
                color: "rgba(244,239,229,.38)",
                marginLeft: ".35rem",
                fontFamily: jost,
              }}
            >
              /night
            </span>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div
        style={{
          padding: isMobile
            ? "1.3rem 1.2rem 1.4rem"
            : "1.7rem 2rem 1.7rem 1.8rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: ".85rem",
        }}
      >
        <div>
          <div
            className="kha-rlc2-title"
            style={{
              fontFamily: cg,
              fontSize: isMobile ? "1.5rem" : "1.85rem",
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: ".5rem",
            }}
          >
            {room.name}
          </div>
          <p
            style={{
              fontSize: ".86rem",
              lineHeight: 1.75,
              fontWeight: 300,
              color: "rgba(244,239,229,.56)",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: isMobile ? 3 : 2,
              WebkitBoxOrient: "vertical",
              margin: "0 0 .85rem",
            }}
          >
            {room.desc}
          </p>
          <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
            {room.amenities
              .slice(0, isMobile ? 3 : room.amenities.length)
              .map((a) => (
                <span
                  key={a}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: ".28rem",
                    fontSize: ".68rem",
                    letterSpacing: ".05em",
                    color: "rgba(244,239,229,.5)",
                    padding: ".24rem .7rem",
                    background: hovered
                      ? "rgba(200,169,106,.1)"
                      : "rgba(200,169,106,.05)",
                    border: `1px solid ${hovered ? "rgba(200,169,106,.22)" : "rgba(200,169,106,.1)"}`,
                    transition: "all .3s",
                  }}
                >
                  <span style={{ color: room.accentColor, opacity: 0.85 }}>
                    {AICONS[a] || <Leaf size={11} />}
                  </span>
                  {a}
                </span>
              ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="kha-rlc2-tagrow"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: ".6rem",
            paddingTop: ".9rem",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".5rem",
              padding: isMobile ? ".55rem 1.2rem" : ".65rem 1.5rem",
              background: hovered ? room.accentColor : "transparent",
              border: `1px solid ${room.tagBorder}`,
              color: hovered ? "#182318" : room.tagColor,
              fontSize: ".7rem",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              fontFamily: jost,
              fontWeight: hovered ? 600 : 400,
              transition: "all .35s cubic-bezier(.22,1,.36,1)",
              flexShrink: 0,
            }}
          >
            View Room <ChevronRight size={12} />
          </div>
        </div>
      </div>
    </div>
  );
});

/* ─── Room Full Detail ────────────────────────────────────────────────────── */
function RoomDetail({ h, roomKey, onBack }) {
  /* PERF: nearest-places lookup now comes from the shared memo cache. */
  const sortedPlaces = useMemo(
    () => (h ? nearestPlaces(h.lat, h.lng) : []),
    [h],
  );

  if (!h || !roomKey) return null;
  const room = ROOM_TYPES[h.id]?.find((r) => r.key === roomKey);
  if (!room) return null;
  const price =
    h.price != null
      ? Math.round((h.price * room.multiplier) / 100) * 100
      : null;
  const wa = `https://wa.me/91${h.phone}?text=Hello%2C%20I%20found%20${encodeURIComponent(h.name)}%20on%20KHA%20and%20would%20like%20to%20book%20the%20${encodeURIComponent(room.name)}.%20Please%20share%20availability.`;

  const roomImgs = room.imgs && room.imgs.length > 0 ? room.imgs : h.imgs;
  const sixImgs = roomImgs.length > 0 ? roomImgs.slice(0, 6) : [h.img];
  const allAmens = [...new Set([...room.amenities])];

  return (
    <div id="khaRoomPage" className={roomKey ? "open" : ""}>
      {/* ── Top bar ── */}
      <div
        className="dp-topbar"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(24,35,24,.96)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(200,169,106,.15)",
          display: "flex",
          alignItems: "center",
          gap: "1.2rem",
          flexWrap: "wrap",
        }}
      >
        <a
          href="#"
          className="kha-back-btn"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
        >
          <ArrowLeft size={13} />
          <span className="dp-topbar-back-text">Back to Rooms</span>
        </a>
        <div
          style={{
            width: "1px",
            height: "16px",
            background: "rgba(200,169,106,.2)",
            flexShrink: 0,
          }}
        ></div>
        <span
          className="dp-topbar-name"
          style={{
            fontSize: ".7rem",
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "rgba(244,239,229,.35)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "160px",
          }}
        >
          {h.name}
        </span>
        <div style={{ marginLeft: "auto" }}>
          <span
            style={{
              padding: ".25rem .85rem",
              fontSize: ".62rem",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              background: room.tagBg,
              border: `1px solid ${room.tagBorder}`,
              color: room.tagColor,
              borderRadius: "2px",
            }}
          >
            {room.tag}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div
        className="rdp-inner"
        style={{ maxWidth: "1160px", margin: "0 auto" }}
      >
        {/* Heading block */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              fontSize: ".68rem",
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "#7a9e6e",
              marginBottom: ".5rem",
              display: "flex",
              alignItems: "center",
              gap: ".45rem",
            }}
          >
            <MapPin size={11} />
            {h.taluk} · {h.district} District, Mysore
          </div>
          <div
            style={{
              fontFamily: cg,
              fontSize: "clamp(1.8rem,4vw,3.1rem)",
              fontWeight: 300,
              color: "#fdfaf4",
              lineHeight: 1.1,
              marginBottom: ".3rem",
            }}
          >
            {room.name}
          </div>
          <div
            style={{
              fontFamily: cg,
              fontSize: "1.15rem",
              fontWeight: 300,
              color: "rgba(244,239,229,.4)",
              marginBottom: "1rem",
            }}
          >
            at {h.name}
          </div>
        </div>

        {/* Mosaic — first image eager + high priority, rest lazy */}
        <div className="kha-mosaic">
          <div className="kha-mosaic-main">
            <img
              src={cl(sixImgs[0], 900)}
              srcSet={clSrcSet(sixImgs[0], [500, 700, 900, 1100])}
              sizes="(max-width: 768px) 100vw, 60vw"
              alt="main"
              fetchpriority="high"
              decoding="async"
              width="900"
              height="410"
            />
          </div>
          {sixImgs.slice(1).map((src, i) => (
            <div key={i} className="kha-mosaic-cell">
              <img
                src={cl(src, 500)}
                srcSet={clSrcSet(src, [300, 500, 700])}
                sizes="(max-width: 768px) 50vw, 25vw"
                alt={`photo ${i + 2}`}
                loading="lazy"
                decoding="async"
                width="500"
                height="230"
              />
            </div>
          ))}
        </div>

        {/* 2-col layout — stacks on mobile via CSS class */}
        <div
          className="kha-room-detail-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 330px",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div>
            <h3
              style={{
                fontFamily: cg,
                fontSize: "1.5rem",
                fontWeight: 300,
                color: "#f4efe5",
                marginBottom: ".8rem",
              }}
            >
              About This Room
            </h3>
            <p
              style={{
                fontSize: ".97rem",
                lineHeight: 2,
                fontWeight: 300,
                color: "rgba(244,239,229,.72)",
                marginBottom: "2.5rem",
              }}
            >
              {room.desc}
            </p>

            <h3
              style={{
                fontFamily: cg,
                fontSize: "1.5rem",
                fontWeight: 300,
                color: "#f4efe5",
                marginBottom: ".85rem",
              }}
            >
              What's Included
            </h3>
            <div
              className="kha-amen-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(172px,1fr))",
                gap: ".6rem",
                marginBottom: "2.5rem",
              }}
            >
              {allAmens.map((a) => (
                <div key={a} className="kha-amen-item">
                  <span style={{ color: "#c8a96a", flexShrink: 0 }}>
                    {AICONS[a] || <Leaf size={17} />}
                  </span>
                  <span
                    style={{
                      fontSize: ".82rem",
                      color: "rgba(244,239,229,.75)",
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
                fontSize: "1.5rem",
                fontWeight: 300,
                color: "#f4efe5",
                marginBottom: ".85rem",
              }}
            >
              Nearby Attractions
            </h3>
            <div
              className="kha-nearby-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: ".5rem",
                marginBottom: "2.5rem",
              }}
            >
              {sortedPlaces.map((p) => (
                <div
                  key={p.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: ".7rem 1rem",
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
                    style={{
                      fontSize: ".79rem",
                      color: "rgba(244,239,229,.55)",
                      display: "flex",
                      alignItems: "center",
                      gap: ".4rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <MapPin
                      size={10}
                      style={{ color: "#c8a96a", flexShrink: 0 }}
                    />
                    {p.label}
                  </span>
                  <span
                    style={{
                      fontSize: ".69rem",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      marginLeft: ".5rem",
                      padding: ".15rem .5rem",
                      flexShrink: 0,
                      color:
                        p.dist <= 30
                          ? "#4ade80"
                          : p.dist <= 80
                            ? "#c8a96a"
                            : "rgba(244,239,229,.32)",
                      background:
                        p.dist <= 30
                          ? "rgba(37,211,102,.1)"
                          : p.dist <= 80
                            ? "rgba(200,169,106,.1)"
                            : "transparent",
                      border: `1px solid ${p.dist <= 30 ? "rgba(37,211,102,.25)" : p.dist <= 80 ? "rgba(200,169,106,.2)" : "transparent"}`,
                    }}
                  >
                    {p.dist} km
                  </span>
                </div>
              ))}
            </div>

            <Homerules />

            <h3
              style={{
                fontFamily: cg,
                fontSize: "1.5rem",
                fontWeight: 300,
                color: "#f4efe5",
                marginBottom: ".85rem",
              }}
            >
              Your Host
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1.2rem",
                padding: "1.4rem 1.6rem",
                background: "rgba(31,46,31,.65)",
                border: "1px solid rgba(200,169,106,.12)",
                marginBottom: "2.5rem",
              }}
            >
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "50%",
                  border: "2px solid rgba(200,169,106,.3)",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                {h.host.avatar ? (
                  <img
                    src={h.host.avatar}
                    alt={h.host.name}
                    loading="lazy"
                    decoding="async"
                    width="58"
                    height="58"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "rgba(200,169,106,.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.4rem",
                    }}
                  >
                    🏡
                  </div>
                )}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: cg,
                    fontSize: "1.28rem",
                    fontWeight: 300,
                    color: "#f4efe5",
                  }}
                >
                  {h.host.name}
                </div>
                <div
                  style={{
                    fontSize: ".68rem",
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    color: "#7a9e6e",
                    marginTop: ".12rem",
                  }}
                >
                  {h.host.since}
                </div>
                <div
                  style={{
                    fontSize: ".88rem",
                    lineHeight: 1.8,
                    color: "rgba(244,239,229,.58)",
                    marginTop: ".45rem",
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
                fontSize: "1.5rem",
                fontWeight: 300,
                color: "#f4efe5",
                marginBottom: ".85rem",
              }}
            >
              Property Location
            </h3>
            <LazyMap lat={h.lat} lng={h.lng} />
          </div>

          {/* Right — sticky booking card */}
          <div
            className="kha-room-booking-sticky"
            style={{ position: "sticky", top: "80px" }}
          >
            <div
              className="kha-booking-card"
              style={{
                background: "rgba(31,46,31,.9)",
                border: "1px solid rgba(200,169,106,.24)",
                backdropFilter: "blur(20px)",
                padding: "1.8rem 2rem",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  paddingBottom: "1.3rem",
                  marginBottom: "1.3rem",
                  borderBottom: "1px solid rgba(200,169,106,.12)",
                }}
              >
                <span
                  style={{
                    fontSize: ".66rem",
                    letterSpacing: ".26em",
                    textTransform: "uppercase",
                    color: "#7a9e6e",
                    display: "block",
                    marginBottom: ".2rem",
                  }}
                >
                  Starting from
                </span>
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
                  {price != null
                    ? `₹${price.toLocaleString("en-IN")}`
                    : "Contact for Price"}
                </span>
                <span
                  style={{
                    fontSize: ".78rem",
                    color: "#adc49a",
                    letterSpacing: ".1em",
                  }}
                >
                  per night · direct booking
                </span>
              </div>
              {h.hasWebsite && (
                <a
                  href={h.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kha-btn-web w-full"
                  style={{ marginBottom: ".55rem", width: "100%" }}
                >
                  <Globe size={14} /> Visit Official Website
                </a>
              )}
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="kha-btn-wa"
                style={{ width: "100%" }}
              >
                <MessageCircle size={14} /> Book via WhatsApp
              </a>
              <div
                style={{
                  marginTop: "1.3rem",
                  paddingTop: "1.1rem",
                  borderTop: "1px solid rgba(200,169,106,.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".55rem",
                }}
              >
                {[
                  ["Room", room.name],
                  ["Property", h.name],
                  ["District", h.district],
                  ["Guests", `Up to ${room.guests}`],
                  [
                    "Booking",
                    h.hasWebsite ? "Website + WhatsApp" : "WhatsApp Only",
                  ],
                ].map(([l, v]) => (
                  <div
                    key={l}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: ".5rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: ".7rem",
                        letterSpacing: ".1em",
                        textTransform: "uppercase",
                        color: "rgba(244,239,229,.32)",
                        flexShrink: 0,
                      }}
                    >
                      {l}
                    </span>
                    <span
                      style={{
                        fontSize: ".84rem",
                        color: "rgba(244,239,229,.68)",
                        textAlign: "right",
                        wordBreak: "break-word",
                      }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".7rem",
                  marginTop: "1.1rem",
                  padding: ".85rem 1rem",
                  background: "rgba(200,169,106,.07)",
                  border: "1px solid rgba(200,169,106,.15)",
                }}
              >
                <Award size={17} style={{ color: "#c8a96a", flexShrink: 0 }} />
                <div
                  style={{
                    fontSize: ".75rem",
                    lineHeight: 1.6,
                    color: "rgba(244,239,229,.48)",
                  }}
                >
                  <strong
                    style={{
                      color: "#c8a96a",
                      display: "block",
                      fontSize: ".66rem",
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                      marginBottom: ".1rem",
                    }}
                  >
                    MDHOA Certified
                  </strong>
                  Verified member of the Mysore Homestays Association.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* PERF: map embed deferred until the container is actually scrolled near
   the viewport, via IntersectionObserver — previously the iframe was
   created unconditionally the instant RoomDetail mounted, loading Google's
   heavy embed regardless of whether the user ever scrolled that far. */
function LazyMap({ lat, lng }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        overflow: "hidden",
        border: "1px solid rgba(200,169,106,.15)",
        marginBottom: "2.5rem",
        height: "320px",
      }}
    >
      {visible && (
        <iframe
          title="Property Location"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        />
      )}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
const Home = () => {
  const curRef = useRef(null),
    curFRef = useRef(null);
  const cxRef = useRef(0),
    cyRef = useRef(0),
    fxRef = useRef(0),
    fyRef = useRef(0);

  /* PERF: cursor-follower RAF now idles when the mouse stops moving instead
     of running forever, and writes `transform: translate3d()` instead of
     `left/top` so each frame is GPU-composited rather than forcing a
     layout recalculation. Also skipped entirely on touch devices, matching
     the Explore page's behavior (and matching the CSS rule further down
     that already hides the cursor dots under 900px). */
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf;
    let active = false;

    const mv = (e) => {
      cxRef.current = e.clientX;
      cyRef.current = e.clientY;
      if (curRef.current) {
        curRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      if (!active) {
        active = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      fxRef.current += (cxRef.current - fxRef.current) * 0.11;
      fyRef.current += (cyRef.current - fyRef.current) * 0.11;
      if (curFRef.current) {
        curFRef.current.style.transform = `translate3d(${fxRef.current}px, ${fyRef.current}px, 0) translate(-50%, -50%)`;
      }
      const dx = Math.abs(cxRef.current - fxRef.current);
      const dy = Math.abs(cyRef.current - fyRef.current);
      if (dx > 0.1 || dy > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        active = false;
      }
    };

    document.addEventListener("mousemove", mv, { passive: true });
    return () => {
      document.removeEventListener("mousemove", mv);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* PERF: this effect previously had NO dependency array, so it ran after
     every single render — re-querying the DOM and creating + immediately
     discarding an IntersectionObserver each time. Empty deps = run once. */
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
  }, []);

  /* PERF: parallax scroll handler now reads layout via rAF-batched scroll
     instead of synchronously on every native scroll event, and is marked
     passive. Same visual motion, far fewer forced layout reads per second
     during fast scrolling. */
  useEffect(() => {
    let raf = null;
    const fn = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const bg = document.querySelector(".kha-testi-bg");
        if (!bg) return;
        const r = bg.parentElement.getBoundingClientRect();
        bg.style.transform = `translateY(${(-r.top / (r.height + window.innerHeight)) * 70}px)`;
      });
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => {
      window.removeEventListener("scroll", fn);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const [hsId, setHsId] = useState(null);
  const [roomKey, setRoomKey] = useState(null);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") {
        if (roomKey) {
          setRoomKey(null);
          return;
        }
        if (hsId) {
          setHsId(null);
          document.body.style.overflow = "";
        }
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [hsId, roomKey]);

  const openHs = useCallback((id) => {
    setHsId(id);
    setRoomKey(null);
    document.body.style.overflow = "hidden";
    setTimeout(
      () => document.getElementById("khaDetailPage")?.scrollTo(0, 0),
      50,
    );
  }, []);
  const closeHs = useCallback((e) => {
    e?.preventDefault();
    setHsId(null);
    setRoomKey(null);
    document.body.style.overflow = "";
  }, []);
  const openRoom = useCallback((key) => {
    setRoomKey(key);
    setTimeout(
      () => document.getElementById("khaRoomPage")?.scrollTo(0, 0),
      50,
    );
  }, []);
  const closeRoom = useCallback(() => setRoomKey(null), []);

  const currentHs = useMemo(
    () => HS.find((h) => h.id === hsId) || null,
    [hsId],
  );

  const scrollToBrowse = (e) => {
    e.preventDefault();
    document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
  };

  const Divider = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: ".8rem",
        margin: "1.4rem 0",
      }}
    >
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
          {/* PERF: preload="metadata" lets the browser fetch just enough to
              know dimensions/duration without downloading the full video
              before first paint; autoplay/muted/loop/playsInline unchanged
              so behavior is identical once it does load. */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg,rgba(24,35,24,.72) 0%,rgba(24,35,24,.28) 55%,rgba(24,35,24,.55) 100%)",
            }}
          ></div>
        </div>
        <div
          className="kha-hero-card absolute z-10 bottom-[4%] left-[6%] px-[2.8rem] py-[2.4rem]"
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
              <img
                src="https://res.cloudinary.com/dmapa99lk/image/upload/v1781418996/mha_g5sluu.png"
                alt="MDHOA Logo"
                loading="eager"
                decoding="async"
              />
              <img
                src="https://res.cloudinary.com/dmapa99lk/image/upload/v1782572752/image_njgxij.png"
                alt="Government of Karnataka"
                loading="lazy"
                decoding="async"
              />
              <img
                src="https://res.cloudinary.com/dmapa99lk/image/upload/v1782572751/gov-logo_cv0gcv.png"
                alt="Karnataka Tourism"
                className="w-full max-w-md mx-auto rounded-xl object-cover"
                loading="lazy"
                decoding="async"
              />
              <img
                src="https://res.cloudinary.com/dmapa99lk/image/upload/v1782572706/mysurubrand_epwx2a.png"
                alt="Government of Karnataka"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <p
            style={{
              fontSize: ".95rem",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(244,239,229,.82)",
              marginBottom: "1.3rem",
            }}
          >
            All homestays listed on this platform are registered, verified, and
            operated by honorable members of the Mysuru District Homestay Owners
            Association (R). Book directly — no OTA commissions, no hidden
            charges.
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
            <span>🏡 Click Here to Book a Homestay In Mysuru</span>
          </a>
          <a href="#browse" className="kha-hero-cta" onClick={scrollToBrowse}>
            Browse All Homestays In Mysuru
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
        <div className="kha-ts-inner max-w-[1100px] mx-auto flex items-stretch justify-center gap-6 flex-wrap">
          {[
            {
              icon: "/image.png",
              title: "Government Approved",
              desc: "All homestays are officially approved by the Department of Tourism, Government of Karnataka.",
            },
            {
              icon: "https://res.cloudinary.com/dmapa99lk/image/upload/v1781418996/mha_g5sluu.png",
              title: "Mysuru District Homestay Owners Association(R)",
              desc: "Every homestay is an official verified member offering Government-approved stays with direct booking.",
            },
            {
              icon: "/verify.jpg",
              title: "Verified & Certified Stays",
              desc: "All homestays are personally inspected by association office bearers before going live on this platform.",
            },
          ].map((ts) => (
            <div key={ts.title} className="kha-trust-card">
              <div className="kha-trust-icon">
                <img
                  src={ts.icon}
                  alt={ts.title}
                  loading="lazy"
                  decoding="async"
                  width="62"
                  height="62"
                />
              </div>
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontSize: ".72rem",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "#c8a96a",
                    display: "block",
                    marginBottom: ".35rem",
                  }}
                >
                  {ts.title}
                </span>
                <span
                  style={{
                    fontSize: ".82rem",
                    color: "rgba(244,239,229,.65)",
                    lineHeight: 1.65,
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
        className="kha-reveal bg-[#1f2e1f] kha-cred-outer"
        style={{
          borderTop: "1px solid rgba(200,169,106,.15)",
          borderBottom: "1px solid rgba(200,169,106,.15)",
        }}
      >
        <div className="max-w-[1200px] mx-auto" style={{ padding: "0 2rem" }}>
          <div
            className="kha-cred-inner"
            style={{
              position: "relative",
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "2.5rem",
              alignItems: "center",
              padding: "2.2rem 2.8rem",
              background: "rgba(200,169,106,.06)",
              border: "1px solid rgba(200,169,106,.32)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background:
                  "linear-gradient(90deg,transparent,#c8a96a,transparent)",
              }}
            ></div>
            <div
              className="kha-cred-logo"
              style={{
                width: "88px",
                height: "88px",
                borderRadius: "50%",
                border: "2px solid rgba(200,169,106,.5)",
                background: "rgba(200,169,106,.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <img
                src="/image.png"
                alt="Govt"
                loading="lazy"
                decoding="async"
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
                style={{
                  display: "inline-block",
                  marginBottom: ".65rem",
                  padding: ".22rem .9rem",
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
                className="kha-cred-text"
                style={{
                  fontFamily: cg,
                  fontWeight: 300,
                  color: "#fdfaf4",
                  lineHeight: 1.4,
                }}
              >
                The homestays listed on this platform are operated by members of
                the Mysuru District Homestay Owners Association(R) and are
                registered under the Department of Tourism, Government of
                Karnataka.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════ EXPLORE ════ */}
      <section
        className="kha-browse-section px-16 py-[6rem] bg-[#182318]"
        id="browse"
      >
        <div className="kha-reveal max-w-[1300px] mx-auto mb-10">
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
            <em style={{ fontStyle: "italic", color: "#e0c88a" }}>Homestays</em>
          </h2>
          <p
            style={{
              fontSize: ".9rem",
              color: "rgba(244,239,229,.45)",
              fontWeight: 300,
              marginTop: ".4rem",
            }}
          >
            Click any homestay to browse available room types and book directly
            with the host.
          </p>
        </div>
        <div className="kha-cards-grid max-w-[1300px] mx-auto grid gap-6">
          {HS.map((h) => (
            <HsCard key={h.id} h={h} onOpen={openHs} />
          ))}
        </div>
      </section>

      {/* ════ CTA ════ */}
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
            148 verified, government-approved homestays. Book directly with host
            families — no OTA commissions.
          </p>
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
              { src: "/mysuru.jpg", label: "Mysuru", cls: "kha-arch-1" },
              { src: "/bandipura.jpg", label: "Bandipura", cls: "kha-arch-2" },
            ].map(({ src, label, cls }) => (
              <div
                key={label}
                className={`kha-arch-wrap ${cls} overflow-hidden relative`}
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={src}
                  alt={label}
                  loading="lazy"
                  decoding="async"
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
              all taluks of Mysore — from the royal heritage of Mysuru to its
              rich culture and timeless beauty.
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
              number, every member is verified, reviewed and listed here.
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

      {/* ════ PARALLAX QUOTE ════ */}
      <div
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: "82vh" }}
      >
        <div
          className="kha-testi-bg absolute inset-0 bg-cover bg-center"
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
            peaceful countryside homes in Hunsur and Nanjangud.
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
                Mysuru District HomeStays Association
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
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                width="270"
                height="175"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* ════ DETAIL SLIDE — Room list ════ */}
      <div id="khaDetailPage" className={hsId ? "open" : ""}>
        {currentHs && (
          <>
            {/* Nav bar */}
            <div
              className="dp-topbar"
              style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                background: "rgba(24,35,24,.96)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(200,169,106,.15)",
                display: "flex",
                alignItems: "center",
                gap: "1.2rem",
                flexWrap: "wrap",
              }}
            >
              <a href="#" className="kha-back-btn" onClick={closeHs}>
                <ArrowLeft size={13} />
                <span className="dp-topbar-back-text">Back to Explore</span>
              </a>
              <div
                style={{
                  width: "1px",
                  height: "16px",
                  background: "rgba(200,169,106,.2)",
                  flexShrink: 0,
                }}
              ></div>
              <div
                className="dp-topbar-name"
                style={{
                  fontFamily: cg,
                  fontSize: "1.12rem",
                  fontWeight: 300,
                  color: "#c8a96a",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "180px",
                }}
              >
                {currentHs.name}
              </div>
              <div
                className="dp-topbar-ratings"
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                }}
              >
                <Stars rating={currentHs.rating} sz={13} />
                {currentHs.rating && (
                  <span
                    style={{
                      fontSize: ".84rem",
                      color: "#c8a96a",
                      fontWeight: 500,
                    }}
                  >
                    {currentHs.rating}
                  </span>
                )}
                {currentHs.reviews && (
                  <span
                    style={{
                      fontSize: ".74rem",
                      color: "rgba(244,239,229,.35)",
                    }}
                  >
                    ({currentHs.reviews} reviews)
                  </span>
                )}
              </div>
            </div>

            {/* Hero strip */}
            <div
              className="kha-detail-hero-strip"
              style={{
                position: "relative",
                height: "300px",
                overflow: "hidden",
              }}
            >
              <img
                src={cl(currentHs.img, 1200)}
                srcSet={clSrcSet(currentHs.img, [600, 900, 1200, 1600])}
                sizes="100vw"
                alt={currentHs.name}
                fetchpriority="high"
                decoding="async"
                width="1200"
                height="300"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom,rgba(24,35,24,.05) 0%,rgba(24,35,24,.85) 100%)",
                }}
              ></div>
              <div
                className="kha-detail-hero-bottom"
                style={{
                  position: "absolute",
                  bottom: "2rem",
                  left: "3rem",
                  right: "3rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: ".55rem",
                    marginBottom: ".65rem",
                    flexWrap: "wrap",
                  }}
                >
                  <Badge
                    bg="rgba(24,35,24,.72)"
                    border="rgba(200,169,106,.38)"
                    color="#c8a96a"
                  >
                    {currentHs.type}
                  </Badge>
                  {currentHs.hasWebsite ? (
                    <Badge
                      bg="rgba(46,74,46,.82)"
                      border="rgba(122,158,110,.42)"
                      color="#adc49a"
                    >
                      Has Website
                    </Badge>
                  ) : (
                    <Badge
                      bg="rgba(37,211,102,.15)"
                      border="rgba(37,211,102,.4)"
                      color="#4ade80"
                    >
                      WhatsApp Booking
                    </Badge>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: cg,
                    fontSize: "clamp(1.5rem,4vw,2.9rem)",
                    fontWeight: 300,
                    color: "#fdfaf4",
                    lineHeight: 1.1,
                    marginBottom: ".4rem",
                  }}
                >
                  {currentHs.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".55rem",
                    fontSize: ".82rem",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#adc49a",
                  }}
                >
                  <MapPin size={12} />
                  {currentHs.taluk} · {currentHs.district} District, Mysore
                </div>
              </div>
            </div>

            {/* ════ ROOM LIST BODY ════ */}
            <div
              className="dp-inner-wrap"
              style={{
                maxWidth: "1350px",
                margin: "0 auto",
              }}
            >
              <div
                className="kha-detail-two-col"
                style={{
                  display: "grid",
                  gridTemplateColumns: "420px 1fr",
                  gap: "2.5rem",
                  alignItems: "start",
                }}
              >
                {/* ── LEFT: About + Host ── */}
                <div
                  className="kha-detail-left-sticky"
                  style={{ position: "sticky", top: "80px" }}
                >
                  {/* About block */}
                  <div
                    style={{
                      padding: "1.6rem 1.8rem",
                      background: "rgba(31,46,31,.5)",
                      border: "1px solid rgba(200,169,106,.12)",
                      marginBottom: "1.4rem",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: ".45rem",
                        fontSize: ".66rem",
                        letterSpacing: ".28em",
                        textTransform: "uppercase",
                        color: "#c8a96a",
                        marginBottom: ".7rem",
                      }}
                    >
                      <span
                        style={{
                          width: "16px",
                          height: "1px",
                          background: "#c8a96a",
                          display: "inline-block",
                        }}
                      ></span>
                      About
                    </span>
                    <h3
                      style={{
                        fontFamily: cg,
                        fontSize: "1.35rem",
                        fontWeight: 300,
                        color: "#f4efe5",
                        marginBottom: ".3rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {currentHs.name}
                    </h3>
                    <p
                      style={{
                        fontSize: ".78rem",
                        letterSpacing: ".08em",
                        color: "#7a9e6e",
                        marginBottom: ".75rem",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: ".35rem",
                      }}
                    >
                      <MapPin
                        size={11}
                        style={{
                          color: "#c8a96a",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <span>{currentHs.location}</span>
                    </p>
                    <p
                      style={{
                        fontSize: ".72rem",
                        color: "rgba(200,169,106,.6)",
                        marginBottom: ".75rem",
                        fontStyle: "italic",
                      }}
                    >
                      (Government of Karnataka, Dept of Tourism Approved
                      Homestay)
                    </p>
                    <p
                      style={{
                        fontSize: ".87rem",
                        lineHeight: 1.85,
                        color: "rgba(244,239,229,.62)",
                        fontWeight: 300,
                        margin: "0 0 1.1rem",
                      }}
                    >
                      {currentHs.desc}
                    </p>
                  </div>

                  {/* Host profile block */}
                  <div
                    style={{
                      padding: "1.6rem 1.8rem",
                      background: "rgba(31,46,31,.65)",
                      border: "1px solid rgba(200,169,106,.12)",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: ".45rem",
                        fontSize: ".66rem",
                        letterSpacing: ".28em",
                        textTransform: "uppercase",
                        color: "#c8a96a",
                        marginBottom: ".9rem",
                      }}
                    >
                      <span
                        style={{
                          width: "16px",
                          height: "1px",
                          background: "#c8a96a",
                          display: "inline-block",
                        }}
                      ></span>
                      Your Host
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: ".9rem",
                      }}
                    >
                      <div
                        style={{
                          width: "58px",
                          height: "58px",
                          borderRadius: "50%",
                          border: "2px solid rgba(200,169,106,.3)",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        {currentHs.host.avatar ? (
                          <img
                            src={currentHs.host.avatar}
                            alt={currentHs.host.name}
                            loading="lazy"
                            decoding="async"
                            width="58"
                            height="58"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              background: "rgba(200,169,106,.15)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "1.4rem",
                            }}
                          >
                            🏡
                          </div>
                        )}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: cg,
                            fontSize: "1.18rem",
                            fontWeight: 300,
                            color: "#f4efe5",
                            lineHeight: 1.2,
                          }}
                        >
                          {currentHs.host.name}
                        </div>
                        <div
                          style={{
                            fontSize: ".66rem",
                            letterSpacing: ".15em",
                            textTransform: "uppercase",
                            color: "#7a9e6e",
                            marginTop: ".12rem",
                          }}
                        >
                          {currentHs.host.since}
                        </div>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: ".86rem",
                        lineHeight: 1.8,
                        color: "rgba(244,239,229,.58)",
                        fontWeight: 300,
                        margin: "0 0 1.1rem",
                      }}
                    >
                      {currentHs.host.desc}
                    </p>
                    {currentHs.rating && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: ".6rem",
                          padding: ".7rem 1rem",
                          background: "rgba(200,169,106,.07)",
                          border: "1px solid rgba(200,169,106,.14)",
                        }}
                      >
                        <Stars rating={currentHs.rating} sz={14} />
                        <span
                          style={{
                            fontSize: ".9rem",
                            color: "#c8a96a",
                            fontWeight: 500,
                          }}
                        >
                          {currentHs.rating}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── RIGHT: Room heading + cards ── */}
                <div>
                  <div style={{ marginBottom: "1.6rem" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: ".55rem",
                        fontSize: ".7rem",
                        letterSpacing: ".3em",
                        textTransform: "uppercase",
                        color: "#c8a96a",
                        marginBottom: ".55rem",
                      }}
                    >
                      <span
                        style={{
                          width: "20px",
                          height: "1px",
                          background: "#c8a96a",
                          display: "inline-block",
                        }}
                      ></span>
                      Choose Your Room
                    </span>
                    <h2
                      style={{
                        fontFamily: cg,
                        fontSize: "clamp(1.7rem,3vw,2.5rem)",
                        fontWeight: 300,
                        color: "#f4efe5",
                        lineHeight: 1.15,
                      }}
                    >
                      Unique Stays Available
                    </h2>
                    <p
                      style={{
                        fontSize: ".86rem",
                        color: "rgba(244,239,229,.42)",
                        marginTop: ".35rem",
                        fontWeight: 300,
                      }}
                    >
                      All rooms include home-cooked meals and direct WhatsApp
                      booking with the host family. Click any room to see full
                      details.
                    </p>
                  </div>

                  <div
                    style={{
                      height: "1px",
                      background:
                        "linear-gradient(to right,rgba(200,169,106,.28),transparent)",
                      marginBottom: "1.8rem",
                    }}
                  ></div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.2rem",
                    }}
                  >
                    {ROOM_TYPES[currentHs.id]?.map((room, i) => (
                      <RoomListCard
                        key={room.key}
                        room={room}
                        h={currentHs}
                        onOpen={openRoom}
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ════ ROOM FULL DETAIL ════ */}
      <RoomDetail h={currentHs} roomKey={roomKey} onBack={closeRoom} />
    </>
  );
};

export default Home;
