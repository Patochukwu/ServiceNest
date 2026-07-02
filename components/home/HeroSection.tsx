'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
    }));
    setParticles(generated);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--mouse-x', `${x}%`);
      hero.style.setProperty('--mouse-y', `${y}%`);
    };
    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className={styles.hero} ref={heroRef} id="hero">
      {/* Background */}
      <div className={styles.heroBg}>
        <Image
          src="/images/hero-bg.png"
          alt="ServiceNest - Hair Braiding and African Cuisine"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          quality={90}
        />
        <div className={styles.heroBgOverlay} />
        <div className={styles.heroBgGradient} />
      </div>

      {/* Floating Orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.particleField}>
        {particles.map((p, i) => (
          <div key={i} className={styles.particle} style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          } as React.CSSProperties} />
        ))}
      </div>

      {/* Content */}
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroLeft}>
          {/* Badge */}
          <div className={`badge badge-primary animate-fade-up ${styles.heroBadge}`}>
            <span className={styles.dot} />
            North Dakota&apos;s Premier African Services
          </div>

          {/* Headline */}
          <h1 className={`display-xl animate-fade-up delay-100 ${styles.headline}`}>
            Where <span className="text-gradient">Beauty</span>{' '}
            Meets <span className="text-gradient">Flavor</span>
          </h1>

          <p className={`body-lg animate-fade-up delay-200 ${styles.subheadline}`}>
            Premium African hair braiding &amp; authentic Nigerian cuisine — all under one roof.
            Experience culture, craft, and community in North Dakota.
          </p>

          {/* CTA Buttons */}
          <div className={`animate-fade-up delay-300 ${styles.ctaGroup}`}>
            <Link href="/booking" className="btn btn-primary btn-lg" id="hero-book-now">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Book an Appointment
            </Link>
            <Link href="/services" className="btn btn-outline btn-lg" id="hero-explore-services">
              Explore Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className={`animate-fade-up delay-400 ${styles.trustRow}`}>
            <div className={styles.trustItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>4.9 Rating</span>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>500+ Happy Clients</span>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>100% Authentic</span>
            </div>
          </div>
        </div>

        {/* Right: Floating Cards */}
        <div className={`animate-slide-right delay-200 ${styles.heroRight}`}>
          <div className={styles.floatingCards}>
            {/* Card 1: Hair Braiding */}
            <div className={`${styles.floatingCard} ${styles.card1}`}>
              <div className={styles.cardImg}>
                <Image src="/images/braiding/african-knotless.png" alt="Knotless Box Braids" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardCategory}>Hair Braiding</span>
                <span className={styles.cardName}>Knotless Box Braids</span>
                <span className={styles.cardPrice}>From $120</span>
              </div>
            </div>

            {/* Card 2: Cuisine */}
            <div className={`${styles.floatingCard} ${styles.card2}`}>
              <div className={styles.cardImg}>
                <Image src="/images/dishes/nkwobi.png" alt="Nkwobi" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardCategory}>African Cuisine</span>
                <span className={styles.cardName}>Nkwobi Delight</span>
                <span className={styles.cardPrice}>From $35</span>
              </div>
            </div>

            {/* Booking Ping */}
            <div className={styles.bookingPing}>
              <div className={styles.pingDot} />
              <span>3 bookings today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
