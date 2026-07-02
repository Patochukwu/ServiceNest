import prisma from '@/lib/db';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingForm from '@/components/booking/BookingForm';
import styles from './page.module.css';

export const metadata = {
  title: 'Book an Appointment',
  description: 'Book your hair braiding session or order delicious African dishes in North Dakota easily as a guest.',
};

export default async function BookingPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    select: {
      id: true,
      name: true,
      category: true,
      price: true,
      duration: true,
    },
  });

  return (
    <>
      <Navbar />
      <main className="page-hero">
        <div className="container">
          <div className={styles.wrapper}>
            <div className={styles.infoCol}>
              <div className="section-label">Easy Scheduling</div>
              <h1 className="display-lg">Secure Your Slot</h1>
              <p className="body-lg text-muted">
                Book guest appointments or pre-order unique African meals. Fill out the form, choose a convenient date &amp; time, and receive an instant confirmation email.
              </p>

              <div className={styles.policyCard}>
                <h3 className="heading-sm">Booking Policies</h3>
                <ul>
                  <li>✅ No credit card required to book guest appointments.</li>
                  <li>📅 Reschedule or cancel up to 24 hours before your slot.</li>
                  <li>🔔 Email alerts will keep you posted on confirmation status.</li>
                </ul>
              </div>
            </div>

            <div className={styles.formCol}>
              <div className={`card ${styles.formCard}`}>
                <BookingForm services={services} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
