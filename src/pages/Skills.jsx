import React from 'react';

function Skills() {
const skills = [
  {
    category: "AI & Machine Learning",
    items: [
      "Machine Learning",
      "Deep Learning",
      "Federated Learning",
      "NLP (Natural Language Processing)",
      "Time-Series Forecasting",
      "Computer Vision",
      "Data Mining",
      "Big Data Concepts",
      "Model Optimization",
      "Model Evaluation"
    ]
  },
  {
    category: "AI Tools & Frameworks",
    items: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "OpenCV",
      "NumPy",
      "Pandas",
      "Google Colab",
      "Jupyter Notebook",
      "Kaggle (Notebooks & Competitions)"
    ]
  },
  {
    category: "Programming",
    items: [
      "Python",
      "C++",
      "JavaScript",
      "Node.js",
      "Express.js"
    ]
  },
  {
    category: "DevOps, Deployment & Data Tools",
    items: [
      "Docker",
      "Git",
      "GitHub",
      "REST APIs",
      "Linux",
      "Data Pipelines",
      "Version Control"
    ]
  },
  {
    category: "Computer Science Fundamentals",
    items: [
      "Computer Networking",
      "Operating Systems",
      "Data Structures & Algorithms",
      "OOP"
    ]
  },
  {
    category: "Frontend (Previous Experience)",
    items: [
      "React",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Responsive Design"
    ]
  }
];


  return (
    <div className="page-container">
      <h1 data-aos="fade-up">My <span className="highlight">Skills</span></h1>
      <p className="page-lead" data-aos="fade-up" data-aos-delay="60">My core technical skill set across AI/ML engineering, deep learning, data processing, data analysis, model deployment, and modern software development.</p>
      <div className="skills-container">
        {skills.map((skillGroup, index) => (
          <div key={index} className="skill-group" data-aos="fade-up" data-aos-delay={index * 100}>
            <h2>{skillGroup.category}</h2>
            <div className="skills-grid">
              {skillGroup.items.map((skill, i) => (
                <div key={i} className="skill-card">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;