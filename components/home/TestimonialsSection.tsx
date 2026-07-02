'use client';

import { useState } from 'react';
import styles from './TestimonialsSection.module.css';

const testimonials = [
  {
    id: 1,
    name: 'Amara Okonkwo',
    serviceType: 'Hair Braiding',
    rating: 5,
    comment: 'Absolutely stunning knotless braids! The attention to detail is incredible. My hair has never looked this beautiful. I get compliments everywhere I go. ServiceNest is the ONLY place I trust with my hair.',
    avatar: '👩🏾',
    date: '2 weeks ago',
  },
  {
    id: 2,
    name: 'Jennifer Williams',
    serviceType: 'Hair Braiding',
    rating: 5,
    comment: 'As an American woman trying African braiding for the first time, I was nervous. But the team here made me feel so comfortable! My goddess locs look absolutely magical. Will definitely be back!',
    avatar: '👩🏼',
    date: '1 month ago',
  },
  {
    id: 3,
    name: 'Chidi Eze',
    serviceType: 'African Cuisine',
    rating: 5,
    comment: 'The Nkwobi tastes exactly like back home in Anambra. I shed a tear — it brought back so many memories. Finding authentic Igbo food in North Dakota is nearly impossible, but ServiceNest delivers perfection every time.',
    avatar: '👨🏿',
    date: '3 weeks ago',
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    serviceType: 'African Cuisine',
    rating: 5,
    comment: 'I ordered the Egusi soup and Abacha for my office potluck and everyone went CRAZY over it. Authentic, flavorful, beautifully presented. Ordered again the very next week. ServiceNest is a hidden gem!',
    avatar: '👩🏻',
    date: '5 days ago',
  },
  {
    id: 5,
    name: 'Ngozi Adeyemi',
    serviceType: 'Hair Braiding',
    rating: 5,
    comment: 'The tribal cornrows I got here are absolute art. My husband keeps saying I look like a queen! The braider is incredibly skilled and the salon atmosphere is warm and welcoming.',
    avatar: '👩🏾',
    date: '2 months ago',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < rating ? 'var(--gold)' : 'var(--bg-surface-3)'}
          stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={`section ${styles.section}`}>
      <div className={styles.bgPattern} />
      <div className="container">
        {/* Header */}
        <div className={`text-center ${styles.header}`}>
          <div className="section-label">Client Reviews</div>
          <h2 className="display-lg">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="body-lg text-muted" style={{ maxWidth: 480, margin: '1rem auto 0' }}>
            Real stories from real clients across North Dakota and beyond.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className={styles.carousel}>
          <div className={styles.carouselTrack}>
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`${styles.testimonialCard} ${i === activeIndex ? styles.active : ''} ${Math.abs(i - activeIndex) === 1 ? styles.adjacent : ''}`}
                onClick={() => setActiveIndex(i)}
              >
                {/* Quote Icon */}
                <div className={styles.quoteIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--primary)" opacity="0.3">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                  </svg>
                </div>

                <StarRating rating={t.rating} />
                <p className={styles.comment}>&ldquo;{t.comment}&rdquo;</p>

                <div className={styles.reviewer}>
                  <div className={styles.avatar}>{t.avatar}</div>
                  <div>
                    <p className={styles.reviewerName}>{t.name}</p>
                    <p className={styles.reviewerMeta}>
                      <span className="badge badge-primary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                        {t.serviceType}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.date}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`View testimonial ${i + 1}`}
                id={`testimonial-dot-${i}`}
              />
            ))}
          </div>

          {/* Nav Arrows */}
          <div className={styles.navBtns}>
            <button
              className="btn btn-ghost btn-icon"
              onClick={() => setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)}
              id="testimonial-prev"
              aria-label="Previous testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button
              className="btn btn-ghost btn-icon"
              onClick={() => setActiveIndex((activeIndex + 1) % testimonials.length)}
              id="testimonial-next"
              aria-label="Next testimonial"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
