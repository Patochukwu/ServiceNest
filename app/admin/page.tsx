import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdminDashboard from '@/components/admin/AdminDashboard';
import styles from './page.module.css';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Manage bookings, reviews, and catalog services on ServiceNest.',
};

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  // Fetch initial dashboard data
  const bookings = await prisma.booking.findMany({
    include: { service: true },
    orderBy: { date: 'asc' },
  });

  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const contactMessages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Calculate statistics
  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b: any) => b.status === 'pending').length,
    confirmedBookings: bookings.filter((b: any) => b.status === 'confirmed').length,
    totalReviews: reviews.length,
    pendingReviews: reviews.filter((r: any) => !r.approved).length,
    totalServices: services.length,
  };

  // Convert dates to ISO strings before passing to Client Component to avoid serialization warnings
  const serializedBookings = bookings.map((b: any) => ({
    ...b,
    date: b.date.toISOString(),
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
  }));

  const serializedReviews = reviews.map((r: any) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }));

  const serializedServices = services.map(s => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }));

  const serializedContacts = contactMessages.map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
  }));

  return (
    <>
      <Navbar />
      <main className="page-hero">
        <div className="container">
          <div className={styles.header}>
            <div>
              <div className="section-label">Management Panel</div>
              <h1 className="display-lg">Control Center</h1>
              <p className="body-md text-muted">
                Welcome back, <strong>{session.user?.name || 'Administrator'}</strong>. Use the controls below to run ServiceNest operations.
              </p>
            </div>
          </div>

          <AdminDashboard
            initialBookings={serializedBookings}
            initialReviews={serializedReviews}
            initialServices={serializedServices}
            initialContacts={serializedContacts}
            stats={stats}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
