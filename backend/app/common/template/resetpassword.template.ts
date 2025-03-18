const resetPasswordEmailTemplate = (resetLink: string): string => `
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
      text-align: center;
    }
    .button-container {
      margin: 20px 0;
    }
    .button {
      display: inline-block;
      background-color: #ED1C25;
      color: #ffffff;
      padding: 12px 24px;
      font-size: 16px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .button:hover {
      background-color: #C4141D;
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
      <p>We received a request to reset your password. Click the button below to set a new password.</p>
      <div class="button-container">
        <a href="${resetLink}" class="button">Reset Password</a>
      </div>
      <p>This link will expire in 1 hour. If you didn't request a password reset, ignore this email.</p>
    </div>
    <div class="footer">
      <p>If the button doesn't work, copy and paste this link in your browser:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>Need help? Contact us at <a href="mailto:support@praxiaskill.com">support@praxiaskill.com</a></p>
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
      <p style="font-size: 12px; color: #999999;">© 2024 Praxia Skill. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export default resetPasswordEmailTemplate;