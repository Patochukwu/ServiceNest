'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import styles from './AdminDashboard.module.css';

interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  notes: string | null;
  status: string;
  paymentStatus: string;
  service: {
    name: string;
  };
}

interface Review {
  id: string;
  customerName: string;
  email: string | null;
  serviceType: string;
  rating: number;
  comment: string;
  approved: boolean;
}

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;
  featured: boolean;
  active: boolean;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface AdminDashboardProps {
  initialBookings: Booking[];
  initialReviews: Review[];
  initialServices: Service[];
  initialContacts: ContactMessage[];
  stats: {
    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
    totalReviews: number;
    pendingReviews: number;
    totalServices: number;
  };
}

export default function AdminDashboard({
  initialBookings,
  initialReviews,
  initialServices,
  initialContacts,
  stats,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'bookings' | 'reviews' | 'services' | 'contacts'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [contacts] = useState<ContactMessage[]>(initialContacts);

  // New service modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    category: 'hair-braiding',
    description: '',
    longDesc: '',
    price: '',
    duration: '',
    imageUrl: '/images/braiding/african-knotless.png',
    featured: false,
  });

  const [serviceError, setServiceError] = useState('');
  const [serviceSuccess, setServiceSuccess] = useState('');

  // Handle booking status updates
  const handleUpdateBookingStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error('Failed to update booking status.');

      setBookings(prev =>
        prev.map(b => (b.id === id ? { ...b, status } : b))
      );
    } catch (err) {
      alert('Error updating booking status.');
    }
  };

  // Handle review approval
  const handleApproveReview = async (id: string) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: true }),
      });

      if (!res.ok) throw new Error('Failed to approve review.');

      setReviews(prev =>
        prev.map(r => (r.id === id ? { ...r, approved: true } : r))
      );
    } catch (err) {
      alert('Error approving review.');
    }
  };

  // Handle review deletion
  const handleDeleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });

      if (!res.ok) throw new Error('Failed to delete review.');

      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      alert('Error deleting review.');
    }
  };

  // Handle service additions
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setServiceError('');
    setServiceSuccess('');

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add service.');

      setServices(prev => [data, ...prev]);
      setServiceSuccess('Service added successfully!');
      setNewService({
        name: '',
        category: 'hair-braiding',
        description: '',
        longDesc: '',
        price: '',
        duration: '',
        imageUrl: '/images/braiding/african-knotless.png',
        featured: false,
      });
      setTimeout(() => {
        setIsModalOpen(false);
        setServiceSuccess('');
      }, 1000);
    } catch (err: any) {
      setServiceError(err.message || 'Failed to create service.');
    }
  };

  // Handle service state toggles
  const handleToggleServiceActive = async (id: string, active: boolean) => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active }),
      });

      if (!res.ok) throw new Error('Failed to update service state.');

      setServices(prev =>
        prev.map(s => (s.id === id ? { ...s, active } : s))
      );
    } catch (err) {
      alert('Error updating service status.');
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={`card ${styles.statCard}`}>
          <span>📅 Total Bookings</span>
          <strong>{stats.totalBookings}</strong>
        </div>
        <div className={`card ${styles.statCard}`}>
          <span>⏳ Pending Approval</span>
          <strong style={{ color: 'var(--warning)' }}>{stats.pendingBookings}</strong>
        </div>
        <div className={`card ${styles.statCard}`}>
          <span>⭐ Pending Reviews</span>
          <strong style={{ color: 'var(--gold-light)' }}>{stats.pendingReviews}</strong>
        </div>
        <div className={`card ${styles.statCard}`}>
          <span>⚙️ Active Services</span>
          <strong>{stats.totalServices}</strong>
        </div>
      </div>

      {/* Control bar / Tabs */}
      <div className={styles.tabsRow}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'bookings' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('bookings')}
            id="tab-bookings"
          >
            Bookings Queue
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('reviews')}
            id="tab-reviews"
          >
            Reviews Approval ({reviews.filter(r => !r.approved).length})
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'services' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('services')}
            id="tab-services"
          >
            Manage Services
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'contacts' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('contacts')}
            id="tab-contacts"
          >
            Messages
          </button>
        </div>

        <div className={styles.actions}>
          {activeTab === 'services' && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setIsModalOpen(true)}
              id="admin-add-service-btn"
            >
              + Add New Service
            </button>
          )}
          <button
            className="btn btn-outline btn-sm"
            onClick={() => signOut({ callbackUrl: '/' })}
            id="admin-logout-btn"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs Content */}
      <div className={styles.tabContent}>
        {/* Bookings Queue */}
        {activeTab === 'bookings' && (
          <div className={`card ${styles.tableCard}`}>
            <div className={styles.tableResponsive}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Date &amp; Time</th>
                    <th>Notes</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                        No bookings scheduled.
                      </td>
                    </tr>
                  ) : (
                    bookings.map(b => (
                      <tr key={b.id}>
                        <td>
                          <strong>{b.customerName}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {b.email} <br /> {b.phone}
                          </div>
                        </td>
                        <td>{b.service.name}</td>
                        <td>
                          <strong>{new Date(b.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.timeSlot}</div>
                        </td>
                        <td style={{ maxWidth: '200px', fontSize: '0.85rem' }}>{b.notes || '—'}</td>
                        <td>
                          <span className={`badge ${
                            b.status === 'confirmed' ? 'badge-success' :
                            b.status === 'cancelled' ? 'badge-error' : 'badge-warning'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td>
                          <div className={styles.actionCell}>
                            {b.status === 'pending' && (
                              <>
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                                  id={`approve-booking-${b.id}`}
                                >
                                  Approve
                                </button>
                                <button
                                  className="btn btn-outline btn-sm"
                                  onClick={() => handleUpdateBookingStatus(b.id, 'cancelled')}
                                  id={`cancel-booking-${b.id}`}
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {b.status !== 'pending' && <span style={{ color: 'var(--text-muted)' }}>Locked</span>}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reviews Queue */}
        {activeTab === 'reviews' && (
          <div className={`card ${styles.tableCard}`}>
            <div className={styles.tableResponsive}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Reviewer</th>
                    <th>Category</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                        No reviews submitted yet.
                      </td>
                    </tr>
                  ) : (
                    reviews.map(r => (
                      <tr key={r.id}>
                        <td>
                          <strong>{r.customerName}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.email || 'No Email'}</div>
                        </td>
                        <td>
                          <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                            {r.serviceType}
                          </span>
                        </td>
                        <td>{r.rating} ★</td>
                        <td style={{ maxWidth: '300px', fontSize: '0.85rem' }}>&ldquo;{r.comment}&rdquo;</td>
                        <td>
                          <span className={`badge ${r.approved ? 'badge-success' : 'badge-warning'}`}>
                            {r.approved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td>
                          <div className={styles.actionCell}>
                            {!r.approved && (
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleApproveReview(r.id)}
                                id={`approve-review-${r.id}`}
                              >
                                Approve
                              </button>
                            )}
                            <button
                              className="btn btn-outline btn-sm"
                              onClick={() => handleDeleteReview(r.id)}
                              id={`delete-review-${r.id}`}
                              style={{ borderColor: 'var(--error)', color: 'var(--error)' }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Services List */}
        {activeTab === 'services' && (
          <div className={styles.servicesGrid}>
            {services.map(s => (
              <div key={s.id} className={`card ${styles.serviceCard}`}>
                <h3 className="heading-md">{s.name}</h3>
                <span className="badge badge-primary" style={{ alignSelf: 'flex-start' }}>{s.category}</span>
                <p className="body-sm text-muted">{s.description}</p>
                <div className={styles.serviceMeta}>
                  <strong>${s.price}</strong>
                  <span>⏱ {s.duration} mins</span>
                </div>
                <div className={styles.serviceActions}>
                  <button
                    className={`btn ${s.active ? 'btn-outline' : 'btn-primary'} btn-sm w-full`}
                    onClick={() => handleToggleServiceActive(s.id, !s.active)}
                    id={`toggle-service-${s.id}`}
                  >
                    {s.active ? 'Disable Service' : 'Enable Service'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Messages List */}
        {activeTab === 'contacts' && (
          <div className={styles.messagesList}>
            {contacts.length === 0 ? (
              <div className={`card ${styles.tableCard}`} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No messages received yet.
              </div>
            ) : (
              contacts.map(c => (
                <div key={c.id} className={`card ${styles.messageCard}`}>
                  <div className={styles.msgHeader}>
                    <div>
                      <strong>{c.name}</strong> &bull; <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.email}</span>
                    </div>
                    <span className={styles.msgDate}>{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="heading-sm" style={{ margin: '0.5rem 0' }}>{c.subject}</h4>
                  <p className="body-md text-secondary">{c.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* New Service Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="heading-lg">Add New Service</h3>
              <button className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleAddService}>
              <div className="modal-body">
                {serviceSuccess && <div className={styles.successBanner}>🎉 {serviceSuccess}</div>}
                {serviceError && <div className={styles.errorBanner}>⚠️ {serviceError}</div>}

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label htmlFor="modal-service-name" className="form-label">Service Name *</label>
                  <input
                    id="modal-service-name"
                    type="text"
                    className="form-input"
                    value={newService.name}
                    onChange={e => setNewService(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Senegalese Twists"
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label htmlFor="modal-service-category" className="form-label">Category *</label>
                  <select
                    id="modal-service-category"
                    className="form-select"
                    value={newService.category}
                    onChange={e => setNewService(prev => ({ ...prev, category: e.target.value }))}
                    required
                  >
                    <option value="hair-braiding">Hair Braiding</option>
                    <option value="african-cuisine">African Cuisine</option>
                    <option value="other">Other Service</option>
                  </select>
                </div>

                <div className={styles.row} style={{ marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label htmlFor="modal-service-price" className="form-label">Starting Price ($) *</label>
                    <input
                      id="modal-service-price"
                      type="number"
                      step="0.01"
                      className="form-input"
                      value={newService.price}
                      onChange={e => setNewService(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="120"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="modal-service-duration" className="form-label">Duration (minutes) *</label>
                    <input
                      id="modal-service-duration"
                      type="number"
                      className="form-input"
                      value={newService.duration}
                      onChange={e => setNewService(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="180"
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label htmlFor="modal-service-desc" className="form-label">Short Description *</label>
                  <input
                    id="modal-service-desc"
                    type="text"
                    className="form-input"
                    value={newService.description}
                    onChange={e => setNewService(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief highlight of the service..."
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label htmlFor="modal-service-longdesc" className="form-label">Long Description (Optional)</label>
                  <textarea
                    id="modal-service-longdesc"
                    className="form-textarea"
                    value={newService.longDesc}
                    onChange={e => setNewService(prev => ({ ...prev, longDesc: e.target.value }))}
                    placeholder="Full service description details..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="modal-service-img" className="form-label">Image URL *</label>
                  <input
                    id="modal-service-img"
                    type="text"
                    className="form-input"
                    value={newService.imageUrl}
                    onChange={e => setNewService(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="/images/braiding/african-knotless.png"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" id="modal-submit-service">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
