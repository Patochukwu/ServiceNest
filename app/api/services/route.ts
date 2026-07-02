import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(services, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal Server Error.', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  // Validate admin session
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, category, description, longDesc, price, duration, imageUrl, featured } = body;

    if (!name || !category || !description || !price || !duration || !imageUrl) {
      return NextResponse.json(
        { message: 'Missing required service fields.' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const service = await prisma.service.create({
      data: {
        name,
        slug,
        category,
        description,
        longDesc,
        price: parseFloat(price),
        duration: parseInt(duration),
        imageUrl,
        featured: !!featured,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error: any) {
    console.error('POST service creation error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error.', error: error.message },
      { status: 500 }
    );
  }
}
