export const resetPasswordEmailTemplate = (token: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - Praxia Skill</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      border: 3px solid #ED1C25;
    }
    .header {
      background-color: #ED1C25;
      color: #ffffff;
      text-align: center;
      padding: 20px 0;
    }
    .header img {
      width: 120px;
      padding: 10px;
      background: #ffffff;
      border-radius: 10px;
    }
    .header h1 {
      margin: 10px 0 0;
      font-size: 22px;
      color: #ffffff;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
      font-size: 16px;
      color: #444;
    }
    .content p {
      margin: 10px 0;
    }
    .button-container {
      text-align: center;
      margin: 20px 0;
    }
    .button {
      background-color: #ED1C25;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 20px;
      font-size: 16px;
      border-radius: 5px;
      display: inline-block;
      font-weight: bold;
    }
    .button:hover {
      background-color: #c4121b;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 14px;
      background-color: #f4f4f7;
      border-top: 3px solid #ED1C25;
    }
    .footer a {
      color: #ED1C25;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    .social-links {
      margin-top: 15px;
    }
    .social-links a {
      margin: 0 10px;
      display: inline-block;
      font-size: 20px;
      color: #ED1C25;
      text-decoration: none;
    }
  </style>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://praxiaskills.s3.ap-south-1.amazonaws.com/public/course/thumbnail/1742302019691_logopngpng" alt="Praxia Skill Logo">
      <h1>Reset Your Password</h1>
    </div>
    <div class="content">
      <p>Hi,</p>
      <p>We received a request to reset your password. Click the button below to reset your password:</p>
      <div class="button-container">
        <a href="${token}" class="button">Reset Password</a>
      </div>
      <p>If you did not request this, please ignore this email or contact our support team.</p>
      <p>Thank you,<br>The Praxia Skill Team</p>
    </div>
    <div class="footer">
      <p>If you're having trouble clicking the button, copy and paste this link into your browser:</p>
      <p><a href="${token}">${token}</a></p>
      <p>Visit our website: <a href="https://praxiaskill.com">praxiaskill.com</a></p>
      <div class="social-links">
        <a href="https://m.facebook.com/praxiaskill/" target="_blank">
          <i class="fa-brands fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com/praxiaskill?igsh=bXJ1dmJhN3E5cTFm" target="_blank">
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/company/praxiaskill/" target="_blank">
          <i class="fa-brands fa-linkedin"></i>
        </a>
      </div>
    </div>
  </div>
</body>
</html>`;
