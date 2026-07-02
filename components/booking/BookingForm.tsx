'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './BookingForm.module.css';

interface ServiceOption {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
}

interface BookingFormProps {
  services: ServiceOption[];
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

function BookingFormInner({ services }: BookingFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedServiceId = searchParams.get('service');

  const [form, setForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    serviceId: '',
    date: '',
    timeSlot: '',
    notes: '',
    paymentOption: 'pay-later',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (preselectedServiceId && services.some(s => s.id === preselectedServiceId)) {
      setForm(prev => ({ ...prev, serviceId: preselectedServiceId }));
    } else if (services.length > 0) {
      setForm(prev => ({ ...prev, serviceId: services[0].id }));
    }
  }, [preselectedServiceId, services]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const selectedService = services.find(s => s.id === form.serviceId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!form.customerName || !form.email || !form.phone || !form.serviceId || !form.date || !form.timeSlot) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      router.push(`/booking/confirmation?id=${data.id}`);
    } catch (err: any) {
      setError(err.message || 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get current date formatted for min date attribute (YYYY-MM-DD)
  const getMinDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.errorBanner}>⚠️ {error}</div>}

      {/* Service Selection */}
      <div className="form-group">
        <label htmlFor="serviceId" className="form-label">Select Service *</label>
        <select
          id="serviceId"
          name="serviceId"
          className="form-select"
          value={form.serviceId}
          onChange={handleChange}
          required
        >
          {services.map((svc) => (
            <option key={svc.id} value={svc.id}>
              {svc.name} (${svc.price})
            </option>
          ))}
        </select>
      </div>

      {/* Guest Personal Info */}
      <div className={styles.row}>
        <div className="form-group">
          <label htmlFor="customerName" className="form-label">Full Name *</label>
          <input
            id="customerName"
            type="text"
            name="customerName"
            className="form-input"
            placeholder="John Doe"
            value={form.customerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number *</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            className="form-input"
            placeholder="(701) 555-0100"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Email Address *</label>
        <input
          id="email"
          type="email"
          name="email"
          className="form-input"
          placeholder="your@email.com"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Date & Time Picker */}
      <div className={styles.row}>
        <div className="form-group">
          <label htmlFor="date" className="form-label">Preferred Date *</label>
          <input
            id="date"
            type="date"
            name="date"
            className="form-input"
            min={getMinDate()}
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="timeSlot" className="form-label">Preferred Time *</label>
          <select
            id="timeSlot"
            name="timeSlot"
            className="form-select"
            value={form.timeSlot}
            onChange={handleChange}
            required
          >
            <option value="">Select a Slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="form-group">
        <label htmlFor="notes" className="form-label">Special Requirements / Dish Details</label>
        <textarea
          id="notes"
          name="notes"
          className="form-textarea"
          placeholder="For braids: list length/color preference. For food: list allergies, delivery instructions, or soup swallow preferences."
          value={form.notes}
          onChange={handleChange}
        />
      </div>

      {/* Payment Options (Scaffolded provision) */}
      <div className={styles.paymentSection}>
        <span className="form-label">Payment Option</span>
        <div className={styles.paymentGrid}>
          <label className={`${styles.paymentLabel} ${form.paymentOption === 'pay-later' ? styles.activePayment : ''}`}>
            <input
              type="radio"
              name="paymentOption"
              value="pay-later"
              checked={form.paymentOption === 'pay-later'}
              onChange={handleChange}
            />
            <div>
              <strong>Pay Later / Cash</strong>
              <p>Pay at appointment or pickup</p>
            </div>
          </label>

          <label className={`${styles.paymentLabel} ${styles.disabledPayment} ${form.paymentOption === 'stripe' ? styles.activePayment : ''}`}>
            <input
              type="radio"
              name="paymentOption"
              value="stripe"
              disabled
              checked={form.paymentOption === 'stripe'}
              onChange={handleChange}
            />
            <div>
              <strong>Pay Online (Stripe) 🔒</strong>
              <p>Secure online checkout (Coming soon)</p>
            </div>
          </label>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary w-full justify-center btn-lg"
        disabled={loading}
        id="submit-booking-form"
      >
        {loading ? (
          <>
            <span className="animate-spin" style={{ marginRight: 8 }}>⏳</span>
            Booking your slot...
          </>
        ) : (
          `Complete Booking (${selectedService ? `$${selectedService.price}` : ''})`
        )}
      </button>
    </form>
  );
}

export default function BookingForm({ services }: BookingFormProps) {
  return (
    <Suspense fallback={<div>Loading form configuration...</div>}>
      <BookingFormInner services={services} />
    </Suspense>
  );
}
