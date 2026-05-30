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
  ChevronRight,
  ArrowLeft,
  Users,
  Bed,
  Bath,
  Wifi,
  Wind,
  Tv,
} from "lucide-react";
import FloatBookButton from "../components/FloatBookButton";
import Footer from "../components/Footer";
import Navbar from "./navbar";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  html, body { overflow-x: hidden; max-width: 100%; }
  body { font-family: 'Jost', sans-serif; background: #182318; color: #f4efe5; cursor: none; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #182318; }
  ::-webkit-scrollbar-thumb { background: #c8a96a; }

  .kha-cur { width:9px; height:9px; background:#c8a96a; border-radius:50%; position:fixed; top:0; left:0; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); }
  .kha-cuf { width:34px; height:34px; border:1px solid rgba(200,169,106,.4); border-radius:50%; position:fixed; top:0; left:0; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); }

  .kha-reveal { opacity:0; transform:translateY(36px); transition:opacity .85s ease,transform .85s ease; }
  .kha-reveal.in { opacity:1; transform:translateY(0); }
  .kha-d1{transition-delay:.12s;} .kha-d2{transition-delay:.24s;} .kha-d3{transition-delay:.36s;}

  .kha-eyebrow { display:inline-flex; align-items:center; gap:.6rem; font-size:.72rem; letter-spacing:.32em; text-transform:uppercase; color:#c8a96a; margin-bottom:1rem; }
  .kha-eyebrow::before { content:''; width:22px; height:1px; background:#c8a96a; }
  .kha-hero-eyebrow { display:flex; align-items:center; gap:.6rem; font-size:.72rem; letter-spacing:.32em; text-transform:uppercase; color:#c8a96a; margin-bottom:.8rem; }
  .kha-hero-eyebrow::before { content:''; width:28px; height:1px; background:#c8a96a; flex-shrink:0; }

  .kha-cred-block { padding:.75rem 1.2rem; background:rgba(24,35,24,.55); border:1px solid rgba(200,169,106,.2); backdrop-filter:blur(8px); margin-bottom:1.1rem; }
  .kha-cred-title { font-size:13px; font-weight:600; color:#e0c88a; text-align:center; margin-bottom:12px; line-height:1.4; }
  .kha-cred-logos { display:flex; align-items:center; justify-content:center; gap:16px; flex-wrap:wrap; }
  .kha-cred-logos img { height:55px; width:auto; object-fit:contain; flex-shrink:0; }

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
  #khaDetailPage { position:fixed; inset:0; z-index:2000; background:#182318; overflow-y:auto; transform:translateX(100%); transition:transform .65s cubic-bezier(.22,1,.36,1); }
  #khaDetailPage.open { transform:translateX(0); }
  #khaRoomPage { position:fixed; inset:0; z-index:3000; background:#182318; overflow-y:auto; transform:translateX(100%); transition:transform .6s cubic-bezier(.22,1,.36,1); }
  #khaRoomPage.open { transform:translateX(0); }

  /* Room list cards */
  .kha-room-card { display:flex; overflow:hidden; border:1px solid rgba(200,169,106,.12); background:#1f2e1f; transition:border-color .35s,transform .35s,box-shadow .35s; cursor:none; border-radius:4px; }
  .kha-room-card:hover { border-color:rgba(200,169,106,.42); transform:translateY(-4px); box-shadow:0 18px 50px rgba(0,0,0,.45); }
  .kha-room-card:hover .kha-room-img { transform:scale(1.06); }
  .kha-room-img { transition:transform .7s; }

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
  .kha-btn-wa { display:flex; align-items:center; justify-content:center; gap:.6rem; padding:.85rem 1.6rem; background:rgba(37,211,102,.18); border:1px solid rgba(37,211,102,.42); color:#4ade80; font-family:'Jost',sans-serif; font-size:.78rem; letter-spacing:.18em; text-transform:uppercase; text-decoration:none; transition:background .3s; cursor:none; }
  .kha-btn-wa:hover { background:rgba(37,211,102,.32); }
  .kha-btn-web { display:flex; align-items:center; justify-content:center; gap:.6rem; padding:.85rem 1.6rem; background:rgba(200,169,106,.14); border:1px solid rgba(200,169,106,.38); color:#c8a96a; font-family:'Jost',sans-serif; font-size:.78rem; letter-spacing:.18em; text-transform:uppercase; text-decoration:none; transition:background .3s; cursor:none; }
  .kha-btn-web:hover { background:rgba(200,169,106,.28); }

  .kha-footer-link:hover { color:#c8a96a !important; }

  @media(max-width:900px){
    body { cursor:auto !important; }
    .kha-cur,.kha-cuf { display:none !important; }
    .kha-about-grid { grid-template-columns:1fr !important; }
    .kha-cards-grid { grid-template-columns:1fr !important; }
    .kha-ts-inner { flex-direction:column !important; align-items:stretch !important; }
    .kha-trust-card { max-width:100% !important; }
    .kha-detail-grid { grid-template-columns:1fr !important; }
    .kha-mosaic { grid-template-rows:180px 140px !important; }
    .kha-hero { margin-top:0 !important; padding-top:90px; box-sizing:border-box; height:auto !important; min-height:100vh; display:flex; flex-direction:column; justify-content:flex-end; }
    .kha-hero-card { position:relative !important; bottom:auto !important; left:auto !important; max-width:none !important; margin:auto 1rem 2.5rem !important; padding:1.4rem !important; }
    .kha-hero-book-btn { display:none !important; }
    #khaDetailPage .dp-inner, #khaRoomPage .dp-inner { padding:2rem 1.5rem 5rem !important; }
    .dp-topbar { padding:.8rem 1.5rem !important; }
    .kha-rl-card { grid-template-columns:1fr !important; }
    .kha-rl-card-img { height:200px !important; }
  }
  @media(max-width:768px){
    body { cursor:auto !important; }
    .kha-cur,.kha-cuf { display:none !important; }
    .px-16 { padding-left:1.5rem !important; padding-right:1.5rem !important; }
    .kha-browse-section { padding-left:1rem !important; padding-right:1rem !important; }
    .kha-mosaic { grid-template-columns:1fr 1fr !important; grid-template-rows:160px 120px 120px !important; }
    .kha-mosaic-main { grid-row:auto !important; grid-column:1/3 !important; }
    .kha-rl-card { grid-template-columns:1fr !important; }
    .kha-rl-card-img { height:190px !important; }
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

/* ── 3 Room types identical across all homestays ── */
const ROOM_TYPES = [
  {
    key: "deluxe",
    name: "Deluxe Room",
    tag: "Most Popular",
    tagBg: "rgba(200,169,106,.16)",
    tagBorder: "rgba(200,169,106,.4)",
    tagColor: "#c8a96a",
    accentColor: "#c8a96a",
    multiplier: 1,
    guests: 2,
    beds: 1,
    sqft: 280,
    desc: "Our Deluxe Room offers a serene retreat with a plush queen-size bed, earthy décor inspired by the local landscape and a private en-suite bathroom with hot water. Large windows frame the garden view and let the morning light pour in. Ideal for couples or solo travellers seeking comfort and quiet.",
    amenities: [
      "Meals Included",
      "Air Conditioning",
      "Free WiFi",
      "Private Bathroom",
      "Smart TV",
    ],
  },
  {
    key: "family",
    name: "Family Room",
    tag: "Best for Families",
    tagBg: "rgba(122,158,110,.15)",
    tagBorder: "rgba(122,158,110,.4)",
    tagColor: "#adc49a",
    accentColor: "#7a9e6e",
    multiplier: 1.55,
    guests: 4,
    beds: 2,
    sqft: 420,
    desc: "The Family Room is a generous, airy space designed for families and small groups. Two beds, a comfortable seating area and a spacious bathroom make it the most practical option on the property. Children are very welcome and the hosts are happy to arrange extra mattresses for larger families.",
    amenities: [
      "Meals Included",
      "Air Conditioning",
      "Free WiFi",
      "Private Bathroom",
      "Nature Trails",
      "Smart TV",
    ],
  },
  {
    key: "suite",
    name: "Heritage Suite",
    tag: "Premium",
    tagBg: "rgba(200,169,106,.28)",
    tagBorder: "#c8a96a",
    tagColor: "#fdfaf4",
    accentColor: "#e0c88a",
    multiplier: 2.1,
    guests: 2,
    beds: 1,
    sqft: 520,
    desc: "The Heritage Suite is the finest accommodation on the property — a spacious, elegantly appointed suite with a king-size bed, private sit-out or verandah, and premium bathroom amenities. Every detail has been curated for an elevated experience while staying true to the warmth and character of the homestay.",
    amenities: [
      "Meals Included",
      "Air Conditioning",
      "Free WiFi",
      "Private Bathroom",
      "Smart TV",
      "Yoga Space",
      "Private Garden",
    ],
  },
];

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
    rating: 4.5,
    reviews: 40,
    amenities: ["Meals Included", "Private Garden", "Nature Trails", "Bonfire"],
    hasWebsite: false,
    phone: "9480100001",
    img: "https://homestayinmysore.com/assets/img/about1.jpeg",
    imgs: [
      "https://homestayinmysore.com/assets/img/about1.jpeg",
      "https://homestayinmysore.com/assets/img/gal5.jpeg",
      "https://homestayinmysore.com/assets/img/gal4.jpeg",
      "https://homestayinmysore.com/assets/img/gal0.jpeg",
      "https://homestayinmysore.com/assets/img/gal3.jpeg",
      "https://homestayinmysore.com/assets/img/about1.jpeg",
    ],
    type: "Family Homestay",
    desc: "A warm and welcoming family homestay in the heart of Mysuru. Experience authentic Karnataka hospitality with home-cooked meals and a beautifully maintained garden.",
    host: {
      name: "Kukkeshree Family",
      since: "Host since 2018",
      avatar: "https://homestayinmysore.com/assets/img/about1.jpeg",
      desc: "A gracious Mysuru family who take pride in offering guests an authentic local experience.",
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
    img: "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
    imgs: [
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
    ],
    type: "Family Homestay",
    desc: "Sky House Homestay offers a breezy elevated setting with lovely views across Mysuru. Spacious rooms, wholesome food and evening bonfires make this a favourite among repeat visitors.",
    host: {
      name: "Sky House Family",
      since: "Host since 2019",
      avatar:
        "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
      desc: "A friendly family passionate about making every guest feel at home.",
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
    img: "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/_SNF9853_7f2a117c",
    imgs: [
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/_SNF9853_7f2a117c",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_3333/x_0,y_260,w_5000,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-swimming-pool-1",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/facade-1",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-facade-day-view",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-restaurant",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/_SNF9853_7f2a117c",
    ],
    type: "Resort Stay",
    desc: "Nestled deep in the coffee hills of Coorg, Hatti Eden is a lush resort-style stay surrounded by aromatic coffee and pepper estates. Wake up to misty mornings and sip fresh estate coffee.",
    host: {
      name: "Hatti Eden Host Family",
      since: "Host since 2015",
      avatar:
        "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/_SNF9853_7f2a117c",
      desc: "Passionate Coorg hosts who lead estate walks and share the story of coffee cultivation.",
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
    img: "https://a0.muscache.com/im/pictures/da06792f-6cc4-44fa-bfcf-cf3cf1293f85.jpg?im_w=720",
    imgs: [
      "https://a0.muscache.com/im/pictures/da06792f-6cc4-44fa-bfcf-cf3cf1293f85.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/d06feef1-3c98-4dc4-8b22-c89e81eb4ff4.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/206e4cf3-4fa6-476d-bac9-2f8ab301d9b4.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/dbd68cf4-8506-45b0-a8df-f94758e369cd.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/785c7036-73a9-4567-901a-03a1c2872ca6.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/da06792f-6cc4-44fa-bfcf-cf3cf1293f85.jpg?im_w=720",
    ],
    type: "Heritage Stay",
    desc: "Moodalamane is a cherished heritage home offering a rare glimpse into traditional Karnataka architecture. Heritage interiors, shaded courtyard and home-cooked meals make every stay deeply memorable.",
    host: {
      name: "Moodalamane Family",
      since: "Host since 2016",
      avatar:
        "https://a0.muscache.com/im/pictures/da06792f-6cc4-44fa-bfcf-cf3cf1293f85.jpg?im_w=720",
      desc: "An old Mysuru family proud of their heritage home and love of sharing its history.",
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
        text: "Beautiful property, lovely family and authentic Mysuru food.",
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
    img: "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/191c7eb5-5aa4-49bf-9004-c7d019ba3a66.jpeg?im_w=720",
    imgs: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/191c7eb5-5aa4-49bf-9004-c7d019ba3a66.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/58800670-577e-40b0-afed-e91785e8beeb.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/f3e94ec6-c852-4b51-8231-101a1930b4a0.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/70b163dd-16cf-4092-92ed-456380c2afec.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/4d11161e-5ddc-47d4-bff3-32e07062d1b3.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/191c7eb5-5aa4-49bf-9004-c7d019ba3a66.jpeg?im_w=720",
    ],
    type: "Family Homestay",
    desc: "Aastha Homestay is a simple, sincere and welcoming family home in Mysuru. Fresh home-cooked Karnataka meals and genuine warmth define every stay.",
    host: {
      name: "Aastha Host Family",
      since: "Host since 2020",
      avatar:
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/191c7eb5-5aa4-49bf-9004-c7d019ba3a66.jpeg?im_w=720",
      desc: "A warm and caring family who believe in honest, no-frills hospitality.",
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
    img: "https://homestayinmysore.com/assets/img/lavis.JPG",
    imgs: [
      "https://homestayinmysore.com/assets/img/lavis.JPG",
      "https://homestayinmysore.com/assets/img/gal3.jpeg",
      "https://homestayinmysore.com/assets/img/room1%20king.jpeg",
      "https://homestayinmysore.com/assets/img/family%20room.jpeg",
      "https://homestayinmysore.com/assets/img/room2%20king.jpeg",
      "https://homestayinmysore.com/assets/img/lavis.JPG",
    ],
    type: "Family Homestay",
    desc: "Bolak Homestay offers a relaxed, homely atmosphere in Mysuru with a lovely garden, evening bonfires and warm family meals.",
    host: {
      name: "Bolak Family",
      since: "Host since 2017",
      avatar: "https://homestayinmysore.com/assets/img/about1.jpeg",
      desc: "A hospitable Mysuru family who love meeting travellers from all over.",
    },
    guestReviews: [
      {
        name: "Suresh Babu",
        stars: 5,
        date: "April 2026",
        text: "The bonfire evenings with the family were the highlight of our trip.",
      },
      {
        name: "Priya & Kiran",
        stars: 4,
        date: "February 2026",
        text: "Very welcoming family. Food was excellent and rooms were clean.",
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
    img: "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=1920&q=75",
    imgs: [
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-sunrise.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-kaanana-bonfire-evening.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-kaanana-homestay-room.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-karnataka-home-cooked-food.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=1920&q=75",
    ],
    type: "Wildlife Stay",
    desc: "Kabini Kaanana Homestay sits at the edge of the legendary Kabini backwaters. Elephants, deer and exotic birds are regular visitors. Evenings by the river are unforgettable.",
    host: {
      name: "Kaanana Host Family",
      since: "Host since 2013",
      avatar:
        "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=400&q=75",
      desc: "A family with deep roots in the Kabini region and intimate knowledge of local wildlife.",
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
        text: "Best wildlife homestay experience we've ever had.",
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
    img: "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-sunrise.webp&w=1920&q=75",
    imgs: [
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-sunrise.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-kaanana-bonfire-evening.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-kaanana-homestay-room.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-karnataka-home-cooked-food.webp&w=1920&q=75",
      "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-sunrise.webp&w=1920&q=75",
    ],
    type: "Jungle Stay",
    desc: "Junglebliss Homestay immerses you in the wilderness near Hunsur. Dense forest, a nearby stream and morning bird calls make this a truly wild escape.",
    host: {
      name: "Junglebliss Host Family",
      since: "Host since 2016",
      avatar:
        "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=400&q=75",
      desc: "Nature lovers who built this homestay to share their forest with like-minded travellers.",
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
        text: "Perfect jungle getaway. The hosts are passionate and knowledgeable.",
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
    img: "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-swimming-pool-1",
    imgs: [
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-swimming-pool-1",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/_SNF9853_7f2a117c",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/facade-1",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-facade-day-view",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-restaurant",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-swimming-pool-1",
    ],
    type: "Boutique Stay",
    desc: "By The Blues is a serene boutique homestay offering a pool, yoga space and beautifully landscaped gardens. A calm, curated retreat for elevated comfort connected to nature.",
    host: {
      name: "By The Blues Host Family",
      since: "Host since 2021",
      avatar:
        "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-swimming-pool-1",
      desc: "Creative hosts offering yoga at sunrise, guided garden walks and farm-fresh meals.",
    },
    guestReviews: [
      {
        name: "Ishaan Verma",
        stars: 5,
        date: "April 2026",
        text: "The pool and yoga session in the morning — I needed this more than I knew.",
      },
      {
        name: "Divya & Rohan",
        stars: 4,
        date: "March 2026",
        text: "Beautiful property, thoughtfully designed. Food and garden both exceptional.",
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

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function Stars({ rating, sz = 14 }) {
  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      {Array.from({ length: Math.floor(rating) }, (_, i) => (
        <Star key={i} size={sz} style={{ color: "#c8a96a", fill: "#c8a96a" }} />
      ))}
    </span>
  );
}

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
function HsCard({ h, onOpen }) {
  return (
    <div
      className="kha-card bg-[#1f2e1f] overflow-hidden kha-reveal"
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

        {/* Hover overlay */}
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
            ₹{h.price.toLocaleString("en-IN")}
          </span>
          <span
            style={{
              fontSize: ".74rem",
              color: "rgba(244,239,229,.5)",
              letterSpacing: ".1em",
            }}
          >
            per night · 3 room types available
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
          <span
            style={{ fontSize: ".84rem", color: "#c8a96a", fontWeight: 500 }}
          >
            {h.rating}
          </span>
          <span style={{ fontSize: ".74rem", color: "rgba(244,239,229,.38)" }}>
            ({h.reviews})
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: ".8rem",
            flexWrap: "wrap",
            marginBottom: ".9rem",
          }}
        >
          {h.amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              style={{
                fontSize: ".72rem",
                color: "rgba(244,239,229,.5)",
                display: "flex",
                alignItems: "center",
                gap: ".25rem",
              }}
            >
              <span style={{ color: "#c8a96a" }}>✦</span>
              {a}
            </span>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(200,169,106,.1)",
            paddingTop: ".75rem",
          }}
        >
          {TOURIST_PLACES.map((p) => ({
            ...p,
            dist: haversine(h.lat, h.lng, p.lat, p.lng),
          }))
            .sort((a, b) => a.dist - b.dist)
            .slice(0, 2)
            .map((p) => (
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
}

/* ─── Room list card (inside detail slide) ─────────────────────────────────── */
function RoomListCard({ room, h, onOpen, index }) {
  const price = Math.round((h.price * room.multiplier) / 100) * 100;
  const [hovered, setHovered] = useState(false);

  // Pick a different image per room so they look distinct
  const imgSrc = h.imgs[index % h.imgs.length] || h.img;

  const specs = [
    { icon: <Users size={13} />, label: `${room.guests} Guests` },
    {
      icon: <Bed size={13} />,
      label: `${room.beds} Bed${room.beds > 1 ? "s" : ""}`,
    },
    { icon: <Bath size={13} />, label: "En-suite Bath" },
    { icon: <Mountain size={13} />, label: `${room.sqft} sq ft` },
  ];

  return (
    <div
      onClick={() => onOpen(room.key)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "340px 1fr",
        overflow: "hidden",
        border: `1px solid ${hovered ? room.tagBorder : "rgba(200,169,106,.14)"}`,
        background: hovered ? "rgba(31,46,31,.95)" : "#1c2d1c",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 24px 64px rgba(0,0,0,.5), 0 0 0 1px ${room.tagBorder}`
          : "0 4px 20px rgba(0,0,0,.25)",
        transition: "all .4s cubic-bezier(.22,1,.36,1)",
        cursor: "none",
        position: "relative",
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          background: `linear-gradient(to bottom, ${room.accentColor}, transparent)`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity .4s",
        }}
      />

      {/* ── Image column ── */}
      <div
        style={{ position: "relative", overflow: "hidden", height: "240px" }}
      >
        <img
          src={imgSrc}
          alt={room.name}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform .8s cubic-bezier(.22,1,.36,1)",
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg,rgba(24,35,24,.15) 0%,rgba(24,35,24,.72) 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to top,rgba(28,45,28,1),transparent)",
          }}
        />

        {/* Room index number — large watermark style */}
        <div
          style={{
            position: "absolute",
            top: "-.5rem",
            right: ".8rem",
            fontFamily: cg,
            fontSize: "6rem",
            fontWeight: 300,
            lineHeight: 1,
            color: room.accentColor,
            opacity: hovered ? 0.22 : 0.12,
            transition: "opacity .4s",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Tag pill — top left */}
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

        {/* Price — bottom left over image */}
        <div style={{ position: "absolute", bottom: ".85rem", left: ".95rem" }}>
          <div
            style={{
              fontSize: ".6rem",
              letterSpacing: ".24em",
              textTransform: "uppercase",
              color: "rgba(244,239,229,.55)",
              marginBottom: ".1rem",
            }}
          >
            from
          </div>
          <div
            style={{
              fontFamily: cg,
              fontSize: "1.9rem",
              fontWeight: 300,
              color: room.accentColor,
              lineHeight: 1,
            }}
          >
            ₹{price.toLocaleString("en-IN")}
            <span
              style={{
                fontSize: ".75rem",
                color: "rgba(244,239,229,.4)",
                marginLeft: ".35rem",
                fontFamily: jost,
              }}
            >
              /night
            </span>
          </div>
        </div>
      </div>

      {/* ── Content column ── */}
      <div
        style={{
          padding: "1.7rem 2rem 1.7rem 1.8rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>
          {/* Room name */}
          <div
            style={{
              fontFamily: cg,
              fontSize: "1.85rem",
              fontWeight: 300,
              color: hovered ? "#fdfaf4" : "#e8e2d4",
              lineHeight: 1.1,
              marginBottom: ".55rem",
              transition: "color .3s",
            }}
          >
            {room.name}
          </div>

          {/* Spec pills row */}
          <div
            style={{
              display: "flex",
              gap: ".55rem",
              flexWrap: "wrap",
              marginBottom: "1rem",
            }}
          >
            {specs.map((s) => (
              <span
                key={s.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: ".35rem",
                  padding: ".32rem .85rem",
                  fontSize: ".72rem",
                  background: "rgba(200,169,106,.07)",
                  border: "1px solid rgba(200,169,106,.15)",
                  color: "rgba(244,239,229,.6)",
                }}
              >
                <span style={{ color: room.accentColor }}>{s.icon}</span>
                {s.label}
              </span>
            ))}
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: ".87rem",
              lineHeight: 1.8,
              fontWeight: 300,
              color: "rgba(244,239,229,.58)",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              marginBottom: "1rem",
            }}
          >
            {room.desc}
          </p>

          {/* Amenity icons row */}
          <div
            style={{
              display: "flex",
              gap: ".7rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {room.amenities.map((a) => (
              <span
                key={a}
                title={a}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: ".32rem",
                  fontSize: ".7rem",
                  letterSpacing: ".06em",
                  color: "rgba(244,239,229,.5)",
                  padding: ".28rem .75rem",
                  background: hovered
                    ? "rgba(200,169,106,.1)"
                    : "rgba(200,169,106,.05)",
                  border: `1px solid ${hovered ? "rgba(200,169,106,.22)" : "rgba(200,169,106,.1)"}`,
                  transition: "all .3s",
                }}
              >
                <span style={{ color: room.accentColor, opacity: 0.85 }}>
                  {AICONS[a] || <Leaf size={12} />}
                </span>
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom row — divider + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "1rem",
            borderTop: `1px solid ${hovered ? "rgba(200,169,106,.2)" : "rgba(200,169,106,.08)"}`,
            transition: "border-color .3s",
          }}
        >
          {/* Included note */}
          <span
            style={{
              fontSize: ".72rem",
              letterSpacing: ".1em",
              color: "rgba(244,239,229,.38)",
              display: "flex",
              alignItems: "center",
              gap: ".4rem",
            }}
          >
            <CheckCircle2 size={12} style={{ color: "#7a9e6e" }} /> Meals &amp;
            direct booking included
          </span>

          {/* CTA button */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".55rem",
              padding: ".65rem 1.5rem",
              background: hovered ? room.accentColor : "transparent",
              border: `1px solid ${room.tagBorder}`,
              color: hovered ? "#182318" : room.tagColor,
              fontSize: ".72rem",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              fontFamily: jost,
              fontWeight: hovered ? 600 : 400,
              transition: "all .35s cubic-bezier(.22,1,.36,1)",
            }}
          >
            View Room <ChevronRight size={13} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Room Full Detail ────────────────────────────────────────────────────── */
function RoomDetail({ h, roomKey, onBack }) {
  const room = ROOM_TYPES.find((r) => r.key === roomKey);
  if (!h || !room) return null;
  const price = Math.round((h.price * room.multiplier) / 100) * 100;
  const wa = `https://wa.me/91${h.phone}?text=Hello%2C%20I%20found%20${encodeURIComponent(h.name)}%20on%20KHA%20and%20would%20like%20to%20book%20the%20${encodeURIComponent(room.name)}.%20Please%20share%20availability.`;
  const sixImgs =
    h.imgs.length >= 6
      ? h.imgs.slice(0, 6)
      : [...h.imgs, ...Array(6 - h.imgs.length).fill(h.img)];
  const allAmens = [...new Set([...room.amenities, ...h.amenities])];

  return (
    <div id="khaRoomPage" className={roomKey ? "open" : ""}>
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
          padding: ".85rem 3rem",
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
          <ArrowLeft size={13} /> Back to Rooms
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
          style={{
            fontSize: ".7rem",
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "rgba(244,239,229,.35)",
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

      <div
        className="dp-inner"
        style={{
          maxWidth: "1060px",
          margin: "0 auto",
          padding: "3rem 3rem 6rem",
        }}
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
              fontSize: "clamp(2rem,4vw,3.1rem)",
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
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { icon: <Users size={14} />, l: `${room.guests} Guests` },
              {
                icon: <Bed size={14} />,
                l: `${room.beds} Bed${room.beds > 1 ? "s" : ""}`,
              },
              { icon: <Bath size={14} />, l: "Private Bathroom" },
              { icon: <Mountain size={14} />, l: `${room.sqft} sq ft` },
            ].map((s) => (
              <span
                key={s.l}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".45rem",
                  fontSize: ".84rem",
                  color: "rgba(244,239,229,.55)",
                }}
              >
                <span style={{ color: room.accentColor }}>{s.icon}</span>
                {s.l}
              </span>
            ))}
          </div>
        </div>

        {/* 6-image mosaic */}
        <div className="kha-mosaic">
          <div className="kha-mosaic-main">
            <img src={sixImgs[0]} alt="main" />
          </div>
          {sixImgs.slice(1).map((src, i) => (
            <div key={i} className="kha-mosaic-cell">
              <img src={src} alt={`photo ${i + 2}`} loading="lazy" />
            </div>
          ))}
        </div>

        {/* 2-col layout */}
        <div
          className="kha-detail-grid"
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
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: ".5rem",
                marginBottom: "2.5rem",
              }}
            >
              {TOURIST_PLACES.map((p) => ({
                ...p,
                dist: haversine(h.lat, h.lng, p.lat, p.lng),
              }))
                .sort((a, b) => a.dist - b.dist)
                .map((p) => (
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
                <img
                  src={h.host.avatar}
                  alt={h.host.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
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
              Guest Reviews
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".85rem",
              }}
            >
              {h.guestReviews.map((r, i) => (
                <div
                  key={i}
                  style={{
                    padding: "1.3rem 1.5rem",
                    background: "rgba(31,46,31,.55)",
                    border: "1px solid rgba(200,169,106,.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: ".6rem",
                      flexWrap: "wrap",
                      gap: ".5rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: ".9rem",
                        fontWeight: 500,
                        color: "#f4efe5",
                      }}
                    >
                      {r.name}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".55rem",
                      }}
                    >
                      <Stars rating={r.stars} sz={13} />
                      <span
                        style={{
                          fontSize: ".7rem",
                          color: "rgba(244,239,229,.3)",
                          letterSpacing: ".08em",
                        }}
                      >
                        {r.date}
                      </span>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: ".9rem",
                      lineHeight: 1.85,
                      color: "rgba(244,239,229,.62)",
                      fontWeight: 300,
                      margin: 0,
                    }}
                  >
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — sticky booking card */}
          <div style={{ position: "sticky", top: "80px" }}>
            <div
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
                  ₹{price.toLocaleString("en-IN")}
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
                    MHA Certified
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

/* ─── Main Component ─────────────────────────────────────────────────────── */
const Home = () => {
  const curRef = useRef(null),
    curFRef = useRef(null);
  const cxRef = useRef(0),
    cyRef = useRef(0),
    fxRef = useRef(0),
    fyRef = useRef(0);

  useEffect(() => {
    const mv = (e) => {
      cxRef.current = e.clientX;
      cyRef.current = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = e.clientX + "px";
        curRef.current.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", mv);
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
      document.removeEventListener("mousemove", mv);
      cancelAnimationFrame(raf);
    };
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
    const fn = () => {
      const bg = document.querySelector(".kha-testi-bg");
      if (!bg) return;
      const r = bg.parentElement.getBoundingClientRect();
      bg.style.transform = `translateY(${(-r.top / (r.height + window.innerHeight)) * 70}px)`;
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
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

  const openHs = (id) => {
    setHsId(id);
    setRoomKey(null);
    document.body.style.overflow = "hidden";
    setTimeout(
      () => document.getElementById("khaDetailPage")?.scrollTo(0, 0),
      50,
    );
  };
  const closeHs = (e) => {
    e?.preventDefault();
    setHsId(null);
    setRoomKey(null);
    document.body.style.overflow = "";
  };
  const openRoom = (key) => {
    setRoomKey(key);
    setTimeout(
      () => document.getElementById("khaRoomPage")?.scrollTo(0, 0),
      50,
    );
  };
  const closeRoom = () => setRoomKey(null);

  const currentHs = HS.find((h) => h.id === hsId) || null;
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
          <video
            autoPlay
            muted
            loop
            playsInline
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
            🏡 Click Here to Book a Homestay In Mysuru
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
              icon: "/mha.jpg",
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
                <img src={ts.icon} alt={ts.title} />
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
        className="kha-reveal bg-[#1f2e1f] px-16 py-[5.5rem]"
        style={{
          borderTop: "1px solid rgba(200,169,106,.15)",
          borderBottom: "1px solid rgba(200,169,106,.15)",
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div
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
                style={{
                  fontFamily: cg,
                  fontSize: "1.55rem",
                  fontWeight: 300,
                  color: "#fdfaf4",
                  lineHeight: 1.3,
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
        <div
          className="kha-cards-grid max-w-[1300px] mx-auto grid gap-6"
          style={{ gridTemplateColumns: "repeat(3,1fr)" }}
        >
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
            <span>🏡 Explore &amp; Book Homestays</span>
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
                padding: ".85rem 3rem",
                display: "flex",
                alignItems: "center",
                gap: "1.2rem",
                flexWrap: "wrap",
              }}
            >
              <a href="#" className="kha-back-btn" onClick={closeHs}>
                <ArrowLeft size={13} /> Back to Explore
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
                style={{
                  fontFamily: cg,
                  fontSize: "1.12rem",
                  fontWeight: 300,
                  color: "#c8a96a",
                }}
              >
                {currentHs.name}
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
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
                <span
                  style={{ fontSize: ".74rem", color: "rgba(244,239,229,.35)" }}
                >
                  ({currentHs.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Hero strip */}
            <div
              style={{
                position: "relative",
                height: "300px",
                overflow: "hidden",
              }}
            >
              <img
                src={currentHs.img}
                alt={currentHs.name}
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
                    fontSize: "clamp(1.8rem,4vw,2.9rem)",
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

            {/* Room list body */}
            <div
              className="dp-inner"
              style={{
                maxWidth: "1060px",
                margin: "0 auto",
                padding: "3rem 3rem 6rem",
              }}
            >
              {/* Heading */}
              <div style={{ marginBottom: "1.8rem" }}>
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
                  3 Room Types Available
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
                  marginBottom: "2rem",
                }}
              ></div>

              {/* 3 room cards */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                }}
              >
                {ROOM_TYPES.map((room, i) => (
                  <RoomListCard
                    key={room.key}
                    room={room}
                    h={currentHs}
                    onOpen={openRoom}
                    index={i}
                  />
                ))}
              </div>

              {/* Property summary */}
              <div
                style={{
                  marginTop: "3rem",
                  padding: "1.8rem 2.2rem",
                  background: "rgba(31,46,31,.5)",
                  border: "1px solid rgba(200,169,106,.1)",
                }}
              >
                <h3
                  style={{
                    fontFamily: cg,
                    fontSize: "1.4rem",
                    fontWeight: 300,
                    color: "#f4efe5",
                    marginBottom: ".65rem",
                  }}
                >
                  About {currentHs.name}
                </h3>
                <p
                  style={{
                    fontSize: ".9rem",
                    lineHeight: 1.9,
                    color: "rgba(244,239,229,.62)",
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {currentHs.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: ".45rem",
                    flexWrap: "wrap",
                    marginTop: "1.1rem",
                  }}
                >
                  {currentHs.amenities.map((a) => (
                    <span
                      key={a}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: ".3rem",
                        fontSize: ".68rem",
                        letterSpacing: ".08em",
                        padding: ".22rem .75rem",
                        background: "rgba(200,169,106,.07)",
                        border: "1px solid rgba(200,169,106,.16)",
                        color: "rgba(244,239,229,.55)",
                      }}
                    >
                      {AICONS[a]}&nbsp;{a}
                    </span>
                  ))}
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
