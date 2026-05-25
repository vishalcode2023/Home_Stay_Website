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
  MessageCircle,
  Award,
  Globe,
  Smartphone,
} from "lucide-react";
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

  .kha-cur  { width:9px; height:9px; background:#c8a96a; border-radius:50%; position:fixed; top:0; left:0; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); }
  .kha-cuf  { width:34px; height:34px; border:1px solid rgba(200,169,106,.4); border-radius:50%; position:fixed; top:0; left:0; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); }

  @keyframes khaHeroZoom { to { transform:scale(1); } }
  .kha-ex-hero-bg { animation:khaHeroZoom 12s ease forwards; transform:scale(1.06); }
  @keyframes khaFadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  .kha-fade-1 { opacity:0; animation:khaFadeUp .9s .3s forwards; }
  .kha-fade-2 { opacity:0; animation:khaFadeUp .9s .5s forwards; }
  .kha-fade-3 { opacity:0; animation:khaFadeUp .9s .7s forwards; }
  .kha-fade-4 { opacity:0; animation:khaFadeUp .9s .9s forwards; }

  .kha-eyebrow { display:inline-flex; align-items:center; gap:.6rem; font-size:.72rem; letter-spacing:.32em; text-transform:uppercase; color:#c8a96a; margin-bottom:1rem; }
  .kha-eyebrow::before { content:''; width:22px; height:1px; background:#c8a96a; }
  .kha-hero-eyebrow::before { content:''; width:28px; height:1px; background:#c8a96a; flex-shrink:0; }

  .kha-sec-link { display:flex; align-items:center; gap:.5rem; font-size:.75rem; letter-spacing:.2em; text-transform:uppercase; color:#c8a96a; text-decoration:none; white-space:nowrap; transition:gap .3s; }
  .kha-sec-link::after { content:''; width:28px; height:1px; background:#c8a96a; transition:width .3s; }
  .kha-sec-link:hover { gap:.8rem; }
  .kha-sec-link:hover::after { width:44px; }

  .kha-reg-card-img { transition:transform .8s ease; }
  .kha-reg-card:hover .kha-reg-card-img { transform:scale(1.07); }
  .kha-reg-card-arrow { opacity:0; transform:translateY(-6px); transition:opacity .35s,transform .35s; }
  .kha-reg-card:hover .kha-reg-card-arrow { opacity:1; transform:translateY(0); }

  .kha-col-pill { transition:all .3s; cursor:none; }
  .kha-col-pill:hover, .kha-col-pill.active { border-color:#c8a96a !important; color:#c8a96a !important; background:rgba(200,169,106,.07) !important; }

  .kha-filter-select, .kha-filter-input { background:transparent; border:none; border-bottom:1px solid rgba(200,169,106,.28); color:#f4efe5; font-family:'Jost',sans-serif; font-size:.9rem; padding:.35rem 0; outline:none; transition:border-color .3s; cursor:none; width:100%; }
  .kha-filter-select:focus, .kha-filter-input:focus { border-color:#c8a96a; }
  .kha-filter-select option, .kha-sort-select option { background:#1f2e1f; color:#f4efe5; }
  .kha-sort-select { background:transparent; border:none; border-bottom:1px solid rgba(200,169,106,.2); color:rgba(244,239,229,.65); font-family:'Jost',sans-serif; font-size:.8rem; padding:.25rem .5rem; outline:none; cursor:none; }
  .kha-filter-btn:hover { background:#e0c88a !important; transform:translateY(-1px); }
  .kha-filter-clear:hover { color:#c8a96a !important; border-color:#c8a96a !important; }

  .kha-rtab { padding:.5rem 1.3rem; border:1px solid rgba(200,169,106,.22); color:rgba(244,239,229,.62); font-size:.75rem; letter-spacing:.15em; text-transform:uppercase; background:transparent; cursor:none; transition:all .3s; }
  .kha-rtab:hover, .kha-rtab.active { border-color:#c8a96a; color:#c8a96a; background:rgba(200,169,106,.07); }

  .kha-view-btn { transition:all .3s; cursor:none; }
  .kha-view-btn:hover, .kha-view-btn.active { border-color:#c8a96a !important; color:#c8a96a !important; }

  .kha-card-img-wrap { border-radius:52px 52px 0 0; }
  .kha-card { transition:transform .4s,border-color .4s,box-shadow .4s; cursor:none; }
  .kha-card:hover { transform:translateY(-7px); border-color:rgba(200,169,106,.32) !important; box-shadow:0 20px 60px rgba(0,0,0,.35); }
  .kha-card:hover .kha-price-overlay { opacity:1; }
  .kha-card:hover .kha-card-img { transform:scale(1.09); }
  .kha-card-img { transition:transform .7s; }
  .kha-card-taluk::before { content:''; }
  .kha-btn-wa:hover { background:rgba(37,211,102,.32) !important; }
  .kha-btn-web:hover { background:rgba(200,169,106,.28) !important; }

  .kha-grid-list .kha-card { display:grid; grid-template-columns:360px 1fr; }
  .kha-grid-list .kha-card:hover { transform:translateY(-3px); }
  .kha-grid-list .kha-card-img-wrap { aspect-ratio:unset !important; height:100% !important; border-radius:0 !important; }
  .kha-grid-list .kha-card-name { font-size:2rem !important; }
  .kha-grid-list .kha-card-desc { display:-webkit-box !important; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .kha-grid-list .kha-card-price-inline { display:flex !important; }
  .kha-grid-list .kha-card-body { display:flex; flex-direction:column; justify-content:center; padding:2rem 2.2rem !important; }

  .kha-btn-load::after { content:''; width:28px; height:1px; background:#c8a96a; transition:width .3s; }
  .kha-btn-load:hover::after { width:44px; }
  .kha-btn-load:hover { border-color:#c8a96a !important; background:rgba(200,169,106,.08) !important; }

  .kha-promo-feat { transition:border-color .3s; }
  .kha-promo-feat:hover { border-color:rgba(200,169,106,.28) !important; }
  .kha-divider-gem { width:5px; height:5px; background:#c8a96a; transform:rotate(45deg); }

  .kha-reveal { opacity:0; transform:translateY(36px); transition:opacity .85s ease,transform .85s ease; }
  .kha-reveal.in { opacity:1; transform:translateY(0); }
  .kha-d1{transition-delay:.12s;} .kha-d2{transition-delay:.24s;} .kha-d3{transition-delay:.36s;}

  #khaExpDetailPage { position:fixed; inset:0; z-index:2000; background:#182318; overflow-y:auto; transform:translateX(100%); transition:transform .65s cubic-bezier(.22,1,.36,1); }
  #khaExpDetailPage.open { transform:translateX(0); }
  #khaExpDetailPage.open .kha-dp-hero-img { transform:scale(1); }
  .kha-dp-hero-img { transform:scale(1.04); transition:transform 8s ease; }
  .kha-dp-back:hover { color:#c8a96a !important; border-color:#c8a96a !important; }
  .kha-dp-btn-wa:hover { background:rgba(37,211,102,.3) !important; }
  .kha-dp-btn-site:hover { background:rgba(200,169,106,.26) !important; }
  .kha-dp-amen-item:hover { border-color:rgba(200,169,106,.3) !important; }
  .kha-gal-img:hover img { transform:scale(1.07); }
  .kha-gal-img img { transition:transform .6s; }

  .kha-footer-link:hover { color:#c8a96a !important; }

  .kha-exp-card-grid { grid-template-columns:repeat(3,1fr); }

  @media(max-width:1200px){ .kha-ex-hero-content { padding:0 2rem 3rem; } }
  @media(max-width:900px){
    body { cursor:auto; } .kha-cur { display:none; } .kha-cuf { display:none; }
    #khaFloatBook { display:none !important; }
    .kha-ex-hero-content { padding:0 1.5rem 2.5rem; flex-direction:column; align-items:flex-start; }
    .kha-region-grid { grid-template-columns:1fr 1fr !important; grid-template-rows:auto !important; }
    .kha-reg-first { grid-row:auto !important; grid-column:1/3 !important; }
    .kha-filter-bar { flex-direction:column !important; padding:1rem !important; gap:.75rem !important; width:100% !important; box-sizing:border-box !important; }
    .kha-filter-item { min-width:100% !important; flex:1 1 100% !important; }
    .kha-filter-sep { display:none !important; }
    .kha-filter-btn { width:100% !important; }
    .kha-filter-clear { width:100% !important; }
    .kha-exp-card-grid { grid-template-columns:1fr 1fr !important; gap:1rem !important; }
    .kha-grid-list .kha-card { grid-template-columns:1fr !important; }
    .kha-dp-body { padding:2rem 1.5rem 5rem !important; }
    .kha-dp-grid { grid-template-columns:1fr !important; }
    .kha-dp-gallery { height:240px !important; }
    .kha-dp-amen-grid { grid-template-columns:1fr 1fr !important; }
    .kha-promo-inner { grid-template-columns:1fr !important; }
    .kha-footer-grid { grid-template-columns:1fr 1fr !important; gap:2rem !important; }
    .kha-footer-outer { padding:3rem 1.5rem !important; }
    .kha-footer-bottom { flex-direction:column !important; gap:.5rem !important; align-items:center !important; text-align:center !important; }
  }
  @media(max-width:600px){
    .kha-exp-card-grid { grid-template-columns:1fr !important; }
  }
  @media(max-width:768px){
    .kha-ex-hero-content { padding:0 1rem 2rem; }
    .kha-ex-hero-content h1 { font-size:clamp(2rem,4vw,2.8rem) !important; }
    .kha-fade-4 { flex-direction:column !important; gap:1.5rem !important; }
    .kha-region-grid { grid-template-columns:1fr !important; gap:0.6rem !important; }
    .kha-reg-first { grid-row:auto !important; grid-column:1 !important; }
    .kha-filter-bar { padding:.9rem .8rem !important; gap:.75rem !important; }
    .px-16 { padding-left:1rem !important; padding-right:1rem !important; }
    .kha-card { margin-bottom:0.5rem; }
    .kha-grid-list .kha-card { grid-template-columns:1fr !important; }
    .kha-grid-list .kha-card-body { padding:1.5rem !important; }
    .kha-dp-body { padding:1rem !important; }
    .kha-footer-grid { grid-template-columns:1fr !important; }
  }
  @media(max-width:480px){
    .kha-ex-hero-content h1 { font-size:clamp(1.5rem,3vw,2rem) !important; }
    .kha-eyebrow { font-size:.65rem !important; }
    .kha-fade-4 { display:none !important; }
    .kha-filter-bar { padding:0.6rem 0.8rem !important; }
    .kha-filter-bar label { font-size:.6rem !important; }
    .kha-filter-select, .kha-filter-input { font-size:.8rem !important; }
    .kha-filter-btn { padding:0.5rem 1rem !important; font-size:.65rem !important; }
    .kha-filter-clear { padding:0.5rem 0.8rem !important; font-size:.65rem !important; }
    .kha-rtab { padding:.35rem 0.8rem !important; font-size:.7rem !important; }
    .kha-col-pill { padding:0.4rem 1rem !important; font-size:.65rem !important; }
    .kha-grid-list .kha-card { grid-template-columns:1fr !important; }
    .kha-grid-list .kha-card-name { font-size:1.2rem !important; }
    .kha-dp-body { padding:0.8rem !important; }
    .kha-dp-grid { grid-template-columns:1fr !important; }
    .kha-dp-gallery { height:200px !important; }
    .kha-dp-amen-grid { grid-template-columns:1fr !important; }
    .kha-promo-inner { gap:1rem !important; }
  }
`;

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

/* ─── Amenity icons ─────────────────────────────────────────────────────── */
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

/* ─── Data ──────────────────────────────────────────────────────────────── */
// const HS = [
//   {
//     id: 1,
//     lat: 12.3093357,
//     lng: 76.5778982,
//     name: "Kukkeshree Homestay",
//     taluk: "Mysuru",
//     district: "Mysuru",
//     region: "mysuru",
//     price: 2500,
//     rating: 4.5,
//     reviews: 40,
//     amenities: ["Meals Included", "Private Garden", "Nature Trails", "Bonfire"],
//     hasWebsite: false,
//     phone: "9480100001",
//     mapLink: "https://maps.app.goo.gl/oDqoZrocnkduhm1K9",
//     img: "https://homestayinmysore.com/assets/img/about1.jpeg",
//     imgs: [
//       "https://homestayinmysore.com/assets/img/about1.jpeg",
//       "https://homestayinmysore.com/assets/img/gal5.jpeg",
//       "https://homestayinmysore.com/assets/img/gal4.jpeg",
//       "https://homestayinmysore.com/assets/img/gal0.jpeg",
//       "https://homestayinmysore.com/assets/img/gal3.jpeg",
//     ],
//     type: "Family Homestay",
//     desc: "A warm and welcoming family homestay in the heart of Mysuru. Experience authentic Karnataka hospitality with home-cooked meals and a beautifully maintained garden. Ideal for travellers looking for a peaceful, local experience close to Mysuru's heritage sites.",
//     host: {
//       name: "Kukkeshree Family",
//       since: "Host since 2018",
//       avatar: "https://homestayinmysore.com/assets/img/about1.jpeg",
//       desc: "A gracious Mysuru family who take pride in offering guests an authentic local experience. They are happy to guide you to nearby temples, markets and sightseeing spots.",
//     },
//     guestReviews: [
//       {
//         name: "Ravi Kumar",
//         stars: 5,
//         date: "March 2026",
//         text: "Felt like home from the first moment. The meals were incredible and the family so warm.",
//       },
//       {
//         name: "Sneha Patil",
//         stars: 4,
//         date: "January 2026",
//         text: "Great location in Mysuru, very clean and comfortable. Lovely hosts.",
//       },
//     ],
//   },
//   {
//     id: 2,
//     lat: 12.2918212,
//     lng: 76.5870609,
//     name: "Sky House Homestay",
//     taluk: "Mysuru",
//     district: "Mysuru",
//     region: "mysuru",
//     price: 3000,
//     rating: 4.6,
//     reviews: 55,
//     amenities: ["Meals Included", "Mountain View", "Private Garden", "Bonfire"],
//     hasWebsite: false,
//     phone: "9480100002",
//     mapLink: "https://maps.app.goo.gl/XyRnfBXRUPJkSsJv9",
//     img: "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
//     imgs: [
//       "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
//       "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
//       "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
//       "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
//       "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
//     ],
//     type: "Family Homestay",
//     desc: "Sky House Homestay offers a breezy elevated setting with lovely views across Mysuru. Spacious rooms, wholesome home-cooked food and evening bonfires make this a favourite among repeat visitors. A perfect base to explore Mysuru city and its surrounding countryside.",
//     host: {
//       name: "Sky House Family",
//       since: "Host since 2019",
//       avatar:
//         "https://q-xx.bstatic.com/xdata/images/hotel/max500/503926994.jpg?k=80fc02ccdaa90ea449d3fe4f5baea754d211ec3909d9313af8378647697bcfb4&o=",
//       desc: "A friendly family passionate about making every guest feel at home. They are knowledgeable about local Mysuru attractions and will happily share their favourite spots.",
//     },
//     guestReviews: [
//       {
//         name: "Ananya Reddy",
//         stars: 5,
//         date: "February 2026",
//         text: "The view from the terrace in the morning was stunning. Hosts were incredibly helpful.",
//       },
//       {
//         name: "Prashanth M",
//         stars: 4,
//         date: "December 2025",
//         text: "Clean, cosy and great food. Will definitely come back.",
//       },
//     ],
//   },
//   {
//     id: 3,
//     lat: 12.2602005,
//     lng: 76.0980538,
//     name: "Hatti Eden Resort",
//     taluk: "Madikeri",
//     district: "Kodagu",
//     region: "south",
//     price: 6500,
//     rating: 4.8,
//     reviews: 92,
//     amenities: [
//       "Meals Included",
//       "Swimming Pool",
//       "Coffee Estate",
//       "Nature Trails",
//       "Mountain View",
//       "Bonfire",
//     ],
//     hasWebsite: true,
//     website: "https://www.hattieden.com",
//     phone: "9148059513",
//     mapLink: "https://maps.app.goo.gl/ZcQkhiXQFpQ5kHHfA",
//     img: "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/_SNF9853_7f2a117c",
//     imgs: [
//       "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/_SNF9853_7f2a117c",
//       "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_3333/x_0,y_260,w_5000,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-swimming-pool-1",
//       "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/facade-1",
//       "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-facade-day-view",
//       "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-restaurant",
//     ],
//     type: "Resort Stay",
//     desc: "Nestled deep in the coffee hills of Coorg, Hatti Eden is a lush resort-style stay surrounded by aromatic coffee and pepper estates. Wake up to misty mornings, sip fresh estate coffee and unwind by the pool with the Western Ghats as your backdrop.",
//     host: {
//       name: "Hatti Eden Host Family",
//       since: "Host since 2015",
//       avatar:
//         "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/_SNF9904",
//       desc: "Passionate Coorg hosts who have built Hatti Eden with love for their land and guests. They lead estate walks and share the story of coffee cultivation in the region.",
//     },
//     guestReviews: [
//       {
//         name: "Deepika Nair",
//         stars: 5,
//         date: "April 2026",
//         text: "Woke up to coffee aroma and mist every morning. A dream stay in Coorg.",
//       },
//       {
//         name: "Sanjay & Meena",
//         stars: 5,
//         date: "March 2026",
//         text: "The pool overlooking the estate was unreal. Incredible food and very attentive hosts.",
//       },
//     ],
//   },
//   {
//     id: 4,
//     lat: 12.2836122,
//     lng: 76.6263656,
//     name: "Moodalamane Mysuru",
//     taluk: "Mysuru",
//     district: "Mysuru",
//     region: "mysuru",
//     price: 3500,
//     rating: 4.7,
//     reviews: 68,
//     amenities: [
//       "Meals Included",
//       "Private Garden",
//       "Nature Trails",
//       "Heritage Architecture",
//     ],
//     hasWebsite: false,
//     phone: "9480100004",
//     mapLink: "https://maps.app.goo.gl/jvLBx9WaHFJsqKtAA",
//     img: "https://a0.muscache.com/im/pictures/da06792f-6cc4-44fa-bfcf-cf3cf1293f85.jpg?im_w=720",
//     imgs: [
//       "https://a0.muscache.com/im/pictures/da06792f-6cc4-44fa-bfcf-cf3cf1293f85.jpg?im_w=720",
//       "https://a0.muscache.com/im/pictures/d06feef1-3c98-4dc4-8b22-c89e81eb4ff4.jpg?im_w=720",
//       "https://a0.muscache.com/im/pictures/206e4cf3-4fa6-476d-bac9-2f8ab301d9b4.jpg?im_w=720",
//       "https://a0.muscache.com/im/pictures/dbd68cf4-8506-45b0-a8df-f94758e369cd.jpg?im_w=720",
//       "https://a0.muscache.com/im/pictures/785c7036-73a9-4567-901a-03a1c2872ca6.jpg?im_w=720",
//     ],
//     type: "Heritage Stay",
//     desc: "Moodalamane is a cherished heritage home on the outskirts of Mysuru, offering guests a rare glimpse into traditional Karnataka architecture and way of life. The heritage interiors, shaded courtyard and home-cooked meals make every stay deeply memorable.",
//     host: {
//       name: "Moodalamane Family",
//       since: "Host since 2016",
//       avatar:
//         "https://a0.muscache.com/im/pictures/da06792f-6cc4-44fa-bfcf-cf3cf1293f85.jpg?im_w=240",
//       desc: "An old Mysuru family proud of their heritage home. They love sharing stories of the house's history and guiding guests through local culture and cuisine.",
//     },
//     guestReviews: [
//       {
//         name: "Kavitha Rao",
//         stars: 5,
//         date: "March 2026",
//         text: "The heritage home is absolutely stunning. Felt like stepping back in time.",
//       },
//       {
//         name: "Arun & Sudha",
//         stars: 4,
//         date: "February 2026",
//         text: "Beautiful property, lovely family and authentic Mysuru food. Highly recommended.",
//       },
//     ],
//   },
//   {
//     id: 5,
//     lat: 12.21946,
//     lng: 76.5727542,
//     name: "Aastha Homestay",
//     taluk: "Mysuru",
//     district: "Mysuru",
//     region: "mysuru",
//     price: 2000,
//     rating: 4.4,
//     reviews: 32,
//     amenities: ["Meals Included", "Private Garden"],
//     hasWebsite: false,
//     phone: "9480100005",
//     mapLink: "https://maps.app.goo.gl/2pfRbzUhiVKUEoFS6",
//     img: "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/191c7eb5-5aa4-49bf-9004-c7d019ba3a66.jpeg?im_w=720",
//     imgs: [
//       "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/191c7eb5-5aa4-49bf-9004-c7d019ba3a66.jpeg?im_w=720",
//       "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/58800670-577e-40b0-afed-e91785e8beeb.jpeg?im_w=720",
//       "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/f3e94ec6-c852-4b51-8231-101a1930b4a0.jpeg?im_w=720",
//       "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/70b163dd-16cf-4092-92ed-456380c2afec.jpeg?im_w=720",
//       "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/4d11161e-5ddc-47d4-bff3-32e07062d1b3.jpeg?im_w=720",
//     ],
//     type: "Family Homestay",
//     desc: "Aastha Homestay is a simple, sincere and welcoming family home in the quiet southern reaches of Mysuru. The hosts take great pride in serving fresh, home-cooked Karnataka meals and ensuring every guest feels genuinely looked after.",
//     host: {
//       name: "Aastha Host Family",
//       since: "Host since 2020",
//       avatar:
//         "https://a0.muscache.com/im/pictures/hosting/Hosting-1446791308585817891/original/191c7eb5-5aa4-49bf-9004-c7d019ba3a66.jpeg?im_w=240",
//       desc: "A warm and caring family who believe in honest, no-frills hospitality. Their cooking is a highlight for every guest who visits.",
//     },
//     guestReviews: [
//       {
//         name: "Vinod Kumar",
//         stars: 5,
//         date: "January 2026",
//         text: "Simple and perfect. The food was the best part — genuine home cooking.",
//       },
//       {
//         name: "Rekha S",
//         stars: 4,
//         date: "November 2025",
//         text: "Very affordable and clean. Hosts were kind and helpful throughout.",
//       },
//     ],
//   },
//   {
//     id: 6,
//     lat: 12.3040626,
//     lng: 76.5841982,
//     name: "Bolak Homestay",
//     taluk: "Mysuru",
//     district: "Mysuru",
//     region: "mysuru",
//     price: 2800,
//     rating: 4.5,
//     reviews: 47,
//     amenities: ["Meals Included", "Private Garden", "Bonfire", "Nature Trails"],
//     hasWebsite: false,
//     phone: "9480100006",
//     mapLink: "https://maps.app.goo.gl/PkFf4SftowRda2nV9",
//     img: "https://homestayinmysore.com/assets/img/lavis.JPG",
//     imgs: [
//       "https://homestayinmysore.com/assets/img/lavis.JPG",
//       "https://homestayinmysore.com/assets/img/gal3.jpeg",
//       "https://homestayinmysore.com/assets/img/room1%20king.jpeg",
//       "https://homestayinmysore.com/assets/img/family%20room.jpeg",
//       "https://homestayinmysore.com/assets/img/room2%20king.jpeg",
//     ],
//     type: "Family Homestay",
//     desc: "Bolak Homestay offers a relaxed, homely atmosphere in Mysuru with a lovely garden, evening bonfires and warm family meals. A great choice for those looking to slow down, connect with a local family and explore Mysuru at a comfortable pace.",
//     host: {
//       name: "Bolak Family",
//       since: "Host since 2017",
//       avatar: "https://homestayinmysore.com/assets/img/about1.jpeg",
//       desc: "A hospitable Mysuru family who love meeting travellers from all over. They are happy to arrange sightseeing, suggest local eateries and make your stay as comfortable as possible.",
//     },
//     guestReviews: [
//       {
//         name: "Suresh Babu",
//         stars: 5,
//         date: "April 2026",
//         text: "The bonfire evenings with the family were the highlight of our trip. Superb hosts.",
//       },
//       {
//         name: "Priya & Kiran",
//         stars: 4,
//         date: "February 2026",
//         text: "Very welcoming family. Food was excellent and rooms were clean and comfortable.",
//       },
//     ],
//   },
//   {
//     id: 7,
//     lat: 11.9927484,
//     lng: 76.3408142,
//     name: "Kabini Kaanana Homestay",
//     taluk: "H.D. Kote",
//     district: "Mysuru",
//     region: "wildlife",
//     price: 3500,
//     rating: 4.8,
//     reviews: 86,
//     amenities: [
//       "Meals Included",
//       "Wildlife Zone",
//       "River Access",
//       "Nature Trails",
//       "Bonfire",
//     ],
//     hasWebsite: true,
//     website: "https://www.kabinikaanana.com",
//     phone: "7026299299",
//     mapLink: "https://maps.app.goo.gl/o7KG68pP4fNfo8PE6",
//     img: "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=1920&q=75",
//     imgs: [
//       "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=1920&q=75",
//       "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-sunrise.webp&w=1920&q=75",
//       "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-kaanana-bonfire-evening.webp&w=1920&q=75",
//       "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-kaanana-homestay-room.webp&w=1920&q=75",
//       "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-karnataka-home-cooked-food.webp&w=1920&q=75",
//     ],
//     type: "Wildlife Stay",
//     desc: "Kabini Kaanana Homestay sits at the edge of the legendary Kabini backwaters, offering guests an unparalleled wildlife experience. Elephants, deer and exotic birds are regular visitors to the property. Evenings by the Kabini river with a bonfire are simply unforgettable.",
//     host: {
//       name: "Kaanana Host Family",
//       since: "Host since 2013",
//       avatar:
//         "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=400&q=75",
//       desc: "A family with deep roots in the Kabini region. They have an intimate knowledge of local wildlife and will take you on private nature walks along the river bank.",
//     },
//     guestReviews: [
//       {
//         name: "Dr. Nandish Kumar",
//         stars: 5,
//         date: "April 2026",
//         text: "Spotted elephants from the property on our first evening. The hosts made it magical.",
//       },
//       {
//         name: "Rohini & Ajay",
//         stars: 5,
//         date: "March 2026",
//         text: "Best wildlife homestay experience we've ever had. Food, nature and hospitality — all perfect.",
//       },
//     ],
//   },
//   {
//     id: 8,
//     lat: 12.1287517,
//     lng: 76.2592309,
//     name: "Junglebliss Homestay",
//     taluk: "Hunsur",
//     district: "Mysuru",
//     region: "rural",
//     price: 4000,
//     rating: 4.7,
//     reviews: 61,
//     amenities: [
//       "Meals Included",
//       "Nature Trails",
//       "Wildlife Zone",
//       "Bonfire",
//       "River Access",
//     ],
//     hasWebsite: false,
//     phone: "9480100008",
//     mapLink: "https://maps.app.goo.gl/BQPnNW76vHCotHPF6",
//     img: "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-sunrise.webp&w=1920&q=75",
//     imgs: [
//       "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-sunrise.webp&w=1920&q=75",
//       "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=1920&q=75",
//       "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-kaanana-bonfire-evening.webp&w=1920&q=75",
//       "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-kaanana-homestay-room.webp&w=1920&q=75",
//       "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-karnataka-home-cooked-food.webp&w=1920&q=75",
//     ],
//     type: "Jungle Stay",
//     desc: "True to its name, Junglebliss Homestay immerses you completely in the wilderness near Hunsur. Dense forest surrounds the property, with a stream running nearby. Night sounds, morning bird calls and forest walks guided by the host make this a truly wild escape.",
//     host: {
//       name: "Junglebliss Host Family",
//       since: "Host since 2016",
//       avatar:
//         "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=400&q=75",
//       desc: "Nature lovers who built this homestay to share their forest with like-minded travellers. They lead guided treks, bird-watching walks and evening campfire sessions.",
//     },
//     guestReviews: [
//       {
//         name: "Gopal Shetty",
//         stars: 5,
//         date: "February 2026",
//         text: "Woke to the sound of birds and a stream. The jungle walk at dawn was extraordinary.",
//       },
//       {
//         name: "Meghna & Vivek",
//         stars: 5,
//         date: "January 2026",
//         text: "Perfect jungle getaway. The hosts are passionate and knowledgeable about the forest.",
//       },
//     ],
//   },
//   {
//     id: 9,
//     lat: 12.4383013,
//     lng: 76.5117554,
//     name: "By The Blues",
//     taluk: "Mysuru",
//     district: "Mysuru",
//     region: "mysuru",
//     price: 4500,
//     rating: 4.6,
//     reviews: 53,
//     amenities: [
//       "Meals Included",
//       "Swimming Pool",
//       "Private Garden",
//       "Yoga Space",
//     ],
//     hasWebsite: true,
//     website: "https://example.com",
//     phone: "9480100009",
//     mapLink: "https://maps.app.goo.gl/yJpkZ8XTex2APZLU6",
//     img: "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-swimming-pool-1",
//     imgs: [
//       "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-swimming-pool-1",
//       "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/_SNF9853_7f2a117c",
//       "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/facade-1",
//       "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-facade-day-view",
//       "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-restaurant",
//     ],
//     type: "Boutique Stay",
//     desc: "By The Blues is a serene boutique homestay in the northern reaches of Mysuru district, offering a pool, yoga space and beautifully landscaped gardens. A calm, curated retreat for travellers who want something a little more elevated while staying connected to nature.",
//     host: {
//       name: "By The Blues Host Family",
//       since: "Host since 2021",
//       avatar:
//         "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_2813/x_1,y_0,w_4998,h_2813,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/hatti-eden-coorg/resort-swimming-pool-1",
//       desc: "Creative hosts who have designed every corner of this property with care. They offer yoga sessions at sunrise, guided garden walks and farm-fresh meals.",
//     },
//     guestReviews: [
//       {
//         name: "Ishaan Verma",
//         stars: 5,
//         date: "April 2026",
//         text: "The pool and the yoga session in the morning — I needed this more than I knew. Perfect stay.",
//       },
//       {
//         name: "Divya & Rohan",
//         stars: 4,
//         date: "March 2026",
//         text: "Beautiful property, thoughtfully designed. The food and the garden are both exceptional.",
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
    img: "/images/kuke1.png",
    imgs: [
      "/images/kuke1.png",
      "/images/kuke2.png",
      "/images/kuke3.png",
      "/images/kuke4.png",
      "/images/kuke5.png",
      

    ],
    type: "Family Homestay",
    desc: "Kukkeshree Homestay is a Government-approved, fully compliant homestay designed exclusively for families. The owner resides on the property, ensuring safety, accountability, and support at all times.This is not a boutique hotel, but a peaceful residential home where guests can enjoy a calm and comfortable stay. The property is well-ventilated, located in a quiet neighborhood, and ideal for both short-term and long-term stays.Guests have access to entire private spaces and can cook their own meals, making it a true homely experience.",
    host: {
      name: "Kukkeshree Family",
      since: "Host since 2018",
      avatar: "/images/kuke1.png",
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

const REGIONS_META = [
  {
    key: "mysuru",
    label: "Mysuru District",
    tag: "Wildlife · Heritage · Nature",
    sub: "Mysuru · Kabini · Hunsur · Nanjangud",
    img: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
    isFirst: true,
  },
  {
    key: "wildlife",
    label: "Kabini & H.D. Kote",
    tag: "Wildlife · River · Safari",
    sub: "H.D. Kote · Saragur",
    img: "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-backwaters-dawn.webp&w=1920&q=75",
    isFirst: false,
  },
  {
    key: "heritage",
    label: "Mysuru Heritage",
    tag: "Palaces · Culture · Food",
    sub: "Mysuru City",
    img: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=600&q=80",
    isFirst: false,
  },
  {
    key: "riverside",
    label: "Cauvery Belt",
    tag: "River · Village · Nature",
    sub: "T. Narasipura · K.R. Nagar",
    img: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&q=80",
    isFirst: false,
  },
  {
    key: "rural",
    label: "Countryside Escapes",
    tag: "Farm · Village · Peaceful",
    sub: "Periyapatna · Hunsur · Nanjangud",
    img: "https://www.kabinikaanana.com/_next/image?url=%2Fimages%2Fgallery%2Fkabini-kaanana-bonfire-evening.webp&w=1920&q=75",
    isFirst: false,
  },
];

const COLLECTIONS = [
  { key: "all", icon: <Star size={16} />, label: "All Stays" },
  { key: "wildlife", icon: <Bird size={16} />, label: "Wildlife & Jungle" },
  { key: "coffee", icon: <Coffee size={16} />, label: "Coffee Estates" },
  { key: "heritage", icon: <Building2 size={16} />, label: "Heritage Homes" },
  { key: "coastal", icon: <Waves size={16} />, label: "Coastal Stays" },
  { key: "budget", icon: <Heart size={16} />, label: "Budget Under ₹5,000" },
  { key: "luxury", icon: <Star size={16} />, label: "Premium Stays" },
  {
    key: "whatsapp",
    icon: <MessageCircle size={16} />,
    label: "WhatsApp Only",
  },
  { key: "toprated", icon: <Award size={16} />, label: "Top Rated" },
];

const REGION_TABS = [
  { key: "all", label: "All Mysuru" },
  { key: "mysuru", label: "Mysuru City" },
  { key: "wildlife", label: "Kabini & H.D. Kote" },
  { key: "riverside", label: "T. Narasipura" },
  { key: "rural", label: "Hunsur & Periyapatna" },
  { key: "heritage", label: "Nanjangud" },
];

/* ─── Stars helper ──────────────────────────────────────────────────────── */
function Stars({ rating }) {
  return (
    <>
      {Array.from({ length: Math.floor(rating) }, (_, i) => (
        <Star key={i} size={18} style={{ color: "#c8a96a", fill: "#c8a96a" }} />
      ))}
    </>
  );
}

/* ─── Homestay Card ─────────────────────────────────────────────────────── */
function HsCard({ h, onOpen, isListView, distance }) {
  const wa = `https://wa.me/91${h.phone}?text=Hello%2C%20I%20found%20${encodeURIComponent(h.name)}%20on%20KHA%20and%20would%20like%20to%20book.`;

  // Top 3 nearest tourist places — computed from this homestay's coordinates
  const nearbyPlaces = TOURIST_PLACES.map((p) => ({
    ...p,
    dist: haversine(h.lat, h.lng, p.lat, p.lng),
  }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 3);

  return (
    <div
      className="kha-card kha-reveal bg-[#1f2e1f] overflow-hidden"
      style={{ border: "1px solid rgba(200,169,106,.1)" }}
      onClick={() => onOpen(h.id)}
    >
      {/* Image wrap */}
      <div
        className="kha-card-img-wrap w-full overflow-hidden relative"
        style={{
          aspectRatio: isListView ? undefined : "4/3",
          height: isListView ? "100%" : undefined,
        }}
      >
        <img
          src={h.img}
          alt={h.name}
          loading="lazy"
          className="kha-card-img w-full h-full object-cover"
        />

        {/* Type + booking badges */}
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
              className="px-3 py-[.3rem] backdrop-blur-md flex items-center gap-1"
              style={{
                fontSize: ".64rem",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                background: "rgba(46,74,46,.85)",
                border: "1px solid rgba(122,158,110,.4)",
                color: "#adc49a",
              }}
            >
              <Globe size={14} /> Has Website
            </span>
          ) : (
            <span
              className="px-3 py-[.3rem] backdrop-blur-md flex items-center gap-1"
              style={{
                fontSize: ".64rem",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                background: "rgba(37,211,102,.15)",
                border: "1px solid rgba(37,211,102,.38)",
                color: "#4ade80",
              }}
            >
              <Smartphone size={14} /> WhatsApp Only
            </span>
          )}
        </div>

        {/* Distance badge — only when tourist place filter is active */}
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

        {/* Price hover overlay */}
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
                className="kha-btn-web flex items-center gap-2 px-5 py-[.6rem]"
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
              className="kha-btn-wa flex items-center gap-2 px-5 py-[.6rem]"
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

      {/* Card body */}
      <div className="kha-card-body px-6 pt-[1.4rem] pb-7">
        <div
          className="kha-card-taluk flex items-center gap-[.4rem] mb-[.35rem]"
          style={{
            fontSize: ".7rem",
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#7a9e6e",
          }}
        >
          <MapPin size={14} /> {h.taluk}, {h.district}
        </div>
        <div
          className="kha-card-name"
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
            <Stars rating={h.rating} />
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
        <p
          className="kha-card-desc"
          style={{
            fontSize: ".88rem",
            lineHeight: 1.75,
            color: "rgba(244,239,229,.55)",
            fontWeight: 300,
            marginBottom: "1rem",
            display: "none",
          }}
        >
          {h.desc}
        </p>
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
            {nearbyPlaces.map((p) => (
              <div key={p.key} className="flex items-center justify-between">
                <span
                  className="flex items-center gap-[.4rem]"
                  style={{ fontSize: ".74rem", color: "rgba(244,239,229,.5)" }}
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

        {/* List-view price row */}
        <div
          className="kha-card-price-inline items-center justify-between mt-4 pt-4"
          style={{
            display: "none",
            borderTop: "1px solid rgba(200,169,106,.1)",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "1.8rem",
                fontWeight: 300,
                color: "#c8a96a",
              }}
            >
              ₹{h.price.toLocaleString("en-IN")}
            </span>
            <span
              style={{
                display: "block",
                fontSize: ".68rem",
                letterSpacing: ".1em",
                color: "#7a9e6e",
              }}
            >
              per night
            </span>
          </div>
          <div className="flex gap-2">
            {h.hasWebsite && (
              <a
                href={h.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
                style={{
                  padding: ".5rem 1rem",
                  fontSize: ".7rem",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  cursor: "none",
                  background: "rgba(200,169,106,.15)",
                  border: "1px solid rgba(200,169,106,.38)",
                  color: "#c8a96a",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Globe size={14} /> Website
              </a>
            )}
            <a
              href={`https://wa.me/91${h.phone}?text=Hello%2C%20I%20found%20${encodeURIComponent(h.name)}%20on%20KHA%20and%20would%20like%20to%20book.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
              style={{
                padding: ".5rem 1rem",
                fontSize: ".7rem",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                textDecoration: "none",
                cursor: "none",
                background: "rgba(37,211,102,.18)",
                border: "1px solid rgba(37,211,102,.4)",
                color: "#4ade80",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const cg = "'Cormorant Garamond',serif";
const jost = "'Jost',sans-serif";

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
  const [activeCollection, setActiveCollection] = useState("all");
  const [currentView, setCurrentView] = useState("grid");
  const [visibleCount, setVisibleCount] = useState(9);
  const [fDistrict, setFDistrict] = useState("");
  const [fTaluk, setFTaluk] = useState("");
  const [fPrice, setFPrice] = useState("");
  const [fAmenity, setFAmenity] = useState("");
  const [fSearch, setFSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [fPlace, setFPlace] = useState(""); // ← tourist place filter

  const getFiltered = () => {
    const maxP = parseInt(fPrice) || Infinity;
    const s = fSearch.toLowerCase();
    const place = TOURIST_PLACES.find((p) => p.key === fPlace);

    let list = HS.filter((h) => {
      if (activeRegion !== "all" && h.region !== activeRegion) return false;
      if (fDistrict && h.district !== fDistrict) return false;
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
      if (activeCollection === "wildlife")
        return h.amenities.includes("Wildlife Zone");
      if (activeCollection === "coffee")
        return h.amenities.includes("Coffee Estate");
      if (activeCollection === "heritage")
        return (
          h.type === "Heritage Stay" ||
          h.type === "Heritage Bungalow" ||
          h.amenities.includes("Heritage Architecture")
        );
      if (activeCollection === "coastal")
        return h.region === "coastal" || h.type === "Coastal Stay";
      if (activeCollection === "budget") return h.price < 5000;
      if (activeCollection === "luxury") return h.price >= 8000;
      if (activeCollection === "whatsapp") return !h.hasWebsite;
      if (activeCollection === "toprated") return h.rating >= 4.8;
      return true;
    }).map((h) => ({
      ...h,
      _distance: place ? haversine(place.lat, place.lng, h.lat, h.lng) : null,
    }));

    // Tourist place selected → always sort nearest first
    if (place) {
      list = [...list].sort((a, b) => a._distance - b._distance);
    } else {
      if (sortBy === "price-asc")
        list = [...list].sort((a, b) => a.price - b.price);
      if (sortBy === "price-desc")
        list = [...list].sort((a, b) => b.price - a.price);
      if (sortBy === "rating")
        list = [...list].sort((a, b) => b.rating - a.rating);
      if (sortBy === "reviews")
        list = [...list].sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  };

  const filtered = getFiltered();
  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const clearFilters = () => {
    setFDistrict("");
    setFTaluk("");
    setFPrice("");
    setFAmenity("");
    setFSearch("");
    setSortBy("default");
    setActiveRegion("all");
    setActiveCollection("all");
    setVisibleCount(9);
    setFPlace("");
  };

  const jumpRegion = (region) => {
    document
      .getElementById("khaExpBrowse")
      ?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setActiveRegion(region), 600);
  };

  const openDetail = (id) => {
    setDetailId(id);
    document.body.style.overflow = "hidden";
    setTimeout(
      () => document.getElementById("khaExpDetailPage")?.scrollTo(0, 0),
      50,
    );
  };
  const closeDetail = (e) => {
    e?.preventDefault();
    setDetailId(null);
    document.body.style.overflow = "";
  };
  const detail = detailId ? HS.find((h) => h.id === detailId) : null;

  return (
    <>
      <style>{STYLES}</style>
      <div className="kha-cur" ref={curRef}></div>
      <div className="kha-cuf" ref={curFRef}></div>

      <Navbar />
      <FloatBookButton />

      {/* ════ EXPLORE HERO ════ */}
      <div
        className="relative overflow-hidden flex items-end"
        style={{ marginTop: "90px", height: "72vh", minHeight: "520px" }}
      >
        <div
          className="kha-ex-hero-bg absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/42/7a/d2/427ad2ad9722ae2826a13d3e91d28df7.jpg')",
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg,rgba(24,35,24,.55) 0%,rgba(24,35,24,.18) 50%,rgba(24,35,24,.88) 100%)",
          }}
        ></div>
        <div className="kha-ex-hero-content relative z-[2] w-full px-16 pb-[4.5rem] flex justify-between items-end gap-8 flex-wrap">
          <div style={{ maxWidth: "560px" }}>
            <div
              className="kha-hero-eyebrow kha-fade-1 flex items-center gap-[.6rem]"
              style={{
                fontSize: ".72rem",
                letterSpacing: ".32em",
                textTransform: "uppercase",
                color: "#c8a96a",
                marginBottom: ".9rem",
              }}
            >
              Mysuru Homestays Association
            </div>
            <h1
              className="kha-fade-2"
              style={{
                fontFamily: cg,
                fontSize: "clamp(2.8rem,5vw,4.4rem)",
                fontWeight: 300,
                lineHeight: 1.08,
                color: "#fdfaf4",
                marginBottom: "1rem",
              }}
            >
              Explore{" "}
              <em style={{ fontStyle: "italic", color: "#e0c88a" }}>Every</em>{" "}
              Homestay
              <br />
              Across Mysuru, Karnataka
            </h1>
            <p
              className="kha-fade-3"
              style={{
                fontSize: ".97rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(244,239,229,.72)",
              }}
            >
              Verified homestays across Mysuru district. Filter by region,
              price, amenities — then connect with hosts directly.
            </p>
          </div>
          <div className="kha-fade-4 flex gap-10 items-center">
            {[
              ["9", "Homestays"],
              ["3", "Taluks"],
              ["2", "Regions"],
            ].map(([num, lbl], i) => (
              <React.Fragment key={lbl}>
                {i > 0 && (
                  <div
                    style={{
                      width: "1px",
                      height: "40px",
                      background: "rgba(200,169,106,.25)",
                    }}
                  ></div>
                )}
                <div className="text-center">
                  <span
                    style={{
                      fontFamily: cg,
                      fontSize: "2.6rem",
                      fontWeight: 300,
                      color: "#c8a96a",
                      lineHeight: 1,
                      display: "block",
                    }}
                  >
                    {num}
                  </span>
                  <span
                    style={{
                      fontSize: ".65rem",
                      letterSpacing: ".22em",
                      textTransform: "uppercase",
                      color: "#7a9e6e",
                      marginTop: ".3rem",
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
      </div>

      {/* ════ BREADCRUMB ════ */}
      <div
        className="flex items-center gap-[.6rem] px-16 py-[.9rem]"
        style={{
          background: "#1f2e1f",
          borderBottom: "1px solid rgba(200,169,106,.1)",
        }}
      >
        <a
          href="/"
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
          Explore Homestays
        </span>
      </div>

      {/* ════ REGION SHOWCASE ════ */}
      <section className="px-16 py-20 bg-[#1f2e1f]">
        <div className="max-w-[1300px] mx-auto mb-12 flex justify-between items-end gap-8 flex-wrap kha-reveal">
          <div>
            <span className="kha-eyebrow">Browse by Region</span>
            <h2
              style={{
                fontFamily: cg,
                fontSize: "clamp(2rem,3.5vw,3rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: "#f4efe5",
              }}
            >
              Mysuru's Distinct{" "}
              <em style={{ fontStyle: "italic", color: "#e0c88a" }}>Travel</em>{" "}
              Experiences
            </h2>
          </div>
          <a href="#khaExpBrowse" className="kha-sec-link">
            View All Homestays
          </a>
        </div>
        <div
          className="kha-region-grid kha-reveal kha-d1 max-w-[1300px] mx-auto"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gridTemplateRows: "280px 240px",
            gap: ".9rem",
          }}
        >
          {REGIONS_META.map((r) => (
            <div
              key={r.key}
              className={`kha-reg-card relative overflow-hidden cursor-none${r.isFirst ? " kha-reg-first" : ""}`}
              style={r.isFirst ? { gridRow: "1/3" } : {}}
              onClick={() => jumpRegion(r.key)}
            >
              <img
                className="kha-reg-card-img w-full h-full object-cover"
                src={r.img}
                alt={r.label}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top,rgba(24,35,24,.82) 0%,rgba(24,35,24,.12) 60%)",
                }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 px-[1.8rem] py-[1.6rem]">
                <span
                  style={{
                    fontSize: ".65rem",
                    letterSpacing: ".25em",
                    textTransform: "uppercase",
                    color: "#c8a96a",
                    marginBottom: ".4rem",
                    display: "block",
                  }}
                >
                  {r.tag}
                </span>
                <div
                  style={{
                    fontFamily: cg,
                    fontSize: r.isFirst ? "2.5rem" : "1.7rem",
                    fontWeight: 300,
                    color: "#fdfaf4",
                    lineHeight: 1.1,
                    marginBottom: ".3rem",
                  }}
                >
                  {r.label}
                </div>
                <div
                  style={{
                    fontSize: ".78rem",
                    color: "#adc49a",
                    letterSpacing: ".1em",
                  }}
                >
                  {r.sub}
                </div>
              </div>
              <div
                className="kha-reg-card-arrow absolute top-[1.2rem] right-[1.2rem] w-[38px] h-[38px] flex items-center justify-center"
                style={{
                  border: "1px solid rgba(200,169,106,.35)",
                  background: "rgba(24,35,24,.5)",
                  backdropFilter: "blur(8px)",
                  color: "#c8a96a",
                  fontSize: "1rem",
                }}
              >
                ↗
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════ COLLECTIONS ════ */}
      <div className="px-16 py-16 bg-[#182318]">
        <div className="max-w-[1300px] mx-auto">
          <span className="kha-eyebrow kha-reveal">Curated Collections</span>
          <div
            className="kha-reveal kha-d1 flex gap-4 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {COLLECTIONS.map((c) => (
              <button
                key={c.key}
                className={`kha-col-pill flex-shrink-0 flex items-center gap-[.55rem] px-[1.6rem] py-[.65rem] whitespace-nowrap${activeCollection === c.key ? " active" : ""}`}
                style={{
                  border: "1px solid rgba(200,169,106,.22)",
                  background: "transparent",
                  color: "rgba(244,239,229,.65)",
                  fontFamily: jost,
                  fontSize: ".75rem",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                }}
                onClick={() => {
                  setActiveCollection(c.key);
                  setVisibleCount(9);
                  document
                    .getElementById("khaExpBrowse")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════ BROWSE ════ */}
      <section
        className="kha-browse-section px-16 pb-20 bg-[#182318]"
        id="khaExpBrowse"
      >
        {/* Filter bar */}
        <div
          className="z-[100] py-6 bg-[#182318]"
          style={{
            top: "114px",
            borderBottom: "1px solid rgba(200,169,106,.1)",
          }}
        >
          <div
            className="kha-filter-bar max-w-[1300px] mx-auto flex items-end gap-[1.2rem] flex-wrap px-[1.8rem] py-[1.4rem]"
            style={{
              background: "rgba(31,46,31,.78)",
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(200,169,106,.16)",
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
                lbl: "District",
                el: (
                  <select
                    className="kha-filter-select"
                    value={fDistrict}
                    onChange={(e) => setFDistrict(e.target.value)}
                  >
                    <option value="">All Districts</option>
                    {[
                      "Mysuru",
                      "Kodagu",
                      "Chikmagalur",
                      "Hassan",
                      "Dakshina Kannada",
                      "Uttara Kannada",
                      "Shivamogga",
                      "Udupi",
                      "Belagavi",
                      "Mandya",
                      "Tumakuru",
                    ].map((d) => (
                      <option key={d}>{d}</option>
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
                    {[
                      "Mysuru",
                      "H.D. Kote",
                      "Hunsur",
                      "Madikeri",
                      "Virajpet",
                      "Somvarpet",
                      "Chikmagalur",
                      "Mudigere",
                      "Koppa",
                      "Sakleshpur",
                      "Belur",
                      "Mangaluru",
                      "Puttur",
                      "Udupi",
                      "Kundapur",
                      "Sirsi",
                      "Shivamogga",
                      "Thirthahalli",
                    ].map((t) => (
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
                <div className="kha-filter-item flex flex-col gap-[.35rem] flex-1 min-w-[130px]">
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
              className="kha-filter-btn font-semibold px-8 py-[.72rem] flex-shrink-0 cursor-none transition-all duration-200"
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
        </div>

        {/* Active place banner */}
        {fPlace &&
          (() => {
            const place = TOURIST_PLACES.find((p) => p.key === fPlace);
            return (
              <div
                className="max-w-[1300px] mx-auto mb-2 flex items-center gap-3 px-5 py-3"
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

        {/* Region tabs */}
        <div className="max-w-[1300px] mx-auto flex gap-2 flex-wrap my-8">
          {REGION_TABS.map((r) => (
            <button
              key={r.key}
              className={`kha-rtab${activeRegion === r.key ? " active" : ""}`}
              onClick={() => {
                setActiveRegion(r.key);
                setVisibleCount(9);
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Results bar */}
        <div className="max-w-[1300px] mx-auto flex justify-between items-center flex-wrap gap-4 mb-6">
          <div
            style={{
              fontSize: ".88rem",
              color: "rgba(244,239,229,.5)",
              letterSpacing: ".06em",
            }}
          >
            <span
              style={{
                color: "#c8a96a",
                fontFamily: cg,
                fontSize: "1.25rem",
                marginRight: ".3rem",
              }}
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
          <div className="flex items-center gap-5">
            <div className="flex gap-1">
              {[
                { v: "grid", icon: "⊞" },
                { v: "list", icon: "☰" },
              ].map(({ v, icon }) => (
                <button
                  key={v}
                  className={`kha-view-btn w-[34px] h-[34px] flex items-center justify-center text-[.85rem]${currentView === v ? " active" : ""}`}
                  style={{
                    border: "1px solid rgba(200,169,106,.2)",
                    background: "transparent",
                    color:
                      currentView === v ? "#c8a96a" : "rgba(244,239,229,.45)",
                  }}
                  onClick={() => setCurrentView(v)}
                >
                  {icon}
                </button>
              ))}
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
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        {/* Cards */}
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
          <div
            className={`max-w-[1300px] mx-auto grid gap-6${currentView === "list" ? " kha-grid-list" : " kha-exp-card-grid"}`}
            style={{
              gridTemplateColumns: currentView === "list" ? "1fr" : undefined,
            }}
          >
            {visible.map((h) => (
              <HsCard
                key={h.id}
                h={h}
                onOpen={openDetail}
                isListView={currentView === "list"}
                distance={h._distance}
              />
            ))}
          </div>
        )}

        {/* Load more */}
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
                cursor: "none",
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
              ></div>
              <div className="kha-divider-gem"></div>
              <div
                style={{
                  height: "1px",
                  background: "#c8a96a",
                  opacity: 0.35,
                  width: "50px",
                }}
              ></div>
            </div>
            <p
              style={{
                fontSize: ".95rem",
                lineHeight: 1.9,
                color: "rgba(244,239,229,.62)",
                fontWeight: 300,
              }}
            >
              We personally visit and verify every homestay listed here. No
              aggregator fees, no booking commissions — you connect directly
              with the host family and keep 100% of the magic between you.
            </p>
          </div>
          <div className="kha-reveal kha-d1 flex flex-col gap-[1.1rem]">
            {[
              {
                icon: <Award size={24} />,
                title: "Personal Verification",
                desc: "Every property physically inspected and approved by KHA before listing.",
              },
              {
                icon: <Smartphone size={24} />,
                title: "Direct Contact, Zero Fees",
                desc: "No commissions. WhatsApp or website — you negotiate directly with the host.",
              },
              {
                icon: <Leaf size={24} />,
                title: "Sustainability Committed",
                desc: "All KHA members follow responsible and eco-conscious tourism practices.",
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

      {/* ════ DETAIL PAGE ════ */}
      <div id="khaExpDetailPage" className={detail ? "open" : ""}>
        {detail &&
          (() => {
            const h = detail;
            const wa = `https://wa.me/91${h.phone}?text=Hello%2C%20I%20found%20${encodeURIComponent(h.name)}%20on%20KHA%20and%20would%20like%20to%20book%20a%20stay.%20Please%20share%20availability.`;

            // All tourist places sorted by distance from this homestay
            const allPlacesSorted = TOURIST_PLACES.map((p) => ({
              ...p,
              dist: haversine(h.lat, h.lng, p.lat, p.lng),
            })).sort((a, b) => a.dist - b.dist);

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
                    ← Back to HomePage
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
                          className="flex items-center gap-1"
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
                          <Globe size={14} /> Has Official Website
                        </span>
                      ) : (
                        <span
                          className="flex items-center gap-1"
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
                          <Smartphone size={14} /> WhatsApp Booking
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
                      <MapPin size={18} /> {h.taluk} · {h.district} District,
                      Karnataka
                    </div>
                  </div>
                </div>

                <div className="kha-dp-body max-w-[1200px] mx-auto px-20 py-16 pb-28">
                  <div
                    className="kha-dp-grid grid gap-16 items-start"
                    style={{ gridTemplateColumns: "1fr 380px" }}
                  >
                    <div>
                      {/* Rating row */}
                      <div
                        className="flex items-center gap-[.9rem] mb-9 pb-8 flex-wrap"
                        style={{
                          borderBottom: "1px solid rgba(200,169,106,.12)",
                        }}
                      >
                        <div className="flex gap-[.2rem]">
                          <Stars rating={h.rating} />
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
                          ✓ KHA Verified Member
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
                              color: "#c8a96a",
                            }}
                          >
                            <span style={{ flexShrink: 0 }}>
                              {AICONS[a] || <Star size={20} />}
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

                      {/* ── Nearby Tourist Attractions ── */}
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
                        Nearby Tourist Attractions
                      </h3>
                      <div
                        className="grid gap-[.6rem] mb-12"
                        style={{ gridTemplateColumns: "1fr 1fr" }}
                      >
                        {allPlacesSorted.map((p) => (
                          <div
                            key={p.key}
                            className="flex items-center justify-between px-4 py-[.75rem]"
                            style={{
                              background: "rgba(31,46,31,.6)",
                              border: "1px solid rgba(200,169,106,.08)",
                              transition: "border-color .2s, background .2s",
                              cursor: "default",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor =
                                "rgba(200,169,106,.28)";
                              e.currentTarget.style.background =
                                "rgba(31,46,31,.9)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor =
                                "rgba(200,169,106,.08)";
                              e.currentTarget.style.background =
                                "rgba(31,46,31,.6)";
                            }}
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
                                      : "rgba(244,239,229,.35)",
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
                        Location
                      </h3>
                      <div
                        className="mb-12 overflow-hidden"
                        style={{ border: "1px solid rgba(200,169,106,.18)" }}
                      >
                        <iframe
                          title={`Map - ${h.name}`}
                          width="100%"
                          height="340"
                          style={{
                            display: "block",
                            filter:
                              "invert(90%) hue-rotate(180deg) saturate(0.85) brightness(0.85)",
                            border: "none",
                          }}
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          src={`https://maps.google.com/maps?q=${h.lat},${h.lng}&z=15&output=embed`}
                        />
                        <div
                          className="flex items-center justify-between px-6 py-4"
                          style={{
                            background: "rgba(24,35,24,.92)",
                            borderTop: "1px solid rgba(200,169,106,.12)",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <MapPin size={20} style={{ color: "#c8a96a" }} />
                            <div>
                              <div
                                style={{
                                  fontSize: ".88rem",
                                  fontWeight: 500,
                                  color: "#f4efe5",
                                }}
                              >
                                {h.taluk}, {h.district} District
                              </div>
                              <div
                                style={{
                                  fontSize: ".75rem",
                                  color: "rgba(244,239,229,.45)",
                                  marginTop: ".1rem",
                                  letterSpacing: ".06em",
                                }}
                              >
                                Karnataka, India
                              </div>
                            </div>
                          </div>
                          <a
                            href={h.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: ".68rem",
                              letterSpacing: ".22em",
                              textTransform: "uppercase",
                              color: "#c8a96a",
                              textDecoration: "none",
                              border: "1px solid rgba(200,169,106,.35)",
                              padding: ".45rem 1.1rem",
                              whiteSpace: "nowrap",
                              cursor: "none",
                            }}
                          >
                            Open in Maps →
                          </a>
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
                                  <Stars rating={r.stars} />
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

                    {/* Sidebar */}
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
                            ? "This homestay has an official website for full booking details."
                            : "This homestay books exclusively via WhatsApp. Tap below to chat with the host family directly."}
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
                            <Globe size={18} /> Visit Official Website
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
                          <MessageCircle size={18} /> Book via WhatsApp
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
                              "Rating",
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
                          <Award
                            size={24}
                            style={{ color: "#c8a96a", flexShrink: 0 }}
                          />
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
                              KHA Certified
                            </strong>
                            This homestay is a verified member of MHA and meets
                            all our quality standards.
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

export default Explore;
