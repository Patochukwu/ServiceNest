import prisma from '@/lib/db';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'African & American Hair Braiding Styles',
  description: 'View our braiding samples on African and American women hair textures. Knotless box braids, tribal cornrows, goddess locs and more in North Dakota.',
};

export default async function HairBraidingPage() {
  const styles_data = await prisma.service.findMany({
    where: { category: 'hair-braiding', active: true },
  });

  return (
    <>
      <Navbar />
      <main className="page-hero">
        <div className="container">
          {/* Header */}
          <div className={styles.header}>
            <div className="section-label">Hair Braiding</div>
            <h1 className="display-lg">Artistry &amp; Protection</h1>
            <p className="body-lg text-muted" style={{ maxWidth: 640, marginTop: '0.5rem' }}>
              We specialize in custom hair parting grids, light-weight hair integrations,
              and styling designs that look spectacular on both African textured hair and American hair profiles.
            </p>
          </div>

          {/* List of Styles */}
          <div className={styles.catalog}>
            {styles_data.map((style) => (
              <div key={style.id} id={style.slug} className={`card ${styles.styleCard}`}>
                <div className={styles.imgWrapper}>
                  <Image
                    src={style.imageUrl}
                    alt={style.name}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
                <div className={styles.content}>
                  <div className={styles.metaRow}>
                    <span className="badge badge-primary">Professional Braiding</span>
                    <span className={styles.duration}>
                      ⏱ {Math.round(style.duration / 60)} hours
                    </span>
                  </div>
                  <h2 className="heading-xl">{style.name}</h2>
                  <p className="body-md text-muted">{style.longDesc || style.description}</p>

                  <div className={styles.specs}>
                    <div className={styles.specItem}>
                      <span className={styles.specLabel}>Suitable for:</span>
                      <span className={styles.specVal}>African &amp; American hair textures</span>
                    </div>
                    <div className={styles.specItem}>
                      <span className={styles.specLabel}>Included:</span>
                      <span className={styles.specVal}>Wash, blow-dry, extension hair, accessories</span>
                    </div>
                  </div>

                  <div className={styles.footerRow}>
                    <div className={styles.priceContainer}>
                      <span className={styles.priceLabel}>Starting at</span>
                      <span className={styles.priceValue}>${style.price}</span>
                    </div>
                    <Link href={`/booking?service=${style.id}`} className="btn btn-primary" id={`book-${style.slug}`}>
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hair Prep Tips banner */}
          <div className={styles.prepBanner}>
            <h3 className="heading-lg">Preparing for Your Appointment</h3>
            <p className="body-md text-muted">
              To ensure the best results and standard service times, please arrive with your hair detangled
              and blow-dried. If you require washing or therapeutic deep conditioning treatments,
              please add it to your service selection during booking.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
