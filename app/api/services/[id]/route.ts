import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';

export async function DELETE(
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

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Service deleted successfully.' }, { status: 200 });
  } catch (error: any) {
    console.error('DELETE service error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error.', error: error.message },
      { status: 500 }
    );
  }
}

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
    const { name, category, description, longDesc, price, duration, imageUrl, featured, active } = body;

    const data: any = {};
    if (name !== undefined) {
      data.name = name;
      data.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    if (category !== undefined) data.category = category;
    if (description !== undefined) data.description = description;
    if (longDesc !== undefined) data.longDesc = longDesc;
    if (price !== undefined) data.price = parseFloat(price);
    if (duration !== undefined) data.duration = parseInt(duration);
    if (imageUrl !== undefined) data.imageUrl = imageUrl;
    if (featured !== undefined) data.featured = !!featured;
    if (active !== undefined) data.active = !!active;

    const service = await prisma.service.update({
      where: { id },
      data,
    });

    return NextResponse.json(service, { status: 200 });
  } catch (error: any) {
    console.error('PATCH service error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error.', error: error.message },
      { status: 500 }
    );
  }
}
