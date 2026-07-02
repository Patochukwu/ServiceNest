import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'About ServiceNest — Our Story & Mission',
  description: 'Learn about ServiceNest, providing premium hair braiding and authentic African cuisine cooking services in North Dakota.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="page-hero">
        <div className="container">
          <div className={styles.grid}>
            {/* Left: About Text */}
            <div className={styles.contentCol}>
              <div className="section-label">Our Story</div>
              <h1 className="display-lg">ServiceNest</h1>
              <p className="body-lg text-primary-color" style={{ fontWeight: '500' }}>
                Cultivating culture, styling crowns, and serving rich heritage in North Dakota.
              </p>
              <p className="body-md text-muted">
                ServiceNest was founded with a singular vision: to create a premium, welcoming space where
                residents of North Dakota can experience top-tier protective hair styling and authentic West African cuisine.
              </p>
              <p className="body-md text-muted">
                Our braiding studio caters to all hair textures, with stylists specializing in natural African hair profiles and American styles. Our culinary kitchen is dedicated to preserving traditional methods, preparing iconic dishes like Nkwobi, Abacha, and traditional soups that taste exactly like home.
              </p>

              <div className={styles.missionCard}>
                <h3 className="heading-md">Our Mission</h3>
                <p className="body-sm text-secondary">
                  To provide an exceptional guest experience rooted in cultural authenticity, premium execution, and community convenience. We believe in protective styles that preserve hair health and slow-cooked meals that nourish the soul.
                </p>
              </div>

              <div className={styles.actions}>
                <Link href="/booking" className="btn btn-primary" id="about-book">
                  Book an Appointment
                </Link>
                <Link href="/services" className="btn btn-outline" id="about-services">
                  Browse Services
                </Link>
              </div>
            </div>

            {/* Right: Premium Logo Mockup */}
            <div className={styles.logoCol}>
              <div className={styles.logoWrapper}>
                <Image
                  src="/logo.jpeg"
                  alt="ServiceNest Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <div className={styles.statsCard}>
                <div className={styles.stat}>
                  <strong>100%</strong>
                  <span>Authentic Recipes</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.stat}>
                  <strong>North Dakota</strong>
                  <span>USA Location</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
