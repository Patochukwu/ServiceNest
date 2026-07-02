import prisma from '@/lib/db';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Authentic African Dish Cooking & Ordering',
  description: 'Enjoy delicious Nkwobi, Abacha, Egusi soup and other traditional Nigerian delicacies prepared by top chefs in North Dakota.',
};

export default async function AfricanCuisinePage() {
  const dishes = await prisma.service.findMany({
    where: { category: 'african-cuisine', active: true },
  });

  return (
    <>
      <Navbar />
      <main className="page-hero">
        <div className="container">
          {/* Header */}
          <div className={styles.header}>
            <div className="section-label">African Cuisine</div>
            <h1 className="display-lg">Authentic African Cooking</h1>
            <p className="body-lg text-muted" style={{ maxWidth: 640, marginTop: '0.5rem' }}>
              Homemade, traditionally spiced Nigerian soups, salads, and delicacies prepared with fresh imports
              and local ingredients. Available for scheduled orders, catering, and personal chef services in North Dakota.
            </p>
          </div>

          {/* Dishes catalog */}
          <div className={styles.grid}>
            {dishes.map((dish) => (
              <div key={dish.id} className={`card ${styles.dishCard}`}>
                <div className={styles.imgWrapper}>
                  <Image
                    src={dish.imageUrl}
                    alt={dish.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.overlay} />
                  <span className={`badge badge-gold ${styles.originBadge}`}>
                    Traditional Recipe
                  </span>
                </div>
                <div className={styles.content}>
                  <div className={styles.titleRow}>
                    <h2 className="heading-lg">{dish.name}</h2>
                    <span className={styles.price}>${dish.price}</span>
                  </div>
                  <p className="body-sm text-muted">{dish.longDesc || dish.description}</p>

                  <div className={styles.footerRow}>
                    <span className={styles.serves}>
                      ⏱ Prep time: {dish.duration} mins
                    </span>
                    <Link href={`/booking?service=${dish.id}`} className="btn btn-primary btn-sm" id={`order-${dish.slug}`}>
                      Place Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Catering Callout */}
          <div className={styles.cateringBanner}>
            <div className={styles.cateringLeft}>
              <h3 className="heading-xl">Hosting an Event?</h3>
              <p className="body-md text-muted">
                Bring the vibrant flavors of West Africa to your next gathering. We offer customized large-scale catering menus for weddings, birthdays, corporate functions, and family gatherings.
              </p>
            </div>
            <Link href="/contact?subject=Catering Request" className="btn btn-outline" id="cuisine-catering-contact">
              Catering Inquiry
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
