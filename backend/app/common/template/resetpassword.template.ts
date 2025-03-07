const resetPasswordEmailTemplate = (resetLink: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    /* Your existing styles */
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Reset Your Password</h1>
    </div>
    <div class="content">
      <p>Hi there,</p>
      <p>We received a request to reset your password for your account. If you made this request, please click the button below to reset your password. The link will expire in 1 hour:</p>
      <div class="button-container">
        <a href="${resetLink}" class="button">Reset Password</a>
      </div>
      <p>If you didn't request a password reset, please ignore this email or contact support if you have any questions.</p>
      <p>Thank you,<br>The App Team</p>
    </div>
    <div class="footer">
      <p>If you're having trouble clicking the button, copy and paste the link below into your web browser:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
    </div>
  </div>
</body>
</html>
`;
