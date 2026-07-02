'use client';

import { useState } from 'react';
import styles from './ReviewForm.module.css';

export default function ReviewForm() {
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    serviceType: 'general',
    rating: 5,
    comment: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    if (!form.customerName || !form.comment) {
      setError('Name and Review Comment are required.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit review.');
      }

      setSuccess(true);
      setForm({
        customerName: '',
        email: '',
        serviceType: 'general',
        rating: 5,
        comment: '',
      });
    } catch (err: any) {
      setError(err.message || 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {success && (
        <div className={styles.successBanner}>
          🎉 Review submitted successfully! It will appear on the site once approved by our administrator.
        </div>
      )}
      {error && <div className={styles.errorBanner}>⚠️ {error}</div>}

      <div className="form-group">
        <label htmlFor="customerName" className="form-label">Your Name *</label>
        <input
          id="customerName"
          type="text"
          name="customerName"
          className="form-input"
          placeholder="Jane Doe"
          value={form.customerName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Email Address (Optional)</label>
        <input
          id="email"
          type="email"
          name="email"
          className="form-input"
          placeholder="jane@example.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="serviceType" className="form-label">Service Experienced</label>
        <select
          id="serviceType"
          name="serviceType"
          className="form-select"
          value={form.serviceType}
          onChange={handleChange}
        >
          <option value="general">General Feedback</option>
          <option value="hair-braiding">Hair Braiding</option>
          <option value="african-cuisine">African Cuisine</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="rating" className="form-label">Rating *</label>
        <select
          id="rating"
          name="rating"
          className="form-select"
          value={form.rating}
          onChange={handleChange}
          required
        >
          <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
          <option value="4">⭐⭐⭐⭐ (4/5)</option>
          <option value="3">⭐⭐⭐ (3/5)</option>
          <option value="2">⭐⭐ (2/5)</option>
          <option value="1">⭐ (1/5)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="comment" className="form-label">Review Comment *</label>
        <textarea
          id="comment"
          name="comment"
          className="form-textarea"
          placeholder="How was your service? Let us know!"
          value={form.comment}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full justify-center"
        disabled={loading}
        id="submit-review-form"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
