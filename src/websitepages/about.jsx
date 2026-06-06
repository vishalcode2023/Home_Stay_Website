import React, { useState, useEffect, useRef, useMemo } from "react";
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

  /* Leadership profile cards */
  .kha-lead-card { transition:border-color .4s,transform .4s; }
  .kha-lead-card:hover { border-color:rgba(200,169,106,.35) !important; transform:translateY(-6px); box-shadow:0 24px 60px rgba(0,0,0,.4); }
  .kha-lead-card:hover .kha-lead-img img { transform:scale(1.05); filter:saturate(1); }
  .kha-lead-img img { filter:saturate(.8); transition:filter .5s,transform .6s; }

  /* Member cards */
  .kha-mem-card { transition:border-color .35s,transform .35s; cursor:none; }
  .kha-mem-card:hover { border-color:rgba(200,169,106,.28) !important; transform:translateY(-4px); }
  .kha-mem-stay::before { content:'🏡'; margin-right:.3rem; }
  .kha-mem-loc::before { content:'📍'; margin-right:.3rem; }

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
    .kha-stats-inner { grid-template-columns:repeat(3,1fr) !important; }
    .kha-values-grid { grid-template-columns:1fr 1fr !important; }
    .kha-lead-grid { grid-template-columns:1fr 1fr !important; }
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
    .kha-stats-inner { grid-template-columns:1fr 1fr !important; gap:0.5rem !important; }
    .kha-values-grid { grid-template-columns:1fr !important; gap:1rem !important; }
    .kha-lead-grid { grid-template-columns:1fr !important; gap:1rem !important; }
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
    .kha-lead-grid { grid-template-columns:1fr !important; }
    .kha-mem-grid { grid-template-columns:1fr !important; }
    .kha-partner-logo { font-size:0.9rem !important; padding:0.6rem !important; }
  }
`;

const cg = "'Cormorant Garamond',serif";
const jost = "'Jost',sans-serif";

/* ─── 5 Association Members ─────────────────────────────────────────────── */
const FIVE_MEMBERS = [
  {
    id: 1,
    name: "Kaveri Ponnappa",
    stay: "Misty Peaks Cottage",
    district: "Kodagu",
    taluk: "Madikeri",
    since: "2014",
    role: "Vice President",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    badges: ["Founding Member", "Eco Certified"],
  },
  {
    id: 2,
    name: "Bopanna Family",
    stay: "Riverside Amara",
    district: "Kodagu",
    taluk: "Virajpet",
    since: "2012",
    role: "Member",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    badges: ["Founding Member"],
  },
  {
    id: 3,
    name: "Ponraj & Devaki",
    stay: "Coorg Cardamom House",
    district: "Kodagu",
    taluk: "Madikeri",
    since: "2015",
    role: "Member",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80",
    badges: ["Eco Certified"],
  },
  {
    id: 4,
    name: "Thimmaiah Family",
    stay: "Kodava Heritage Home",
    district: "Kodagu",
    taluk: "Virajpet",
    since: "2017",
    role: "Member",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&q=80",
    badges: ["Heritage Certified"],
  },
  {
    id: 5,
    name: "Girija Mandanna",
    stay: "Homestay Nagarhole",
    district: "Kodagu",
    taluk: "Virajpet",
    since: "2021",
    role: "Member",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80",
    badges: ["Wildlife Zone"],
  },
];

/* ─── Divider helper ────────────────────────────────────────────────────── */
const Divider = () => (
  <div className="flex items-center gap-[.8rem] my-[1.4rem]">
    <div style={{ height: "1px", background: "#c8a96a", opacity: 0.35, width: "50px" }}></div>
    <div className="kha-div-gem"></div>
    <div style={{ height: "1px", background: "#c8a96a", opacity: 0.35, width: "50px" }}></div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════
   About Page
══════════════════════════════════════════════════════════════════════════ */
const About = () => {
  /* Cursor */
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

  /* Reveal observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".kha-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });

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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1800&q=85')" }}
        ></div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(155deg,rgba(24,35,24,.6) 0%,rgba(24,35,24,.15) 50%,rgba(24,35,24,.92) 100%)" }}
        ></div>

        <div className="kha-ab-hero-content relative z-[2] w-full px-16 pb-20">
          <div
            className="kha-ab-eyebrow kha-ab-fade1 flex items-center gap-[.6rem] mb-[.9rem]"
            style={{ fontSize: ".72rem", letterSpacing: ".32em", textTransform: "uppercase", color: "#c8a96a" }}
          >
            Established 2010 · Mysore, Karnataka
          </div>
          <h1
            className="kha-ab-fade2"
            style={{ fontFamily: cg, fontSize: "clamp(3rem,5.5vw,5rem)", fontWeight: 300, lineHeight: 1.05, color: "#fdfaf4", maxWidth: "720px", marginBottom: "1.2rem" }}
          >
            The Official Voice of
            <br />
            Mysuru{" "}
            <em style={{ fontStyle: "italic", color: "#e0c88a" }}>Homestay</em>{" "}
            Hosts
          </h1>
          <p
            className="kha-ab-fade3"
            style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(244,239,229,.7)", maxWidth: "520px" }}
          >
            A registered association representing authentic homestay operators across Mysuru district and its taluks — protecting hosts, connecting guests, and preserving local culture.
          </p>
        </div>

        <div
          className="kha-ab-fade4 absolute flex flex-col items-end gap-[.4rem] z-[2]"
          style={{ bottom: "4.5rem", right: "4rem" }}
        >
          <span style={{ fontSize: ".65rem", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(244,239,229,.42)" }}>
            Karnataka Tourism Affiliated
          </span>
        </div>
      </div>

     

    
      {/* ════════════════ PRESIDENT & SECRETARY ════════════════ */}
      <section className="px-5 py-20 bg-[#1f2e1f]">
        <div className="max-w-[1200px] -mt-15 mx-auto">
          <div className="kha-reveal mb-5">
            <span className="kha-eyebrow">Leadership</span>
            <h2
              className="kha-reveal kha-d1"
              style={{ fontFamily: cg, fontSize: "clamp(2.2rem,3.5vw,3.2rem)", fontWeight: 300, lineHeight: 1.15, color: "#f4efe5" }}
            >
              Association{" "}
              <em style={{ fontStyle: "italic", color: "#e0c88a" }}>Leadership</em>
            </h2>
            <div className="kha-reveal kha-d2"><Divider /></div>
            <p
              className="kha-reveal kha-d2"
              style={{ fontSize: ".95rem", lineHeight: 1.88, fontWeight: 300, color: "rgba(244,239,229,.58)", maxWidth: "560px" }}
            >
              The association is led by dedicated homestay owners who have committed years of service to building authentic tourism across Mysuru district.
            </p>
          </div>

          {/* President + Secretary — 2 column centered */}
          <div
            className="kha-lead-grid kha-reveal kha-d1"
            style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2rem", maxWidth: "820px", margin: "0 auto" }}
          >
            {/* President */}
            <div
              className="kha-lead-card bg-[#182318] overflow-hidden"
              style={{ border: "1px solid rgba(200,169,106,.22)" }}
            >
              {/* Gold top accent line */}
              <div style={{ height: "3px", background: "linear-gradient(to right,#c8a96a,rgba(200,169,106,.2))" }}></div>

              <div className="kha-lead-img relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img
                  src="/images/kukeprofile.png"
                  alt="President"
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top,rgba(24,35,24,.85) 0%,transparent 55%)" }}
                ></div>
                {/* Role pill over image */}
                <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                  <span
                    style={{
                      padding: ".32rem 1rem",
                      fontSize: ".6rem",
                      letterSpacing: ".22em",
                      textTransform: "uppercase",
                      background: "rgba(200,169,106,.18)",
                      border: "1px solid rgba(200,169,106,.45)",
                      color: "#c8a96a",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    President
                  </span>
                </div>
              </div>

              <div style={{ padding: "1.6rem 1.8rem 2rem" }}>
                <div
                  style={{ fontFamily: cg, fontSize: "1.65rem", fontWeight: 300, color: "#fdfaf4", lineHeight: 1.1, marginBottom: ".35rem" }}
                >
                  Mr. Nagendra N
                </div>
                <div style={{ fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase", color: "#c8a96a", marginBottom: ".9rem" }}>
                  President, MDHOA
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: ".45rem", marginBottom: "1.2rem" }}>
                  <div style={{ fontSize: ".82rem", color: "#7a9e6e", display: "flex", alignItems: "center", gap: ".45rem" }}>
                    🏡 <span>Kukkeshree Homestay</span>
                  </div>
                  <div style={{ fontSize: ".82rem", color: "rgba(244,239,229,.45)", display: "flex", alignItems: "center", gap: ".45rem" }}>
                    📍 <span>Mysuru, Karnataka</span>
                  </div>
                </div>
                <p style={{ fontSize: ".87rem", lineHeight: 1.8, color: "rgba(244,239,229,.58)", fontWeight: 300, marginBottom: "1.1rem" }}>
                  Founding member of MDHOA with 14+ years in homestay tourism, leading government advocacy and supporting member recognition through the Karnataka Tourism Department.
                </p>
                <div
                  style={{ paddingTop: ".8rem", borderTop: "1px solid rgba(200,169,106,.1)", fontSize: ".7rem", letterSpacing: ".14em", color: "rgba(200,169,106,.55)" }}
                >
                  Member since 2020 · Founding Member
                </div>
              </div>
            </div>

            {/* Secretary */}
            <div
              className="kha-lead-card bg-[#182318] overflow-hidden"
              style={{ border: "1px solid rgba(200,169,106,.14)" }}
            >
              {/* Green top accent line */}
              <div style={{ height: "3px", background: "linear-gradient(to right,#7a9e6e,rgba(122,158,110,.2))" }}></div>

              <div className="kha-lead-img relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img
                  src="/images/hon.png"
                  alt="Secretary"
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top,rgba(24,35,24,.85) 0%,transparent 55%)" }}
                ></div>
                {/* Role pill over image */}
                <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                  <span
                    style={{
                      padding: ".32rem 1rem",
                      fontSize: ".6rem",
                      letterSpacing: ".22em",
                      textTransform: "uppercase",
                      background: "rgba(122,158,110,.18)",
                      border: "1px solid rgba(122,158,110,.45)",
                      color: "#adc49a",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    Honorable Secretary
                  </span>
                </div>
              </div>

              <div style={{ padding: "1.6rem 1.8rem 2rem" }}>
                <div
                  style={{ fontFamily: cg, fontSize: "1.65rem", fontWeight: 300, color: "#fdfaf4", lineHeight: 1.1, marginBottom: ".35rem" }}
                >
                  B S Krishan Kanth
                </div>
                <div style={{ fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase", color: "#adc49a", marginBottom: ".9rem" }}>
                  Honorable Secretary, MDHOA
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: ".45rem", marginBottom: "1.2rem" }}>
                  <div style={{ fontSize: ".82rem", color: "#7a9e6e", display: "flex", alignItems: "center", gap: ".45rem" }}>
                    🏡 <span>Sky Homestay</span>
                  </div>
                  <div style={{ fontSize: ".82rem", color: "rgba(244,239,229,.45)", display: "flex", alignItems: "center", gap: ".45rem" }}>
                    📍 <span>Mysuru , Karnataka</span>
                  </div>
                </div>
                <p style={{ fontSize: ".87rem", lineHeight: 1.8, color: "rgba(244,239,229,.58)", fontWeight: 300, marginBottom: "1.1rem" }}>
                  Nanjunda handles the day-to-day operations of the association, coordinates member registrations, and liaises with government bodies to keep all listing certifications current. His homestay on the Kabini banks has been a model for responsible wildlife tourism.
                </p>
                <div
                  style={{ paddingTop: ".8rem", borderTop: "1px solid rgba(200,169,106,.1)", fontSize: ".7rem", letterSpacing: ".14em", color: "rgba(200,169,106,.55)" }}
                >
                  Member since 2009
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 5 ASSOCIATION MEMBERS ════════════════ */}
      <section className="px-16 py-24 bg-[#182318]" id="members">
        <div className="max-w-[1200px] mx-auto">
          <div className="kha-reveal mb-10">
            <span className="kha-eyebrow">Our Members</span>
            <h2
              className="kha-reveal kha-d1"
              style={{ fontFamily: cg, fontSize: "clamp(2.2rem,3.5vw,3.2rem)", fontWeight: 300, lineHeight: 1.15, color: "#f4efe5" }}
            >
              Association{" "}
              <em style={{ fontStyle: "italic", color: "#e0c88a" }}>Members</em>
            </h2>
            <div className="kha-reveal kha-d2"><Divider /></div>
            <p
              className="kha-reveal kha-d2"
              style={{ fontSize: ".95rem", lineHeight: 1.88, fontWeight: 300, color: "rgba(244,239,229,.58)", maxWidth: "600px" }}
            >
              Every person listed here has been personally verified by MDHOA and operates an authentic homestay open to guests across Mysuru district.
            </p>
          </div>

          {/* 5 member cards — 5-column grid */}
          <div
            className="kha-mem-grid kha-reveal kha-d1"
            style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1.2rem" }}
          >
            {FIVE_MEMBERS.map((m) => (
              <div
                key={m.id}
                className="kha-mem-card bg-[#1f2e1f] px-5 py-[1.4rem]"
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
                <div style={{ fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase", color: "#c8a96a", marginBottom: ".2rem" }}>
                  {m.role}
                </div>
                <div style={{ fontFamily: cg, fontSize: "1.2rem", fontWeight: 400, color: "#f4efe5", marginBottom: ".2rem", lineHeight: 1.2 }}>
                  {m.name}
                </div>
                <div className="kha-mem-stay" style={{ fontSize: ".78rem", color: "#7a9e6e", marginBottom: ".3rem" }}>
                  {m.stay}
                </div>
                <div className="kha-mem-loc" style={{ fontSize: ".75rem", color: "rgba(244,239,229,.42)", marginBottom: ".6rem" }}>
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
                  style={{ fontSize: ".68rem", letterSpacing: ".12em", color: "rgba(200,169,106,.5)", paddingTop: ".6rem", borderTop: "1px solid rgba(200,169,106,.1)" }}
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
        "/mha.jpg",
        "/gov-logo.png",
        "/image.png",
        "/mysurubrand.png",
      ].map((logo, index) => (
        <div
          key={index}
          className="kha-partner-logo px-9 py-5 flex items-center justify-center"
          style={{
            border: "1px solid rgba(200,169,106,.15)",
            background: "rgba(31,46,31,.5)",
          }}
        >
          <img
            src={logo}
            alt="Partner Logo"
            className="h-25 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-300"
          />
        </div>
      ))}
    </div>
  </div>
</div>

    {/* ════════════════ VALUES ════════════════ */}
      <section className="px-16 py-24 bg-[#182318]">
        <div className="max-w-[1200px] mx-auto">
          <div className="kha-reveal text-center mb-16">
            <span className="kha-eyebrow">What We Stand For</span>
            <h2
              style={{ fontFamily: cg, fontSize: "clamp(2.2rem,3.5vw,3.2rem)", fontWeight: 300, lineHeight: 1.15, color: "#f4efe5", marginTop: ".5rem" }}
            >
              Four Principles That{" "}
              <em style={{ fontStyle: "italic", color: "#e0c88a" }}>Guide</em>{" "}
              Everything We Do
            </h2>
          </div>
          <div
            className="kha-values-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.2rem" }}
          >
            {[
              { delay: "", icon: "🌿", title: "Authenticity First", desc: "We list only genuine homestays — homes where a family actually lives. No resort-style properties masquerading as homestays. Every listing is personally verified by KHA before it goes live." },
              { delay: " kha-d1", icon: "🤝", title: "Host Empowerment", desc: "We advocate for homestay operators' rights, provide training and support, and ensure fair representation in state tourism policy. A host with only a WhatsApp number deserves the same platform." },
              { delay: " kha-d2", icon: "♻️", title: "Sustainable Tourism", desc: "All KHA members commit to responsible tourism practices — minimal plastic, local hiring, community benefit and low environmental impact. We reject tourism that damages the landscapes guests come to experience." },
              { delay: " kha-d3", icon: "🏛️", title: "Cultural Preservation", desc: "Karnataka's regional cultures — Kodava, Tulu, Havyaka, Malnad — are lived in our member homes. We believe tourism should strengthen these traditions, not flatten them for commercial palatability." },
            ].map((v) => (
              <div
                key={v.title}
                className={`kha-val-card kha-reveal${v.delay} px-[1.8rem] py-[2.2rem]`}
                style={{ border: "1px solid rgba(200,169,106,.12)", background: "rgba(31,46,31,.5)" }}
              >
                <span style={{ fontSize: "2.4rem", display: "block", marginBottom: "1.2rem" }}>{v.icon}</span>
                <div style={{ fontFamily: cg, fontSize: "1.4rem", fontWeight: 400, color: "#f4efe5", marginBottom: ".6rem" }}>{v.title}</div>
                <p style={{ fontSize: ".88rem", lineHeight: 1.8, color: "rgba(244,239,229,.58)", fontWeight: 300 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      

      <Footer cg={cg} />
    </>
  );
};

export default About;