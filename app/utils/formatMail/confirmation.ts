export function formatConfirmationMessage(name: string) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background-color: #050505;
      color: #ffffff;
      padding: 40px 20px;
      margin: 0;
    }
    .container {
      max-width: 600px;
      background: #0a0a0a;
      border: 1px solid #222;
      border-radius: 24px;
      margin: auto;
      overflow: hidden;
    }
    .header {
      padding: 60px 40px 40px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-family: Georgia, serif;
      font-size: 40px;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }
    .content {
      padding: 0 40px 40px;
      text-align: center;
    }
    .content p {
      font-size: 16px;
      color: #aaa;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .divider {
      width: 40px;
      height: 1px;
      background: #444;
      margin: 30px auto;
    }
    .footer {
      padding: 40px;
      text-align: center;
      font-size: 11px;
      color: #555;
      border-top: 1px solid #222;
      text-transform: uppercase;
      letter-spacing: 0.2em;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Message <br> Received.</h1>
    </div>
    <div class="content">
      <p>
        Hi ${name},<br><br>
        Thank you for reaching out. I've received your project inquiry and will personally review it within the next 24-48 hours. 
        Looking forward to potentially collaborating together.
      </p>
      <div class="divider"></div>
      <p style="font-size: 14px; color: #777; margin: 0;">
        Best regards,<br>
        <strong style="color: #fff;">Huldah Peter</strong>
      </p>
    </div>
    <div class="footer">
      LAGOS, NIGERIA &bull; WORLDWIDE
    </div>
  </div>
</body>
</html>
  `;
  return html;
}
