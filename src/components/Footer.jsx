import React from "react";
import { FaInstagram, FaFacebookF, FaYoutube, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = ({ cg }) => {
  return (
    <footer
      className="bg-[#182318] px-16 py-16"
      style={{ borderTop: "1px solid rgba(200,169,106,.1)" }}
      id="footer"
    >
      <div
        className="kha-footer-grid max-w-[1200px] mx-auto grid gap-10 pb-10"
        style={{
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          borderBottom: "1px solid rgba(200,169,106,.08)",
        }}
      >
        
        {/* Left Section */}
<div>
  <div className="flex items-center gap-3">
    {/* Logo */}
    <img
      src="/mha.jpg" 
      alt="MHA Logo"
      style={{
        width: "55px",
        height: "55px",
        objectFit: "contain",
      }}
    />

    <div>
      <span
        style={{
          fontFamily: cg,
          fontSize: "1.7rem",
          fontWeight: 400,
          letterSpacing: ".1em",
          color: "#e0c88a",
          lineHeight: 1,
        }}
      >
        MDHOA
      </span>

      <span
        style={{
          fontSize: ".62rem",
          letterSpacing: ".28em",
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
      fontSize: ".88rem",
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

  {/* Contact Info */}
  <div
    style={{
      marginTop: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: ".5rem",
      color: "rgba(244,239,229,.65)",
      fontSize: ".85rem",
    }}
  >
   <div
  style={{
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: ".7rem",
    color: "rgba(244,239,229,.65)",
    fontSize: ".85rem",
  }}
>
  <p className="flex items-center gap-2">
    <FaPhoneAlt style={{ color: "#c8a96a" }} />
    +91 *********
  </p>

  <p className="flex items-center gap-2">
    <FaEnvelope style={{ color: "#c8a96a" }} />
    mysuruhomestayassociation@gmail.com
  </p>
</div>
  </div>

  {/* Social Media */}
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
            links: [
              "About MHA",
              "List Our Homestay",
              "Contact Us",
            ],
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
    // Browse By Taluk
    "Mysuru": "/explore",
    "H.D. Kote": "/explore",
    "Hunsur": "/explore",
    "Nanjangud": "/explore",
    "T. Narasipura": "/explore",

    // Popular Areas
    "Kabini": "/explore",
    "Mysuru City": "/explore",
    "Saragur": "/explore",
    "Periyapatna": "/explore",
    "K.R. Nagar": "/explore",

    // Association
    "About MHA": "/about",
    "List Our Homestays": "/explore",
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

      <div className="max-w-[1200px] mx-auto flex justify-between items-center mt-8">
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
  );
};

export default Footer;