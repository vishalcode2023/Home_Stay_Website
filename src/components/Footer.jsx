import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const FOOTER_STYLES = `
  .kha-footer-outer { padding: 4rem; }
  .kha-footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
  .kha-footer-bottom { display:flex; justify-content:space-between; align-items:center; }
  .kha-footer-email { word-break:break-all; }

  @media(max-width:900px){
    .kha-footer-outer { padding: 3rem 1.5rem !important; }
    .kha-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
    .kha-footer-bottom { flex-direction:column !important; gap:.6rem !important; text-align:center !important; }
  }
  @media(max-width:600px){
    .kha-footer-outer { padding: 2.5rem 1rem !important; }
    .kha-footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .kha-footer-logo-subtitle { display:none !important; }
  }
`;

const Footer = ({ cg }) => {
  return (
    <>
      <style>{FOOTER_STYLES}</style>
      <footer
        className="kha-footer-outer bg-[#182318]"
        style={{ borderTop: "1px solid rgba(200,169,106,.1)" }}
        id="footer"
      >
        <div
          className="kha-footer-grid max-w-[1200px] mx-auto grid gap-10 pb-10"
          style={{ borderBottom: "1px solid rgba(200,169,106,.08)" }}
        >
          {/* ── Brand column ── */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/mha.jpg"
                alt="MHA Logo"
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
              <div>
                <span
                  style={{
                    fontFamily: cg,
                    fontSize: "1.6rem",
                    fontWeight: 400,
                    letterSpacing: ".1em",
                    color: "#e0c88a",
                    lineHeight: 1,
                    display: "block",
                  }}
                >
                  MDHOA
                </span>
                <span
                  className="kha-footer-logo-subtitle"
                  style={{
                    fontSize: ".58rem",
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: "#7a9e6e",
                    display: "block",
                    marginTop: "3px",
                  }}
                >
                  Mysore District Homestay Owners Association(R)
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: ".85rem",
                lineHeight: 1.85,
                color: "rgba(244,239,229,.48)",
                marginTop: ".9rem",
                maxWidth: "230px",
                fontWeight: 300,
              }}
            >
              The official body representing authentic homestay operators across
              Mysuru district and its taluks.
            </p>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: ".6rem",
                color: "rgba(244,239,229,.65)",
                fontSize: ".82rem",
              }}
            >
              <p className="flex items-center gap-2">
                <FaPhoneAlt style={{ color: "#c8a96a", flexShrink: 0 }} />
                +91 *********
              </p>
              <p className="kha-footer-email flex items-start gap-2">
                <FaEnvelope
                  style={{ color: "#c8a96a", flexShrink: 0, marginTop: "3px" }}
                />
                mysuruhomestayassociation@gmail.com
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "1rem",
                fontSize: "1.2rem",
              }}
            >
              <a href="#" style={{ color: "#c8a96a" }}>
                <FaInstagram />
              </a>
              <a href="#" style={{ color: "#c8a96a" }}>
                <FaFacebookF />
              </a>
              <a href="#" style={{ color: "#c8a96a" }}>
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* ── Link columns ── */}
          {[
            {
              h: "Browse By Taluk",
              links: [
                "Mysuru",
                "H.D. Kote",
                "Hunsur",
                "Nanjangud",
                "T. Narasipura",
              ],
            },
            {
              h: "Popular Areas",
              links: [
                "Kabini",
                "Mysuru City",
                "Saragur",
                "Periyapatna",
                "K.R. Nagar",
              ],
            },
            {
              h: "Association",
              links: ["About MHA", "List Our Homestay", "Contact Us"],
            },
          ].map((col) => (
            <div key={col.h}>
              <h4
                style={{
                  fontSize: ".7rem",
                  letterSpacing: ".28em",
                  textTransform: "uppercase",
                  color: "#c8a96a",
                  marginBottom: "1.2rem",
                }}
              >
                {col.h}
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-[.6rem]">
                {col.links.map((l) => {
                  const linkMap = {
                    Mysuru: "/explore",
                    "H.D. Kote": "/explore",
                    Hunsur: "/explore",
                    Nanjangud: "/explore",
                    "T. Narasipura": "/explore",
                    Kabini: "/explore",
                    "Mysuru City": "/explore",
                    Saragur: "/explore",
                    Periyapatna: "/explore",
                    "K.R. Nagar": "/explore",
                    "About MHA": "/about",
                    "List Our Homestay": "/explore",
                    "Contact Us": "/contact",
                  };
                  return (
                    <li key={l}>
                      <a
                        href={linkMap[l]}
                        className="kha-footer-link transition-colors duration-300"
                        style={{
                          fontSize: ".88rem",
                          color: "rgba(244,239,229,.48)",
                          textDecoration: "none",
                        }}
                      >
                        {l}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="kha-footer-bottom max-w-[1200px] mx-auto mt-8">
          <p style={{ fontSize: ".75rem", color: "rgba(244,239,229,.3)" }}>
            © 2026 Mysuru Homestays Association. All rights reserved.
          </p>
          <p
            style={{
              color: "rgba(244,239,244,.22)",
              fontSize: ".72rem",
              letterSpacing: ".1em",
            }}
          >
            Mysuru Tourism Affiliated
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
