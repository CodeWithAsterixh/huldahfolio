import { ImageResponse } from "@vercel/og";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Dynamic params
    const titleParam = req.query.title;
    const descriptionParam = req.query.description;
    const bgParam = req.query.bg;

    const title = (Array.isArray(titleParam) ? titleParam[0] : titleParam) || "Broome Service LLC";
    const description = (Array.isArray(descriptionParam) ? descriptionParam[0] : descriptionParam) || "Premium Cleaning Service in Metro Atlanta";
    const bgImage = (Array.isArray(bgParam) ? bgParam[0] : bgParam) || "https://broomeserviceco.com/images/hero/hero-bg.jpg";

    // Logo (hosted URL)
    const logoUrl = "https://broomeserviceco.com/icon-512.png";

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
            backgroundColor: "#1a202c", // Fallback color
          }}
        >
          {/* Background Image - Absolute positioned to prevent repeating */}
          <img
            src={bgImage}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Dark Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Slightly darker for better contrast
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
              padding: "40px 80px",
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            {/* Logo - Increased size */}
            <img
              src={logoUrl}
              alt="Broome Service Logo"
              width={300}
              height={300}
              style={{
                borderRadius: "50%",
                marginBottom: "40px",
                border: "6px solid white",
                boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
              }}
            />

            {/* Title */}
            <div
              style={{
                display: "flex",
                fontSize: 70, // Increased font size
                fontStyle: "normal",
                fontWeight: "bold",
                color: "white",
                lineHeight: 1.1,
                marginBottom: "20px",
                textShadow: "0 4px 12px rgba(0,0,0,0.6)",
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                display: "flex",
                fontSize: 36, // Increased font size
                fontStyle: "normal",
                color: "#f1f5f9", // slate-100
                lineHeight: 1.4,
                textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              {description}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );

    const buffer = await imageResponse.arrayBuffer();
    
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.status(200).send(Buffer.from(buffer));

  } catch {
    res.status(500).send(`Failed to generate the image`);
  }
}
