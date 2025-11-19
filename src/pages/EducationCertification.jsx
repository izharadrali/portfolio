import React from 'react';

function EducationCertification() {
  const education = [
    {
      type: 'education',
      title: 'Bachelor of Science in Artificial Intelligence',
      institution: 'Pak-Austria Fachhochschule: Institute of Applied Sciences and Technology (PAF-IAST)',
      year: '2021 – 2025',
      gpa: '3.19/4.0',
      description: 'Final Year Project: Short-Term Load Forecasting Using Federated Learning.'
    },
    {
      type: 'education',
      title: 'Higher Secondary School Certificate (HSSC)',
      institution: 'BISE Swat',
      year: '2018 – 2020',
      gpa: '85%',
      description: 'Completed pre-medical coursework with strong academic performance.'
    }
  ];

 const certifications = [
  {
    type: 'certification',
    title: 'AI For Everyone',
    issuer: 'DeepLearning.AI — Coursera',
    year: '2025',
    credentialId: '',
    description: 'Completed with 86.50% grade. Gained strong understanding of AI/ML concepts, deep learning basics, AI strategy, data ethics, and how AI impacts modern organizations.'
  },
  {
    type: 'certification',
    title: 'Programming for Everybody (Getting Started with Python)',
    issuer: 'University of Michigan — Coursera',
    year: '2023',
    credentialId: '',
    description: 'Completed with a 100% grade. Built solid foundations in Python programming, including variables, loops, functions, problem-solving, and computational thinking.'
  },
  {
    type: 'certification',
    title: 'Internship Completion Certificate — AI & Machine Learning',
    issuer: 'InterDev Pvt Ltd',
    year: '2024',
    credentialId: '',
    description: 'Completed a 2-month internship focused on building ML models, working with real datasets, and applying machine learning techniques to practical problems.'
  },
  {
    type: 'certification',
    title: 'Internship Completion Certificate — Frontend Development',
    issuer: 'Xtremesoft Peshawar',
    year: '2022',
    credentialId: '',
    description: 'Completed a frontend development internship involving modern UI development using HTML, CSS, and Bootstrap while collaborating in an agile environment.'
  }
];


  return (
    <div className="page-container">
      <h1 data-aos="fade-up">Education & <span className="highlight">Certifications</span></h1>
      <p className="page-lead" data-aos="fade-up" data-aos-delay="60">
        My academic background and professional certifications in AI, Machine Learning, and Frontend Development.
      </p>

      <div className="education-cert-container">
        {/* Education Side */}
        <div className="education-side" data-aos="fade-right">
          <h2 className="section-title">
            <i className="fas fa-graduation-cap"></i> Education
          </h2>
          <div className="cert-timeline">
            {education.map((item, idx) => (
              <div
                key={idx}
                className="cert-item education-item"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="cert-marker"></div>
                <div className="cert-card">
                  <div className="cert-badge">🎓</div>
                  <h3>{item.title}</h3>
                  <p className="cert-issuer">{item.institution}</p>
                  <p className="cert-year">{item.year}</p>
                  {item.gpa && <p className="cert-gpa">GPA: {item.gpa}</p>}
                  <p className="cert-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Side */}
        <div className="certifications-side" data-aos="fade-left">
          <h2 className="section-title">
            <i className="fas fa-certificate"></i> Certifications
          </h2>
          <div className="cert-timeline">
            {certifications.map((item, idx) => (
              <div
                key={idx}
                className="cert-item certification-item"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="cert-marker"></div>
                <div className="cert-card">
                  <div className="cert-badge">📜</div>
                  <h3>{item.title}</h3>
                  <p className="cert-issuer">{item.issuer}</p>
                  <p className="cert-year">{item.year}</p>
                  {item.credentialId && <p className="cert-id">ID: {item.credentialId}</p>}
                  <p className="cert-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationCertification;
