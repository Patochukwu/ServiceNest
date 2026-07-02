import prisma from '@/lib/db';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

interface Props {
  params: Promise<{ serviceSlug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { serviceSlug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug: serviceSlug },
  });
  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.name} — ServiceNest`,
    description: service.description,
  };
}

export default async function DynamicServicePage({ params }: Props) {
  const { serviceSlug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug: serviceSlug },
  });

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="page-hero">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.imageCol}>
              <div className={styles.imgWrapper}>
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            <div className={styles.contentCol}>
              <div className="section-label">{service.category.replace('-', ' ')}</div>
              <h1 className="display-lg">{service.name}</h1>
              <p className="body-lg text-muted">{service.longDesc || service.description}</p>

              <div className={styles.details}>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Duration:</span>
                  <span className={styles.value}>{service.duration} minutes</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Pricing starts at:</span>
                  <span className={styles.value}>${service.price}</span>
                </div>
              </div>

              <div className={styles.actions}>
                <Link href={`/booking?service=${service.id}`} className="btn btn-primary btn-lg" id={`book-slug-${service.slug}`}>
                  Book Service
                </Link>
                <Link href="/services" className="btn btn-outline btn-lg" id="back-services">
                  Back to Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
