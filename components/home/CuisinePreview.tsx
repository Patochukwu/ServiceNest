import Link from 'next/link';
import Image from 'next/image';
import styles from './CuisinePreview.module.css';

const dishes = [
  {
    id: 'nkwobi',
    name: 'Nkwobi',
    desc: 'Traditional spiced cow foot in rich palm kernel sauce',
    image: '/images/dishes/nkwobi.png',
    origin: 'Igbo, Nigeria',
    serves: '1-2 people',
    price: 'From $35',
    spicy: true,
  },
  {
    id: 'abacha',
    name: 'Abacha (African Salad)',
    desc: 'Sun-dried cassava with ugba, garden egg, and palm oil dressing',
    image: '/images/dishes/abacha.png',
    origin: 'Igbo, Nigeria',
    serves: '1-2 people',
    price: 'From $25',
    spicy: false,
  },
  {
    id: 'egusi-soup',
    name: 'Egusi Soup',
    desc: 'Rich melon seed soup with assorted meats and leafy greens',
    image: '/images/dishes/egusi-soup.png',
    origin: 'West Africa',
    serves: '2-3 people',
    price: 'From $45',
    spicy: true,
  },
];

export default function CuisinePreview() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className="section-label">African Cuisine</div>
          <div className={styles.headerRow}>
            <h2 className="display-lg">
              Taste the <span className="text-gradient">Motherland</span>
            </h2>
            <Link href="/services/african-cuisine" className="btn btn-outline hide-mobile" id="cuisine-view-menu">
              View Full Menu →
            </Link>
          </div>
          <p className="body-lg text-muted" style={{ maxWidth: 520, marginTop: '0.75rem' }}>
            Authentic Nigerian flavors crafted with traditional recipes and fresh ingredients —
            ordered for pickup, delivery, or catered at your event.
          </p>
        </div>

        {/* Dishes Grid */}
        <div className={styles.grid}>
          {dishes.map((dish) => (
            <div key={dish.id} className={`card card-glow ${styles.dishCard}`}>
              <div className={styles.imgWrapper}>
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.imgOverlay} />
                {dish.spicy && (
                  <span className={`badge badge-warning ${styles.spicyBadge}`}>
                    🌶 Spicy
                  </span>
                )}
              </div>

              <div className={styles.dishContent}>
                <div className={styles.dishMeta}>
                  <span className={styles.origin}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {dish.origin}
                  </span>
                  <span className={styles.serves}>Serves {dish.serves}</span>
                </div>
                <h3 className="heading-md">{dish.name}</h3>
                <p className="body-sm text-muted">{dish.desc}</p>
                <div className={styles.dishFooter}>
                  <span className={styles.price}>{dish.price}</span>
                  <Link href="/booking" className="btn btn-primary btn-sm" id={`order-${dish.id}`}>
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className={styles.mobileCta}>
          <Link href="/services/african-cuisine" className="btn btn-outline" id="cuisine-mobile-menu">
            Explore Full Menu →
          </Link>
        </div>

        {/* Feature Banner */}
        <div className={styles.featureBanner}>
          <div className={styles.featureItem}>
            <span>🧑‍🍳</span>
            <div>
              <strong>Authentic Recipes</strong>
              <p>Traditional methods, real ingredients</p>
            </div>
          </div>
          <div className={styles.featureDivider} />
          <div className={styles.featureItem}>
            <span>🚚</span>
            <div>
              <strong>Pickup & Delivery</strong>
              <p>Available across North Dakota</p>
            </div>
          </div>
          <div className={styles.featureDivider} />
          <div className={styles.featureItem}>
            <span>🎉</span>
            <div>
              <strong>Event Catering</strong>
              <p>Perfect for parties &amp; celebrations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
