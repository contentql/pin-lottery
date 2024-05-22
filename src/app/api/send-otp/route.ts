import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const auth = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(sid, auth);

    const result = await client.messages.create({
      body: 'your otp is: 1234',
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+919390463796'
    });

    return NextResponse.json({ message: 'success', sid: result.sid }, { status: 200 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ message: 'error'}, { status: 500 });
  }
}
