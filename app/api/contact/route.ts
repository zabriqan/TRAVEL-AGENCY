import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    const body = await req.json();

    const {
        user_name,
        email,
        message
    } = body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER!,
            pass: process.env.EMAIL_PASS!,
        },
    });

    const contactMail = {
        to: process.env.ADMIN_EMAIL,
        subject: "Contact form submission",
        html: `
            <h3>User ${user_name}'s message:</h3>
            <h4>User email: ${email}</h4>
            <p>
                ${message}
            </p>
        `
    }

    try {
        await transporter.verify();
        console.log('Nodemailer transporter ready to send emails');

        await transporter.sendMail(contactMail);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Email error:', err);
        return NextResponse.json({ error: 'Email sending failed' }, { status: 500 });
    }
}