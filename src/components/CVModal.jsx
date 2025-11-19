import React, { useState } from 'react';
import cvPdf from '../assets/Muhammad Izhar CV.pdf';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';

function CVModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: ''
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save lead to Firestore (if configured), then trigger download
    setStatus({ saving: true, success: null, error: null });

    const doDownload = () => {
      const link = document.createElement('a');
      link.href = cvPdf;
      link.download = 'Muhammad Izhar CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setStatus({ saving: false, success: 'Download started. Thank you!', error: null });
      // small delay so user sees success state before modal closes
      setTimeout(() => onClose(), 900);
    };

    if (isFirebaseConfigured && db) {
      addDoc(collection(db, 'cv_leads'), {
        name: formData.name,
        email: formData.email,
        purpose: formData.purpose,
        createdAt: serverTimestamp(),
        origin: typeof window !== 'undefined' ? window.location.href : null,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null
      }).then(() => {
        doDownload();
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Failed to save CV lead', err);
        setStatus({ saving: false, success: null, error: 'Failed to record download. Please try again.' });
      });
    } else {
      // If Firebase not configured, still allow download but inform user
      setStatus({ saving: false, success: null, error: 'Lead capture not configured. Download will proceed.' });
      // Give a short moment then download
      setTimeout(() => doDownload(), 400);
    }
  };

  const [status, setStatus] = useState({ saving: false, success: null, error: null });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" data-aos="zoom-in">
        <h3>Download CV</h3>
        <p>Please provide your information to download the CV:</p>
        
        <form onSubmit={handleSubmit} className="cv-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <select
              value={formData.purpose}
              onChange={(e) => setFormData({...formData, purpose: e.target.value})}
              required
            >
              <option value="">Purpose of Download</option>
              <option value="recruitment">Recruitment</option>
              <option value="freelance">Freelance Opportunity</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          {status.error && <div className="form-status error">{status.error}</div>}
          {status.success && <div className="form-status success">{status.success}</div>}

          <div className="modal-actions">
            <button type="button" className="btn outline" onClick={onClose} disabled={status.saving}>Cancel</button>
            <button type="submit" className="btn" disabled={status.saving}>
              {status.saving ? (<><span className="btn-spinner" aria-hidden></span>Preparing...</>) : 'Download CV'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CVModal;