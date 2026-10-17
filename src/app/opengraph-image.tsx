import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Open Graph image for the About-Me portfolio.
 * Rendered server-side with next/og so it is a real asset (no external service).
 * Aesthetic: Playground — paper background, ink borders, hard offset shadows,
 * the frozen accent palette, and a terminal strip as the signature motif.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#FFF6EC",
          fontFamily: "Inter, sans-serif",
          position: "relative",
        }}
      >
        {/* decorative dots */}
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 40 + ((i * 173) % 1120),
              top: 36 + ((i * 97) % 540),
              width: i % 3 === 0 ? 8 : 5,
              height: i % 3 === 0 ? 8 : 5,
              borderRadius: "50%",
              background: ["#FF5C7A", "#FFC95C", "#8B7CFF", "#3FC7A9"][i % 4],
              opacity: 0.35,
            }}
          />
        ))}

        {/* top row: handle + role */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 26,
              color: "#221D2E",
              background: "#FFFFFF",
              border: "1.5px solid #221D2E",
              borderRadius: 10,
              padding: "10px 18px",
              boxShadow: "4px 4px 0 #221D2E",
            }}
          >
            <span style={{ color: "#FF5C7A" }}>➜</span> {site.handle}
          </div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 22,
              color: "#574E63",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
            }}
          >
            {site.role} · {site.roleSecondary}
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontFamily: "Bricolage Grotesque, serif",
              fontSize: 108,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              color: "#221D2E",
              maxWidth: 900,
            }}
          >
            I make the web feel{" "}
            <span style={{ position: "relative", display: "block" }}>
              human
              <span
                style={{
                  position: "absolute",
                  left: -8,
                  right: -8,
                  bottom: 2,
                  height: 20,
                  background: "#FFC95C",
                  transform: "rotate(-1.2deg)",
                }}
              />
            </span>
            .
          </div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 34,
              color: "#574E63",
              maxWidth: 760,
              lineHeight: 1.4,
            }}
          >
            {site.tagline}
          </div>
        </div>

        {/* terminal strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: "#221D2E",
            border: "1.5px solid #221D2E",
            borderRadius: 14,
            padding: "22px 28px",
            boxShadow: "6px 6px 0 rgba(34,29,46,0.25)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 24,
            color: "#F4EDE4",
          }}
        >
          <span style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5C7A" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFC95C" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#3FC7A9" }} />
          </span>
          <span style={{ color: "#3FC7A9" }}>➜</span>
          <span style={{ color: "#FFC95C" }}>luis.dev</span>
          <span style={{ color: "#B9AFC7" }}>whoami</span>
          <span style={{ color: "#F4EDE4", opacity: 0.55 }}>— Luis, fullstack &amp; IA engineer</span>
        </div>
      </div>
    ),
    size,
  );
}
