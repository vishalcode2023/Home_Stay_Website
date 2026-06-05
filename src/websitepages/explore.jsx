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

/* ─── Non-Tailwindable CSS ──────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {  background:#182318; color:#f4efe5; overflow-x:hidden; cursor:none; }
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

  /* Detail slide (homestay list → room list) */
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

  /* Room full detail slide */
  #khaExpRoomPage { position:fixed; inset:0; z-index:3000; background:#182318; overflow-y:auto; transform:translateX(100%); transition:transform .6s cubic-bezier(.22,1,.36,1); }
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
  .kha-back-btn { display:inline-flex; align-items:center; gap:.55rem; text-decoration:none; color:rgba(244,239,229,.72); font-size:.76rem; letter-spacing:.2em; text-transform:uppercase; background:rgba(31,46,31,.7); border:1px solid rgba(200,169,106,.22); padding:.5rem 1.4rem; transition:color .3s,border-color .3s; cursor:none; }
  .kha-back-btn:hover { color:#c8a96a; border-color:#c8a96a; }
  .kha-btn-wa-room { display:flex; align-items:center; justify-content:center; gap:.6rem; padding:.85rem 1.6rem; background:rgba(37,211,102,.18); border:1px solid rgba(37,211,102,.42); color:#4ade80; font-size:.78rem; letter-spacing:.18em; text-transform:uppercase; text-decoration:none; transition:background .3s; cursor:none; }
  .kha-btn-wa-room:hover { background:rgba(37,211,102,.32); }
  .kha-btn-web-room { display:flex; align-items:center; justify-content:center; gap:.6rem; padding:.85rem 1.6rem; background:rgba(200,169,106,.14); border:1px solid rgba(200,169,106,.38); color:#c8a96a; font-size:.78rem; letter-spacing:.18em; text-transform:uppercase; text-decoration:none; transition:background .3s; cursor:none; }
  .kha-btn-web-room:hover { background:rgba(200,169,106,.28); }

  /* Detail two-col */
  .kha-detail-two-col { grid-template-columns: 420px 1fr; }

  .kha-exp-card-grid { grid-template-columns:repeat(3,1fr); }
  .kha-promo-feat { transition:border-color .3s; }
  .kha-promo-feat:hover { border-color:rgba(200,169,106,.28) !important; }
  .kha-divider-gem { width:5px; height:5px; background:#c8a96a; transform:rotate(45deg); }

  .kha-btn-load::after { content:''; width:28px; height:1px; background:#c8a96a; transition:width .3s; }
  .kha-btn-load:hover::after { width:44px; }
  .kha-btn-load:hover { border-color:#c8a96a !important; background:rgba(200,169,106,.08) !important; }

  @media(max-width:900px){
    body { cursor:auto; } .kha-cur { display:none; } .kha-cuf { display:none; }
    .kha-ex-hero-content { padding:0 1.5rem 2.5rem; flex-direction:column; align-items:flex-start; }
    .kha-exp-card-grid { grid-template-columns:1fr 1fr !important; gap:1rem !important; }
    .kha-dp-body { padding:2rem 1.5rem 5rem !important; }
    .kha-dp-grid { grid-template-columns:1fr !important; }
    .kha-dp-gallery { height:240px !important; }
    .kha-dp-amen-grid { grid-template-columns:1fr 1fr !important; }
    .kha-promo-inner { grid-template-columns:1fr !important; }
    .kha-detail-two-col { grid-template-columns:1fr !important; }
    .kha-mosaic { grid-template-rows:180px 140px !important; }
    #khaExpDetailPage .dp-inner, #khaExpRoomPage .dp-inner { padding:2rem 1.5rem 5rem !important; }
    .dp-topbar { padding:.8rem 1.5rem !important; }
  }
  @media(max-width:768px){
    .px-16 { padding-left:1rem !important; padding-right:1rem !important; }
    .kha-exp-card-grid { grid-template-columns:repeat(2,1fr) !important; gap:1rem !important; }
    .kha-mosaic { grid-template-columns:1fr 1fr !important; grid-template-rows:160px 120px 120px !important; }
    .kha-mosaic-main { grid-row:auto !important; grid-column:1/3 !important; }
  }
  @media(max-width:600px){
    .kha-exp-card-grid { grid-template-columns:1fr !important; }
  }
  @media(max-width:480px){
    .kha-mosaic { grid-template-columns:1fr !important; grid-template-rows:repeat(6,150px) !important; }
    .kha-mosaic-main { grid-row:auto !important; grid-column:auto !important; }
    .px-16 { padding-left:1rem !important; padding-right:1rem !important; }
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
  { key: "nagarahole", label: "Nagarahole National Park", lat: 12.0473, lng: 76.1144 },
  { key: "kabini", label: "Kabini Backwaters", lat: 11.9376, lng: 76.3534 },
  { key: "coorg", label: "Coorg / Madikeri", lat: 12.4244, lng: 75.7382 },
  { key: "ooty", label: "Ooty", lat: 11.4102, lng: 76.695 },
  { key: "wayanad", label: "Wayanad", lat: 11.6854, lng: 76.132 },
  { key: "srirangapatna", label: "Srirangapatna", lat: 12.422, lng: 76.6954 },
  { key: "bandipur", label: "Bandipur National Park", lat: 11.6711, lng: 76.6341 },
  { key: "shravanabelagola", label: "Shravanabelagola", lat: 12.8586, lng: 76.4857 },
  { key: "belur_halebidu", label: "Belur / Halebidu", lat: 13.1683, lng: 75.868 },
  { key: "bylakuppe", label: "Bylakuppe (Tibetan Colony)", lat: 12.292, lng: 75.9947 },
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

/* ─── 3 Room Types (same as Home page) ──────────────────────────────────── */
const ROOM_TYPES = [
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
    desc: "ನೆಲಮಳಿಗೆ is a fully furnished ground floor 2BHK designed for families seeking comfort, privacy, and easy access. The space is spacious, well-ventilated, and ideal for peaceful living. • Entire private 2BHK space • Calm and quiet residential surroundings • Excellent ventilation and natural light • Suitable for short & long stays • Family-friendly environment",
    amenities: [
      "Fully equipped Italian-style kitchen",
      "2 bedrooms with one attached Toilet & Common bathroom",
      "Solar + gas geyser",
      "Smart TV &WiFi",
      "Covered parking",
      "Swiggy / Zomato / Ola / Uber accessible",
    ],
    imgs: [
      "/images/nela1.jpg",
      "/images/nela2.jpg",
      "/images/nela3.jpg",
      "/images/nela4.jpg",
      "/images/nela5.jpg",
      "/images/nela6.jpg",
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
    desc: "ಮಹಡಿಮನೆ is a first floor 2BHK homestay offering a bright, airy, and peaceful living space. Perfect for families who prefer elevated views with privacy and comfort. • Entire private 2BHK unit (Spacious) • Well-ventilated and naturally lit • Quiet and peaceful environment • Ideal for families and longer stays • Safe residential locality.",
    amenities: [
      "Fully equipped kitchen",
      "2 bedrooms with attached bathrooms",
      "Solar / geyser hot water",
      "Smart TV &WiFi",
      "Covered parking",
      "Online delivery & cab services available",
    ],
    imgs: [
      "/images/mad1.png",
      "/images/mad2.png",
      "/images/mad3.png",
      "/images/mad4.png",
      "/images/mad6.png",
      "/images/mad5.png",
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
    desc: "ತಾರಸಿಮನೆ is a compact studio apartment on the top floor, ideal for small families looking for a simple, peaceful, and minimal stay experience. • Entire private studio space • Calm, green, and quiet surroundings • Excellent ventilation and natural light • Ideal for short/long stays • Peaceful residential atmosphere.",
    amenities: [
      "Compact kitchen with induction stove",
      "Indian toilet / Bathroom with solar / geyser hot water",
      "Smart TV &WiFi",
      "Covered parking",
      "Swiggy / Zomato / Ola / Uber serviceable",
    ],
    imgs: [
      "/images/thar1.png",
      "/images/thar2.png",
      "/images/thar3.png",
      "/images/thar4.png",
      "/images/thar5.png",
      "/images/thar6.png",
    ],
  },
];

/* ─── Homestay Data ──────────────────────────────────────────────────────── */
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
    mapLink: "https://maps.app.goo.gl/oDqoZrocnkduhm1K9",
    img: "/images/nela2.jpg",
    imgs: [
      "/images/nela1.jpg",
      "/images/nela2.jpg",
      "/images/nela3.jpg",
      "/images/nela4.jpg",
      "/images/nela5.jpg",
      "/images/nela6.jpg",
    ],
    type: "Family Homestay",
    location: "Vijayanagar 4th Stage, near NPS School, Mysuru • 2 km from Ring Road • 15 minutes from Mysore Palace",
    desc: "Kukkeshree Homestay is a Government-approved, fully compliant homestay designed exclusively for families. The owner resides on the property, ensuring safety, accountability, and support at all times. This is not a boutique hotel, but a peaceful residential home where guests can enjoy a calm and comfortable stay. The property is well-ventilated, located in a quiet neighborhood, and ideal for both short-term and long-term stays. Guests have access to entire private spaces and can cook their own meals, making it a true homely experience.",
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
];

/* ─── Stars helper ──────────────────────────────────────────────────────── */
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

/* ─── Explore Card ──────────────────────────────────────────────────────── */
function HsCard({ h, onOpen, distance }) {
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
          <Badge bg="rgba(24,35,24,.72)" border="rgba(200,169,106,.32)" color="#c8a96a">
            {h.type}
          </Badge>
          {h.hasWebsite ? (
            <Badge bg="rgba(46,74,46,.85)" border="rgba(122,158,110,.4)" color="#adc49a">
              Has Website
            </Badge>
          ) : (
            <Badge bg="rgba(37,211,102,.15)" border="rgba(37,211,102,.38)" color="#4ade80">
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
          style={{ background: "rgba(24,35,24,.9)", backdropFilter: "blur(4px)" }}
        >
          <span style={{ fontSize: ".68rem", letterSpacing: ".28em", textTransform: "uppercase", color: "#7a9e6e" }}>
            Starting from
          </span>
          <span style={{ fontFamily: cg, fontSize: "2.9rem", fontWeight: 300, color: "#c8a96a", lineHeight: 1 }}>
            ₹{h.price.toLocaleString("en-IN")}
          </span>
          <span style={{ fontSize: ".74rem", color: "rgba(244,239,229,.5)", letterSpacing: ".1em" }}>
            per night · 3 Unique Stays available
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
          style={{ fontFamily: cg, fontSize: "1.5rem", fontWeight: 400, color: "#f4efe5", lineHeight: 1.2, marginBottom: ".3rem" }}
        >
          {h.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".85rem" }}>
          <Stars rating={h.rating} sz={13} />
          <span style={{ fontSize: ".84rem", color: "#c8a96a", fontWeight: 500 }}>{h.rating}</span>
          <span style={{ fontSize: ".74rem", color: "rgba(244,239,229,.38)" }}>({h.reviews})</span>
        </div>
        <div style={{ borderTop: "1px solid rgba(200,169,106,.1)", paddingTop: ".75rem" }}>
          {nearbyPlaces.map((p) => (
            <div
              key={p.key}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".3rem" }}
            >
              <span style={{ fontSize: ".72rem", color: "rgba(244,239,229,.45)", display: "flex", alignItems: "center", gap: ".35rem" }}>
                <MapPin size={9} style={{ color: "#c8a96a" }} />
                {p.label}
              </span>
              <span style={{ fontSize: ".7rem", color: "#c8a96a", fontWeight: 600 }}>{p.dist} km</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Room List Card (inside detail slide) ──────────────────────────────── */
function RoomListCard({ room, h, onOpen, index }) {
  const price = Math.round((h.price * room.multiplier) / 100) * 100;
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const roomImgs = room.imgs && room.imgs.length > 0 ? room.imgs : h.imgs;
  const imgSrc = roomImgs[0] || h.img;

  return (
    <div
      onClick={() => onOpen(room.key)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "340px 1fr",
        overflow: "hidden",
        border: `1px solid ${hovered ? room.tagBorder : "rgba(200,169,106,.14)"}`,
        background: hovered ? "rgba(31,46,31,.95)" : "#1c2d1c",
        transform: hovered && !isMobile ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 24px 64px rgba(0,0,0,.5), 0 0 0 1px ${room.tagBorder}`
          : "0 4px 20px rgba(0,0,0,.25)",
        transition: "all .4s cubic-bezier(.22,1,.36,1)",
        cursor: "none",
        position: "relative",
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
          opacity: hovered ? 1 : 0.6,
          transition: "opacity .4s",
          zIndex: 2,
        }}
      />

      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: isMobile ? "200px" : "440px" }}>
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
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,rgba(24,35,24,.1) 0%,rgba(24,35,24,.65) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "90px", background: `linear-gradient(to top,rgba(28,45,28,1),transparent)` }} />

        {/* Watermark number */}
        <div
          style={{
            position: "absolute",
            top: "-.5rem",
            right: ".8rem",
            fontFamily: cg,
            fontSize: isMobile ? "4.5rem" : "6rem",
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

        {/* Price over image */}
        <div style={{ position: "absolute", bottom: ".85rem", left: ".95rem" }}>
          <div style={{ fontSize: ".58rem", letterSpacing: ".24em", textTransform: "uppercase", color: "rgba(244,239,229,.5)", marginBottom: ".1rem" }}>
            from
          </div>
          <div style={{ fontFamily: cg, fontSize: isMobile ? "1.6rem" : "1.9rem", fontWeight: 300, color: room.accentColor, lineHeight: 1 }}>
            ₹{price.toLocaleString("en-IN")}
            <span style={{ fontSize: ".72rem", color: "rgba(244,239,229,.38)", marginLeft: ".35rem", fontFamily: jost }}>/night</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: isMobile ? "1.3rem 1.2rem 1.4rem" : "1.7rem 2rem 1.7rem 1.8rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: ".85rem",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: cg,
              fontSize: isMobile ? "1.5rem" : "1.85rem",
              fontWeight: 300,
              color: hovered ? "#fdfaf4" : "#e8e2d4",
              lineHeight: 1.1,
              marginBottom: ".5rem",
              transition: "color .3s",
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
              marginBottom: ".85rem",
              margin: "0 0 .85rem",
            }}
          >
            {room.desc}
          </p>
          <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
            {room.amenities.slice(0, isMobile ? 3 : room.amenities.length).map((a) => (
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
                  background: hovered ? "rgba(200,169,106,.1)" : "rgba(200,169,106,.05)",
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

        {/* CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            gap: ".6rem",
            paddingTop: ".9rem",
            borderTop: `1px solid ${hovered ? "rgba(200,169,106,.2)" : "rgba(200,169,106,.08)"}`,
            transition: "border-color .3s",
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
}

/* ─── Room Full Detail ──────────────────────────────────────────────────── */
function RoomDetail({ h, roomKey, onBack }) {
  const room = ROOM_TYPES.find((r) => r.key === roomKey);
  if (!h || !room) return null;
  const price = Math.round((h.price * room.multiplier) / 100) * 100;
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
          onClick={(e) => { e.preventDefault(); onBack(); }}
        >
          <ArrowLeft size={13} /> Back to Rooms
        </a>
        <div style={{ width: "1px", height: "16px", background: "rgba(200,169,106,.2)", flexShrink: 0 }} />
        <span style={{ fontSize: ".7rem", letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(244,239,229,.35)" }}>
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
            }}
          >
            {room.tag}
          </span>
        </div>
      </div>

      <div className="dp-inner" style={{ maxWidth: "1160px", margin: "0 auto", padding: "3rem 3rem 6rem 1rem" }}>
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
          <div style={{ fontFamily: cg, fontSize: "clamp(2rem,4vw,3.1rem)", fontWeight: 300, color: "#fdfaf4", lineHeight: 1.1, marginBottom: ".3rem" }}>
            {room.name}
          </div>
          <div style={{ fontFamily: cg, fontSize: "1.15rem", fontWeight: 300, color: "rgba(244,239,229,.4)", marginBottom: "1rem" }}>
            at {h.name}
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
          style={{ display: "grid", gridTemplateColumns: "1fr 330px", gap: "3rem", alignItems: "start" }}
        >
          {/* Left */}
          <div>
            <h3 style={{ fontFamily: cg, fontSize: "1.5rem", fontWeight: 300, color: "#f4efe5", marginBottom: ".8rem" }}>
              About This Room
            </h3>
            <p style={{ fontSize: ".97rem", lineHeight: 2, fontWeight: 300, color: "rgba(244,239,229,.72)", marginBottom: "2.5rem" }}>
              {room.desc}
            </p>

            <h3 style={{ fontFamily: cg, fontSize: "1.5rem", fontWeight: 300, color: "#f4efe5", marginBottom: ".85rem" }}>
              What's Included
            </h3>
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(172px,1fr))", gap: ".6rem", marginBottom: "2.5rem" }}
            >
              {room.amenities.map((a) => (
                <div key={a} className="kha-amen-item">
                  <span style={{ color: "#c8a96a", flexShrink: 0 }}>{AICONS[a] || <Leaf size={17} />}</span>
                  <span style={{ fontSize: ".82rem", color: "rgba(244,239,229,.75)" }}>{a}</span>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: cg, fontSize: "1.5rem", fontWeight: 300, color: "#f4efe5", marginBottom: ".85rem" }}>
              Nearby Attractions
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".5rem", marginBottom: "2.5rem" }}>
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
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(200,169,106,.28)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(200,169,106,.08)")}
                  >
                    <span style={{ fontSize: ".79rem", color: "rgba(244,239,229,.55)", display: "flex", alignItems: "center", gap: ".4rem" }}>
                      <MapPin size={10} style={{ color: "#c8a96a", flexShrink: 0 }} />
                      {p.label}
                    </span>
                    <span
                      style={{
                        fontSize: ".69rem",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        marginLeft: ".5rem",
                        padding: ".15rem .5rem",
                        color: p.dist <= 30 ? "#4ade80" : p.dist <= 80 ? "#c8a96a" : "rgba(244,239,229,.32)",
                        background: p.dist <= 30 ? "rgba(37,211,102,.1)" : p.dist <= 80 ? "rgba(200,169,106,.1)" : "transparent",
                        border: `1px solid ${p.dist <= 30 ? "rgba(37,211,102,.25)" : p.dist <= 80 ? "rgba(200,169,106,.2)" : "transparent"}`,
                      }}
                    >
                      {p.dist} km
                    </span>
                  </div>
                ))}
            </div>

            <h3 style={{ fontFamily: cg, fontSize: "1.5rem", fontWeight: 300, color: "#f4efe5", marginBottom: ".85rem" }}>
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
              <div style={{ width: "58px", height: "58px", borderRadius: "50%", border: "2px solid rgba(200,169,106,.3)", overflow: "hidden", flexShrink: 0 }}>
                <img src={h.host.avatar} alt={h.host.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontFamily: cg, fontSize: "1.28rem", fontWeight: 300, color: "#f4efe5" }}>{h.host.name}</div>
                <div style={{ fontSize: ".68rem", letterSpacing: ".15em", textTransform: "uppercase", color: "#7a9e6e", marginTop: ".12rem" }}>
                  {h.host.since}
                </div>
                <div style={{ fontSize: ".88rem", lineHeight: 1.8, color: "rgba(244,239,229,.58)", marginTop: ".45rem", fontWeight: 300 }}>
                  {h.host.desc}
                </div>
              </div>
            </div>

            {/* Map */}
            <h3 style={{ fontFamily: cg, fontSize: "1.5rem", fontWeight: 300, color: "#f4efe5", marginBottom: ".85rem" }}>
              Property Location
            </h3>
            <div style={{ overflow: "hidden", border: "1px solid rgba(200,169,106,.15)", marginBottom: "2.5rem", height: "420px" }}>
              <iframe
                title="Property Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${h.lat},${h.lng}&z=15&output=embed`}
              />
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
              <div style={{ textAlign: "center", paddingBottom: "1.3rem", marginBottom: "1.3rem", borderBottom: "1px solid rgba(200,169,106,.12)" }}>
                <span style={{ fontSize: ".66rem", letterSpacing: ".26em", textTransform: "uppercase", color: "#7a9e6e", display: "block", marginBottom: ".2rem" }}>
                  Starting from
                </span>
                <span style={{ fontFamily: cg, fontSize: "3rem", fontWeight: 300, color: "#c8a96a", lineHeight: 1, display: "block" }}>
                  ₹{price.toLocaleString("en-IN")}
                </span>
                <span style={{ fontSize: ".78rem", color: "#adc49a", letterSpacing: ".1em" }}>per night · direct booking</span>
              </div>
              {h.hasWebsite && (
                <a href={h.website} target="_blank" rel="noopener noreferrer" className="kha-btn-web-room" style={{ marginBottom: ".55rem", width: "100%" }}>
                  <Globe size={14} /> Visit Official Website
                </a>
              )}
              <a href={wa} target="_blank" rel="noopener noreferrer" className="kha-btn-wa-room" style={{ width: "100%" }}>
                <MessageCircle size={14} /> Book via WhatsApp
              </a>
              <div style={{ marginTop: "1.3rem", paddingTop: "1.1rem", borderTop: "1px solid rgba(200,169,106,.1)", display: "flex", flexDirection: "column", gap: ".55rem" }}>
                {[
                  ["Room", room.name],
                  ["Property", h.name],
                  ["District", h.district],
                  ["Guests", `Up to ${room.guests}`],
                  ["Booking", h.hasWebsite ? "Website + WhatsApp" : "WhatsApp Only"],
                ].map(([l, v]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: ".5rem" }}>
                    <span style={{ fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(244,239,229,.32)", flexShrink: 0 }}>
                      {l}
                    </span>
                    <span style={{ fontSize: ".84rem", color: "rgba(244,239,229,.68)", textAlign: "right" }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: ".7rem", marginTop: "1.1rem", padding: ".85rem 1rem", background: "rgba(200,169,106,.07)", border: "1px solid rgba(200,169,106,.15)" }}>
                <Award size={17} style={{ color: "#c8a96a", flexShrink: 0 }} />
                <div style={{ fontSize: ".75rem", lineHeight: 1.6, color: "rgba(244,239,229,.48)" }}>
                  <strong style={{ color: "#c8a96a", display: "block", fontSize: ".66rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".1rem" }}>
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
  const curRef = useRef(null), curFRef = useRef(null);
  const cxRef = useRef(0), cyRef = useRef(0), fxRef = useRef(0), fyRef = useRef(0);

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
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".kha-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });

  /* State */
  const [detailId, setDetailId] = useState(null);
  const [roomKey, setRoomKey] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [fPlace, setFPlace] = useState("");

  /* Escape key */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (roomKey) { setRoomKey(null); return; }
        if (detailId) { setDetailId(null); document.body.style.overflow = ""; }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [detailId, roomKey]);

  /* Filtered list */
  const getFiltered = () => {
    const place = TOURIST_PLACES.find((p) => p.key === fPlace);
    let list = HS.map((h) => ({
      ...h,
      _distance: place ? haversine(place.lat, place.lng, h.lat, h.lng) : null,
    }));
    if (place) list = [...list].sort((a, b) => a._distance - b._distance);
    return list;
  };
  const filtered = getFiltered();
  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  /* Open / close detail */
  const openDetail = (id) => {
    setDetailId(id);
    setRoomKey(null);
    document.body.style.overflow = "hidden";
    setTimeout(() => document.getElementById("khaExpDetailPage")?.scrollTo(0, 0), 50);
  };
  const closeDetail = (e) => {
    e?.preventDefault();
    setDetailId(null);
    setRoomKey(null);
    document.body.style.overflow = "";
  };

  /* Open / close room */
  const openRoom = (key) => {
    setRoomKey(key);
    setTimeout(() => document.getElementById("khaExpRoomPage")?.scrollTo(0, 0), 50);
  };
  const closeRoom = () => setRoomKey(null);

  const currentHs = HS.find((h) => h.id === detailId) || null;

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
        style={{ marginTop: "90px", height: "66vh", minHeight: "220px" }}
      >
        <div
          className="kha-ex-hero-bg absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://i.pinimg.com/1200x/42/7a/d2/427ad2ad9722ae2826a13d3e91d28df7.jpg')" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg,rgba(24,35,24,.55) 0%,rgba(24,35,24,.18) 50%,rgba(24,35,24,.88) 100%)" }}
        />
        <div className="kha-ex-hero-content relative z-[2] w-full px-16 pb-[4.5rem] flex justify-between items-end gap-8 flex-wrap">
          <div style={{ maxWidth: "560px" }}>
            <div
              className="kha-fade-1 flex items-center gap-[.6rem]"
              style={{ fontSize: ".72rem", letterSpacing: ".32em", textTransform: "uppercase", color: "#c8a96a", marginBottom: ".9rem" }}
            >
              <span style={{ width: "28px", height: "1px", background: "#c8a96a", display: "inline-block" }}></span>
              Mysuru Homestays Association
            </div>
            <h1
              className="kha-fade-2"
              style={{ fontFamily: cg, fontSize: "clamp(2.8rem,5vw,4.4rem)", fontWeight: 300, lineHeight: 1.08, color: "#fdfaf4", marginBottom: "1rem" }}
            >
              Explore{" "}
              <em style={{ fontStyle: "italic", color: "#e0c88a" }}>Every</em>{" "}
              Homestay
              <br />
              Across Mysuru, Karnataka
            </h1>
            <p
              className="kha-fade-3"
              style={{ fontSize: ".97rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(244,239,229,.72)" }}
            >
              Verified homestays across Mysuru district. Filter by region, price, amenities — then connect with hosts directly.
            </p>
          </div>
          <div className="kha-fade-4 flex gap-10 items-center">
            {[["9", "Homestays"], ["3", "Taluks"], ["2", "Regions"]].map(([num, lbl], i) => (
              <React.Fragment key={lbl}>
                {i > 0 && <div style={{ width: "1px", height: "40px", background: "rgba(200,169,106,.25)" }} />}
                <div className="text-center">
                  <span style={{ fontFamily: cg, fontSize: "2.6rem", fontWeight: 300, color: "#c8a96a", lineHeight: 1, display: "block" }}>{num}</span>
                  <span style={{ fontSize: ".65rem", letterSpacing: ".22em", textTransform: "uppercase", color: "#7a9e6e", marginTop: ".3rem", display: "block" }}>{lbl}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ════ BREADCRUMB ════ */}
      <div
        className="flex items-center gap-[.6rem] px-16 py-[.9rem]"
        style={{ background: "#1f2e1f", borderBottom: "1px solid rgba(200,169,106,.1)" }}
      >
        <a href="/" style={{ fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(244,239,229,.42)", textDecoration: "none" }}>
          Home
        </a>
        <span style={{ color: "rgba(200,169,106,.3)" }}>›</span>
        <span style={{ fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", color: "#c8a96a" }}>
          Explore Homestays
        </span>
      </div>

      {/* ════ BROWSE ════ */}
      <section className="kha-browse-section px-16 pb-20 bg-[#182318]" id="khaExpBrowse" style={{ paddingTop: "3rem" }}>

        {fPlace && (() => {
          const place = TOURIST_PLACES.find((p) => p.key === fPlace);
          return (
            <div
              className="max-w-[1300px] mx-auto mb-4 flex items-center gap-3 px-5 py-3"
              style={{ background: "rgba(200,169,106,.07)", border: "1px solid rgba(200,169,106,.2)" }}
            >
              <MapPin size={14} style={{ color: "#c8a96a", flexShrink: 0 }} />
              <span style={{ fontSize: ".82rem", color: "#c8a96a", letterSpacing: ".04em" }}>
                Showing homestays nearest to <strong>{place.label}</strong> — sorted by distance
              </span>
              <button
                onClick={() => setFPlace("")}
                style={{ marginLeft: "auto", background: "transparent", border: "none", color: "rgba(200,169,106,.55)", fontSize: ".75rem", cursor: "none", letterSpacing: ".1em", textTransform: "uppercase" }}
              >
                ✕ Clear
              </button>
            </div>
          );
        })()}

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className="max-w-[1300px] mx-auto text-center py-20">
            <h3 style={{ fontFamily: cg, fontSize: "2.4rem", fontWeight: 300, color: "#f4efe5", marginBottom: ".8rem" }}>
              No homestays found
            </h3>
            <p style={{ fontSize: ".95rem", color: "rgba(244,239,229,.5)" }}>
              Try adjusting your filters — there are wonderful stays waiting to be discovered.
            </p>
          </div>
        ) : (
          <div className="max-w-[1300px] mx-auto grid gap-6 kha-exp-card-grid">
            {visible.map((h) => (
              <HsCard key={h.id} h={h} onOpen={openDetail} distance={h._distance} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="max-w-[1300px] mx-auto text-center mt-14">
            <button
              className="kha-btn-load inline-flex items-center gap-[.8rem] px-[2.8rem] py-[.9rem] transition-all duration-300"
              style={{ border: "1px solid rgba(200,169,106,.3)", color: "#c8a96a", fontFamily: jost, fontSize: ".75rem", letterSpacing: ".22em", textTransform: "uppercase", background: "transparent", cursor: "none" }}
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
        style={{ background: "#2e4a2e", borderTop: "1px solid rgba(200,169,106,.15)", borderBottom: "1px solid rgba(200,169,106,.15)" }}
      >
        <div
          className="kha-promo-inner max-w-[1100px] mx-auto grid gap-16 items-center"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <div className="kha-reveal">
            <span className="kha-eyebrow">Why Book Through KHA</span>
            <h3 style={{ fontFamily: cg, fontSize: "2.4rem", fontWeight: 300, color: "#f4efe5", lineHeight: 1.2, marginBottom: "1rem" }}>
              Every Stay is{" "}
              <em style={{ fontStyle: "italic", color: "#e0c88a" }}>Verified</em>,
              <br />
              Every Host Trusted
            </h3>
            <div className="flex items-center gap-[.8rem] my-6">
              <div style={{ height: "1px", background: "#c8a96a", opacity: 0.35, width: "50px" }} />
              <div className="kha-divider-gem" />
              <div style={{ height: "1px", background: "#c8a96a", opacity: 0.35, width: "50px" }} />
            </div>
            <p style={{ fontSize: ".95rem", lineHeight: 1.9, color: "rgba(244,239,229,.62)", fontWeight: 300 }}>
              All homestays listed on this platform are registered, verified, and operated by honorable members of the Mysuru District Homestay Owners Association (R). Book directly — no OTA commissions, no hidden charges.
            </p>
          </div>
          <div className="kha-reveal kha-d1 flex flex-col gap-[1.1rem]">
            {[
              { icon: <Smartphone size={24} />, title: "Direct Contact, Zero Fees", desc: "No commissions. WhatsApp or website — you negotiate directly with the host." },
              { icon: <Leaf size={24} />, title: "Sustainability Committed", desc: "All MDHOA members follow responsible and eco-conscious tourism practices." },
            ].map((f) => (
              <div
                key={f.title}
                className="kha-promo-feat flex items-start gap-4 px-5 py-[1.1rem] bg-[#182318]"
                style={{ border: "1px solid rgba(200,169,106,.1)", color: "#c8a96a" }}
              >
                <span style={{ flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <span style={{ fontSize: ".8rem", letterSpacing: ".14em", textTransform: "uppercase", color: "#c8a96a", display: "block", marginBottom: ".2rem" }}>{f.title}</span>
                  <span style={{ fontSize: ".88rem", lineHeight: 1.6, color: "rgba(244,239,229,.58)" }}>{f.desc}</span>
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
                padding: ".85rem 3rem",
                display: "flex",
                alignItems: "center",
                gap: "1.2rem",
                flexWrap: "wrap",
              }}
            >
              <a href="#" className="kha-back-btn" onClick={closeDetail}>
                <ArrowLeft size={13} /> Back to Explore
              </a>
              <div style={{ width: "1px", height: "16px", background: "rgba(200,169,106,.2)", flexShrink: 0 }} />
              <div style={{ fontFamily: cg, fontSize: "1.12rem", fontWeight: 300, color: "#c8a96a" }}>
                {currentHs.name}
              </div>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: ".5rem" }}>
                <Stars rating={currentHs.rating} sz={13} />
                <span style={{ fontSize: ".84rem", color: "#c8a96a", fontWeight: 500 }}>{currentHs.rating}</span>
                <span style={{ fontSize: ".74rem", color: "rgba(244,239,229,.35)" }}>({currentHs.reviews} reviews)</span>
              </div>
            </div>

            {/* Hero strip */}
            <div style={{ position: "relative", height: "300px", overflow: "hidden" }}>
              <img
                src={currentHs.img}
                alt={currentHs.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(24,35,24,.05) 0%,rgba(24,35,24,.85) 100%)" }} />
              <div style={{ position: "absolute", bottom: "2rem", left: "3rem", right: "3rem" }}>
                <div style={{ display: "flex", gap: ".55rem", marginBottom: ".65rem", flexWrap: "wrap" }}>
                  <Badge bg="rgba(24,35,24,.72)" border="rgba(200,169,106,.38)" color="#c8a96a">{currentHs.type}</Badge>
                  {currentHs.hasWebsite ? (
                    <Badge bg="rgba(46,74,46,.82)" border="rgba(122,158,110,.42)" color="#adc49a">Has Website</Badge>
                  ) : (
                    <Badge bg="rgba(37,211,102,.15)" border="rgba(37,211,102,.4)" color="#4ade80">WhatsApp Booking</Badge>
                  )}
                </div>
                <div style={{ fontFamily: cg, fontSize: "clamp(1.8rem,4vw,2.9rem)", fontWeight: 300, color: "#fdfaf4", lineHeight: 1.1, marginBottom: ".4rem" }}>
                  {currentHs.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: ".55rem", fontSize: ".82rem", letterSpacing: ".14em", textTransform: "uppercase", color: "#adc49a" }}>
                  <MapPin size={12} />
                  {currentHs.taluk} · {currentHs.district} District, Mysore
                </div>
              </div>
            </div>

            {/* Body — two column */}
            <div
              className="dp-inner"
              style={{ maxWidth: "1350px", margin: "0 auto", padding: "3rem 3rem 6rem" }}
            >
              <div
                style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: "2.5rem", alignItems: "start" }}
                className="kha-detail-two-col"
              >
                {/* LEFT: About + Host */}
                <div style={{ position: "sticky", top: "80px" }}>
                  {/* About block */}
                  <div style={{ padding: "1.6rem 1.8rem", background: "rgba(31,46,31,.5)", border: "1px solid rgba(200,169,106,.12)", marginBottom: "1.4rem" }}>
                    <span
                      style={{ display: "inline-flex", alignItems: "center", gap: ".45rem", fontSize: ".66rem", letterSpacing: ".28em", textTransform: "uppercase", color: "#c8a96a", marginBottom: ".7rem" }}
                    >
                      <span style={{ width: "16px", height: "1px", background: "#c8a96a", display: "inline-block" }} />
                      About
                    </span>
                    <h3 style={{ fontFamily: cg, fontSize: "1.35rem", fontWeight: 300, color: "#f4efe5", marginBottom: ".3rem", lineHeight: 1.2 }}>
                      {currentHs.name}
                    </h3>
                    <p style={{ fontSize: ".78rem", letterSpacing: ".08em", color: "#7a9e6e", marginBottom: ".75rem", display: "flex", alignItems: "center", gap: ".35rem" }}>
                      <MapPin size={11} style={{ color: "#c8a96a", flexShrink: 0 }} />
                      <span>{currentHs.location}</span>
                    </p>
                    <p style={{ fontSize: ".75rem", color: "rgba(200,169,106,.7)", marginBottom: ".75rem" }}>
                      (Government of Karnataka, Dept of Tourism Approved Homestay)
                    </p>
                    <p style={{ fontSize: ".87rem", lineHeight: 1.85, color: "rgba(244,239,229,.62)", fontWeight: 300, margin: "0 0 1.1rem" }}>
                      {currentHs.desc}
                    </p>
                  </div>

                  {/* Host block */}
                  <div style={{ padding: "1.6rem 1.8rem", background: "rgba(31,46,31,.65)", border: "1px solid rgba(200,169,106,.12)" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: ".45rem", fontSize: ".66rem", letterSpacing: ".28em", textTransform: "uppercase", color: "#c8a96a", marginBottom: ".9rem" }}>
                      <span style={{ width: "16px", height: "1px", background: "#c8a96a", display: "inline-block" }} />
                      Your Host
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: ".9rem" }}>
                      <div style={{ width: "58px", height: "58px", borderRadius: "50%", border: "2px solid rgba(200,169,106,.3)", overflow: "hidden", flexShrink: 0 }}>
                        <img src={currentHs.host.avatar} alt={currentHs.host.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontFamily: cg, fontSize: "1.18rem", fontWeight: 300, color: "#f4efe5", lineHeight: 1.2 }}>{currentHs.host.name}</div>
                        <div style={{ fontSize: ".66rem", letterSpacing: ".15em", textTransform: "uppercase", color: "#7a9e6e", marginTop: ".12rem" }}>{currentHs.host.since}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: ".86rem", lineHeight: 1.8, color: "rgba(244,239,229,.58)", fontWeight: 300, margin: "0 0 1.1rem" }}>
                      {currentHs.host.desc}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: ".6rem", padding: ".7rem 1rem", background: "rgba(200,169,106,.07)", border: "1px solid rgba(200,169,106,.14)" }}>
                      <Stars rating={currentHs.rating} sz={14} />
                      <span style={{ fontSize: ".9rem", color: "#c8a96a", fontWeight: 500 }}>{currentHs.rating}</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Room heading + cards */}
                <div>
                  <div style={{ marginBottom: "1.6rem" }}>
                    <span
                      style={{ display: "inline-flex", alignItems: "center", gap: ".55rem", fontSize: ".7rem", letterSpacing: ".3em", textTransform: "uppercase", color: "#c8a96a", marginBottom: ".55rem" }}
                    >
                      <span style={{ width: "20px", height: "1px", background: "#c8a96a", display: "inline-block" }} />
                      Choose Your Room
                    </span>
                    <h2 style={{ fontFamily: cg, fontSize: "clamp(1.7rem,3vw,2.5rem)", fontWeight: 300, color: "#f4efe5", lineHeight: 1.15 }}>
                      3 Unique Stays Available
                    </h2>
                    <p style={{ fontSize: ".86rem", color: "rgba(244,239,229,.42)", marginTop: ".35rem", fontWeight: 300 }}>
                      All rooms include home-cooked meals and direct WhatsApp booking with the host family. Click any room to see full details.
                    </p>
                  </div>

                  <div style={{ height: "1px", background: "linear-gradient(to right,rgba(200,169,106,.28),transparent)", marginBottom: "1.8rem" }} />

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
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