import { ImageResponse } from "@vercel/og";
import fs from "node:fs/promises";
import path from "node:path";
import React from "react";

// Mock environment for script execution
const process = { env: {} };

interface PageConfig {
  title: string;
  subtitle?: string;
  category?: string;
  filename: string;
}

const pages: PageConfig[] = [
  {
    title: "Huldah Peter",
    subtitle: "Videographer & Video Editor based in Lagos.",
    filename: "og-home.png",
  },
  {
    title: "Start a Project",
    subtitle: "Let's collaborate on your next visual masterpiece.",
    category: "Contact",
    filename: "og-contact.png",
  },
  {
    title: "Solo dance video",
    category: "Dance",
    filename: "og-solo-dance.png",
  },
  {
    title: "Sax player",
    category: "Music",
    filename: "og-sax-player.png",
  },
  {
    title: "Drone video",
    category: "Commercial",
    filename: "og-drone-video.png",
  },
  {
    title: "Dentistry",
    category: "Commercial",
    filename: "og-dentistry.png",
  },
  {
    title: "Music video",
    category: "Music",
    filename: "og-music-video.png",
  },
  {
    title: "Group dance video",
    category: "Dance",
    filename: "og-group-dance.png",
  },
  {
    title: "Scenery video",
    category: "Nature",
    filename: "og-scenery-video.png",
  },
];

// Read local image for OG background
const meImagePath = path.resolve("public/me-image.jpeg");
const meImageBuffer = await fs.readFile(meImagePath);
const meImageBase64 = `data:image/jpeg;base64,${meImageBuffer.toString("base64")}`;

async function generateOGImage(config: PageConfig) {
  console.log(`Generating OG Image for: ${config.filename}...`);

  try {
    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#050505",
          }}
        >
          {/* Background Image using local me-image */}
          <img
            src={meImageBase64}
            alt=""
            style={{
              position: "absolute",
              top: "-5%",
              left: "-5%",
              width: "110%",
              height: "110%",
              objectFit: "cover",
              filter: "grayscale(100%) opacity(0.4)",
            }}
          />

          {/* Dark Gradient Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(to bottom, rgba(5,5,5,0.7), rgba(5,5,5,0.9))",
            }}
          />

          {/* Border Frame */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              left: "40px",
              right: "40px",
              bottom: "40px",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
            }}
          />

          {/* Content Container */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 100px",
              textAlign: "center",
            }}
          >
            {/* Minimal Brand Header */}
            <div
              style={{
                fontSize: 14,
                textTransform: "uppercase",
                letterSpacing: "0.4em",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "40px",
                fontWeight: "bold",
              }}
            >
              Huldah Peter — Portfolio
            </div>

            {/* Category Tag */}
            {config.category && (
              <div
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  padding: "6px 16px",
                  borderRadius: "100px",
                  marginBottom: "24px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {config.category}
              </div>
            )}

            {/* Title - Playfair Display alternative */}
            <div
              style={{
                display: "flex",
                fontSize: 84,
                color: "white",
                lineHeight: 1,
                marginBottom: config.subtitle ? "20px" : "0",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              {config.title}
            </div>

            {/* Subtitle / Role */}
            {config.subtitle && (
              <div
                style={{
                  display: "flex",
                  fontSize: 28,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.4,
                  maxWidth: "800px",
                  marginTop: "10px",
                }}
              >
                {config.subtitle}
              </div>
            )}
            
            {/* Visual Hook - Bottom accent */}
            <div 
              style={{
                marginTop: "60px",
                width: "40px",
                height: "2px",
                backgroundColor: "white",
                opacity: 0.3
              }}
            />
          </div>
          
          {/* Footer Info */}
          <div
            style={{
              position: "absolute",
              bottom: "80px",
              display: "flex",
              fontSize: 16,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
            }}
          >
            HULDAHSWEETIE@GMAIL.COM
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );

    const buffer = await imageResponse.arrayBuffer();
    const outputPath = path.resolve(`public/${config.filename}`);
    
    await fs.writeFile(outputPath, Buffer.from(buffer));
    console.log(`✅ Saved: ${outputPath}`);

  } catch (error) {
    console.error(`❌ Failed to generate ${config.filename}:`, error);
  }
}

for (const page of pages) {
  await generateOGImage(page);
}
console.log("🎉 All OG images generated successfully!");
