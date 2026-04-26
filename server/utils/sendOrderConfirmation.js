import { createTransport } from "nodemailer";

const sendOrderConfirmation = async ({ email, subject, orderId, products, totalAmount }) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password,
    },
  });

  const productsHtml = products
    .map(
      (product) => `
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">${product.name}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${product.quantity}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">Rs ${product.price}</td>
            </tr>
        `,
    )
    .join("");

const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Order Confirmation</title>
</head>

<body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">

<!-- HEADER -->
<tr>
<td style="background:#111827; padding:20px; text-align:center;">
  <h1 style="color:#ffffff; margin:0;">E-Store</h1>
</td>
</tr>

<!-- SUCCESS -->
<tr>
<td style="padding:30px; text-align:center;">
  <h2 style="color:#16a34a; margin-bottom:10px;">Order Confirmed 🎉</h2>
  <p style="color:#555;">Hi ${email}, your order has been placed successfully.</p>
  <p style="color:#333;">Order ID: <strong>${orderId}</strong></p>
</td>
</tr>

<!-- PRODUCTS TABLE -->
<tr>
<td style="padding:0 30px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    <thead>
      <tr style="background:#f3f4f6;">
        <th style="padding:12px; text-align:left;">Product</th>
        <th style="padding:12px;">Qty</th>
        <th style="padding:12px;">Price</th>
      </tr>
    </thead>
    <tbody>
      ${productsHtml}
    </tbody>
  </table>
</td>
</tr>

<!-- TOTAL -->
<tr>
<td style="padding:20px 30px;">
  <table width="100%">
    <tr>
      <td style="font-size:18px; font-weight:bold;">Total</td>
      <td align="right" style="font-size:18px; font-weight:bold;">
        Rs ${totalAmount.toLocaleString()}
      </td>
    </tr>
  </table>
</td>
</tr>

<!-- CTA 
<tr>
<td style="padding:20px 30px; text-align:center;">
  <a href="#" style="
    display:inline-block;
    padding:12px 25px;
    background:#2563eb;
    color:#fff;
    text-decoration:none;
    border-radius:6px;
    font-weight:bold;
  ">
    View Your Order
  </a>
</td>
</tr>
-->

<!-- FOOTER -->
<tr>
<td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#777;">
  Thank you for shopping with us ❤️
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

export default sendOrderConfirmation;
