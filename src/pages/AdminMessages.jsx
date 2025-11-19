import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

function formatTs(ts) {
  try {
    if (!ts) return '-';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString();
  } catch (e) {
    return '-';
  }
}

export default function AdminMessages() {
  const [authorized, setAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [messages, setMessages] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');

  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || '';

  useEffect(() => {
    if (!authorized) return;
    if (!db) return;

    // subscribe to messages
    setLoadingMessages(true);
    const qMsgs = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMsgs = onSnapshot(qMsgs, (snap) => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setMessages(docs);
      setLoadingMessages(false);
    }, (err) => {
      // eslint-disable-next-line no-console
      console.error('Messages snapshot error', err);
      setLoadingMessages(false);
    });

    // subscribe to cv_leads
    setLoadingLeads(true);
    const qLeads = query(collection(db, 'cv_leads'), orderBy('createdAt', 'desc'));
    const unsubLeads = onSnapshot(qLeads, (snap) => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setLeads(docs);
      setLoadingLeads(false);
    }, (err) => {
      // eslint-disable-next-line no-console
      console.error('Leads snapshot error', err);
      setLoadingLeads(false);
    });

    return () => {
      unsubMsgs && unsubMsgs();
      unsubLeads && unsubLeads();
    };
  }, [authorized]);

  const handleAuth = (e) => {
    e.preventDefault();
    if (!ADMIN_PASS) {
      alert('No admin passcode configured. Set VITE_ADMIN_PASS in your env.');
      return;
    }
    if (passcode === ADMIN_PASS) setAuthorized(true);
    else alert('Incorrect passcode');
  };

  return (
    <div className="page-container">
      <h1>Admin — <span className="highlight">Messages & Leads</span></h1>
      {!authorized ? (
        <div style={{maxWidth:700, margin:'2rem auto'}}>
          <p className="page-lead">Enter the admin passcode to view messages and CV leads. Configure `VITE_ADMIN_PASS` in your `.env.local` or GitHub Secrets.</p>
          <form onSubmit={handleAuth} style={{display:'flex', gap:12, marginTop:12}}>
            <input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="Admin passcode" style={{flex:1, padding:'10px 12px', borderRadius:8, border:'1px solid #ddd'}} />
            <button className="btn" type="submit">Unlock</button>
          </form>
        </div>
      ) : (
        <div style={{maxWidth:1000, margin:'1.5rem auto', textAlign:'left'}}>
          <p className="page-lead">Messages and CV leads are read-only. Use the Firebase Console to manage documents.</p>

          <div style={{display:'flex', gap:12, marginBottom:16}}>
            <button className={`btn ${activeTab==='messages' ? '' : 'outline'}`} onClick={() => setActiveTab('messages')}>Messages</button>
            <button className={`btn ${activeTab==='leads' ? '' : 'outline'}`} onClick={() => setActiveTab('leads')}>CV Leads</button>
          </div>

          {activeTab === 'messages' && (
            <div>
              {loadingMessages && <p>Loading messages…</p>}
              {!loadingMessages && messages.length === 0 && <p>No messages yet.</p>}
              <div style={{display:'grid', gap:'1rem'}}>
                {messages.map(m => (
                  <div key={m.id} className="project-card" style={{padding:'18px'}}>
                    <div style={{display:'flex', justifyContent:'space-between', gap:12}}>
                      <div>
                        <h3 style={{margin:0}}>{m.name || '—'}</h3>
                        <div style={{color:'#6a7b85', marginTop:6}}>{m.email || '—'}</div>
                      </div>
                      <div style={{textAlign:'right', color:'#6a7b85'}}>{formatTs(m.createdAt)}</div>
                    </div>
                    <p style={{marginTop:12, whiteSpace:'pre-wrap'}}>{m.message}</p>
                    <div style={{marginTop:10, display:'flex', gap:8, flexWrap:'wrap'}}>
                      {m.userAgent && <span className="skill-tag">UA</span>}
                      {m.origin && <span className="skill-tag">origin</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div>
              {loadingLeads && <p>Loading leads…</p>}
              {!loadingLeads && leads.length === 0 && <p>No CV leads yet.</p>}
              <div style={{display:'grid', gap:'1rem'}}>
                {leads.map(l => (
                  <div key={l.id} className="project-card" style={{padding:'18px'}}>
                    <div style={{display:'flex', justifyContent:'space-between', gap:12}}>
                      <div>
                        <h3 style={{margin:0}}>{l.name || '—'}</h3>
                        <div style={{color:'#6a7b85', marginTop:6}}>{l.email || '—'}</div>
                      </div>
                      <div style={{textAlign:'right', color:'#6a7b85'}}>{formatTs(l.createdAt)}</div>
                    </div>
                    <p style={{marginTop:12}}><strong>Purpose:</strong> {l.purpose || '—'}</p>
                    <div style={{marginTop:10, display:'flex', gap:8, flexWrap:'wrap'}}>
                      {l.userAgent && <span className="skill-tag">UA</span>}
                      {l.origin && <span className="skill-tag">origin</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
