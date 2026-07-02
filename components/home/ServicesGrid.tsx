import Link from 'next/link';
import styles from './ServicesGrid.module.css';

const services = [
  {
    id: 'hair-braiding',
    href: '/services/hair-braiding',
    icon: '💇',
    category: 'Beauty',
    title: 'Hair Braiding',
    description: 'Expertly crafted African braiding styles tailored for every hair type. From knotless box braids to tribal cornrows and goddess locs.',
    features: ['Knotless Box Braids', 'Tribal Cornrows', 'Goddess Locs', 'Fulani Braids', 'Senegalese Twists'],
    cta: 'Browse Styles',
    color: '#E8820C',
    bg: 'rgba(232,130,12,0.06)',
    border: 'rgba(232,130,12,0.2)',
  },
  {
    id: 'african-cuisine',
    href: '/services/african-cuisine',
    icon: '🍲',
    category: 'Food',
    title: 'African Cuisine',
    description: 'Authentic Nigerian dishes cooked with love and tradition. Order for pickup, delivery, or special events in North Dakota.',
    features: ['Nkwobi', 'Abacha (African Salad)', 'Egusi Soup', 'Ofe Onugbu', 'Jollof Rice'],
    cta: 'Explore Menu',
    color: '#D4A017',
    bg: 'rgba(212,160,23,0.06)',
    border: 'rgba(212,160,23,0.2)',
  },
];

export default function ServicesGrid() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        {/* Header */}
        <div className={`text-center ${styles.header}`}>
          <div className="section-label">What We Offer</div>
          <h2 className="display-lg">
            Two Services, <span className="text-gradient">One Nest</span>
          </h2>
          <p className={`body-lg text-muted ${styles.desc}`}>
            Whether you&apos;re here for a stunning new look or a taste of authentic African flavors,
            ServiceNest delivers excellence in every experience.
          </p>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {services.map((svc) => (
            <div
              key={svc.id}
              className={`card card-glow ${styles.card}`}
              style={{
                '--svc-color': svc.color,
                '--svc-bg': svc.bg,
                '--svc-border': svc.border,
              } as React.CSSProperties}
            >
              {/* Top */}
              <div className={styles.cardTop}>
                <div className={styles.cardIcon}>
                  <span>{svc.icon}</span>
                </div>
                <span className={`badge ${styles.categoryBadge}`}>{svc.category}</span>
              </div>

              <h3 className={`heading-xl ${styles.cardTitle}`}>{svc.title}</h3>
              <p className={`body-md text-muted ${styles.cardDesc}`}>{svc.description}</p>

              {/* Features */}
              <ul className={styles.features}>
                {svc.features.map((feat) => (
                  <li key={feat} className={styles.featureItem}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={svc.href} className={`btn btn-outline ${styles.cardCta}`} id={`services-cta-${svc.id}`}>
                {svc.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* More Services Coming Banner */}
        <div className={styles.comingSoon}>
          <div className={styles.comingInner}>
            <span className={styles.comingIcon}>🚀</span>
            <div>
              <p className="heading-sm">More Services Coming Soon</p>
              <p className="body-sm text-muted">We&apos;re expanding — stay tuned for nail care, event planning, and more.</p>
            </div>
            <Link href="/contact" className="btn btn-ghost btn-sm">
              Get Notified →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
