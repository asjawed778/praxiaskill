export const courseEnquiryEmailTemplate = (ticketNo: string, name: string, email: string, phone: string, education: string, intrestedCourse: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course Enquiry Confirmation - Praxiaskill</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f7;
      margin: 0;
      padding: 0;
      color: #51545e;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #4caf50;
      color: #ffffff;
      text-align: center;
      padding: 20px 0;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
      font-size: 16px;
    }
    .content p {
      margin: 10px 0;
    }
    .info-box {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
      margin: 15px 0;
      font-size: 14px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #999999;
      background-color: #f4f4f7;
    }
    .footer a {
      color: #4caf50;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
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
      <p>Best regards,<br>The Praxiaskill Team</p>
    </div>
    <div class="footer">
      <p>Visit our website: <a href="https://praxiaskill.com">praxiaskill.com</a></p>
    </div>
  </div>
</body>
</html>`;
