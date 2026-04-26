import { createTransport } from "nodemailer";

const sendOtp = async ({ email, subject, otp }) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password,
    },
  });

const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>OTP Verification</title>
</head>

<body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
<tr>
<td align="center">

<table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">

<!-- HEADER -->
<tr>
<td style="background:#111827; padding:20px; text-align:center;">
  <h2 style="color:#ffffff; margin:0;">E-Store</h2>
</td>
</tr>

<!-- BODY -->
<tr>
<td style="padding:30px; text-align:center;">
  <h2 style="margin-bottom:10px;">Verify Your Account</h2>
  <p style="color:#555;">Hi ${email}, use the code below:</p>

  <div style="
    font-size:32px;
    letter-spacing:8px;
    font-weight:bold;
    color:#2563eb;
    margin:20px 0;
  ">
    ${otp}
  </div>

  <p style="color:#777; font-size:14px;">
    This OTP is valid for a few minutes. Do not share it with anyone.
  </p>
</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#777;">
  Secure verification system 🔐
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

  await transport.sendMail({
    from: process.env.Gmail,
    to: email,
    subject,
    html,
  });
};

export default sendOtp;
