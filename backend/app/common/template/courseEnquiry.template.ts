export const courseEnquiryEmailTemplate = (ticketNo: string, name: string, email: string, phone: string, education: string, intrestedCourse: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course Enquiry Confirmation - Praxia Skill</title>
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
    .info-box {
      background-color: #F0484E;
      padding: 15px;
      border-radius: 5px;
      margin: 15px 0;
      font-size: 14px;
      color: #ffffff;
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
      <h1>Course Enquiry Confirmation</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>Thank you for your interest in our courses. We have received your enquiry, and our team will get in touch with you shortly.</p>
      <div class="info-box">
        <p><strong>Ticket Number:</strong> ${ticketNo}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Education:</strong> ${education}</p>
        <p><strong>Interested Course:</strong> ${intrestedCourse}</p>
      </div>
      <p>If you have any questions, feel free to contact us.</p>
      <p>Best regards,<br>The Praxia Skill Team</p>
    </div>
    <div class="footer">
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