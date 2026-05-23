import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const headerRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      headerRef.current?.classList.toggle("kha-scrolled", window.scrollY > 60);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change / outside scroll
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        .kha-scrolled {
          background: rgba(24,35,24,.95) !important;
          backdrop-filter: blur(22px);
          box-shadow: 0 1px 0 rgba(200,169,106,.12);
        }
        .kha-scrolled .kha-nav-inner {
          height: 64px !important;
        }
        .kha-nav-link::after {
          content: '';
          display: block;
          height: 1px;
          background: #c8a96a;
          width: 0;
          transition: width .3s;
        }
        .kha-nav-link:hover::after {
          width: 100%;
        }

        /* ── Hamburger button ── */
        .kha-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 42px;
          height: 42px;
          background: transparent;
          border: 1px solid rgba(200,169,106,.28);
          cursor: pointer;
          gap: 5px;
          flex-shrink: 0;
          transition: border-color .3s;
        }
        .kha-burger:hover {
          border-color: #c8a96a;
        }
        .kha-burger span {
          display: block;
          width: 20px;
          height: 1.5px;
          background: #c8a96a;
          transition: transform .35s ease, opacity .25s ease, width .3s ease;
          transform-origin: center;
        }
        .kha-burger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .kha-burger.open span:nth-child(2) {
          opacity: 0;
          width: 0;
        }
        .kha-burger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* ── Mobile drawer ── */
        .kha-mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(320px, 85vw);
          background: rgba(24,35,24,.98);
          backdrop-filter: blur(28px);
          border-left: 1px solid rgba(200,169,106,.15);
          z-index: 1001;
          display: flex;
          flex-direction: column;
          padding: 0;
          transform: translateX(100%);
          transition: transform .4s cubic-bezier(.4,0,.2,1);
          overflow-y: auto;
        }
        .kha-mobile-drawer.open {
          transform: translateX(0);
        }

        /* ── Drawer backdrop ── */
        .kha-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.55);
          z-index: 1000;
          opacity: 0;
          pointer-events: none;
          transition: opacity .4s ease;
        }
        .kha-drawer-backdrop.open {
          opacity: 1;
          pointer-events: all;
        }

        /* ── Mobile nav links ── */
        .kha-mob-link {
          display: flex;
          align-items: center;
          gap: .7rem;
          padding: 1.1rem 2rem;
          font-size: .8rem;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: rgba(244,239,229,.72);
          text-decoration: none;
          border-bottom: 1px solid rgba(200,169,106,.07);
          transition: color .25s, background .25s, padding-left .25s;
          font-family: 'Jost', sans-serif;
        }
        .kha-mob-link::before {
          content: '';
          width: 0;
          height: 1px;
          background: #c8a96a;
          transition: width .3s;
          flex-shrink: 0;
        }
        .kha-mob-link:hover {
          color: #c8a96a;
          background: rgba(200,169,106,.04);
          padding-left: 2.4rem;
        }
        .kha-mob-link:hover::before {
          width: 16px;
        }

        @media (max-width: 900px) {
          .kha-burger { display: flex; }
          .kha-desktop-nav { display: none !important; }
          .kha-desktop-cta { display: none !important; }
          .kha-nav-inner { padding: 0 1.2rem !important; }
          .kha-logo-img { width: 48px !important; height: 48px !important; }
          .kha-logo-title { font-size: 1.3rem !important; }
          .kha-logo-subtitle { display: none !important; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className={`kha-drawer-backdrop${mobileOpen ? " open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`kha-mobile-drawer${mobileOpen ? " open" : ""}`}>
        {/* Drawer header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.4rem 2rem",
          borderBottom: "1px solid rgba(200,169,106,.12)",
          flexShrink: 0,
        }}>
          <div>
            <span style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "1.3rem",
              color: "#e0c88a",
              letterSpacing: ".1em",
              display: "block",
              lineHeight: 1,
            }}>MHA</span>
            <span style={{
              fontSize: ".58rem",
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: "#7a9e6e",
              display: "block",
              marginTop: "3px",
            }}>Mysore Homestays</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              background: "transparent",
              border: "1px solid rgba(200,169,106,.2)",
              color: "#c8a96a",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1.1rem",
              lineHeight: 1,
              flexShrink: 0,
            }}
          >✕</button>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, paddingTop: ".5rem" }}>
          {[
            ["/", "Home"],
            ["/explore", "Explore Homestays"],
            ["/about", "About Association"],
            ["/contact", "Contact"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="kha-mob-link"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA at bottom */}
        <div style={{ padding: "1.8rem 2rem", borderTop: "1px solid rgba(200,169,106,.1)", flexShrink: 0 }}>
          <a
            href="/explore"
            onClick={() => setMobileOpen(false)}
            style={{
              display: "block",
              textAlign: "center",
              padding: ".75rem 1.6rem",
              border: "1px solid #c8a96a",
              fontFamily: "'Jost',sans-serif",
              fontSize: ".72rem",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#c8a96a",
              transition: "background .3s, color .3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background="#c8a96a"; e.currentTarget.style.color="#182318"; }}
            onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#c8a96a"; }}
          >
            List Your Homestay
          </a>
          <p style={{
            fontSize: ".68rem",
            color: "rgba(244,239,229,.28)",
            textAlign: "center",
            marginTop: ".9rem",
            letterSpacing: ".08em",
            lineHeight: 1.6,
          }}>Mysore Homestays Association · Est. 2010</p>
        </div>
      </div>

      {/* Header — desktop unchanged */}
      <div
        ref={headerRef}
        className="kha-header fixed top-0 left-0 right-0 z-[1000] transition-all duration-500"
      >
        <div
          className="kha-nav-inner flex items-center justify-between transition-[height] duration-[400ms]"
          style={{
            height: "90px",
            padding: "0 4rem"
          }}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 no-underline">
            <img
              src="/mha.jpg"
              alt="MHA Logo"
              className="kha-logo-img w-[65px] h-[65px] object-contain shrink-0"
            />
            <div className="flex flex-col">
              <span
                className="kha-logo-title text-[#e0c88a] leading-none font-normal tracking-[.1em]"
                style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.7rem" }}
              >
                MDHOA
              </span>
              <span
                className="kha-logo-subtitle text-[#7a9e6e] uppercase tracking-[.3em] mt-[3px]"
                style={{ fontSize: ".65rem" }}
              >
                Mysore District Homestay Owners Association(R)
              </span>
            </div>
          </a>

          {/* Nav Links — hidden below 900px */}
          <ul className="kha-desktop-nav flex items-center list-none m-0 p-0 max-[100px]:hidden">
            {[
              ["/", "Home"],
              ["/explore", "Explore Homestays"],
              ["/about", "About Association"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="kha-nav-link relative block px-4 py-[.55rem] text-[.78rem] tracking-[.14em] uppercase text-[#f4efe5] no-underline transition-colors duration-300 hover:text-[#c8a96a]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="kha-desktop-cta max-[900px]:hidden">
            <a
              href="/explore"
              className="transition-all duration-300 text-[#c8a96a] hover:bg-[#c8a96a] hover:text-[#182318]"
              style={{
                display: "inline-block",
                padding: ".58rem 1.6rem",
                border: "1px solid #c8a96a",
                fontFamily: "'Jost',sans-serif",
                fontSize: ".72rem",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              List Your Homestay
            </a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className={`kha-burger${mobileOpen ? " open" : ""}`}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;