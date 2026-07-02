import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <div className="container">
        {/* Top Section */}
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoImg}>
                <Image src="/logo.jpeg" alt="ServiceNest" width={44} height={44} />
              </div>
              <span className={styles.logoText}>
                Service<span className={styles.logoAccent}>Nest</span>
              </span>
            </Link>
            <p className={styles.tagline}>
              Premium hair braiding &amp; authentic African cuisine, right here in North Dakota.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Instagram" id="footer-instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Facebook" id="footer-facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="TikTok" id="footer-tiktok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linkGroup}>
            <h3 className={styles.linkTitle}>Services</h3>
            <ul className={styles.links}>
              <li><Link href="/services/hair-braiding">Hair Braiding</Link></li>
              <li><Link href="/services/african-cuisine">African Cuisine</Link></li>
              <li><Link href="/services">All Services</Link></li>
              <li><Link href="/booking">Book Now</Link></li>
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h3 className={styles.linkTitle}>Company</h3>
            <ul className={styles.links}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/reviews">Reviews</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactGroup}>
            <h3 className={styles.linkTitle}>Get in Touch</h3>
            <div className={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>North Dakota, USA</span>
            </div>
            <div className={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.06 6.06l.85-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>
              <span>+1 (701) 555-0100</span>
            </div>
            <div className={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>hello@servicenest.com</span>
            </div>
            <Link href="/booking" className={`btn btn-primary btn-sm ${styles.ctaBtn}`} id="footer-book-cta">
              Book Now
            </Link>
          </div>
        </div>

        <hr className="divider" />

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {year} ServiceNest. All rights reserved.
          </p>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
