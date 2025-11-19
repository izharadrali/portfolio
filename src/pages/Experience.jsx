import React from 'react';

function Experience() {
const experiences = [
  {
    type: 'work',
    title: 'AI/ML Engineer',
    company: 'STEMETA AI, Islamabad',
    duration: 'Sep 2025 – Present',
    description:
      'Working as a full-time AI/ML Engineer, contributing to the development of intelligent systems and production-grade ML pipelines. Responsible for model development, optimization, evaluation, and deployment for real-world AI applications.',
    skills: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'Model Deployment']
  },
  {
    type: 'work',
    title: 'AI/ML Engineer (Project Collaboration)',
    company: 'National Centre of Physics (NCP), Islamabad',
    duration: 'Mar 2025 – May 2025',
    description:
      'Collaborated with NCP on an industrial project as part of Final Year Project. Developed a federated learning-based short-term energy load forecasting system. Performed model training, evaluation, real-time data simulation, and Dockerized deployment.',
    skills: ['Federated Learning', 'Python', 'TensorFlow', 'Docker', 'Time-Series Forecasting']
  },
  {
    type: 'work',
    title: 'AI/ML Engineer (Intern)',
    company: 'InterDev Pvt Ltd, Pune (Remote)',
    duration: 'Aug 2024 – Sep 2024',
    description:
      'Worked on ML models for structured datasets and a deep learning system for video-based sports classification. Contributed to model optimization, evaluation, and collaborative development workflows.',
    skills: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'OpenCV', 'TensorFlow']
  },
  {
    type: 'work',
    title: 'Frontend Developer (Intern)',
    company: 'Xtremesoft, Peshawar',
    duration: 'Jul 2022 – Aug 2022',
    description:
      'Developed responsive user interfaces using HTML, CSS, and Bootstrap. Improved UI consistency, fixed bugs, and contributed to frontend–backend integration using Firebase.',
    skills: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'Firebase']
  }
];


  return (
    <div className="page-container">
      <h1 data-aos="fade-up">Professional <span className="highlight">Experience</span></h1>
      <p className="page-lead" data-aos="fade-up" data-aos-delay="60">
        My journey in web development with a focus on building amazing digital experiences.
      </p>

      <div className="experience-timeline">
        {experiences.map((item, idx) => (
          <div
            key={idx}
            className={`timeline-item ${item.type}`}
            data-aos="fade-up"
            data-aos-delay={idx * 80}
          >
            <div className="timeline-marker"></div>
            <div className="timeline-card">
              <div className="card-header">
                <h3>{item.title}</h3>
                <span className="card-badge">💼</span>
              </div>

              <p className="card-subtitle">{item.company}</p>

              <p className="card-period">{item.duration}</p>

              <p className="card-description">{item.description}</p>

              {item.skills && (
                <div className="card-skills">
                  {item.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
