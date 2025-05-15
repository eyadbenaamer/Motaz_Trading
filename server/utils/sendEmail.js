import { createTransport } from "nodemailer";

export const verifyCode = async (email, code) => {
  try {
    console.log(code);
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    await transporter.sendMail({
      subject: "شركة معتز للتجارة: رمز التحقق",
      to: email,
      html: `
        <div style="font-size:28px;">رمز التحقق : ${code}</div>
      `,
    });
  } catch {}
};
