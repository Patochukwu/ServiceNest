import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServicesGrid from '@/components/home/ServicesGrid';
import styles from './page.module.css';

export const metadata = {
  title: 'Our Services',
  description: 'Explore the premium service catalogs offered by ServiceNest in North Dakota. Hair Braiding and Authentic African Cuisine.',
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="page-hero">
        <div className="container">
          <div className={styles.header}>
            <div className="section-label">All Services</div>
            <h1 className="display-lg">Nest of Premium Services</h1>
            <p className="body-lg text-muted" style={{ maxWidth: 600, marginTop: '0.5rem' }}>
              We bring quality hair braiding designs and mouthwatering African cooking to North Dakota.
              Select a service vertical below to explore packages, menus, and book your session.
            </p>
          </div>
        </div>

        <ServicesGrid />
      </main>
      <Footer />
    </>
  );
}
