
const otpTemplate = (otp: string) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>OTP Verification</title>
    
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
              rel="stylesheet"
            />
          </head>
          <body
            style="margin: 0; font-family: 'Poppins', sans-serif; background: #fff0f5; font-size: 14px; color: #333333;"
          >
            <div
              style="max-width: 600px; margin: 0 auto; padding: 45px 30px 60px; background: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);"
            >
              <header>
                <table style="width: 100%; text-align: center;">
                  <tbody>
                    <tr>
                      <td>
                        <img
                          alt="AbilitaEdge Logo"
                          src="https://res.cloudinary.com/ddlz0d295/image/upload/v1729322226/Logos/abilitaedge_logo_cvrtut.jpg"
                          height="80px"
                          style="margin-bottom: 20px;"
                        />
                        <h1 style="font-size: 24px; color: #ff69b4;">Welcome to AbilitaEdge!</h1>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </header>
    
              <main style="text-align: center;">
                <div
                  style="background: #ffffff; padding: 30px; border-radius: 10px; margin-top: 30px;"
                >
                  <h2 style="color: #ff69b4; font-weight: 600;">Your OTP Code</h2>
                  <p style="margin: 0; font-size: 18px;">
                    Use the code below to verify your email and complete your sign-up.
                  </p>
                  <p
                    style="margin: 20px 0; font-size: 36px; font-weight: bold; color: #ff69b4; letter-spacing: 15px;"
                  >
                    ${otp}
                  </p>
                  <p style="font-size: 14px; color: #666666;">
                    This OTP is valid for the next 10 minutes. Please don’t share it with anyone!
                  </p>
                </div>
    
                <p
                  style="margin-top: 50px; font-size: 14px; color: #999999;"
                >
                  If you didn't request this code, please ignore this email or contact support.
                </p>
              </main>
    
              <footer
                style="margin-top: 40px; text-align: center; border-top: 1px solid #e6ebf1; padding-top: 20px;"
              >
                <p style="margin: 0; font-size: 14px; color: #999999;">
                  Need help? Contact us at 
                  <a href="mailto:info@abilitaedge.com" style="color: #ff69b4; text-decoration: none;">
                    info@abilitaedge.com
                  </a>
                </p>
    
                <div style="margin: 20px 0;">
                  <a href="https://facebook.com" target="_blank" style="display: inline-block;">
                    <img width="24px" alt="Facebook" src="https://res.cloudinary.com/ddlz0d295/image/upload/v1729321651/Logos/icons8-facebook-50_gflrq6.png" />
                  </a>
                  <a href="https://instagram.com" target="_blank" style="display: inline-block; margin-left: 10px;">
                    <img width="24px" alt="Instagram" src="https://res.cloudinary.com/ddlz0d295/image/upload/v1729321651/Logos/icons8-instagram-48_bsr1to.png" />
                  </a>
                  <a href="https://twitter.com" target="_blank" style="display: inline-block; margin-left: 10px;">
                    <img width="24px" alt="Twitter" src="https://res.cloudinary.com/ddlz0d295/image/upload/v1729321650/Logos/icons8-twitter-48_eltuz9.png" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" style="display: inline-block; margin-left: 10px;">
                    <img width="24px" alt="LinkedIn" src="https://res.cloudinary.com/ddlz0d295/image/upload/v1729321650/Logos/icons8-linkedin-50_z4wq62.png" />
                  </a>
                </div>
    
                <p style="font-size: 12px; color: #999999;">
                  © 2024 AbilitaEdge. All rights reserved.
                </p>
              </footer>
            </div>
          </body>
        </html>
      `;
  };
  
export default otpTemplate;