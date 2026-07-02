import prisma from '@/lib/db';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ReviewForm from '@/components/reviews/ReviewForm';
import styles from './page.module.css';

export const metadata = {
  title: 'Client Reviews & Testimonials',
  description: 'Read reviews and feedback from our hair braiding and African dish catering clients in North Dakota.',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24"
          fill={i < rating ? 'var(--gold)' : 'var(--bg-surface-3)'}
          stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <Navbar />
      <main className="page-hero">
        <div className="container">
          <div className={styles.wrapper}>
            {/* Reviews list */}
            <div className={styles.listCol}>
              <div className="section-label">Client Feedback</div>
              <h1 className="display-lg">Loved by Our Nest</h1>
              <p className="body-lg text-muted" style={{ marginBottom: '2.5rem' }}>
                We appreciate feedback from our guest bookings. See what our North Dakota clients say about their braiding styles and culinary experiences.
              </p>

              <div className={styles.reviewsList}>
                {reviews.length === 0 ? (
                  <p className="body-md text-muted">No reviews approved yet. Be the first to submit!</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className={`card ${styles.reviewCard}`}>
                      <div className={styles.cardHeader}>
                        <div className={styles.reviewerInfo}>
                          <span className={styles.avatar}>
                            {review.serviceType === 'hair-braiding' ? '💇' : '🍲'}
                          </span>
                          <div>
                            <strong className={styles.reviewerName}>{review.customerName}</strong>
                            <div className={styles.serviceMeta}>
                              <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
                                {review.serviceType === 'hair-braiding' ? 'Hair Braiding' : 'African Cuisine'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="body-md text-secondary">&ldquo;{review.comment}&rdquo;</p>
                      <span className={styles.date}>
                        {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Leave a review form */}
            <div className={styles.formCol}>
              <div className={`card ${styles.formCard}`}>
                <h3 className="heading-lg" style={{ marginBottom: '0.5rem' }}>Share Your Experience</h3>
                <p className="body-sm text-muted" style={{ marginBottom: '1.5rem' }}>
                  Your feedback helps us grow. Submitted reviews will be posted after admin approval.
                </p>
                <ReviewForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
