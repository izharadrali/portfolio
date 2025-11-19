import React, { useState } from 'react';

const ProjectItem = ({ p, idx }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Create a short version of the description (first 90 chars for a cleaner look)
  const shortIntro = p.desc.length > 90 ? p.desc.substring(0, 90) + '...' : p.desc;

  return (
    <article className="project-card" data-aos="fade-up" data-aos-delay={idx * 120}>
      <h3>{p.title}</h3>

      {/* Video - Always Visible */}
      {p.video ? (
        <div className="project-video">
          <iframe src={p.video} title={`${p.title} demo`} frameBorder="0" allowFullScreen></iframe>
        </div>
      ) : null}

      {/* Description - Short Intro by default */}
      <div className="project-desc" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
        <p style={{ margin: 0 }}>
          {isExpanded ? p.desc : shortIntro}
        </p>
        
        {/* Toggle Button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'inherit', 
            textDecoration: 'underline', 
            cursor: 'pointer',
            fontSize: '0.85rem',
            padding: '0',
            marginTop: '5px',
            opacity: 0.8,
            display: 'block' 
          }}
        >
          {isExpanded ? 'See Less' : 'See More'}
        </button>
      </div>

      {/* Action Buttons - Always Visible */}
      <div className="project-actions" style={{ marginTop: '1.5rem' }}>
        {p.live && p.live !== '#' ? (
          <a className="btn outline" href={p.live} target="_blank" rel="noreferrer">Live Demo</a>
        ) : null}

        {p.repo ? (
          <a className="btn" href={p.repo} target="_blank" rel="noreferrer"><i className="fab fa-github"></i> View Repo</a>
        ) : null}
      </div>
    </article>
  );
};

function Projects() {
  // Cleaned up titles (removed technical terms like CNN, LSTM, NLP)
  const projects = [
    {
      title: 'Energy Load Forecasting',
      desc: 'A federated learning-based energy load forecasting system developed in collaboration with the National Centre for Physics (NCP). Built using TensorFlow, with Dockerized deployment and real-time data simulation.',
      repo: 'https://github.com/izharadrali/Energy-consumption-analysis-and-prediction-using-Federated-Learning', 
      live: '',
      video: ''
    },
    {
      title: 'Sports Video Classification',
      desc: 'A deep learning system that classifies sports actions from video frames using CNNs for feature extraction and LSTMs for temporal modeling. Developed during my internship at InterDev.',
      repo: 'https://github.com/izharadrali', 
      live: '',
      video: ''
    },
    {
      title: 'Next Word Predictor',
      desc: 'An NLP-based next-word prediction model trained on custom datasets using LSTM layers. Includes preprocessing, tokenization, and custom sequence generation.',
      repo: 'https://github.com/izharadrali', 
      live: '',
      video: ''
    },
    {
      title: 'AI Text Humanizer',
      desc: 'A deep learning NLP model designed to transform robotic, AI-generated text into more natural, human-like writing. Implemented using Python and NLP pipelines.',
      repo: 'https://github.com/izharadrali', 
      live: '',
      video: ''
    },
    {
      title: 'Frontend UI Components',
      desc: 'Responsive, production-ready UI components built using HTML, CSS, JavaScript, and Bootstrap during my internship at Xtremesoft Peshawar.',
      repo: 'https://github.com/izharadrali', 
      live: '',
      video: ''
    }
  ];

  return (
    <div className="page-container">
      <h1 className="page-title" data-aos="fade-up">My <span className="highlight">Projects</span></h1>

      <p className="page-lead" data-aos="fade-up" data-aos-delay="80">
        A selection of my work in AI, deep learning, and software development.
      </p>

      <div className="projects-grid">
        {projects.map((p, idx) => (
          <ProjectItem key={idx} p={p} idx={idx} />
        ))}
      </div>
    </div>
  );
}

export default Projects;