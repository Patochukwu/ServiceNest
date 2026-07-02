import Link from 'next/link';
import Image from 'next/image';
import styles from './BraidingGalleryPreview.module.css';

const styles_data = [
  {
    id: 'knotless-box-braids',
    name: 'Knotless Box Braids',
    desc: 'Natural, tension-free braids perfect for all hair types',
    image: '/images/braiding/african-knotless.png',
    duration: '4-6 hrs',
    price: 'From $120',
    tag: 'African',
  },
  {
    id: 'goddess-locs',
    name: 'Goddess Locs',
    desc: 'Boho-inspired locs with loose, wavy ends for a free spirit look',
    image: '/images/braiding/american-goddess-locs.png',
    duration: '5-7 hrs',
    price: 'From $150',
    tag: 'American',
  },
  {
    id: 'tribal-cornrows',
    name: 'Tribal Cornrows',
    desc: 'Intricate geometric patterns rooted in African heritage',
    image: '/images/braiding/african-tribal-cornrows.png',
    duration: '3-5 hrs',
    price: 'From $90',
    tag: 'African',
  },
];

export default function BraidingGalleryPreview() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className="section-label">Hair Braiding</div>
            <h2 className="display-lg">
              Styles That Tell <span className="text-gradient">Your Story</span>
            </h2>
            <p className="body-lg text-muted" style={{ maxWidth: 480, marginTop: '0.75rem' }}>
              Each braid is a work of art — whether you&apos;re celebrating your heritage or trying
              something entirely new.
            </p>
          </div>
          <Link href="/services/hair-braiding" className="btn btn-outline hide-mobile" id="braiding-view-all">
            View All Styles →
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className={styles.gallery}>
          {styles_data.map((style, i) => (
            <Link
              href={`/services/hair-braiding#${style.id}`}
              key={style.id}
              className={`${styles.galleryCard} ${i === 0 ? styles.featured : ''}`}
              id={`braiding-gallery-${style.id}`}
            >
              <div className={styles.imgWrapper}>
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
                <div className={styles.imgOverlay} />
                <span className={`badge badge-primary ${styles.tagBadge}`}>{style.tag}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                  <span className={styles.duration}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {style.duration}
                  </span>
                  <span className={styles.price}>{style.price}</span>
                </div>
                <h3 className="heading-md">{style.name}</h3>
                <p className="body-sm text-muted">{style.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className={styles.mobileCta}>
          <Link href="/services/hair-braiding" className="btn btn-outline" id="braiding-mobile-view-all">
            View All Braiding Styles →
          </Link>
        </div>
      </div>
    </section>
  );
}
