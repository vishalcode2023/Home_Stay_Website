import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Mountain,
  Waves,
  Bird,
  Building2,
  Leaf,
  Moon,
  Coffee,
  Flame,
} from "lucide-react";
import Navbar from "./navbar";
import Footer from "../components/Footer";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  body { background: #182318; color: #f4efe5; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #182318; }
  ::-webkit-scrollbar-thumb { background: #c8a96a; }

  .tp-eyebrow { display:inline-flex; align-items:center; gap:.6rem; font-size:.72rem; letter-spacing:.32em; text-transform:uppercase; color:#c8a96a; margin-bottom:1rem; }
  .tp-eyebrow::before { content:''; width:22px; height:1px; background:#c8a96a; }

  .tp-card { transition:transform .4s,border-color .4s,box-shadow .4s; cursor:pointer; }
  .tp-card:hover { transform:translateY(-8px); border-color:rgba(200,169,106,.35) !important; box-shadow:0 24px 64px rgba(0,0,0,.4); }
  .tp-card:hover .tp-card-img { transform:scale(1.08); }
  .tp-card-img { transition:transform .7s ease; }
  .tp-card-img-wrap { border-radius:52px 52px 0 0; overflow:hidden; }
  .tp-card:hover .tp-overlay { opacity:1 !important; }

  .tp-tab { cursor:pointer; transition:all .3s; border:1px solid rgba(200,169,106,.2); }
  .tp-tab:hover { border-color:rgba(200,169,106,.5); color:#c8a96a !important; }
  .tp-tab.active { background:#c8a96a !important; color:#182318 !important; border-color:#c8a96a !important; }

  .tp-cards-grid { grid-template-columns:repeat(3,1fr); }
  @media(max-width:1024px){ .tp-cards-grid { grid-template-columns:repeat(2,1fr) !important; } }
  @media(max-width:600px){ .tp-cards-grid { grid-template-columns:1fr !important; } }
`;

const cg = "'Cormorant Garamond',serif";
const jost = "'Jost',sans-serif";

const CAT_ICONS = {
  Heritage:  <Building2 size={15} />,
  Nature:    <Leaf size={15} />,
  Wildlife:  <Bird size={15} />,
  Religious: <Moon size={15} />,
  Scenic:    <Mountain size={15} />,
  Water:     <Waves size={15} />,
  Culture:   <Coffee size={15} />,
  Adventure: <Flame size={15} />,
};

const CATEGORIES = ["All", "Heritage", "Nature", "Wildlife", "Religious", "Scenic", "Water", "Culture"];

const PLACES = [
  {
    id: 1, name: "Mysore Palace", category: "Heritage", distance: "City Centre",
    duration: "2–3 hrs", rating: 4.9, bestTime: "Oct – Mar", entry: "₹70 (Indians) · ₹200 (Foreigners)",
    tag: "Must Visit", tagBg: "rgba(200,169,106,.18)", tagBorder: "rgba(200,169,106,.5)", tagColor: "#c8a96a",
    img: "https://imgs.search.brave.com/RGts4WWjkkGrZH-EOL53RkqYeHYTNooO9TS_IrH3QL8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9iZXlv/bmRlci50cmF2ZWwv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDcvTXlzb3JlLVBh/bGFjZS1BbWJhLVZp/bGFzLTExNDB4NDQ1/LmpwZw",
  },
  {
    id: 2, name: "Chamundi Hills", category: "Religious", distance: "13 km from city",
    duration: "1–2 hrs", rating: 4.7, bestTime: "Year round", entry: "Free",
    tag: "Iconic", tagBg: "rgba(122,158,110,.15)", tagBorder: "rgba(122,158,110,.4)", tagColor: "#adc49a",
    img: "https://imgs.search.brave.com/c2ND5QOCk3pV45IoL3dRBVoI4D3G6un7NfQnItu1tOc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDY2/MzM2OTcwL3Bob3Rv/L2hpbmR1LXRlbXBs/ZS1hdC1jaGFtdW5k/aS1oaWxscy1pbi1t/eXNvcmUtaW5kaWEu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUVhN1lJc0h3ZDF0/YURWS083bFVoYmYw/UjFRdlF3YWQtbXhK/QWx3eF8tUmc9",
  },
  {
    id: 3, name: "Mysore Zoo", category: "Wildlife", distance: "2 km from palace",
    duration: "3–4 hrs", rating: 4.6, bestTime: "Oct – Feb", entry: "₹100 (Adults) · ₹50 (Children)",
    tag: "Family Favourite", tagBg: "rgba(200,169,106,.18)", tagBorder: "rgba(200,169,106,.5)", tagColor: "#c8a96a",
    img: "https://imgs.search.brave.com/Oo7rzMSqv4uvuuY6WnCBSzYFWngZJ8LvRbOQ_WUFO3w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy82/LzZmL0xpb25faW5f/TXlzb3JlX3pvb18w/MS5qcGc",
  },
  {
    id: 4, name: "KRS Dam & Brindavan Gardens", category: "Scenic", distance: "19 km from city",
    duration: "2–3 hrs", rating: 4.5, bestTime: "Oct – Jan", entry: "₹30 (Garden)",
    tag: "Romantic", tagBg: "rgba(122,158,110,.15)", tagBorder: "rgba(122,158,110,.4)", tagColor: "#adc49a",
    img: "https://imgs.search.brave.com/65uVHB1Bvz5y4BTFPi5P6K7b-HIfsArf6vUjht7Wxdk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMyLnRyaXBvdG8u/Y29tL21lZGlhL2Zp/bHRlci9ubC9pbWcv/MTQxOTE5OC9Ucmlw/RG9jdW1lbnQvMTU1/MjQ4NjExNF9pbWdf/MzM1Ni5qcGc",
  },
  {
    id: 5, name: "Nagarahole National Park", category: "Wildlife", distance: "93 km from city",
    duration: "Full day", rating: 4.8, bestTime: "Oct – May", entry: "₹300 (Indians)",
    tag: "Tiger Reserve", tagBg: "rgba(200,169,106,.28)", tagBorder: "#c8a96a", tagColor: "#fdfaf4",
    img: "https://imgs.search.brave.com/2CVE7U-yp9_A7-RZprcBj0irpCGkKkNiRVjzZXc50v0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dGlnZXJzYWZhcmlp/bmRpYS5jb20vYmxv/Zy93cC1jb250ZW50/L3VwbG9hZHMvMjAy/My8xMS9iZW5nYWwt/dGlnZXItd2Fsa2lu/Zy1pbi1OYWdhcmhv/bGUtTmF0aW9uYWwt/UGFyay5qcGc",
  },
  {
    id: 6, name: "Kabini Backwaters", category: "Water", distance: "80 km from city",
    duration: "Full day", rating: 4.9, bestTime: "Oct – May", entry: "₹500–₹2000 (boat safari)",
    tag: "Wildlife & Water", tagBg: "rgba(122,158,110,.15)", tagBorder: "rgba(122,158,110,.4)", tagColor: "#adc49a",
    img: "https://imgs.search.brave.com/oy0lEd9WLkrcKUPUmyELNUGdikYcGzJIZVuaO8xCgrk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dmFjYXRpb25pbmRp/YS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjMvMDYvMi1z/dW5zZXQtS2FiaW5p/LVJpdmVyLmpwZw",
  },
  {
    id: 7, name: "Srirangapatna", category: "Heritage", distance: "16 km from city",
    duration: "3–4 hrs", rating: 4.5, bestTime: "Oct – Mar", entry: "₹15 (Indians)",
    tag: "Historical", tagBg: "rgba(200,169,106,.18)", tagBorder: "rgba(200,169,106,.5)", tagColor: "#c8a96a",
    img: "https://imgs.search.brave.com/SgeMPasV5vdu2D8KEBp3A6MI_MxlwBh9HmjpA2kH54U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c291dGh0b3VyaXNt/LmluL2Fzc2V0cy9p/bWFnZXMvZGVzdGlu/YXRpb24va2FybmF0/YWthL3RlbXBsZXMv/c3JpcmFuZ2FwYXRu/YS10ZW1wbGUud2Vi/cA",
  },
  {
    id: 9, name: "Coorg / Madikeri", category: "Nature", distance: "120 km from city",
    duration: "2–3 days", rating: 4.8, bestTime: "Oct – Mar", entry: "Free (attractions vary)",
    tag: "Weekend Escape", tagBg: "rgba(200,169,106,.28)", tagBorder: "#c8a96a", tagColor: "#fdfaf4",
    img: "https://imgs.search.brave.com/ObYXubwqMBEG6zmfiglJEDRs2kIcgJj-W1cjYrsRsNY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbmlr/YXJlc29ydHMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI2/LzAyL0Fib3V0LWNv/b3JnLW1hZGlrZXJp/LmpwZw",
  },

];

function Stars({ rating, sz = 13 }) {
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
    <span style={{
      padding: ".28rem .85rem", fontSize: ".62rem", letterSpacing: ".18em",
      textTransform: "uppercase", background: bg, border: `1px solid ${border}`, color,
    }}>
      {children}
    </span>
  );
}

function PlaceCard({ place }) {
  return (
    <div
      className="tp-card bg-[#1f2e1f] overflow-hidden"
      style={{ border: "1px solid rgba(200,169,106,.1)" }}
    >
      <div className="tp-card-img-wrap w-full relative" style={{ aspectRatio: "4/3" }}>
        <img
          src={place.img}
          alt={place.name}
          loading="lazy"
          className="tp-card-img w-full h-full object-cover"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Category badge */}
        <div style={{ position: "absolute", top: ".9rem", left: ".9rem", zIndex: 2 }}>
          <Badge bg="rgba(24,35,24,.78)" border="rgba(200,169,106,.32)" color="#c8a96a">
            {place.category}
          </Badge>
        </div>

        {/* Distance badge */}
        <div style={{
          position: "absolute", bottom: ".9rem", right: ".9rem", zIndex: 2,
          display: "flex", alignItems: "center", gap: ".35rem",
          padding: ".28rem .75rem", fontSize: ".62rem", letterSpacing: ".1em",
          background: "rgba(24,35,24,.82)", border: "1px solid rgba(200,169,106,.32)", color: "#c8a96a",
        }}>
          <MapPin size={9} /> {place.distance}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "1.2rem 1.4rem 1.4rem", background: "#1f2e1f" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: ".35rem",
          fontSize: ".66rem", letterSpacing: ".18em", textTransform: "uppercase",
          color: "#7a9e6e", marginBottom: ".25rem",
        }}>
          {CAT_ICONS[place.category]}
          {place.category}
        </div>
        <div style={{ fontFamily: cg, fontSize: "1.48rem", fontWeight: 400, color: "#f4efe5", lineHeight: 1.2, marginBottom: ".3rem" }}>
          {place.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".75rem" }}>
          <Stars rating={place.rating} sz={12} />
          <span style={{ fontSize: ".82rem", color: "#c8a96a", fontWeight: 500 }}>{place.rating}</span>
          <span style={{ fontSize: ".7rem", color: "rgba(244,239,229,.35)", marginLeft: ".2rem" }}>
            <Clock size={10} style={{ display: "inline", marginRight: "3px", verticalAlign: "-1px" }} />{place.duration}
          </span>
        </div>
        <div style={{
          borderTop: "1px solid rgba(200,169,106,.1)", paddingTop: ".7rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: ".72rem", color: "rgba(244,239,229,.42)", letterSpacing: ".05em" }}>
            Best time: <span style={{ color: "#c8a96a" }}>{place.bestTime}</span>
          </span>
          <span style={{ fontSize: ".66rem", color: "rgba(244,239,229,.35)" }}>
            {place.entry.split("·")[0].trim()}
          </span>
        </div>
      </div>
    </div>
  );
}

const Places = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQ, setSearchQ] = useState("");

  const filtered = PLACES.filter((p) => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const searchMatch = !searchQ
      || p.name.toLowerCase().includes(searchQ.toLowerCase())
      || p.category.toLowerCase().includes(searchQ.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <>
      <style>{STYLES}</style>

      {/* Navbar renders fixed/sticky at its own z-index */}
      <Navbar />

      {/*
        Filter bar sits below the Navbar.
        Change the `top` value to match your Navbar's height.
        Common values: 64px, 70px, 80px, 90px.
      */}

      {/* Cards grid */}
      <section className="" style={{ background: "#182318", padding: "4rem 4rem 6rem" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="tp-eyebrow my-20">Discover</span>
            <h2 style={{ fontFamily: cg, fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 300, lineHeight: 1.15, color: "#f4efe5" }}>
              {activeCategory === "All" ? "All Attractions" : activeCategory + " Attractions"}{" "}
              <em style={{ fontStyle: "italic", color: "#e0c88a" }}>Near Mysore</em>
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 0" }}>
              <div style={{ fontFamily: cg, fontSize: "2rem", fontWeight: 300, color: "#f4efe5", marginBottom: ".5rem" }}>No places found</div>
              <p style={{ fontSize: ".9rem", color: "rgba(244,239,229,.4)" }}>Try a different category or search term.</p>
              <button
                onClick={() => { setActiveCategory("All"); setSearchQ(""); }}
                style={{
                  marginTop: "1rem", padding: ".6rem 1.4rem", background: "transparent",
                  border: "1px solid rgba(200,169,106,.35)", color: "#c8a96a",
                  fontFamily: jost, fontSize: ".74rem", letterSpacing: ".18em",
                  textTransform: "uppercase", cursor: "pointer",
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="tp-cards-grid" style={{ display: "grid", gap: "1.5rem" }}>
              {filtered.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Places;