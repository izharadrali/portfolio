import React from 'react';

function Blog() {
  const events = [
    {
      title: 'JS Conference 2025',
      date: 'Mar 20, 2025',
      img: '/src/assets/event1.svg',
      desc: 'Attended talks on performance and modern React architecture.'
    },
    {
      title: 'Design Meetup',
      date: 'Jun 10, 2025',
      img: '/src/assets/event2.svg',
      desc: 'Participated in a hands-on workshop about design systems.'
    },
    {
      title: 'Hackathon Weekend',
      date: 'Sep 05, 2025',
      img: '/src/assets/event3.svg',
      desc: 'Built a collaborative app with a small team during a 48h hackathon.'
    }
  ];

  return (
    <div className="page-container blog-page">
      <h1 data-aos="fade-up">Events & <span className="highlight">Blog</span></h1>
      <p className="page-lead" data-aos="fade-up" data-aos-delay="60">Here I share events I attend, talks, and short posts with images and media.</p>

      <div className="events-grid">
        {events.map((e, i) => (
          <article key={i} className="event-card" data-aos="fade-up" data-aos-delay={i * 120}>
            <div className="event-media">
              {/* placeholder images - replace with your images at the listed paths */}
              <img src={e.img} alt={e.title} />
            </div>
            <div className="event-body">
              <h3>{e.title}</h3>
              <time className="event-date">{e.date}</time>
              <p>{e.desc}</p>
              <div className="event-actions">
                <a href="#" className="btn outline">Read</a>
                <a href="#" className="social-cta-link"><i className="fab fa-github"></i> Notes</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blog;
