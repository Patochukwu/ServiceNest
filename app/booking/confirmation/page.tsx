import prisma from '@/lib/db';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

interface Props {
  searchParams: Promise<{ id?: string }>;
}

export default async function BookingConfirmationPage({ searchParams }: Props) {
  const { id } = await searchParams;

  if (!id) {
    notFound();
  }

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { service: true },
  });

  if (!booking) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="page-hero">
        <div className="container">
          <div className={styles.container}>
            <div className={`card ${styles.card}`}>
              <div className={styles.successIcon}>✓</div>
              <h1 className="heading-xl">Booking Request Received</h1>
              <p className="body-md text-muted">
                Thank you, <strong>{booking.customerName}</strong>! We have received your booking request for <strong>{booking.service.name}</strong>.
              </p>

              <div className={styles.detailsBox}>
                <div className={styles.detailRow}>
                  <span>Service</span>
                  <strong>{booking.service.name}</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Date</span>
                  <strong>{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Time Slot</span>
                  <strong>{booking.timeSlot}</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Booking Reference</span>
                  <strong className={styles.ref}>#{booking.id.slice(0, 8).toUpperCase()}</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Confirmation Status</span>
                  <span className="badge badge-warning">⏳ Pending Approval</span>
                </div>
              </div>

              <div className={styles.alertBox}>
                <strong>🔔 Check Your Inbox</strong>
                <p className="body-sm text-muted">
                  We have sent an email notification to <strong>{booking.email}</strong>. Our team will review the appointment details and send another notification as soon as it is confirmed.
                </p>
              </div>

              <div className={styles.actions}>
                <Link href="/" className="btn btn-primary" id="confirmation-home">
                  Return Home
                </Link>
                <Link href="/services" className="btn btn-outline" id="confirmation-services">
                  Browse Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
