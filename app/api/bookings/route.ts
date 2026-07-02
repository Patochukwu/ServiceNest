import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sendBookingReceivedEmail, sendAdminNewBookingNotificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, email, phone, serviceId, date, timeSlot, notes } = body;

    if (!customerName || !email || !phone || !serviceId || !date || !timeSlot) {
      return NextResponse.json(
        { message: 'Missing required booking fields.' },
        { status: 400 }
      );
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json(
        { message: 'Selected service not found.' },
        { status: 404 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        customerName,
        email,
        phone,
        serviceId,
        date: new Date(date),
        timeSlot,
        notes,
      },
    });

    // Send customer and admin notifications asynchronously
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Dispatch customer and admin notifications and await completion
    // In serverless environments like Vercel, unawaited background tasks are instantly terminated
    // the moment NextResponse.json() returns a response.
    try {
      await Promise.all([
        // 1. Notify Customer
        sendBookingReceivedEmail(email, {
          customerName,
          serviceName: service.name,
          date: formattedDate,
          timeSlot,
          bookingId: booking.id,
        }),

        // 2. Notify Admin via Email
        sendAdminNewBookingNotificationEmail({
          customerName,
          customerEmail: email,
          customerPhone: phone,
          serviceName: service.name,
          date: formattedDate,
          timeSlot,
          bookingId: booking.id,
          notes: notes || '',
        }),
      ]);
    } catch (notificationErr) {
      console.error('Failed to dispatch booking notifications:', notificationErr);
    }

    return NextResponse.json(
      { id: booking.id, message: 'Booking successful.' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error.', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: { service: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(bookings, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal Server Error.', error: error.message },
      { status: 500 }
    );
  }
}
