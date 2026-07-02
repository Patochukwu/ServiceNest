import Link from 'next/link';
import styles from './CTASection.module.css';

export default function CTASection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.banner}>
          <div className={styles.glowLeft} />
          <div className={styles.glowRight} />

          <div className={styles.content}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Ready to Get Started?</div>
            <h2 className={`display-md ${styles.headline}`}>
              Your Beauty & Flavor Journey Starts Here
            </h2>
            <p className={`body-lg text-muted ${styles.desc}`}>
              Book a braiding session, order an authentic Nigerian dish, or do both.
              ServiceNest is your one-stop destination in North Dakota.
            </p>

            <div className={styles.actions}>
              <Link href="/booking" className="btn btn-primary btn-lg" id="cta-book-appointment">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Book an Appointment
              </Link>
              <Link href="/services/african-cuisine" className="btn btn-outline btn-lg" id="cta-order-food">
                🍲 Order Food Now
              </Link>
            </div>

            {/* Micro-trust */}
            <div className={styles.trust}>
              <div className={styles.trustItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>No account required</span>
              </div>
              <div className={styles.trustItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Instant confirmation email</span>
              </div>
              <div className={styles.trustItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Free cancellation 24h before</span>
              </div>
            </div>
          </div>

          {/* Decorative Emojis */}
          <div className={styles.deco1}>💇</div>
          <div className={styles.deco2}>🍲</div>
          <div className={styles.deco3}>⭐</div>
        </div>
      </div>
    </section>
  );
}
