import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
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
    const { approved } = body;

    const review = await prisma.review.update({
      where: { id },
      data: { approved: !!approved },
    });

    return NextResponse.json(review, { status: 200 });
  } catch (error: any) {
    console.error('PATCH review status error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error.', error: error.message },
      { status: 500 }
    );
  }
}

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

    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Review deleted successfully.' }, { status: 200 });
  } catch (error: any) {
    console.error('DELETE review error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error.', error: error.message },
      { status: 500 }
    );
  }
}
