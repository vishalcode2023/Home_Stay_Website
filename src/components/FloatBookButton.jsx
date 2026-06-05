import { useState, useEffect } from "react";

const STYLES = `

  /* Hero book button */
  @keyframes heroBtnPulse { 
    0%,100%{box-shadow:0 4px 24px rgba(200,169,106,.35);} 
    50%{box-shadow:0 8px 36px rgba(200,169,106,.65);} 
  }
  .kha-hero-book-btn { animation:heroBtnPulse 2.8s ease-in-out infinite; }
  .kha-hero-book-btn:hover { 
    background:#e0c88a !important; 
    transform:translateY(-2px); 
    animation-play-state:paused; 
  }

  /* CTA animated button */
  @keyframes ctaBtnGlow { 
    0%,100%{box-shadow:0 4px 20px rgba(200,169,106,.3);} 
    50%{box-shadow:0 8px 40px rgba(200,169,106,.65);} 
  }

  @keyframes shimmer { 
    0%{left:-100%;} 
    100%{left:160%;} 
  }

  .kha-cta-anim-btn { 
    animation:ctaBtnGlow 3s ease-in-out infinite; 
    position:relative; 
    overflow:hidden; 
    cursor:none; 
  }

  .kha-cta-anim-btn::before { 
    content:''; 
    position:absolute; 
    top:0; 
    left:-100%; 
    width:60%; 
    height:100%; 
    background:linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,.25),
      transparent
    ); 
    animation:shimmer 3s ease-in-out infinite 1s; 
  }

  .kha-cta-anim-btn:hover { 
    background:#e0c88a !important; 
    transform:translateY(-2px); 
    animation-play-state:paused; 
  }

  .kha-cta-anim-btn:hover::before { 
    animation-play-state:paused; 
  }

  .kha-cta-anim-btn span { 
    position:relative; 
    z-index:1; 
  }

  /* Float book button */
  @keyframes floatPulse { 
    0%,100%{transform:translateY(0);} 
    50%{transform:translateY(-6px);} 
  }

  @keyframes bounceIcon { 
    0%,100%{transform:translateX(0);} 
    50%{transform:translateX(4px);} 
  }

  @keyframes ringPulse { 
    0%{opacity:.7;transform:scale(1);} 
    70%{opacity:0;transform:scale(1.18);} 
    100%{opacity:0;transform:scale(1.18);} 
  }

  .kha-float-book { 
    animation:floatPulse 3s ease-in-out infinite; 
    transition:background .3s,transform .2s,box-shadow .3s; 
  }

  .kha-float-book:hover { 
    background:#e0c88a !important; 
    transform:translateY(-3px) scale(1.03) !important; 
    box-shadow:0 16px 48px rgba(200,169,106,.6),
               0 4px 12px rgba(0,0,0,.4) !important; 
    animation-play-state:paused; 
  }

  .kha-float-icon { 
    animation:bounceIcon 2s ease-in-out infinite; 
  }

  .kha-float-ring {  
    position:absolute; 
    inset:-6px; 
    border:1.5px solid rgba(200,169,106,.55); 
    pointer-events:none; 
    animation:ringPulse 3s ease-in-out infinite; 
  }

  .kha-float-ring2 { 
    position:absolute; 
    inset:-13px; 
    border:1px solid rgba(200,169,106,.25); 
    pointer-events:none; 
    animation:ringPulse 3s ease-in-out infinite .6s; 
  }

  @media(max-width:900px){
    #khaFloatBook { display:none !important; }
  }

  /* How it works CTA button */
  @keyframes howBtnPulse { 
    0%,100%{box-shadow:0 0 0 rgba(200,169,106,0);} 
    50%{box-shadow:0 0 28px rgba(200,169,106,.35);} 
  }

  .kha-how-cta-btn { 
    position:relative; 
    overflow:hidden; 
    animation:howBtnPulse 3.5s ease-in-out infinite; 
    cursor:none; 
  }

  .kha-how-cta-btn::before { 
    content:''; 
    position:absolute; 
    inset:0; 
    background:#c8a96a; 
    transform:translateX(-101%); 
    transition:transform .38s cubic-bezier(.22,1,.36,1); 
  }

  .kha-how-cta-btn:hover { 
    color:#182318 !important; 
  }

  .kha-how-cta-btn:hover::before { 
    transform:translateX(0); 
  }

  .kha-how-cta-btn span { 
    position:relative; 
    z-index:1; 
  }
`;

const FloatBookButton = () => {
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

  const scrollToBrowse = (e) => {
  e.preventDefault();
  window.location.href = "/explore";
};

  return (
    <>
      <style>{STYLES}</style>

      <a
        href="#browse"
        id="khaFloatBook"
        className="kha-float-book fixed bottom-[2.2rem] right-[2.2rem] z-[1500] flex items-center gap-[.65rem] px-[1.8rem] py-[.85rem] font-semibold"
        style={{
          background: "#c8a96a",
          color: "#182318",
          fontFamily: "'Jost',sans-serif",
          fontSize: ".78rem",
          letterSpacing: ".2em",
          textTransform: "uppercase",
          textDecoration: "none",
          boxShadow:
            "0 8px 32px rgba(200,169,106,.45),0 2px 8px rgba(0,0,0,.35)",
          border: "1px solid rgba(255,255,255,.15)",
          opacity: floatVisible ? 1 : 0,
          pointerEvents: floatVisible ? "auto" : "none",
          transition: "opacity .3s",
        }}
        onClick={scrollToBrowse}
      >
        <div className="kha-float-ring"></div>
        <div className="kha-float-ring2"></div>
        <span className="kha-float-icon">🏡</span>
        <span>Book a Homestay</span>
      </a>
    </>
  );
};

export default FloatBookButton;