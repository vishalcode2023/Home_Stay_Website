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
  MessageCircle,
  Award,
  Globe,
  Smartphone,
  ChevronRight,
  ArrowLeft,
  Wifi,
  Wind,
  Tv,
  Bath,
} from "lucide-react";
import FloatBookButton from "../components/FloatBookButton";
import Navbar from "./navbar";
import Footer from "../components/Footer";
import HouseRules from "./Homerules";

/* ─── Cloudinary helper ─────────────────────────────────────────────────── */
const cl = (url, w = 600) => {
  if (!url || !url.startsWith("https://res.cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/w_${w},f_auto,q_auto,c_fill/`);
};

/* PERF: responsive srcSet generator — browser picks the smallest image that
   satisfies the rendered size instead of always downloading a fixed width.
   Falls back gracefully for non-Cloudinary URLs (returns undefined). */
const clSrcSet = (url, widths = [320, 480, 640, 800, 1000]) => {
  if (!url || !url.startsWith("https://res.cloudinary.com")) return undefined;
  return widths.map((w) => `${cl(url, w)} ${w}w`).join(", ");
};

/* ─── Shared viewport hook ───────────────────────────────────────────────
   PERF: a single matchMedia listener shared by every consumer instead of
   each RoomListCard instance attaching its own `resize` listener. Avoids
   N duplicate listeners + layout reads when there are many room cards. */
const MOBILE_QUERY = "(max-width: 640px)";
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

/* ─── Non-Tailwindable CSS ──────────────────────────────────────────────── */
// NOTE: Remove the @import from here and add to index.html instead:
// <link rel="preconnect" href="https://fonts.googleapis.com" />
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
const STYLES = `
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background:#182318; color:#f4efe5; overflow-x:hidden; cursor:none; }
  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-track { background:#182318; }
  ::-webkit-scrollbar-thumb { background:#c8a96a; }

  .kha-cur  { width:9px; height:9px; background:#c8a96a; border-radius:50%; position:fixed; top:0; left:0; pointer-events:none; z-index:9999; transform:translate3d(-50%,-50%,0); }
  .kha-cuf  { width:34px; height:34px; border:1px solid rgba(200,169,106,.4); border-radius:50%; position:fixed; top:0; left:0; pointer-events:none; z-index:9998; transform:translate3d(-50%,-50%,0); }

  @keyframes khaHeroZoom { to { transform:scale(1); } }
  .kha-ex-hero-bg { animation:khaHeroZoom 12s ease forwards; transform:scale(1.06); }
  @keyframes khaFadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  .kha-fade-1 { opacity:0; animation:khaFadeUp .9s .3s forwards; }
  .kha-fade-2 { opacity:0; animation:khaFadeUp .9s .5s forwards; }
  .kha-fade-3 { opacity:0; animation:khaFadeUp .9s .7s forwards; }
  .kha-fade-4 { opacity:0; animation:khaFadeUp .9s .9s forwards; }

  .kha-eyebrow { display:inline-flex; align-items:center; gap:.6rem; font-size:.72rem; letter-spacing:.32em; text-transform:uppercase; color:#c8a96a; margin-bottom:1rem; }
  .kha-eyebrow::before { content:''; width:22px; height:1px; background:#c8a96a; }

  .kha-card-img-wrap { border-radius:52px 52px 0 0; }
  .kha-card { transition:transform .4s,border-color .4s,box-shadow .4s; cursor:none; }
  .kha-card:hover { transform:translateY(-7px); border-color:rgba(200,169,106,.32) !important; box-shadow:0 20px 60px rgba(0,0,0,.35); }
  .kha-card:hover .kha-price-overlay { opacity:1; }
  .kha-card:hover .kha-card-img { transform:scale(1.09); }
  .kha-card-img { transition:transform .7s; }
  .kha-btn-wa:hover { background:rgba(37,211,102,.32) !important; }
  .kha-btn-web:hover { background:rgba(200,169,106,.28) !important; }

  .kha-reveal { opacity:0; transform:translateY(36px); transition:opacity .85s ease,transform .85s ease; }
  .kha-reveal.in { opacity:1; transform:translateY(0); }
  .kha-d1{transition-delay:.12s;} .kha-d2{transition-delay:.24s;} .kha-d3{transition-delay:.36s;}

  /* ── Detail slide ── */
  #khaExpDetailPage {
    position:fixed; inset:0; z-index:2000; background:#182318;
    overflow-y:auto; overflow-x:hidden; -webkit-overflow-scrolling:touch;
    transform:translateX(100%);
    transition:transform .52s cubic-bezier(.25,.46,.45,.94);
    will-change:transform;
  }
  #khaExpDetailPage.open { transform:translateX(0); }
  #khaExpDetailPage.open .kha-dp-hero-img { transform:scale(1); }
  .kha-dp-hero-img { transform:scale(1.04); transition:transform 8s ease; }
  .kha-dp-back:hover { color:#c8a96a !important; border-color:#c8a96a !important; }
  .kha-dp-btn-wa:hover { background:rgba(37,211,102,.3) !important; }
  .kha-dp-btn-site:hover { background:rgba(200,169,106,.26) !important; }
  .kha-dp-amen-item:hover { border-color:rgba(200,169,106,.3) !important; }
  .kha-gal-img:hover img { transform:scale(1.07); }
  .kha-gal-img img { transition:transform .6s; }

  /* ── Room full detail slide ── */
  #khaExpRoomPage {
    position:fixed; inset:0; z-index:3000; background:#182318;
    overflow-y:auto; overflow-x:hidden; -webkit-overflow-scrolling:touch;
    transform:translateX(100%);
    transition:transform .48s cubic-bezier(.25,.46,.45,.94);
    will-change:transform;
  }
  #khaExpRoomPage.open { transform:translateX(0); }

  /* Room list cards */
  .kha-room-card { display:flex; overflow:hidden; border:1px solid rgba(200,169,106,.12); background:#1f2e1f; transition:border-color .35s,transform .35s,box-shadow .35s; cursor:none; border-radius:4px; }
  .kha-room-card:hover { border-color:rgba(200,169,106,.42); transform:translateY(-4px); box-shadow:0 18px 50px rgba(0,0,0,.45); }

  /* 6-img mosaic */
  .kha-mosaic { display:grid; grid-template-columns:2fr 1fr 1fr; grid-template-rows:230px 180px; gap:.55rem; border-radius:4px; overflow:hidden; margin-bottom:2.4rem; }
  .kha-mosaic-main { grid-row:1/3; overflow:hidden; }
  .kha-mosaic-cell { overflow:hidden; }
  .kha-mosaic img { width:100%; height:100%; object-fit:cover; transition:transform .6s; }
  .kha-mosaic-main:hover img,.kha-mosaic-cell:hover img { transform:scale(1.06); }

  /* Amenity items */
  .kha-amen-item { display:flex; align-items:center; gap:.75rem; padding:.85rem 1.1rem; background:rgba(31,46,31,.7); border:1px solid rgba(200,169,106,.1); transition:border-color .3s; }
  .kha-amen-item:hover { border-color:rgba(200,169,106,.3); }

  /* Back btn */
  .kha-back-btn { display:inline-flex; align-items:center; gap:.55rem; text-decoration:none; color:rgba(244,239,229,.72); font-size:.76rem; letter-spacing:.2em; text-transform:uppercase; background:rgba(31,46,31,.7); border:1px solid rgba(200,169,106,.22); padding:.5rem 1.4rem; transition:color .3s,border-color .3s; cursor:none; white-space:nowrap; flex-shrink:0; }
  .kha-back-btn:hover { color:#c8a96a; border-color:#c8a96a; }
  .kha-btn-wa-room { display:flex; align-items:center; justify-content:center; gap:.6rem; padding:.85rem 1.6rem; background:rgba(37,211,102,.18); border:1px solid rgba(37,211,102,.42); color:#4ade80; font-size:.78rem; letter-spacing:.18em; text-transform:uppercase; text-decoration:none; transition:background .3s; cursor:none; }
  .kha-btn-wa-room:hover { background:rgba(37,211,102,.32); }
  .kha-btn-web-room { display:flex; align-items:center; justify-content:center; gap:.6rem; padding:.85rem 1.6rem; background:rgba(200,169,106,.14); border:1px solid rgba(200,169,106,.38); color:#c8a96a; font-size:.78rem; letter-spacing:.18em; text-transform:uppercase; text-decoration:none; transition:background .3s; cursor:none; }
  .kha-btn-web-room:hover { background:rgba(200,169,106,.28); }

  /* Detail two-col */
  .kha-detail-two-col { grid-template-columns:420px 1fr; }

  .kha-exp-card-grid { grid-template-columns:repeat(3,1fr); }
  .kha-promo-feat { transition:border-color .3s; }
  .kha-promo-feat:hover { border-color:rgba(200,169,106,.28) !important; }
  .kha-divider-gem { width:5px; height:5px; background:#c8a96a; transform:rotate(45deg); }

  .kha-btn-load::after { content:''; width:28px; height:1px; background:#c8a96a; transition:width .3s; }
  .kha-btn-load:hover::after { width:44px; }
  .kha-btn-load:hover { border-color:#c8a96a !important; background:rgba(200,169,106,.08) !important; }

  /* Topbar */
  .dp-topbar { padding:.85rem 3rem; }

  /* Booking sticky */
  .kha-booking-sticky { position:sticky; top:80px; }

  /* Detail left sticky */
  .kha-detail-left-sticky { position:sticky; top:80px; }

  /* PERF: extracted from inline styles — RoomListCard hover/layout states.
     Identical visual result, but lets the browser cache rule application
     instead of recomputing fresh style objects on every render. */
  .kha-rlc {
    display:grid;
    overflow:hidden;
    background:#1c2d1c;
    box-shadow:0 4px 20px rgba(0,0,0,.25);
    transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s cubic-bezier(.22,1,.36,1),border-color .4s cubic-bezier(.22,1,.36,1),background .4s cubic-bezier(.22,1,.36,1);
    cursor:pointer;
    position:relative;
    border:1px solid rgba(200,169,106,.14);
    grid-template-columns:340px 1fr;
  }
  .kha-rlc:hover {
    background:rgba(31,46,31,.95);
    transform:translateY(-5px);
    box-shadow:0 24px 64px rgba(0,0,0,.5);
  }
  .kha-rlc-img-wrap { position:relative; overflow:hidden; height:360px; }
  .kha-rlc-img { width:100%; height:100%; object-fit:cover; transition:transform .7s cubic-bezier(.22,1,.36,1); transform:scale(1); }
  .kha-rlc:hover .kha-rlc-img { transform:scale(1.06); }
  .kha-rlc-watermark { opacity:.12; transition:opacity .4s; }
  .kha-rlc:hover .kha-rlc-watermark { opacity:.22; }
  .kha-rlc-title { color:#e8e2d4; transition:color .3s; }
  .kha-rlc:hover .kha-rlc-title { color:#fdfaf4; }
  .kha-rlc-tagrow { border-top:1px solid rgba(200,169,106,.08); transition:border-color .3s; }
  .kha-rlc:hover .kha-rlc-tagrow { border-color:rgba(200,169,106,.2); }

  @media(max-width:640px){
    .kha-rlc { grid-template-columns:1fr; }
    .kha-rlc:hover { transform:none; }
    .kha-rlc-img-wrap { height:210px; }
  }

  /* ─── TABLET ─────────────────── */
  @media(max-width:900px){
    body { cursor:auto; }
    .kha-cur,.kha-cuf { display:none; }
    .kha-ex-hero-content { padding:0 1.5rem 2.5rem; flex-direction:column; align-items:flex-start; }
    .kha-exp-card-grid { grid-template-columns:1fr 1fr !important; gap:1rem !important; }
    .kha-dp-body { padding:2rem 1.5rem 5rem !important; }
    .kha-dp-grid { grid-template-columns:1fr !important; }
    .kha-dp-gallery { height:240px !important; }
    .kha-dp-amen-grid { grid-template-columns:1fr 1fr !important; }
    .kha-promo-inner { grid-template-columns:1fr !important; }
    .kha-detail-two-col { grid-template-columns:1fr !important; }
    .kha-detail-left-sticky { position:static !important; }
    .kha-mosaic { grid-template-rows:180px 140px !important; }
    #khaExpDetailPage .dp-inner, #khaExpRoomPage .dp-inner { padding:2rem 1.5rem 5rem !important; }
    .dp-topbar { padding:.8rem 1.5rem !important; }
  }

  /* ─── MOBILE ─────────────────── */
  @media(max-width:768px){
    .px-16 { padding-left:1rem !important; padding-right:1rem !important; }
    .kha-exp-card-grid { grid-template-columns:repeat(2,1fr) !important; gap:.85rem !important; }
    .kha-mosaic { grid-template-columns:1fr 1fr !important; grid-template-rows:190px 120px 120px !important; }
    .kha-mosaic-main { grid-row:auto !important; grid-column:1/3 !important; }
    .kha-detail-grid { grid-template-columns:1fr !important; gap:1.5rem !important; }
    .kha-booking-sticky { position:static !important; top:auto !important; }
    .dp-topbar { padding:.6rem 1rem !important; gap:.65rem !important; }
    .kha-back-btn { padding:.4rem .9rem !important; font-size:.67rem !important; letter-spacing:.1em !important; }
    .kha-hero-strip { height:210px !important; }
    .kha-hero-strip-content { left:1.2rem !important; right:1.2rem !important; bottom:1.2rem !important; }
  }

  /* ─── SMALL MOBILE ───────────── */
  @media(max-width:600px){
    .kha-exp-card-grid { grid-template-columns:1fr !important; }
    .kha-nearby-grid { grid-template-columns:1fr !important; }
    .kha-amenity-grid { grid-template-columns:1fr !important; }
    .kha-room-list-card-inner { grid-template-columns:1fr !important; }
    .kha-promo-inner { gap:2rem !important; }
    .kha-mosaic { grid-template-columns:1fr 1fr !important; grid-template-rows:160px 110px 110px !important; }
  }

  @media(max-width:480px){
    .px-16 { padding-left:.75rem !important; padding-right:.75rem !important; }
    .kha-exp-card-grid { grid-template-columns:1fr !important; }
    .kha-mosaic { grid-template-columns:1fr !important; grid-template-rows:repeat(6,140px) !important; }
    .kha-mosaic-main { grid-column:auto !important; }
  }

  /* Respect reduced-motion preference without altering default visuals */
  @media (prefers-reduced-motion: reduce) {
    .kha-cur, .kha-cuf { display:none; }
    .kha-reveal { transition:none; opacity:1; transform:none; }
    * { scroll-behavior:auto !important; }
  }
`;

const cg = "'Cormorant Garamond',serif";
const jost = "'Jost',sans-serif";

/* ─── Tourist Places ─────────────────────────────────────────────────────── */
const TOURIST_PLACES = [
  { key: "mysore_palace", label: "Mysore Palace", lat: 12.3051, lng: 76.6551 },
  { key: "chamundi", label: "Chamundi Hills", lat: 12.2724, lng: 76.6761 },
  { key: "zoo", label: "Mysore Zoo", lat: 12.2953, lng: 76.6551 },
  { key: "krs", label: "KRS Dam / Brindavan Gdns", lat: 12.4227, lng: 76.5712 },
  {
    key: "nagarahole",
    label: "Nagarahole National Park",
    lat: 12.0473,
    lng: 76.1144,
  },
  { key: "kabini", label: "Kabini Backwaters", lat: 11.9376, lng: 76.3534 },
  { key: "coorg", label: "Coorg / Madikeri", lat: 12.4244, lng: 75.7382 },
  { key: "ooty", label: "Ooty", lat: 11.4102, lng: 76.695 },
  { key: "wayanad", label: "Wayanad", lat: 11.6854, lng: 76.132 },
  { key: "srirangapatna", label: "Srirangapatna", lat: 12.422, lng: 76.6954 },
  {
    key: "bandipur",
    label: "Bandipur National Park",
    lat: 11.6711,
    lng: 76.6341,
  },
  {
    key: "shravanabelagola",
    label: "Shravanabelagola",
    lat: 12.8586,
    lng: 76.4857,
  },
  {
    key: "belur_halebidu",
    label: "Belur / Halebidu",
    lat: 13.1683,
    lng: 75.868,
  },
  {
    key: "bylakuppe",
    label: "Bylakuppe (Tibetan Colony)",
    lat: 12.292,
    lng: 75.9947,
  },
];

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

/* PERF: hoisted out of render — computing nearest-places-sorted-list is
   identical for the same (lat,lng) pair every time, so we memoize per
   coordinate key globally instead of recomputing inside every component
   that needs it (HsCard, RoomDetail, RoomListCard's parent, etc). */
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

/* Manual nearby-distance overrides, keyed by homestay id → place key.
   Used when a property's lat/lng aren't available (or need a manual
   correction) so nearby distances can still be shown. */
const NEARBY_OVERRIDES = {
  8: {
    mysore_palace: 61,
    chamundi: 63,
    zoo: 59,
    krs: 70,
    nagarahole: 5.9,
    kabini: 8.7,
    coorg: 117,
    ooty: 169,
    wayanad: 72,
    srirangapatna: 751,
    bandipur: 90,
    shravanabelagola: 127,
    belur_halebidu: 178,
    bylakuppe: 81,
  },
};

/* Resolves the nearby-places list for a homestay: uses a manual override
   table when present (e.g. properties without lat/lng), otherwise falls
   back to the live haversine-based nearestPlaces() calculation. */
function resolveNearbyPlaces(h) {
  const override = NEARBY_OVERRIDES[h.id];
  if (override) {
    return TOURIST_PLACES.map((p) => ({ ...p, dist: override[p.key] }))
      .filter((p) => p.dist != null)
      .sort((a, b) => a.dist - b.dist);
  }
  return nearestPlaces(h.lat, h.lng);
}

/* ─── Amenity icons ─────────────────────────────────────────────────────── */
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
  "Private Garden": <Leaf size={17} />,
  "Heritage Architecture": <Building2 size={17} />,
  "Yoga Space": <Heart size={17} />,
  "Air Conditioning": <Wind size={17} />,
  "Free WiFi": <Wifi size={17} />,
  "Smart TV": <Tv size={17} />,
  "Private Bathroom": <Bath size={17} />,
};

/* ─── ROOM_TYPES ─────────────────────────────────────────────────────────
   All Cloudinary URLs optimised at source — the cl() helper adds
   w_N,f_auto,q_auto at render time so we keep full-res here.
──────────────────────────────────────────────────────────────────────── */
const ROOM_TYPES = {
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
  2: [
    {
      key: "1bhk_garden",
      name: "1 BHK Family Room – Garden View Accommodates up to 5 guests with air conditioning.",
      tag: "Best Value",
      tagBg: "rgba(200,169,106,.16)",
      tagBorder: "rgba(200,169,106,.4)",
      tagColor: "#c8a96a",
      accentColor: "#c8a96a",
      multiplier: 1,
      fixedPrice: 2499,
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
      name: "2 BHK Deluxe AC Apartment 4 People Stay with AC , 1 Single AC Room 2 People Stay on Per Room",
      tag: "Most Popular",
      tagBg: "rgba(122,158,110,.15)",
      tagBorder: "rgba(122,158,110,.4)",
      tagColor: "#adc49a",
      accentColor: "#7a9e6e",
      multiplier: 1.6,
      fixedPrice: 3999,
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
        "Air Conditioning",
        "Full pledged kitchen with gas stove, gas cylinder & utensils",
        "Hot water kettle",
        "Fridge",
        "Washing Machine",
        "Free WiFi",
        "Hot water (solar and geyser)",
        "Towels",
        "Toothpaste",
        "Pears Liquid Body Wash",
        "Shampoo",
        "Coffee/Tea powder and sugar",
        "Oven",
        "Smart TV",
      ],
      imgs: [
        "/images/mod1.avif",
        "/images/mod2.avif",
        "/images/mod3.avif",  
        "/images/mod4.avif",
        "/images/mod5.avif",
      
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
      fixedPrice: 2800,
      guests: 8,
      beds: 2,
      sqft: null,
      desc: "A bright, airy, and peaceful first-floor 2BHK homestay. Well-ventilated and naturally lit, perfect for families looking for a calm and homely stay. Located in a safe residential locality. Up to 4 additional guests can be accommodated at extra charges.",
      amenities: [
        "Full pledged kitchen with gas stove, gas cylinder & utensils",
        "Hot water kettle",
        "Fridge",
        "Washing Machine",
        "Free WiFi",
        "Hot water (solar and geyser)",
        "Towels",
        "Toothpaste",
        "Pears Liquid Body Soap",
        "Shampoo",
        "Coffee/Tea powder and sugar in the kitchen",
        "Oven",
        "Smart TV",
      ],
      imgs: [
        "/images/mod6.avif",
        "/images/mod7.avif",
        "/images/mod8.avif",
        "/images/mod9.avif",
        "/images/mod10.avif",
        "/images/mod11.avif",
      ],
    },
  ],
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
  7: [
    {
      key: "heritage_suite",
      name: "Heritage Suite – AC Suite for 2 Guests (Per Day). Extra bed: ₹500 per person, per day. Children below 6 years Free.",
      tag: "AC Suite",
      tagBg: "rgba(200,169,106,.16)",
      tagBorder: "rgba(200,169,106,.4)",
      tagColor: "#c8a96a",
      accentColor: "#c8a96a",
      multiplier: 1,
      fixedPrice: 2000,
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
      name: "Royal Balcony Suite – Non-AC Suite for 2 Guests (Per Day). Extra bed: ₹500 per person, per day. Children below 6 years stay free",
      tag: "Non-AC Suite",
      tagBg: "rgba(122,158,110,.15)",
      tagBorder: "rgba(122,158,110,.4)",
      tagColor: "#adc49a",
      accentColor: "#7a9e6e",
      multiplier: 0.8,
      guests: 2,
      beds: 1,
      fixedPrice: 1500,
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
  8: [
    {
      key: "premium_ac_room",
      name: "Premium Non-Smoking AC Room",
      tag: "River / Plantation View",
      tagBg: "rgba(200,169,106,.16)",
      tagBorder: "rgba(200,169,106,.4)",
      tagColor: "#c8a96a",
      accentColor: "#c8a96a",
      multiplier: 1,
      guests: 2,
      beds: 1,
      sqft: 200,
      desc: "A cozy, upscale room blending rustic farm life with vintage luxury. King-size comfort bed, high-speed Wi-Fi (25+ Mbps), a TV with casting support, remote-controlled fans, and complimentary premium toiletries. Comes with a dedicated sit-out balcony facing either the river or the green plantations. Accommodates up to 3 guests with an extra mattress; extra persons charged at 50% of the standard room rent.",
      amenities: [
        "King-size comfort bed",
        "High-speed WiFi (25+ Mbps)",
        "TV with device casting",
        "Remote-controlled fans",
        "Complimentary premium toiletries",
        "Private river/plantation-facing balcony",
        "Non-Smoking, AC",
      ],
      imgs: [
        // TODO: add image URLs for this room type
      ],
    },
  ],
};

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
    phone: "9739516163",
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
    price: 2499,
    rating: 4.8,
    reviews: 32,
    amenities: ["Free WiFi", "Air Conditioning"],
    hasWebsite: false,
    phone: "9844540739",
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
    desc: "Sky House Homestay offers a warm, homely atmosphere with modern comforts at an affordable price. Ideal for families, couples, corporate travelers, and small groups visiting Mysore. Choose from a garden-view ground floor 1BHK or a premium 2BHK AC apartment with a private sit-out balcony. Free parking, 24-hour hot water, and complimentary Wi-Fi included across all rooms. 2499 5 people can acc there, 3999 4 peoples can acc there, 2 single ac rooms, 1 single 2 members can stay per room, 1999 2bhk photos",
    host: {
      name: "B S Krishna Kanth",
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
    phone: "9448066776",
    email: "1000silversfarm@gmail.com",
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
    location:
      "Sy No 113, Mahadevpura, Manandwadi Road, jayapura hobli, Mysore Taluk 570008",
    desc: "1000 Silvers Farm Stay is a tranquil, pet-friendly retreat located in the countryside of Mysore, India, specifically situated along the HD Kote and Mysore highway. It is designed as an exclusive farmhouse experience, often catering to individual groups to ensure privacy. Approved by the Tourism Department. Choose from Nature Cottages (up to 4 guests, four-poster bed + bunk beds, AC, smart TV) or the Premium 2BHK AC Villa (up to 8 guests, 2 king beds + 4 bunker beds, full seating hall with WiFi).",
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
    price: 2700,
    rating: null,
    reviews: null,
    amenities: ["Free WiFi", "TV", "Fully Equipped Kitchen", "Solar Geyser"],
    hasWebsite: false,
    phone: null,
    img: "/images/mod1.avif",
    imgs: [
      "/images/mod1.avif",
      "/images/mod2.avif",
      "/images/mod3.avif",
      "/images/mod4.avif",
      "/images/mod5.avif",
      "/images/mod6.avif",
      "/images/mod7.avif",
      "/images/mod8.avif",
      "/images/mod9.avif",
      "/images/mod10.avif",
     
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
    price: 2800,
    rating: 5.0,
    reviews: 124,
    amenities: [
      "Meals Included",
      "Private Garden",
      "Outdoor Sports",
      "Bonfire",
    ],
    hasWebsite: false,
    phone: "9480568332",
    phone2: "8050186332",
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
    mapsLink: "https://maps.app.goo.gl/WaVFuoNGRAAdKyQP8?g_st=iw",
    checkIn: "12:00 PM",
    checkOut: "11:00 AM",
    rooms:
      "3 Family Rooms | 1 Queen bed + 1 sofa-cum-bed | up to 3 guests/room",
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
    website: "https://www.bolakhomestay.com",
    email: "stay@bolakhomestay.com",
    phone: "9448336870",
    phones: ["8618064513", "9448336870", "9449866487"],
    img: "/images/bolak1.avif",
    imgs: [
      "/images/bolak1.avif",
      "/images/bolak2.avif",
      "/images/bolak3.avif",
      "/images/bolak4.avif",
      "/images/bolak5.avif",
      "/images/bolak6.avif",
      "/images/bolak7.avif",
      "/images/bolak8.avif",
    ],
    type: "Premium Villa Homestay",
    location: "Bogadi Sector, Tree-Lined Residential Zone, Mysuru, Karnataka",
    checkIn: "12:00 PM",
    checkOut: "11:00 AM",
    suites: [
      {
        name: "The Heritage Suite",
        ac: true,
        desc: "Minimalist joined platform twin beds forming a King setup on dark vitrified floors.",
      },
      {
        name: "Royal Balcony Suite",
        ac: false,
        desc: "Hardwood wardrobe, wall-mounted Smart TV, opens to a covered terrace verandah.",
      },
    ],
    desc: "Bolak Homestay is a premium independent multi-level villa sanctuary in the peaceful upscale residential hub of heritage Mysuru. Hosted personally by Rohini Chengappa, it combines complete independent seclusion with professional concierge support. Large open casement layouts maximize natural daylight and fresh air throughout. 4 individual suites: 2 AC, 2 Non-AC.",
    host: {
      name: "Rohini Chengappa",
      since: "Host",
      avatar: null,
      desc: "Rohini personally manages the property, ensuring professional and caring hospitality for every guest.",
    },
    guestReviews: [],
  },
  {
    id: 8,
    lat: null, // TODO: add exact coordinates for Kapila Riverfront
    lng: null,
    name: "Kapila Riverfront",
    taluk: "Nanjangud",
    district: "Mysuru",
    region: "mysuru",
    price: 11000,
    rating: null,
    reviews: null,
    amenities: [
      "5 Premium Non-Smoking AC Rooms",
      "River/Plantation-Facing Balconies",
      "High-Speed WiFi",
      "Pet-Friendly (charges apply)",
      "Candlelight River Dinners",
      "Areca Nut Plantation Walks",
      "River-to-Table Barbecue",
    ],
    hasWebsite: false,
    phone: "9606654482",
    phones: ["08214001100", "9606654482", "9980944650"],
    email: "info@kapilariverfront.com",
    img: "/images/kapila1.avif",
           
    imgs: [
      "/images/kapila1.avif",
      "/images/kapila2.avif",
      "/images/kapila3.avif",
      "/images/kapila4.avif",
      "/images/kapila5.avif",
      "/images/kapila6.avif",
      "/images/kapila7.avif",
      "/images/kapila8.avif",
      "/images/kapila9.avif",
      "/images/kapila10.avif",
    ],
    type: "Riverfront Farm Villa",
    location:
      "Kapila Riverfront, 193/1, Chikkayyana Chhatra Hobli, Hatwalu Katte Road, Rampura, Nanjangud TQ, Mysore - 571314 • ~40 minutes from Mysore City",
    checkIn: "1:00 PM",
    checkOut: "11:00 AM",
    desc: "Kapila Riverfront features 5 Premium Non-Smoking AC Rooms tailored for a cozy, upscale stay, seamlessly blending rustic farm life with vintage luxury. Groups can book all 5 rooms together for a full villa buyout — ideal for private parties, family reunions, small weddings, or corporate retreats. Close to Hullahalli Dam, with custom candlelight dinners by the river, areca nut plantation walks, and on-demand freshly sourced river-to-table barbecue.",
    tariffs: [
      {
        plan: "MAP Plan",
        price: 11000,
        unit: "per night",
        inclusions: "Room Stay + Breakfast + Lunch or Dinner",
      },
      {
        plan: "AP Plan",
        price: 12000,
        unit: "per night",
        inclusions: "Room Stay + All Meals (Breakfast, Lunch & Dinner)",
      },
      {
        plan: "Weekday Price",
        price: 12000,
        unit: "per night",
        inclusions: "Standard base rate (Monday – Thursday)",
      },
      {
        plan: "Weekend Price",
        price: 14000,
        unit: "per night",
        inclusions: "Standard base rate (Friday – Sunday)",
      },
      {
        plan: "Day Outing (Veg)",
        price: 1500,
        unit: "net per person",
        inclusions:
          "Welcome drinks, Veg Lunch, Evening Tea/Snacks + Activity Access",
      },
      {
        plan: "Day Outing (Non-Veg)",
        price: 1800,
        unit: "net per person",
        inclusions:
          "Welcome drinks, Non-Veg Lunch, Evening Tea/Snacks + Activity Access",
      },
      {
        plan: "Pet Charges",
        price: 2000,
        unit: "per day",
        inclusions: "Property is completely pet-friendly",
      },
    ],
    extraGuestPolicy: "Extra persons charged at 50% of the standard room rent",
    bookingOffice: {
      phones: ["0821-4001100", "+91 96066 54482", "+91 99809 44650"],
      email: "info@kapilariverfront.com",
    },
    host: {
      name: "Prashanth B. S.",
      since: "Registered Promoter",
      avatar: null,
      desc: "Property registered under/associated with Prashanth B. S. Bookings and management are handled by Spice Trip.",
    },
    guestReviews: [],
  },
];

/* ─── Stars helper ──────────────────────────────────────────────────────── */
const Stars = memo(function Stars({ rating, sz = 14 }) {
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

/* ─── Avatar ────────────────────────────────────────────────────────────── */
function Avatar({ src, name, size = 58 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "2px solid rgba(200,169,106,.3)",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          decoding="async"
          width={size}
          height={size}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
            fontSize: "1.2rem",
            color: "#c8a96a",
            fontFamily: cg,
          }}
        >
          {name?.charAt(0) ?? "?"}
        </div>
      )}
    </div>
  );
}

/* ─── Lazy Map ──────────────────────────────────────────────────────────── */
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
        height: "360px",
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

/* ─── Explore Card ──────────────────────────────────────────────────────── */
const HsCard = memo(function HsCard({ h, onOpen, distance }) {
  /* PERF: nearestPlaces() is now globally memoized by (lat,lng) key, so this
     useMemo just slices the top 3 — no recompute of the full haversine pass
     when multiple components need the same property's distances. Uses
     resolveNearbyPlaces() so properties with a manual override (e.g. no
     lat/lng) still get correct nearby distances. */
  const nearbyPlaces = useMemo(
    () => resolveNearbyPlaces(h).slice(0, 3),
    [h],
  );

  const handleClick = useCallback(() => onOpen(h.id), [onOpen, h.id]);
  const srcSet = useMemo(() => clSrcSet(h.img), [h.img]);

  return (
    <div
      className="kha-card kha-reveal bg-[#1f2e1f] overflow-hidden"
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
          style={{ aspectRatio: "4/3" }}
        />
        <div className="absolute top-[.9rem] left-[.9rem] flex gap-1 flex-wrap z-[2]">
          <Badge
            bg="rgba(24,35,24,.72)"
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
        {distance !== null && (
          <div
            className="absolute bottom-[.9rem] right-[.9rem] z-[2] flex items-center gap-[.35rem] px-3 py-[.3rem]"
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
          className="kha-price-overlay absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 transition-opacity duration-300 z-[3]"
          style={{
            background: "rgba(24,35,24,.9)",
            backdropFilter: "blur(4px)",
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
            {ROOM_TYPES[h.id]?.length ?? 0} Unique Stays Available
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
          {h.rating && (
            <>
              <Stars rating={h.rating} sz={13} />
              <span
                style={{
                  fontSize: ".84rem",
                  color: "#c8a96a",
                  fontWeight: 500,
                }}
              >
                {h.rating}
              </span>
            </>
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
          {nearbyPlaces.map((p) => (
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
                style={{ fontSize: ".7rem", color: "#c8a96a", fontWeight: 600 }}
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

/* ─── Room List Card ────────────────────────────────────────────────────── */
const RoomListCard = memo(function RoomListCard({ room, h, onOpen, index }) {
  const price =
    h.price != null && room.multiplier != null
      ? Math.round((h.price * room.multiplier) / 100) * 100
      : null;

  /* PERF: shared matchMedia hook instead of a per-card resize listener.
     Visuals are unaffected — the breakpoint (640px) and behavior match the
     original isMobile state exactly. */
  const isMobile = useIsMobile();

  const roomImgs = room.imgs && room.imgs.length > 0 ? room.imgs : h.imgs;
  const imgSrc = roomImgs[0] || h.img;
  const srcSet = useMemo(() => clSrcSet(imgSrc), [imgSrc]);

  const handleClick = useCallback(() => onOpen(room.key), [onOpen, room.key]);

  return (
    <div
      className="kha-room-list-card-inner kha-rlc"
      onClick={handleClick}
      style={{
        /* dynamic, per-room values stay inline; static hover/layout rules
           now live in .kha-rlc / .kha-rlc:hover in STYLES above */
        borderColor: "rgba(200,169,106,.14)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = room.tagBorder;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(200,169,106,.14)";
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: isMobile ? "auto" : 0,
          right: isMobile ? 0 : "auto",
          width: isMobile ? "auto" : "3px",
          height: isMobile ? "3px" : "auto",
          background: `linear-gradient(to ${isMobile ? "right" : "bottom"}, ${room.accentColor}, transparent)`,
          opacity: 0.6,
          zIndex: 2,
        }}
      />

      {/* Image */}
      <div className="kha-rlc-img-wrap">
        <img
          src={cl(imgSrc, 640)}
          srcSet={srcSet}
          sizes="(max-width: 640px) 100vw, 340px"
          alt={room.name}
          loading="lazy"
          decoding="async"
          width="640"
          height="360"
          className="kha-rlc-img"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom,rgba(24,35,24,.08) 0%,rgba(24,35,24,.6) 100%)",
          }}
        />
        {/* Watermark */}
        <div
          className="kha-rlc-watermark"
          style={{
            position: "absolute",
            top: "-.5rem",
            right: ".8rem",
            fontFamily: cg,
            fontSize: isMobile ? "4rem" : "5.5rem",
            fontWeight: 300,
            lineHeight: 1,
            color: room.accentColor,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        {/* Tag */}
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
        {/* Price */}
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
            {price != null ? (
              <>
                {`₹${price.toLocaleString("en-IN")}`}
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
              </>
            ) : (
              <span style={{ fontSize: "1rem" }}>Contact for Price</span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: isMobile
            ? "1.2rem 1.1rem 1.3rem"
            : "1.7rem 2rem 1.7rem 1.8rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: ".85rem",
          minWidth: 0,
        }}
      >
        <div>
          <div
            className="kha-rlc-title"
            style={{
              fontFamily: cg,
              fontSize: isMobile ? "1.4rem" : "1.85rem",
              fontWeight: 300,
              lineHeight: 1.15,
              marginBottom: ".5rem",
              wordBreak: "break-word",
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
            {room.amenities.slice(0, isMobile ? 3 : 5).map((a) => (
              <span
                key={a}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: ".28rem",
                  fontSize: ".67rem",
                  letterSpacing: ".04em",
                  color: "rgba(244,239,229,.5)",
                  padding: ".24rem .65rem",
                  background: "rgba(200,169,106,.05)",
                  border: "1px solid rgba(200,169,106,.1)",
                  whiteSpace: "nowrap",
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
        <div
          className="kha-rlc-tagrow"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
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
              padding: isMobile ? ".6rem 1.2rem" : ".65rem 1.5rem",
              border: `1px solid ${room.tagBorder}`,
              color: room.tagColor,
              fontSize: ".7rem",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              fontFamily: jost,
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

/* ─── Room Full Detail ──────────────────────────────────────────────────── */
function RoomDetail({ h, roomKey, onBack }) {
  /* PERF: nearestPlaces() now uses the global memo cache keyed by (lat,lng)
     instead of mapping+sorting TOURIST_PLACES fresh in JSX on every render
     of this component (which previously had no memoization at all). Uses
     resolveNearbyPlaces() so properties with a manual override (e.g. no
     lat/lng) still get correct nearby distances. */
  const sortedPlaces = useMemo(
    () => (h ? resolveNearbyPlaces(h) : []),
    [h],
  );

  if (!h || !roomKey) return null;
  const room = ROOM_TYPES[h.id]?.find((r) => r.key === roomKey);
  if (!room) return null;

  const price =
    h.price != null && room.multiplier != null
      ? Math.round((h.price * room.multiplier) / 100) * 100
      : null;
  const wa = `https://wa.me/91${h.phone}?text=Hello%2C%20I%20found%20${encodeURIComponent(h.name)}%20on%20KHA%20and%20would%20like%20to%20book%20the%20${encodeURIComponent(room.name)}.%20Please%20share%20availability.`;

  const roomImgs = room.imgs && room.imgs.length > 0 ? room.imgs : h.imgs;
  const sixImgs =
    roomImgs.length >= 6
      ? roomImgs.slice(0, 6)
      : [...roomImgs, ...Array(6 - roomImgs.length).fill(h.img)];

  return (
    <div id="khaExpRoomPage" className={roomKey ? "open" : ""}>
      {/* Top bar */}
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
          gap: "1rem",
          flexWrap: "nowrap",
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
          <ArrowLeft size={13} /> Back to Rooms
        </a>
        <div
          style={{
            width: "1px",
            height: "16px",
            background: "rgba(200,169,106,.2)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: ".7rem",
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "rgba(244,239,229,.35)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flex: 1,
            minWidth: 0,
          }}
        >
          {h.name}
        </span>
        <div style={{ flexShrink: 0 }}>
          <span
            style={{
              padding: ".25rem .85rem",
              fontSize: ".62rem",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              background: room.tagBg,
              border: `1px solid ${room.tagBorder}`,
              color: room.tagColor,
            }}
          >
            {room.tag}
          </span>
        </div>
      </div>

      <div
        className="dp-inner"
        style={{
          maxWidth: "1160px",
          margin: "0 auto",
          padding: "2.5rem 1.5rem 6rem",
        }}
      >
        {/* Heading */}
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
              fontSize: "clamp(1.7rem,5vw,3.1rem)",
              fontWeight: 300,
              color: "#fdfaf4",
              lineHeight: 1.1,
              marginBottom: ".3rem",
              wordBreak: "break-word",
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

        {/* 6-image mosaic — first img eager, rest lazy */}
        <div className="kha-mosaic">
          <div className="kha-mosaic-main">
            <img
              src={cl(sixImgs[0], 900)}
              srcSet={clSrcSet(sixImgs[0], [500, 700, 900, 1100])}
              sizes="(max-width: 768px) 100vw, 60vw"
              alt="main"
              fetchpriority="high"
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

        {/* 2-col layout */}
        <div
          className="kha-detail-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 330px",
            gap: "2.5rem",
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
              className="kha-amenity-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(172px,1fr))",
                gap: ".6rem",
                marginBottom: "2.5rem",
              }}
            >
              {room.amenities.map((a) => (
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
                    gap: ".4rem",
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
                      minWidth: 0,
                      overflow: "hidden",
                    }}
                  >
                    <MapPin
                      size={10}
                      style={{ color: "#c8a96a", flexShrink: 0 }}
                    />
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.label}
                    </span>
                  </span>
                  <span
                    style={{
                      fontSize: ".69rem",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      padding: ".15rem .5rem",
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

            <HouseRules />

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
              <Avatar src={h.host.avatar} name={h.host.name} />
              <div style={{ minWidth: 0 }}>
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
            {/* Lazy-loaded map — no iframe until in viewport */}
            <LazyMap lat={h.lat} lng={h.lng} />
          </div>

          {/* Right — sticky booking card */}
          <div className="kha-booking-sticky">
            <div
              style={{
                background: "rgba(31,46,31,.9)",
                border: "1px solid rgba(200,169,106,.24)",
                backdropFilter: "blur(20px)",
                padding: "1.8rem 1.6rem",
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
                  className="kha-btn-web-room"
                  style={{ marginBottom: ".55rem", width: "100%" }}
                >
                  <Globe size={14} /> Visit Official Website
                </a>
              )}
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="kha-btn-wa-room"
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
                  ["Guests", room.guests ? `Up to ${room.guests}` : "—"],
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

/* ══════════════════════════════════════════════════════════════════════════
   Explore Page
══════════════════════════════════════════════════════════════════════════ */
const Explore = () => {
  const curRef = useRef(null),
    curFRef = useRef(null);
  const cxRef = useRef(0),
    cyRef = useRef(0),
    fxRef = useRef(0),
    fyRef = useRef(0);

  /* ── Custom cursor — stops RAF when mouse is idle, skips on touch ──
     PERF: now writes `transform: translate3d(...)` instead of `left/top`.
     left/top mutate layout-affecting properties and force the browser to
     recompute layout on every animation frame; transform is composited on
     the GPU and skips layout/paint, which is the standard fix for cursor-
     follower / parallax-style RAF loops. Visual result is identical. */
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf;
    let active = false;

    const onMove = (e) => {
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

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Scroll reveal — stable dep array ── */
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
  }, []); // ← empty array: run once on mount

  const [detailId, setDetailId] = useState(null);
  const [roomKey, setRoomKey] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [fPlace, setFPlace] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (roomKey) {
          setRoomKey(null);
          return;
        }
        if (detailId) {
          setDetailId(null);
          document.body.style.overflow = "";
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [detailId, roomKey]);

  /* ── Memoised filtered + sorted list ── */
  const filtered = useMemo(() => {
    const place = TOURIST_PLACES.find((p) => p.key === fPlace);
    const list = HS.map((h) => ({
      ...h,
      _distance: place ? haversine(place.lat, place.lng, h.lat, h.lng) : null,
    }));
    if (place) list.sort((a, b) => a._distance - b._distance);
    return list;
  }, [fPlace]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  /* PERF: stable callback identities via useCallback so memo()'d children
     (HsCard, RoomListCard) don't re-render purely because a new inline
     function reference was passed down on every Explore render. */
  const openDetail = useCallback((id) => {
    setDetailId(id);
    setRoomKey(null);
    document.body.style.overflow = "hidden";
    setTimeout(
      () => document.getElementById("khaExpDetailPage")?.scrollTo(0, 0),
      50,
    );
  }, []);
  const closeDetail = useCallback((e) => {
    e?.preventDefault();
    setDetailId(null);
    setRoomKey(null);
    document.body.style.overflow = "";
  }, []);
  const openRoom = useCallback((key) => {
    setRoomKey(key);
    setTimeout(
      () => document.getElementById("khaExpRoomPage")?.scrollTo(0, 0),
      50,
    );
  }, []);
  const closeRoom = useCallback(() => setRoomKey(null), []);

  const currentHs = useMemo(
    () => HS.find((h) => h.id === detailId) || null,
    [detailId],
  );

  return (
    <>
      <style>{STYLES}</style>
      <div className="kha-cur" ref={curRef}></div>
      <div className="kha-cuf" ref={curFRef}></div>

      <Navbar />
      <FloatBookButton />

      {/* ════ BROWSE ════ */}
      <section
        className="kha-browse-section my-20 px-16 pb-20 bg-[#182318]"
        id="khaExpBrowse"
        style={{ paddingTop: "3rem" }}
      >
        {fPlace &&
          (() => {
            const place = TOURIST_PLACES.find((p) => p.key === fPlace);
            return (
              <div
                className="max-w-[1300px] mx-auto mb-4 flex items-center gap-3 px-5 py-3"
                style={{
                  background: "rgba(200,169,106,.07)",
                  border: "1px solid rgba(200,169,106,.2)",
                  flexWrap: "wrap",
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
                    cursor: "pointer",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                  }}
                >
                  ✕ Clear
                </button>
              </div>
            );
          })()}

        {filtered.length === 0 ? (
          <div className="max-w-[1300px] mx-auto text-center py-20">
            <h3
              style={{
                fontFamily: cg,
                fontSize: "2.4rem",
                fontWeight: 300,
                color: "#f4efe5",
                marginBottom: ".8rem",
              }}
            >
              No homestays found
            </h3>
            <p style={{ fontSize: ".95rem", color: "rgba(244,239,229,.5)" }}>
              Try adjusting your filters — there are wonderful stays waiting to
              be discovered.
            </p>
          </div>
        ) : (
          <div className="max-w-[1300px] mx-auto grid gap-6 kha-exp-card-grid">
            {visible.map((h) => (
              <HsCard
                key={h.id}
                h={h}
                onOpen={openDetail}
                distance={h._distance}
              />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="max-w-[1300px] mx-auto text-center mt-14">
            <button
              className="kha-btn-load inline-flex items-center gap-[.8rem] px-[2.8rem] py-[.9rem] transition-all duration-300"
              style={{
                border: "1px solid rgba(200,169,106,.3)",
                color: "#c8a96a",
                fontFamily: jost,
                fontSize: ".75rem",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                background: "transparent",
                cursor: "pointer",
              }}
              onClick={() => setVisibleCount((v) => v + 6)}
            >
              Load More Homestays
            </button>
          </div>
        )}
      </section>

      {/* ════ PROMO BAND ════ */}
      <div
        className="px-16 py-14 mt-16"
        style={{
          background: "#2e4a2e",
          borderTop: "1px solid rgba(200,169,106,.15)",
          borderBottom: "1px solid rgba(200,169,106,.15)",
        }}
      >
        <div
          className="kha-promo-inner max-w-[1100px] mx-auto grid gap-16 items-center"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <div className="kha-reveal">
            <span className="kha-eyebrow">Why Book Through KHA</span>
            <h3
              style={{
                fontFamily: cg,
                fontSize: "2.4rem",
                fontWeight: 300,
                color: "#f4efe5",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              Every Stay is{" "}
              <em style={{ fontStyle: "italic", color: "#e0c88a" }}>
                Verified
              </em>
              ,<br />
              Every Host Trusted
            </h3>
            <div className="flex items-center gap-[.8rem] my-6">
              <div
                style={{
                  height: "1px",
                  background: "#c8a96a",
                  opacity: 0.35,
                  width: "50px",
                }}
              />
              <div className="kha-divider-gem" />
              <div
                style={{
                  height: "1px",
                  background: "#c8a96a",
                  opacity: 0.35,
                  width: "50px",
                }}
              />
            </div>
            <p
              style={{
                fontSize: ".95rem",
                lineHeight: 1.9,
                color: "rgba(244,239,229,.62)",
                fontWeight: 300,
              }}
            >
              All homestays listed on this platform are registered, verified,
              and operated by honorable members of the Mysuru District Homestay
              Owners Association (R). Book directly — no OTA commissions, no
              hidden charges.
            </p>
          </div>
          <div className="kha-reveal kha-d1 flex flex-col gap-[1.1rem]">
            {[
              {
                icon: <Smartphone size={24} />,
                title: "Direct Contact, Zero Fees",
                desc: "No commissions. WhatsApp or website — you negotiate directly with the host.",
              },
              {
                icon: <Leaf size={24} />,
                title: "Sustainability Committed",
                desc: "All MDHOA members follow responsible and eco-conscious tourism practices.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="kha-promo-feat flex items-start gap-4 px-5 py-[1.1rem] bg-[#182318]"
                style={{
                  border: "1px solid rgba(200,169,106,.1)",
                  color: "#c8a96a",
                }}
              >
                <span style={{ flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <span
                    style={{
                      fontSize: ".8rem",
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "#c8a96a",
                      display: "block",
                      marginBottom: ".2rem",
                    }}
                  >
                    {f.title}
                  </span>
                  <span
                    style={{
                      fontSize: ".88rem",
                      lineHeight: 1.6,
                      color: "rgba(244,239,229,.58)",
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

      <Footer cg={cg} />

      {/* ════ DETAIL SLIDE — Room list ════ */}
      <div id="khaExpDetailPage" className={detailId ? "open" : ""}>
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
                gap: "1rem",
                flexWrap: "nowrap",
              }}
            >
              <a href="#" className="kha-back-btn" onClick={closeDetail}>
                <ArrowLeft size={13} /> Back to Explore
              </a>
              <div
                style={{
                  width: "1px",
                  height: "16px",
                  background: "rgba(200,169,106,.2)",
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  fontFamily: cg,
                  fontSize: "1.1rem",
                  fontWeight: 300,
                  color: "#c8a96a",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {currentHs.name}
              </div>
              {currentHs.rating && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                    flexShrink: 0,
                  }}
                >
                  <Stars rating={currentHs.rating} sz={13} />
                  <span
                    style={{
                      fontSize: ".84rem",
                      color: "#c8a96a",
                      fontWeight: 500,
                    }}
                  >
                    {currentHs.rating}
                  </span>
                  {currentHs.reviews && (
                    <span
                      style={{
                        fontSize: ".74rem",
                        color: "rgba(244,239,229,.35)",
                      }}
                    >
                      ({currentHs.reviews})
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Hero strip — eager load, high priority */}
            <div
              className="kha-hero-strip"
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
              />
              <div
                className="kha-hero-strip-content"
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
                    fontSize: "clamp(1.4rem,5vw,2.9rem)",
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
                    flexWrap: "wrap",
                  }}
                >
                  <MapPin size={12} style={{ flexShrink: 0 }} />
                  {currentHs.taluk} · {currentHs.district} District, Mysore
                </div>
              </div>
            </div>

            {/* Body */}
            <div
              className="dp-inner"
              style={{
                maxWidth: "1350px",
                margin: "0 auto",
                padding: "2.5rem 1.5rem 6rem",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "420px 1fr",
                  gap: "2.5rem",
                  alignItems: "start",
                }}
                className="kha-detail-two-col"
              >
                {/* LEFT */}
                <div
                  className="kha-detail-left-sticky"
                  style={{ position: "sticky", top: "80px" }}
                >
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
                      />
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
                        fontSize: ".75rem",
                        color: "rgba(200,169,106,.7)",
                        marginBottom: ".75rem",
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
                      />
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
                      <Avatar
                        src={currentHs.host.avatar}
                        name={currentHs.host.name}
                      />
                      <div style={{ minWidth: 0 }}>
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

                {/* RIGHT */}
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
                      />
                      Choose Your Room
                    </span>
                    <h2
                      style={{
                        fontFamily: cg,
                        fontSize: "clamp(1.5rem,3vw,2.5rem)",
                        fontWeight: 300,
                        color: "#f4efe5",
                        lineHeight: 1.15,
                      }}
                    >
                      {ROOM_TYPES[currentHs.id]?.length ?? 0} Unique Stays
                      Available
                    </h2>
                    <p
                      style={{
                        fontSize: ".86rem",
                        color: "rgba(244,239,229,.42)",
                        marginTop: ".35rem",
                        fontWeight: 300,
                      }}
                    >
                      Direct WhatsApp booking with the host family. Tap any room
                      to see full details.
                    </p>
                  </div>
                  <div
                    style={{
                      height: "1px",
                      background:
                        "linear-gradient(to right,rgba(200,169,106,.28),transparent)",
                      marginBottom: "1.8rem",
                    }}
                  />
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

export default Explore;