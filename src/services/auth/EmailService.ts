import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

export const sendPasswordResetEmail = async (to: string, token: string) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "Reset your password",
    text: `To reset your password, please click on the following link: ${resetUrl}\n\nIf you did not request this, please ignore this email.`
  };

  return transport.sendMail(mailOptions);
};

