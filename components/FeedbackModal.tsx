"use client";
import { useState } from "react";

interface Props {
  onClose: () => void;
}

export default function FeedbackModal({ onClose }: Props) {
  const [rating, setRating] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!rating) return;
    setSubmitted(true);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.2s ease",
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: "8px",
        border: "1px solid #e0e0e0",
        boxShadow: "0 4px 32px rgba(0,0,0,0.12)",
        width: "100%", maxWidth: "560px",
        padding: "32px", position: "relative",
        animation: "slideUp 0.2s ease",
      }} onClick={e => e.stopPropagation()}>

        {/* close */}
        <button onClick={onClose} style={{
          position: "absolute", top: "16px", right: "20px",
          background: "none", border: "none", fontSize: "18px",
          color: "#aaa", cursor: "pointer", lineHeight: 1,
        }}>×</button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>🙏</div>
            <p style={{ fontWeight: 700, fontSize: "18px", marginBottom: "8px" }}>Thank you!</p>
            <p style={{ color: "#888", fontSize: "14px" }}>Your feedback means a lot.</p>
          </div>
        ) : (
          <>
            {/* header */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{
                width: "52px", height: "52px",
                border: "1.5px solid #111", display: "inline-flex",
                alignItems: "center", justifyContent: "center",
                marginBottom: "16px",
              }}>
                <span style={{ fontWeight: 700, fontSize: "14px", letterSpacing: "0.05em" }}>UX</span>
              </div>
              <h2 style={{
                fontSize: "18px", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.06em",
                marginBottom: "6px", color: "#111",
              }}>Case Study Feedback</h2>
              <p style={{
                fontSize: "12px", color: "#999",
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}>(Quick Feedback Form)</p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e5e5e5", marginBottom: "20px" }} />

            {/* intro */}
            <div style={{
              border: "1px solid #e5e5e5", borderRadius: "4px",
              padding: "14px 16px", marginBottom: "24px",
              background: "#fafafa",
            }}>
              <p style={{
                fontSize: "13px", fontFamily: "monospace",
                color: "#555", lineHeight: 1.7, textAlign: "center", margin: 0,
              }}>
                I&apos;m seeking quick feedback on this case study. Your insights help me improve.
              </p>
            </div>

            {/* rating */}
            <div style={{ marginBottom: "24px" }}>
              <p style={{
                fontSize: "11px", fontWeight: 600, textTransform: "uppercase",
                letterSpacing: "0.08em", color: "#333", marginBottom: "8px",
              }}>Rate This Case Study</p>
              <hr style={{ border: "none", borderTop: "1px solid #e5e5e5", marginBottom: "14px" }} />
              <p style={{ fontSize: "14px", color: "#333", marginBottom: "12px" }}>
                How would you rate this case study?
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "8px" }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <button onClick={() => setRating(n)} style={{
                      width: "28px", height: "28px",
                      border: rating === n ? "1.5px solid #111" : "1px solid #ccc",
                      background: rating === n ? "#111" : "#fff",
                      borderRadius: "3px", cursor: "pointer",
                      transition: "all 0.15s",
                    }} />
                    <span style={{ fontSize: "11px", color: "#888" }}>{n}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "12px", color: "#999" }}>Poor</span>
                <span style={{ fontSize: "12px", color: "#999" }}>Excellent</span>
              </div>
            </div>

            {/* feedback text */}
            <div style={{ marginBottom: "24px" }}>
              <p style={{
                fontSize: "11px", fontWeight: 600, textTransform: "uppercase",
                letterSpacing: "0.08em", color: "#333", marginBottom: "8px",
              }}>Your Feedback</p>
              <hr style={{ border: "none", borderTop: "1px solid #e5e5e5", marginBottom: "14px" }} />
              <p style={{ fontSize: "14px", color: "#333", marginBottom: "10px" }}>
                What did you think of my case study?
              </p>
              <textarea value={text} onChange={e => setText(e.target.value)}
                style={{
                  width: "100%", minHeight: "100px", padding: "12px",
                  border: "1px solid #d0d0d0", borderRadius: "4px",
                  fontSize: "13px", fontFamily: "monospace", color: "#333",
                  resize: "vertical", outline: "none", boxSizing: "border-box",
                }}
                onFocus={e => e.target.style.borderColor = "#999"}
                onBlur={e => e.target.style.borderColor = "#d0d0d0"}
              />
            </div>

            {/* submit */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={handleSubmit} style={{
                background: "#2563eb", color: "#fff",
                border: "none", borderRadius: "6px",
                padding: "10px 24px", fontSize: "13px",
                fontWeight: 600, letterSpacing: "0.06em",
                textTransform: "uppercase", cursor: "pointer",
                opacity: rating ? 1 : 0.5,
                transition: "background 0.15s, opacity 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1d4ed8")}
                onMouseLeave={e => (e.currentTarget.style.background = "#2563eb")}
              >Submit</button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(12px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
}