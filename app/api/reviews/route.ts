import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(reviews, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal Server Error.', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, email, serviceType, rating, comment } = body;

    if (!customerName || !rating || !comment) {
      return NextResponse.json(
        { message: 'Missing required review fields.' },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        customerName,
        email,
        serviceType,
        rating: parseInt(rating),
        comment,
        approved: false, // Must be approved by admin
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal Server Error.', error: error.message },
      { status: 500 }
    );
  }
}
