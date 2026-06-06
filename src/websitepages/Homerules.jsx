import React from 'react'

const cg = "'Cormorant Garamond',serif"
const jost = "'Jost',sans-serif"

const POSITIONING = [
  { icon: "✓", text: "Government of Karnataka – Dept of Tourism Approved & Compliant" },
  { icon: "✓", text: "Family-Only Homestay" },
  { icon: "✓", text: "Owner Staying on Property" },
  { icon: "✓", text: "Safe, Verified & Responsible Tourism" },
  { icon: "✓", text: "Peaceful Alternative to Hotels" },
]

const RULES = [
  { type: "info",    text: "This is a family homestay, not a hotel or party place" },
  { type: "info",    text: "Only families are allowed (no solo / friend groups / bachelors / local ID guests)" },
  { type: "danger",  text: "No visitors or unregistered guests are permitted on the premises" },
  { type: "danger",  text: "No parties, loud music, or gatherings allowed at any time" },
  { type: "danger",  text: "Strictly no smoking, alcohol, narcotics or any objectionable substances" },
  { type: "warning", text: "Valid Government ID & basic guest details are mandatory at check-in" },
  { type: "neutral", text: "Guests are expected to maintain cleanliness as this is a home setup" },
  { type: "neutral", text: "Cooking is allowed, but kitchen and utensils must be kept clean after use" },
  { type: "warning", text: "Any damage to property or misuse will attract additional charges" },
  { type: "neutral", text: "Kindly respect the neighbourhood and maintain silence, especially during night hours" },
  { type: "neutral", text: "No footwear inside the property. No lift. No cleaning during stay." },
  { type: "info",    text: "Please book only after reviewing photos, location, description, and reviews" },
]

const TYPE_COLOR = {
  info:    "#c8a96a",
  danger:  "#e05555",
  warning: "#d4943a",
  neutral: "rgba(244,239,229,.5)",
}

const Homerules = () => {
  return (
    <div style={{
      background: "#182318",
      color: "#f4efe5",
      fontFamily: jost,
      minHeight: "100vh",
      padding: "5rem 2rem",
    }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Eyebrow */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: ".6rem",
          fontSize: ".72rem", letterSpacing: ".32em", textTransform: "uppercase",
          color: "#c8a96a", marginBottom: "1rem",
        }}>
          <span style={{ width: "22px", height: "1px", background: "#c8a96a", display: "inline-block" }} />
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: cg, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300,
          lineHeight: 1.1, color: "#fdfaf4", marginBottom: "2.5rem",
        }}>
          House Rules &amp;{" "}
          <em style={{ fontStyle: "italic", color: "#e0c88a" }}>Guest Guidelines</em>
        </h1>

        {/* Positioning badges */}
        <div style={{
          padding: "1.25rem 1.5rem",
          background: "rgba(31,46,31,.55)",
          border: "1px solid rgba(200,169,106,.2)",
          borderRadius: "4px",
          marginBottom: "2rem",
        }}>
          <div style={{
            fontSize: ".66rem", letterSpacing: ".28em", textTransform: "uppercase",
            color: "#7a9e6e", marginBottom: ".85rem",
          }}>
            Property Positioning
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
            {POSITIONING.map((p) => (
              <span key={p.text} style={{
                display: "inline-flex", alignItems: "center", gap: ".4rem",
                padding: ".3rem .9rem",
                fontSize: ".7rem", letterSpacing: ".1em",
                background: "rgba(200,169,106,.1)",
                border: "1px solid rgba(200,169,106,.28)",
                color: "#c8a96a",
              }}>
                <span style={{ color: "#7a9e6e", fontWeight: 600 }}>✓</span>
                {p.text}
              </span>
            ))}
          </div>
        </div>

        {/* Rules list */}
        <div style={{
          background: "rgba(31,46,31,.5)",
          border: "1px solid rgba(200,169,106,.12)",
          borderRadius: "4px",
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}>
          {RULES.map((r, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "1rem",
              padding: "1rem 1.5rem",
              borderBottom: i < RULES.length - 1
                ? "1px solid rgba(200,169,106,.08)" : "none",
            }}>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: TYPE_COLOR[r.type],
                flexShrink: 0, marginTop: "7px",
              }} />
              <span style={{
                fontSize: ".9rem", lineHeight: 1.7, fontWeight: 300,
                color: "rgba(244,239,229,.82)",
              }}>
                {r.text}
              </span>
            </div>
          ))}
        </div>

        {/* Important note */}
        <div style={{
          display: "flex", gap: "1rem", alignItems: "flex-start",
          padding: "1.25rem 1.5rem",
          background: "rgba(200,169,106,.07)",
          border: "1px solid rgba(200,169,106,.28)",
          borderRadius: "4px",
          borderLeft: "3px solid #c8a96a",
        }}>
          <div>
            <div style={{
              fontSize: ".66rem", letterSpacing: ".28em", textTransform: "uppercase",
              color: "#c8a96a", marginBottom: ".4rem",
            }}>
              Important Note
            </div>
            <p style={{
              fontSize: ".9rem", lineHeight: 1.8, fontWeight: 300,
              color: "rgba(244,239,229,.75)", margin: 0,
            }}>
              This homestay operates under Government of Karnataka guidelines, where
              the owner resides on the property and ensures safety, compliance, and
              guest support. We aim to provide a peaceful, clean, and trustworthy
              stay experience for genuine guests.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Homerules