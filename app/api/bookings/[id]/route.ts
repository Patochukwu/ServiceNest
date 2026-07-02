import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sendBookingConfirmedEmail } from '@/lib/email';
import { auth } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Validate admin session
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body; // "confirmed" or "cancelled"

    if (!status) {
      return NextResponse.json({ message: 'Missing status update value.' }, { status: 400 });
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: { service: true },
    });

    // If status became confirmed, trigger email
    if (status === 'confirmed') {
      try {
        await sendBookingConfirmedEmail(booking.email, {
          customerName: booking.customerName,
          serviceName: booking.service.name,
          date: new Date(booking.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          timeSlot: booking.timeSlot,
          bookingId: booking.id,
        });
        
        // Mark email sent
        await prisma.booking.update({
          where: { id },
          data: { emailSent: true },
        });
      } catch (emailErr) {
        console.error('Failed to dispatch booking confirmation email:', emailErr);
      }
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (error: any) {
    console.error('PATCH booking status error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error.', error: error.message },
      { status: 500 }
    );
  }
}
