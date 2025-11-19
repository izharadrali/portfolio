import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';

// Removed EmailJS configuration as we are only using Firestore now.

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ sending: false, success: null, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: null, error: null });



    // Only persist to Firestore. If Firebase isn't configured, show an error and don't attempt mail.
    if (!isFirebaseConfigured || !db) {
      setStatus({ sending: false, success: null, error: 'Messaging is not configured yet. Please try again later.' });
      return;
    }

    setStatus({ sending: true, success: null, error: null });

    try {
      await addDoc(collection(db, 'messages'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        origin: typeof window !== 'undefined' ? window.location.href : null
      });

      setStatus({ sending: false, success: 'Message received — thank you! I will get back to you soon.', error: null });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Firestore error:', err);
      setStatus({ sending: false, success: null, error: 'Failed to store message. Please try again later.' });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="page-container">
      <h1 data-aos="fade-up">Get in <span className="highlight">Touch</span></h1>
      <div className="contact-container" data-aos="fade-up" data-aos-delay="100">
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <p>izharadrali@gmail.com</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <p>Your Location</p>
          </div>
          <div className="social-links">
            <a href="https://github.com/izharadrali" className="social-link" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/muhammadizhar-" className="social-link" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
            <a href="mailto:izharadrali@gmail.com" className="social-link"><i className="fas fa-envelope"></i></a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {status.error && <div className="form-status error">{status.error}</div>}
          {status.success && <div className="form-status success">{status.success}</div>}

          <button type="submit" className="btn" disabled={status.sending}>
            {status.sending ? (
              <>
                <span className="btn-spinner" aria-hidden></span>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>

          {!isFirebaseConfigured && (
            <p className="form-note">Messaging is not configured. To collect messages, set your Firebase Vite env vars (see README) and redeploy.</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Contact;