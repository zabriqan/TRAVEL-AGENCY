import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod'

const BookingSchema = z.object({
  fullName: z.string().min(1, { message: "Name is required" }),
  email: z.email().min(1, { message: "Email is required" }),
  phone: z.string().refine(phone => /^\+?[0-9]{7,15}$/.test(phone), { message: "Invalid phone number format" }),
  pickup: z.string().optional(),
  destinations: z.string(),
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
    fullName,
    email,
    phone,
    pickup,
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
  const bookingEmail = {
    // from: `"Travel Booking" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL!,
    subject: 'Majestic Paths Booking Query',
    html: `
      <h2>Booking query received from ${fullName}. Email: ${email}</h2>
      <p><strong>Destinations:</strong> ${destinations}</p>
      <p><strong>Travel Dates:</strong> ${dateFrom} → ${dateTo}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${pickup ? `<p><strong>Pickup:</strong> ${pickup}</p>` : ''}
      <hr />
    `
  };

  try {
    await transporter.verify();
    console.log('Nodemailer transporter ready to send emails');

    await transporter.sendMail(bookingEmail);
    // await transporter.sendMail(adminMail);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ error: 'Email sending failed' }, { status: 500 });
  }
}
