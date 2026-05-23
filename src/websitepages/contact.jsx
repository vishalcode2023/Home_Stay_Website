import React, { useState, useEffect, useRef } from 'react';
import FloatBookButton from "../components/FloatBookButton";
import Navbar from '../websitepages/navbar';
import Footer from '../components/Footer';
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Building2,
  Clock,
  ChevronRight,
  Calendar,
  Home,
  HelpCircle,
  Newspaper,
  Handshake,
  Award,
  Star,
  MoreHorizontal,
  Leaf,
  ArrowRight,
  ExternalLink
} from "lucide-react";

import {
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaFacebookF
} from "react-icons/fa";

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

  /* Hero */
  @keyframes khaCtHeroZoom { to { transform:scale(1); } }
  .kha-ct-hero-bg { animation:khaCtHeroZoom 12s ease forwards; transform:scale(1.06); }
  @keyframes khaCtFadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:none; } }
  .kha-ct-fade1 { opacity:0; animation:khaCtFadeUp .9s .3s forwards; }
  .kha-ct-fade2 { opacity:0; animation:khaCtFadeUp .9s .5s forwards; }
  .kha-ct-fade3 { opacity:0; animation:khaCtFadeUp .9s .7s forwards; }

  /* Hero eyebrow */
  .kha-ct-eyebrow::before { content:''; width:28px; height:1px; background:#c8a96a; flex-shrink:0; }

  /* Generic eyebrow */
  .kha-eyebrow { display:inline-flex; align-items:center; gap:.6rem; font-size:.72rem; letter-spacing:.32em; text-transform:uppercase; color:#c8a96a; margin-bottom:1rem; }
  .kha-eyebrow::before { content:''; width:22px; height:1px; background:#c8a96a; }

  /* Divider gem */
  .kha-div-gem { width:5px; height:5px; background:#c8a96a; transform:rotate(45deg); }

  /* Quick reach */
  .kha-qr-item { transition:background .3s; cursor:none; text-decoration:none; }
  .kha-qr-item:hover { background:rgba(200,169,106,.06) !important; }

  /* Form inputs */
  .kha-form-input, .kha-form-select, .kha-form-textarea {
    background:transparent; border:none; border-bottom:1px solid rgba(200,169,106,.28);
    color:#f4efe5; font-family:'Jost',sans-serif; font-size:.92rem;
    padding:.75rem 0; outline:none; transition:border-color .3s; cursor:none; width:100%;
  }
  .kha-form-input::placeholder, .kha-form-textarea::placeholder { color:rgba(244,239,229,.28); }
  .kha-form-input:focus, .kha-form-select:focus, .kha-form-textarea:focus { border-color:rgba(200,169,106,.7); }
  .kha-form-select {
    appearance:none; -webkit-appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c8a96a' stroke-width='1.5'/%3E%3C/svg%3E");
    background-repeat:no-repeat; background-position:right .4rem center; background-size:12px; padding-right:1.8rem;
  }
  .kha-form-select option { background:#1f2e1f; color:#f4efe5; }
  .kha-form-textarea {
    resize:vertical; min-height:140px; border:1px solid rgba(200,169,106,.18);
    background:rgba(24,35,24,.45); padding:.9rem 1rem; margin-top:.1rem;
  }
  .kha-form-textarea:focus { border-color:rgba(200,169,106,.45); }

  /* Input focus line */
  .kha-form-group { position:relative; }
  .kha-input-line { position:absolute; bottom:0; left:0; width:0; height:1px; background:#c8a96a; transition:width .4s ease; }
  .kha-form-group:focus-within .kha-input-line { width:100%; }

  /* Subject pills */
  .kha-spill { padding:.38rem 1rem; border:1px solid rgba(200,169,106,.2); color:rgba(244,239,229,.52); font-size:.7rem; letter-spacing:.13em; text-transform:uppercase; background:transparent; cursor:none; transition:all .3s; }
  .kha-spill.selected, .kha-spill:hover { border-color:#c8a96a; color:#c8a96a; background:rgba(200,169,106,.08); }

  /* Submit btn */
  .kha-btn-submit { transition:background .3s, transform .3s; cursor:none; }
  .kha-btn-submit:hover { background:#e0c88a !important; transform:translateY(-2px); }
  .kha-btn-submit:hover .kha-arrow { transform:translateX(4px); }
  .kha-arrow { transition:transform .3s; display:inline-block; }

  /* Info card hover */
  .kha-info-card { transition:border-color .35s; }
  .kha-info-card:hover { border-color:rgba(200,169,106,.32) !important; }

  /* ic-link arrow */
  .kha-ic-link { display:inline-flex; align-items:center; gap:.5rem; margin-top:.9rem; font-size:.75rem; letter-spacing:.18em; text-transform:uppercase; color:#c8a96a; text-decoration:none; transition:gap .3s; }
  .kha-ic-link::after { content:''; width:22px; height:1px; background:#c8a96a; transition:width .3s; }
  .kha-ic-link:hover { gap:.8rem; }
  .kha-ic-link:hover::after { width:36px; }

  /* WhatsApp card */
  .kha-wa-btn:hover { background:rgba(37,211,102,.3) !important; }

  /* Map */
  .kha-map-bg-pattern { position:absolute; inset:0; opacity:.04; background-image:repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(200,169,106,1) 40px,rgba(200,169,106,1) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(200,169,106,1) 40px,rgba(200,169,106,1) 41px); }
  .kha-map-open-btn:hover { border-color:#c8a96a !important; background:rgba(200,169,106,.09) !important; }

  /* Regional cards */
  .kha-reg-card { transition:border-color .4s, transform .4s; }
  .kha-reg-card:hover { border-color:rgba(200,169,106,.3) !important; transform:translateY(-5px); }
  .kha-rcc-wa:hover { background:rgba(37,211,102,.22) !important; }

  /* FAQ */
  .kha-faq-item { border:1px solid rgba(200,169,106,.12); overflow:hidden; transition:border-color .3s; }
  .kha-faq-item.open { border-color:rgba(200,169,106,.3); }
  .kha-faq-toggle { width:28px; height:28px; border:1px solid rgba(200,169,106,.25); flex-shrink:0; display:flex; align-items:center; justify-content:center; color:#c8a96a; font-size:1.1rem; transition:transform .35s, background .3s; }
  .kha-faq-item.open .kha-faq-toggle { transform:rotate(45deg); background:rgba(200,169,106,.1); }
  .kha-faq-a { max-height:0; overflow:hidden; transition:max-height .45s ease; }
  .kha-faq-item.open .kha-faq-a { max-height:300px; }

  /* Social */
  .kha-s-btn { transition:all .3s; cursor:none; }
  .kha-s-btn:hover { border-color:#c8a96a !important; color:#c8a96a !important; background:rgba(200,169,106,.07) !important; }

  /* Footer */
  .kha-footer-link:hover { color:#c8a96a !important; }
  .kha-breadcrumb-link:hover { color:#c8a96a !important; }

  /* Reveal */
  .kha-reveal { opacity:0; transform:translateY(36px); transition:opacity .85s ease,transform .85s ease; }
  .kha-reveal.in { opacity:1; transform:translateY(0); }
  .kha-d1{transition-delay:.12s;} .kha-d2{transition-delay:.24s;} .kha-d3{transition-delay:.36s;} .kha-d4{transition-delay:.48s;}

  @media(max-width:900px){
    .kha-contact-grid { grid-template-columns:1fr !important; }
    .kha-contact-sidebar { position:static !important; }
    .kha-form-row2 { grid-template-columns:1fr !important; }
    .kha-qr-inner { grid-template-columns:1fr 1fr !important; }
    .kha-qr-item-border { border-right:none !important; border-bottom:1px solid rgba(200,169,106,.1) !important; }
    .kha-regional-grid { grid-template-columns:1fr 1fr !important; }
    .kha-footer-grid { grid-template-columns:1fr 1fr !important; }
    .kha-social-inner { flex-direction:column; align-items:flex-start; }
  }
  @media(max-width:600px){
    .kha-qr-inner { grid-template-columns:1fr !important; }
    .kha-regional-grid { grid-template-columns:1fr !important; }
    .kha-hero-px { padding-left:1.5rem !important; padding-right:1.5rem !important; }
    .kha-section-px { padding-left:1.25rem !important; padding-right:1.25rem !important; }
    .kha-breadcrumb-px { padding-left:1.25rem !important; padding-right:1.25rem !important; }
    .kha-social-px { padding-left:1.5rem !important; padding-right:1.5rem !important; }
    .kha-map-px { padding-left:1.25rem !important; padding-right:1.25rem !important; }
    .kha-map-overlay { flex-direction:column !important; align-items:flex-start !important; gap:0.75rem !important; }
    .kha-sidebar-gap { gap:1rem !important; }
    .kha-form-pills { gap:0.4rem !important; }
    .kha-submit-row { flex-direction:column !important; align-items:stretch !important; }
    .kha-submit-row button { width:100% !important; justify-content:center !important; }
    .kha-hero-h1 { font-size:2.4rem !important; }
    .kha-hero-height { height:80vw !important; min-height:340px !important; }
    .kha-hero-pb { padding-bottom:2.5rem !important; }
    .kha-qr-icon { font-size:1.5rem !important; }
    .kha-qr-px { padding-left:1.25rem !important; padding-right:1.25rem !important; padding-top:1.4rem !important; padding-bottom:1.4rem !important; }
    .kha-faq-px { padding-left:1rem !important; padding-right:1rem !important; }
    .kha-section-py { padding-top:3.5rem !important; padding-bottom:3.5rem !important; }
    .kha-sidebar-card-px { padding-left:1.25rem !important; padding-right:1.25rem !important; padding-top:1.5rem !important; padding-bottom:1.5rem !important; }
    .kha-s-btn-wrap { flex-direction:column !important; width:100%; }
    .kha-s-btn { width:100% !important; justify-content:center !important; }
  }
`;

const cg   = "'Cormorant Garamond',serif";
const jost = "'Jost',sans-serif";

/* ─── Divider helper ────────────────────────────────────────────────────── */
const Divider = () => (
  <div className="flex items-center gap-[.8rem] my-[1.4rem]">
    <div style={{ height:'1px', background:'#c8a96a', opacity:.35, width:'50px' }}></div>
    <div className="kha-div-gem"></div>
    <div style={{ height:'1px', background:'#c8a96a', opacity:.35, width:'50px' }}></div>
  </div>
);

/* ─── FAQ Item ──────────────────────────────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`kha-faq-item${open ? ' open' : ''}`}>
      <div className="flex justify-between items-center px-[1.8rem] py-[1.4rem] gap-4 cursor-none kha-faq-px"
        onClick={() => setOpen(o => !o)}>
        <span style={{ fontSize:'.95rem', fontWeight:400, color:'#f4efe5', lineHeight:1.5 }}>{q}</span>
        <div className="kha-faq-toggle">+</div>
      </div>
      <div className="kha-faq-a">
        <div style={{ padding:'0 1.8rem 1.4rem', fontSize:'.9rem', lineHeight:1.9, color:'rgba(244,239,229,.62)', fontWeight:300 }}>{a}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Contact Page
══════════════════════════════════════════════════════════════════════════ */
const Contact = () => {
  /* Cursor */
  const curRef = useRef(null), curFRef = useRef(null);
  const cxRef = useRef(0), cyRef = useRef(0), fxRef = useRef(0), fyRef = useRef(0);
  useEffect(() => {
    const onMove = e => {
      cxRef.current = e.clientX; cyRef.current = e.clientY;
      if (curRef.current) { curRef.current.style.left = e.clientX+'px'; curRef.current.style.top = e.clientY+'px'; }
    };
    document.addEventListener('mousemove', onMove);
    let raf;
    const tick = () => {
      fxRef.current += (cxRef.current - fxRef.current) * .11;
      fyRef.current += (cyRef.current - fyRef.current) * .11;
      if (curFRef.current) { curFRef.current.style.left = fxRef.current+'px'; curFRef.current.style.top = fyRef.current+'px'; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  /* Reveal observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: .1 }
    );
    document.querySelectorAll('.kha-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  /* Form state */
  const [fName,     setFName]     = useState('');
  const [fEmail,    setFEmail]    = useState('');
  const [fPhone,    setFPhone]    = useState('');
  const [fWho,      setFWho]      = useState('');
  const [fSubject,  setFSubject]  = useState('');
  const [fMsg,      setFMsg]      = useState('');
  const [fSource,   setFSource]   = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = () => {
    if (!fName.trim())                        { setFormError('Please enter your name.'); return; }
    if (!fEmail.trim() || !fEmail.includes('@')) { setFormError('Please enter a valid email address.'); return; }
    if (fMsg.trim().length < 20)              { setFormError('Please write a message of at least 20 characters.'); return; }
    setFormError('');
    setSubmitted(true);
    window.scrollTo({ top: document.getElementById('khaContact')?.offsetTop - 80, behavior:'smooth' });
  };

  const SUBJECTS = [
    { icon:<Calendar size={13} />, label:'Booking Help' },
    { icon:<Home size={13} />, label:'List My Homestay' },
    { icon:<MessageCircle size={13} />, label:'General Enquiry' },
    { icon:<Newspaper size={13} />, label:'Press / Media' },
    { icon:<Handshake size={13} />, label:'Partnership' },
    { icon:<Award size={13} />, label:'Member Support' },
    { icon:<Star size={13} />, label:'Feedback' },
    { icon:<MoreHorizontal size={13} />, label:'Other' },
  ];

  const QUICK_REACH = [
    { href:'https://wa.me/919480000000', icon:<MessageCircle size={28} color="#c8a96a" />, label:'WhatsApp',         value:'+91 94800 00000',   sub:'Fastest response · Mon–Sat' },
    { href:'mailto:hello@kha.org.in',    icon:<Mail size={28} color="#c8a96a" />, label:'Email',            value:'hello@kha.org.in',   sub:'We reply within 24 hours' },
    { href:'tel:08022000000',            icon:<Phone size={28} color="#c8a96a" />, label:'Office Phone',     value:'080 2200 0000',       sub:'Mon–Fri · 10am–5:30pm IST' },
    { href:null,                          icon:<MapPin size={28} color="#c8a96a" />, label:'Registered Office',value:'Mysore, Karnataka',  sub:'No. 12, Sayyaji Rao Road · 570001' },
  ];

  const REGIONAL = [
  {
    region: "Mysuru City",
    name: "Ramesh Gowda",
    role: "City Representative — Mysuru",
    districts: "Covers: Mysuru City homestays & heritage stays",
    wa: "https://wa.me/919480100001",
    email: "mysuru@kha.org.in",
    delay: ""
  },
  {
    region: "H.D. Kote / Kabini",
    name: "Nanjunda Gowda",
    role: "Wildlife Region Representative",
    districts: "Covers: H.D. Kote · Kabini · Saragur",
    wa: "https://wa.me/919480100002",
    email: "kabini@kha.org.in",
    delay: " kha-d1"
  },
  {
    region: "Hunsur",
    name: "Mahadev",
    role: "Taluk Representative — Hunsur",
    districts: "Covers: Hunsur rural homestays",
    wa: "https://wa.me/919480100003",
    email: "hunsur@kha.org.in",
    delay: " kha-d2"
  },
  {
    region: "Nanjangud",
    name: "Shivanna",
    role: "Taluk Representative — Nanjangud",
    districts: "Covers: Nanjangud farm & heritage stays",
    wa: "https://wa.me/919480100004",
    email: "nanjangud@kha.org.in",
    delay: ""
  },
  {
    region: "T. Narasipura",
    name: "Prakash",
    role: "Taluk Representative — T. Narasipura",
    districts: "Covers: T. Narasipura river & village stays",
    wa: "https://wa.me/919480100005",
    email: "tnarasipura@kha.org.in",
    delay: " kha-d1"
  },
  {
    region: "Head Office",
    name: "KHA Office",
    role: "Association Support Desk",
    districts: "Membership · Partnerships · Media · General Enquiries",
    wa: "https://wa.me/919480000000",
    email: "info@kha.org.in",
    delay: " kha-d2"
  }
];

  const FAQS = [
    { q:'How do I book a homestay through KHA? Do I pay MHA directly?', a:"KHA does not handle bookings or accept payments. We are a directory and verification body. You connect directly with the homestay owner — either through their website or via WhatsApp — and negotiate dates, pricing and payment with them personally. We take zero commission. This means 100% of your payment goes to the host family." },
    { q:'I own a homestay in Karnataka. How do I get listed on KHA?', a:"WhatsApp our registration team at +91 94800 00000 or email register@kha.org.in with a brief description of your homestay and your location. A KHA representative in your region will contact you within 2–3 working days. We do a physical verification visit before listing. There is no website required — WhatsApp-only operators are fully welcome." },
    { q:'Is there a fee to be a KHA member?', a:"KHA membership requires a one-time registration fee and an annual renewal fee, both of which go toward maintaining this platform, conducting verification visits and running member support programmes. Fees are kept deliberately low to ensure all host families — regardless of property size — can afford membership. Contact us for current fee schedules." },
    { q:'How are homestays verified? What does KHA check?', a:"Every KHA member property receives a physical inspection visit from a regional representative before listing. We verify that a family actually lives on the property, that basic safety and hygiene standards are met, that the host has local government registration, and that the listing details are accurate. We re-verify annually and remove any property that no longer meets our standards." },
    { q:'Can I review a homestay on the KHA platform?', a:"Yes — visit our Experiences page and fill in the submission form at the bottom. Your review will go through a 48-hour verification process (we confirm you stayed there) before going live. We do not edit the content of reviews. Negative reviews are published as long as they are factual and not defamatory." },
    { q:"I'm a journalist writing about Karnataka tourism. Who should I contact?", a:"Email press@kha.org.in with your publication, your brief and your deadline. Our president Suresh Muthappa and general secretary Nanjunda Gowda are both available for interviews. We can also arrange visits to member homestays and connect you with host families for feature stories. We have a dedicated media kit available on request." },
    { q:"A homestay I stayed at isn't listed on KHA. Can I nominate it?", a:"Absolutely — we welcome guest nominations. WhatsApp or email us the name, location and contact details of the homestay. We'll reach out to the owner and invite them to register. If they meet our verification standards, they'll be listed within 2–4 weeks. You'll be notified when they go live." },
  ];

  const HOURS = [
    { day:'Monday – Friday',  time:'10:00am – 5:30pm IST', open:true  },
    { day:'Saturday',          time:'10:00am – 2:00pm IST',  open:true  },
    { day:'Sunday',            time:'Closed',                open:false },
    { day:'Public Holidays',   time:'Closed',                open:false },
  ];

  return (
    <>
      <style>{STYLES}</style>
      <div className="kha-cur"  ref={curRef}></div>
      <div className="kha-cuf"  ref={curFRef}></div>

      <Navbar />
      <FloatBookButton />

      {/* ════════════════ HERO ════════════════ */}
      <div className="kha-hero-height relative overflow-hidden flex items-end" style={{ marginTop:'85px', height:'68vh', minHeight:'500px' }}>
        <div className="kha-ct-hero-bg absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage:"url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1800&q=85')" }}></div>
        <div className="absolute inset-0" style={{ background:'linear-gradient(150deg,rgba(24,35,24,.65) 0%,rgba(24,35,24,.2) 50%,rgba(24,35,24,.9) 100%)' }}></div>
        <div className="kha-hero-px kha-hero-pb relative z-[2] w-full px-16 pb-20">
          <div className="kha-ct-eyebrow kha-ct-fade1 flex items-center gap-[.6rem] mb-[.9rem]"
            style={{ fontSize:'.72rem', letterSpacing:'.32em', textTransform:'uppercase', color:'#c8a96a' }}>
            We're Here to Help
          </div>
          <h1 className="kha-ct-fade2 kha-hero-h1" style={{ fontFamily:cg, fontSize:'clamp(3rem,5.5vw,5rem)', fontWeight:300, lineHeight:1.06, color:'#fdfaf4', marginBottom:'1rem' }}>
            Get in <em style={{ fontStyle:'italic', color:'#e0c88a' }}>Touch</em><br />With MHA
          </h1>
          <p className="kha-ct-fade3" style={{ fontSize:'.97rem', fontWeight:300, lineHeight:1.82, color:'rgba(244,239,229,.7)', maxWidth:'500px' }}>
            Whether you're a guest with a question, a homestay owner looking to join, or a journalist seeking comment — we respond to every message within 24 hours.
          </p>
        </div>
      </div>

      {/* ════════════════ BREADCRUMB ════════════════ */}
      <div className="kha-breadcrumb-px flex items-center gap-[.6rem] px-16 py-[.9rem]" style={{ background:'#1f2e1f', borderBottom:'1px solid rgba(200,169,106,.1)' }}>
        <a href="/" className="kha-breadcrumb-link transition-colors duration-300" style={{ fontSize:'.72rem', letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(244,239,229,.42)', textDecoration:'none' }}>Home</a>
        <span style={{ color:'rgba(200,169,106,.3)' }}>›</span>
        <span style={{ fontSize:'.72rem', letterSpacing:'.14em', textTransform:'uppercase', color:'#c8a96a' }}>Contact Us</span>
      </div>

      {/* ════════════════ QUICK REACH ════════════════ */}
      <div style={{ background:'#2e4a2e', borderTop:'1px solid rgba(200,169,106,.15)', borderBottom:'1px solid rgba(200,169,106,.15)' }}>
        <div className="kha-qr-inner max-w-[1300px] mx-auto" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
          {QUICK_REACH.map((item, i) => {
            const Tag = item.href ? 'a' : 'div';
            return (
              <Tag key={item.label} href={item.href} target={item.href?.startsWith('http') ? '_blank' : undefined}
                className={`kha-qr-item kha-qr-item-border kha-qr-px flex items-center gap-5 px-8 py-[2.2rem]`}
                style={{ borderRight: i < 3 ? '1px solid rgba(200,169,106,.12)' : 'none' }}>
                <span className="kha-qr-icon" style={{ fontSize:'2rem', flexShrink:0, display:'flex', alignItems:'center' }}>{item.icon}</span>
                <div>
                  <span style={{ fontSize:'.65rem', letterSpacing:'.22em', textTransform:'uppercase', color:'#7a9e6e', display:'block', marginBottom:'.2rem' }}>{item.label}</span>
                  <span style={{ fontSize:'.95rem', color:'#f4efe5', fontWeight:400, display:'block' }}>{item.value}</span>
                  <small style={{ fontSize:'.75rem', color:'rgba(244,239,229,.42)', display:'block', marginTop:'.1rem' }}>{item.sub}</small>
                </div>
              </Tag>
            );
          })}
        </div>
      </div>

      {/* ════════════════ MAIN CONTACT ════════════════ */}
      <section className="kha-section-px kha-section-py px-16 py-24 bg-[#1f2e1f]" id="khaContact">
        <div className="kha-contact-grid max-w-[1200px] mx-auto grid gap-20 items-start" style={{ gridTemplateColumns:'1fr 420px' }}>

          {/* ── Form side ── */}
          <div>
            <span className="kha-eyebrow kha-reveal">Send a Message</span>
            <h2 className="kha-reveal kha-d1" style={{ fontFamily:cg, fontSize:'clamp(2rem,3.4vw,3rem)', fontWeight:300, lineHeight:1.15, color:'#f4efe5' }}>
              We'd Love to <em style={{ fontStyle:'italic', color:'#e0c88a' }}>Hear</em><br />From You
            </h2>
            <div className="kha-reveal kha-d2"><Divider /></div>
            <p className="kha-reveal kha-d2" style={{ fontSize:'.92rem', lineHeight:1.9, color:'rgba(244,239,229,.6)', fontWeight:300, marginBottom:'2.5rem' }}>
              Fill in the form and we'll get back to you within 24 hours. For the quickest response — especially for homestay bookings — use the WhatsApp button instead.
            </p>

            {submitted ? (
              /* Success box */
              <div className="kha-reveal text-center px-12 py-12" style={{ background:'rgba(46,74,46,.35)', border:'1px solid rgba(122,158,110,.3)' }}>
                <span style={{ fontSize:'3.5rem', display:'flex', justifyContent:'center', marginBottom:'1rem' }}><Leaf size={56} color="#7a9e6e" /></span>
                <h3 style={{ fontFamily:cg, fontSize:'2.2rem', fontWeight:300, color:'#f4efe5', marginBottom:'.6rem' }}>Message received — thank you</h3>
                <p style={{ fontSize:'.92rem', lineHeight:1.85, color:'rgba(244,239,229,.58)' }}>We'll get back to you at the email you provided within 24 hours. If your query is urgent, please WhatsApp us directly at +91 94800 00000 — we typically respond within the hour during office hours.</p>
              </div>
            ) : (
              <div className="kha-reveal kha-d2">
                {/* Row 1 */}
                <div className="kha-form-row2 grid gap-6 mb-6" style={{ gridTemplateColumns:'1fr 1fr' }}>
                  <div className="kha-form-group">
                    <label style={{ fontSize:'.68rem', letterSpacing:'.24em', textTransform:'uppercase', color:'#c8a96a', opacity:.9, marginBottom:'.42rem', display:'block' }}>Your Full Name</label>
                    <input className="kha-form-input" type="text" placeholder="As you'd like us to address you" value={fName} onChange={e => setFName(e.target.value)} />
                    <div className="kha-input-line"></div>
                  </div>
                  <div className="kha-form-group">
                    <label style={{ fontSize:'.68rem', letterSpacing:'.24em', textTransform:'uppercase', color:'#c8a96a', opacity:.9, marginBottom:'.42rem', display:'block' }}>Email Address</label>
                    <input className="kha-form-input" type="email" placeholder="We'll reply here" value={fEmail} onChange={e => setFEmail(e.target.value)} />
                    <div className="kha-input-line"></div>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="kha-form-row2 grid gap-6 mb-6" style={{ gridTemplateColumns:'1fr 1fr' }}>
                  <div className="kha-form-group">
                    <label style={{ fontSize:'.68rem', letterSpacing:'.24em', textTransform:'uppercase', color:'#c8a96a', opacity:.9, marginBottom:'.42rem', display:'block' }}>Phone / WhatsApp</label>
                    <input className="kha-form-input" type="tel" placeholder="+91 …" value={fPhone} onChange={e => setFPhone(e.target.value)} />
                    <div className="kha-input-line"></div>
                  </div>
                  <div className="kha-form-group">
                    <label style={{ fontSize:'.68rem', letterSpacing:'.24em', textTransform:'uppercase', color:'#c8a96a', opacity:.9, marginBottom:'.42rem', display:'block' }}>You Are a…</label>
                    <select className="kha-form-select" value={fWho} onChange={e => setFWho(e.target.value)}>
                      <option value="">Select…</option>
                      {['Guest / Traveller','Homestay Owner','Journalist / Media','Government / Official','Partnership / Brand','Researcher / Student','Other'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                {/* Subject pills */}
                <div className="mb-6">
                  <label style={{ fontSize:'.68rem', letterSpacing:'.24em', textTransform:'uppercase', color:'#c8a96a', opacity:.9, display:'block', marginBottom:'.9rem' }}>What Is Your Message About?</label>
                  <div className="kha-form-pills flex gap-2 flex-wrap">
                    {SUBJECTS.map(s => (
                      <button key={s.label}
                        className={`kha-spill${fSubject === s.label ? ' selected' : ''}`}
                        onClick={() => setFSubject(s.label)}>
                        <span style={{ display:'inline-flex', alignItems:'center', gap:'0.3rem' }}>{s.icon} {s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label style={{ fontSize:'.68rem', letterSpacing:'.24em', textTransform:'uppercase', color:'#c8a96a', opacity:.9, display:'block', marginBottom:'.42rem' }}>Your Message</label>
                  <textarea className="kha-form-textarea" rows="6"
                    placeholder="Tell us everything we need to know to help you well. For booking queries, mention the homestay name and your preferred dates."
                    value={fMsg}
                    onChange={e => { if (e.target.value.length <= 1200) setFMsg(e.target.value); }}>
                  </textarea>
                  <div style={{ fontSize:'.7rem', color:'rgba(244,239,229,.28)', textAlign:'right', marginTop:'.3rem' }}>{fMsg.length} / 1200</div>
                </div>

                {/* How did you hear */}
                <div className="mb-8">
                  <label style={{ fontSize:'.68rem', letterSpacing:'.24em', textTransform:'uppercase', color:'#c8a96a', opacity:.9, display:'block', marginBottom:'.5rem' }}>How Did You Hear About KHA?</label>
                  <select className="kha-form-select" value={fSource} onChange={e => setFSource(e.target.value)}>
                    <option value="">Select…</option>
                    {['Google Search','Instagram / Social Media','Friend or Family','Travel Blog','Karnataka Tourism','Direct from a Homestay','Other'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>

                {/* Error */}
                {formError && <p style={{ fontSize:'.82rem', color:'#f87171', marginBottom:'1rem' }}>{formError}</p>}

                {/* Submit */}
                <div className="kha-submit-row flex items-center justify-between gap-6 flex-wrap mt-8">
                  <p style={{ fontSize:'.78rem', color:'rgba(244,239,229,.35)', lineHeight:1.7, maxWidth:'280px' }}>We do not share your information with third parties. Every message is read by a real person.</p>
                  <button className="kha-btn-submit inline-flex items-center gap-[.8rem] px-[2.8rem] py-4 font-semibold flex-shrink-0"
                    style={{ background:'#c8a96a', color:'#182318', fontFamily:jost, fontSize:'.78rem', letterSpacing:'.22em', textTransform:'uppercase', border:'none' }}
                    onClick={handleSubmit}>
                    Send Message <span className="kha-arrow"><ArrowRight size={16} /></span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="kha-contact-sidebar kha-sidebar-gap" style={{ position:'sticky', top:'100px', display:'flex', flexDirection:'column', gap:'1.2rem' }}>

            {/* WhatsApp card */}
            <div className="kha-reveal kha-sidebar-card-px" style={{ background:'rgba(37,211,102,.1)', border:'1px solid rgba(37,211,102,.28)', padding:'2rem 2.2rem' }}>
              <div className="flex items-center gap-[.8rem] mb-[.8rem]">
                <span style={{ fontSize:'2rem', display:'flex', alignItems:'center' }}><MessageCircle size={32} color="#4ade80" /></span>
                <div>
                  <span style={{ fontSize:'.68rem', letterSpacing:'.22em', textTransform:'uppercase', color:'#4ade80', display:'block' }}>Fastest Way to Reach Us</span>
                  <span style={{ fontSize:'1.05rem', color:'#f4efe5', display:'block' }}>WhatsApp MHA Directly</span>
                </div>
              </div>
              <p style={{ fontSize:'.85rem', lineHeight:1.75, color:'rgba(244,239,229,.52)', marginBottom:'1.2rem' }}>For booking questions, listing enquiries or anything time-sensitive — WhatsApp is staffed during office hours and usually answered within the hour.</p>
              <a href="https://wa.me/919480000000?text=Hello%20KHA%2C%20I%20have%20a%20question%20about%20Karnataka%20homestays." target="_blank" rel="noopener noreferrer"
                className="kha-wa-btn flex items-center justify-center gap-[.7rem] w-full py-[.9rem] transition-all duration-300"
                style={{ background:'rgba(37,211,102,.18)', border:'1px solid rgba(37,211,102,.4)', color:'#4ade80', fontFamily:jost, fontSize:'.78rem', letterSpacing:'.2em', textTransform:'uppercase', textDecoration:'none', cursor:'none' }}>
                <MessageCircle size={16} /> Open WhatsApp Chat
              </a>
            </div>

            {/* Office address */}
            <div className="kha-info-card kha-reveal kha-d1 kha-sidebar-card-px px-[2.2rem] py-8"
              style={{ background:'rgba(31,46,31,.7)', border:'1px solid rgba(200,169,106,.14)' }}>
              <span style={{ fontSize:'2rem', display:'flex', marginBottom:'.9rem' }}><Building2 size={32} color="#c8a96a" /></span>
              <span style={{ fontSize:'.68rem', letterSpacing:'.25em', textTransform:'uppercase', color:'#c8a96a', display:'block', marginBottom:'.5rem' }}>Registered Office</span>
              <div style={{ fontSize:'1.05rem', color:'#f4efe5', lineHeight:1.6, marginBottom:'.3rem' }}>No. 12, Sayyaji Rao Road</div>
              <div style={{ fontSize:'.8rem', color:'rgba(244,239,229,.42)', lineHeight:1.6 }}>Near Mysore Palace Complex<br />Mysore, Karnataka — 570 001<br />Reg. No. MHA/2010/001</div>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="kha-ic-link">Open in Maps</a>
            </div>

            {/* Office hours */}
            <div className="kha-reveal kha-d2 kha-sidebar-card-px px-[2.2rem] py-8" style={{ background:'rgba(31,46,31,.6)', border:'1px solid rgba(200,169,106,.12)' }}>
              <span style={{ fontSize:'.68rem', letterSpacing:'.25em', textTransform:'uppercase', color:'#c8a96a', display:'block', marginBottom:'1rem' }}>Office Hours</span>
              {HOURS.map(h => (
                <div key={h.day} className="flex justify-between items-center py-[.6rem]" style={{ borderBottom:'1px solid rgba(200,169,106,.07)' }}>
                  <span style={{ fontSize:'.8rem', color:'rgba(244,239,229,.55)', letterSpacing:'.08em' }}>{h.day}</span>
                  <div className="flex items-center gap-2">
                    <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:h.open?'#7a9e6e':'rgba(244,239,229,.2)', flexShrink:0, display:'inline-block' }}></span>
                    <span style={{ fontSize:'.8rem', color:h.open?'#f4efe5':'rgba(244,239,229,.3)' }}>{h.time}</span>
                  </div>
                </div>
              ))}
              <p style={{ fontSize:'.75rem', color:'rgba(244,239,229,.3)', marginTop:'1rem', lineHeight:1.65 }}>WhatsApp messages are monitored on weekends for urgent queries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ MAP ════════════════ */}
      <div className="kha-map-px px-16 pb-0 bg-[#1f2e1f]">
        <div className="max-w-[1700px] mx-auto">
          <div className="kha-reveal relative overflow-hidden" style={{ width:'100%', height:'420px', border:'1px solid rgba(200,169,106,.18)' }}>
            <iframe
              title="MHA Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.487086613265!2d76.65286857507636!3d12.30527158791963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7024c4e0e0c9%3A0xf7d1b15429af7e72!2sSayyaji%20Rao%20Rd%2C%20Mysuru%2C%20Karnataka%20570001!5e0!3m2!1sen!2sin!4v1715500000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border:0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
            {/* Overlay label */}
            <div className="kha-map-overlay absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4"
              style={{ background:'rgba(24,35,24,.88)', backdropFilter:'blur(12px)', borderTop:'1px solid rgba(200,169,106,.18)' }}>
              <div className="flex items-center gap-3">
                <span style={{ fontSize:'1.4rem', display:'flex', alignItems:'center' }}><MapPin size={24} color="#c8a96a" /></span>
                <div>
                  <div style={{ fontFamily:cg, fontSize:'1.1rem', fontWeight:300, color:'#f4efe5', lineHeight:1.2 }}>MHA Registered Office</div>
                  <div style={{ fontSize:'.76rem', color:'rgba(244,239,229,.48)', marginTop:'.15rem' }}>No. 12, Sayyaji Rao Road · Mysore, Karnataka — 570 001</div>
                </div>
              </div>
              <a href="https://maps.google.com/?q=Sayyaji+Rao+Road+Mysore+Karnataka" target="_blank" rel="noopener noreferrer"
                className="kha-map-open-btn inline-flex items-center gap-[.6rem] px-5 py-[.6rem] flex-shrink-0 transition-all duration-300"
                style={{ border:'1px solid rgba(200,169,106,.3)', color:'#c8a96a', fontFamily:jost, fontSize:'.72rem', letterSpacing:'.18em', textTransform:'uppercase', textDecoration:'none', background:'transparent', cursor:'none' }}>
                Open in Maps <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>


      {/* ════════════════ FAQ ════════════════ */}
      <section className="kha-section-px kha-section-py px-16 py-24 bg-[#1f2e1f]">
        <div className="max-w-[860px] mx-auto">
          <div className="kha-reveal mb-12">
            <span className="kha-eyebrow">Common Questions</span>
            <h2 className="kha-reveal kha-d1" style={{ fontFamily:cg, fontSize:'clamp(2rem,3.4vw,3rem)', fontWeight:300, lineHeight:1.15, color:'#f4efe5' }}>
              Frequently Asked <em style={{ fontStyle:'italic', color:'#e0c88a' }}>Questions</em>
            </h2>
            <div className="kha-reveal kha-d2"><Divider /></div>
          </div>
          <div className="kha-reveal kha-d2 flex flex-col gap-[.6rem]">
            {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ════════════════ SOCIAL STRIP ════════════════ */}
      <div className="kha-social-px" style={{ background:'#2e4a2e', borderTop:'1px solid rgba(200,169,106,.15)', borderBottom:'1px solid rgba(200,169,106,.15)', padding:'3.5rem 4rem' }}>
        <div className="kha-social-inner max-w-[1100px] mx-auto flex items-center justify-between gap-8 flex-wrap">
          <div className="kha-reveal">
            <h3 style={{ fontFamily:cg, fontSize:'2rem', fontWeight:300, color:'#f4efe5' }}>Follow <em style={{ fontStyle:'italic', color:'#e0c88a' }}>MHA</em> Online</h3>
            <p style={{ fontSize:'.88rem', color:'rgba(244,239,229,.5)', marginTop:'.4rem', fontWeight:300 }}>Stories, member features and travel inspiration from across Mysuru homestays.</p>
          </div>
          <div className="kha-reveal kha-d1 kha-s-btn-wrap flex gap-3 flex-wrap">
            {[
  [<FaInstagram size={18} />, 'Instagram'],
  [<FaYoutube size={18} />, 'YouTube'],
  [<FaTwitter size={18} />, 'Twitter / X'],
  [<FaFacebookF size={18} />, 'Facebook'],
].map(([icon, label]) => (
              <a key={label} href="#" className="kha-s-btn flex items-center gap-[.6rem] px-6 py-[.8rem]"
                style={{ border:'1px solid rgba(200,169,106,.2)', color:'rgba(244,239,229,.65)', fontSize:'.75rem', letterSpacing:'.14em', textTransform:'uppercase', textDecoration:'none' }}>
                <span style={{ display:'flex', alignItems:'center' }}>{icon}</span> {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════ FOOTER ════════════════ */}
      <Footer />
      
    </>
  );
};

export default Contact;