import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod'

const BookingSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email().min(1, { message: "Email is required" }),
  phone: z.string().refine(phone => /^\+?[0-9]{7,15}$/.test(phone), { message: "Invalid phone number format" }),
  pickup: z.string().optional(),
  drop: z.string().optional(),
  destinations: z.array(z.string()).min(1),
  dateRange: z.object({
    startDate: z.string().min(1),
    endDate: z.string().min(1)
  }),
})

export async function POST(req: Request) {
  const body = await req.json();

  console.log('req body', body);
  const parsed = BookingSchema.safeParse(body);


  if (!parsed.success) {
    console.log('fieldErrors', parsed.error.flatten().fieldErrors);
    return NextResponse.json({ error: "Bad request body. Validation failed.", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  const {
    name,
    email,
    phone,
    pickup,
    drop,
    destinations,
    dateRange
  } = parsed.data;


  const dateFrom = new Date(dateRange.startDate).toLocaleDateString();
  const dateTo = new Date(dateRange.endDate).toLocaleDateString();
  console.log("datefrom=", dateFrom, "date to=", dateTo)

  console.log('env vars:', process.env.EMAIL_USER, process.env.EMAIL_PASS);


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  // Email to Booker (User)
  const userMail = {
    // from: `"Travel Booking" <${process.env.EMAIL_USER}>`,
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
      <p>We'll contact you soon for confirmation.</p>
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
    await transporter.verify();
    console.log('Nodemailer transporter ready to send emails');

    await transporter.sendMail(userMail);
    await transporter.sendMail(adminMail);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ error: 'Email sending failed' }, { status: 500 });
  }
}
