import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export const sendPasswordResetEmail = async (to: string, token: string) => {
  const resetUrl = `${process.env.FRONTEND_URL}/public/auth/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "Reset your password",
    // text: `To reset your password, please click on the following link: ${resetUrl}\n\nIf you did not request this, please ignore this email.`,

    html: `
    <style> 
      button { 
        text-align: 'center';
        background-color: #25244D;
        padding: 10px 20px;
        border-radius: 5px;
      }
        button a {
          color: #FFFFFF;
          text-decoration: none;
        }

        span {
          width: 24px;          
          height: 50px;
          color: #D20103;
          font-weight: bold;
          font-size: 1.2rem;
          tex-align: center;  
          padding: 5px;
          border: 1px solid #D20103;
          }
          a { 
          text-decoration: none;
          }

    </style>
      <h1>Reset your password.</h1>
      <p>To reset your password, please click on the button bellow \n\nIf you did not request this, please ignore this email.</p>
      p><button><a href="${resetUrl}">Click Here</a></button></p>
      <p>if the button do not work please copy the following URL:</p>
      <a>${resetUrl}</a>
      
    `,
  };

  return transport.sendMail(mailOptions);
};
