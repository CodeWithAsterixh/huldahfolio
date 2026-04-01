export function formatContactMessage(formData: {
  name: string;
  email: string;
  service: string;
  message: string;
}) {
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
      border-bottom: 1px solid #222;
    }
    .header h1 {
      margin: 0;
      font-family: Georgia, serif; /* Fallback for Playfair */
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .content {
      padding: 40px;
    }
    .field {
      margin-bottom: 30px;
    }
    .label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #777;
      margin-bottom: 8px;
      font-weight: 700;
    }
    .value {
      font-size: 18px;
      color: #fff;
    }
    .message-box {
      background: #111;
      border: 1px solid #222;
      padding: 24px;
      border-radius: 16px;
      margin-top: 20px;
      line-height: 1.6;
      font-size: 16px;
      color: #ccc;
    }
    .footer {
      padding: 40px;
      text-align: center;
      font-size: 12px;
      color: #555;
      border-top: 1px solid #222;
      letter-spacing: 0.1em;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Inquiry</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From</div>
        <div class="value">${formData.name}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value">${formData.email}</div>
      </div>
      <div class="field">
        <div class="label">Project Type</div>
        <div class="value">${formData.service}</div>
      </div>
      <div class="field">
        <div class="label">Message & Goals</div>
        <div class="message-box">
          ${formData.message.replaceAll('\n', '<br>')}
        </div>
      </div>
    </div>
    <div class="footer">
      HULDAH PETER | PORTFOLIO INQUIRY
    </div>
  </div>
</body>
</html>
  `;
  return html;
}
