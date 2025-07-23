import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json();

  const {
    name,
    email,
    phone,
    pickup,
    drop,
    destinations,
    dateRange
  } = body;

  const dateFrom = new Date(dateRange.startDate).toLocaleDateString();
  const dateTo = new Date(dateRange.endDate).toLocaleDateString();
 console.log("datefrom=",dateFrom,"date to=",dateTo)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    }
  });

  // Email to Booker (User)
  const userMail = {
    from: `"Travel Booking" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Booking Confirmation',
    html: `
      <h2>Thank you for booking, ${name}!</h2>
      <p><strong>Destinations:</strong> ${destinations.join(', ')}</p>
      <p><strong>Travel Dates:</strong> ${dateFrom} → ${dateTo}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${pickup ? `<p><strong>Pickup:</strong> ${pickup}</p>` : ''}
      ${drop ? `<p><strong>Drop-off:</strong> ${drop}</p>` : ''}
      <hr />
      <p>We’ll contact you soon for confirmation.</p>
    `
  };

  // Email to Admin (You)
  const adminMail = {
    from: `"Travel Website" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL!,
    subject: `🛫 New Booking from ${name}`,
    html: `
      <h2>New Booking Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Destinations:</strong> ${destinations.join(', ')}</p>
      <p><strong>From:</strong> ${dateFrom}</p>
      <p><strong>To:</strong> ${dateTo}</p>
      ${pickup ? `<p><strong>Pickup:</strong> ${pickup}</p>` : ''}
      ${drop ? `<p><strong>Drop-off:</strong> ${drop}</p>` : ''}
    `
  };

  try {
    await transporter.sendMail(userMail);
    await transporter.sendMail(adminMail);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ error: 'Email sending failed' }, { status: 500 });
  }
}
