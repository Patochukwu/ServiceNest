'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="page-hero">
        <div className="container">
          <div className={styles.grid}>
            {/* Contact Details */}
            <div className={styles.infoCol}>
              <div className="section-label">Get In Touch</div>
              <h1 className="display-lg">Contact Us</h1>
              <p className="body-lg text-muted">
                Have questions about our braiding hair textures, dish pre-orders, or group catering services? Drop us a message below.
              </p>

              <div className={styles.detailsList}>
                <div className={styles.detailItem}>
                  <span className={styles.icon}>📍</span>
                  <div>
                    <strong>Location</strong>
                    <p className="body-sm text-muted">North Dakota, USA</p>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <span className={styles.icon}>📞</span>
                  <div>
                    <strong>Phone</strong>
                    <p className="body-sm text-muted">+1 (701) 555-0100</p>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <span className={styles.icon}>✉️</span>
                  <div>
                    <strong>Email</strong>
                    <p className="body-sm text-muted">hello@servicenest.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.formCol}>
              <div className={`card ${styles.formCard}`}>
                <h3 className="heading-lg" style={{ marginBottom: '1.5rem' }}>Send Message</h3>

                {success && (
                  <div className={styles.successBanner}>
                    🎉 Thank you! Your message was sent successfully. We will review and reply as soon as possible.
                  </div>
                )}
                {error && <div className={styles.errorBanner}>⚠️ {error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      className="form-input"
                      placeholder="Braiding Inquiry / Catering Pre-order"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-textarea"
                      placeholder="Tell us what you need..."
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full justify-center"
                    disabled={loading}
                    id="submit-contact-form"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
