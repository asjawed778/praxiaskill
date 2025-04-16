export const contactUsEmailTemplate = (
    name: string,
    email: string,
    subject: string,
    message: string
): string => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>New Contact Message</title>
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
      .header h1 {
        margin: 0;
        font-size: 24px;
        letter-spacing: 1px;
      }
      .content {
        padding: 30px;
        font-size: 16px;
        line-height: 1.6;
        color: #444;
      }
      .content p {
        margin: 12px 0;
      }
      .label {
        font-weight: bold;
        color: #000;
      }
      .footer {
        background-color: #f2f2f2;
        padding: 20px;
        text-align: center;
        font-size: 13px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>New Contact Form Submission</h1>
      </div>
      <div class="content">
        <p><span class="label">Name:</span> ${name}</p>
        <p><span class="label">Email:</span> ${email}</p>
        <p><span class="label">Subject:</span> ${subject}</p>
        <p><span class="label">Message:</span><br>${message}</p>
      </div>
      <div class="footer">
        This message was submitted via your website's contact form.
      </div>
    </div>
  </body>
  </html>
  `;
