import { Link } from "react-router-dom";

const howItWorks = [
  {
    number: "01",
    title: "Discover",
    text: "Find people by skills, location, availability, and project needs in a single marketplace.",
  },
  {
    number: "02",
    title: "Match",
    text: "Use a transparent score to compare strengths, skills, and compatibility before reaching out.",
  },
  {
    number: "03",
    title: "Connect",
    text: "Send requests, accept matches, and move from conversation to action without friction.",
  },
  {
    number: "04",
    title: "Work",
    text: "Complete skill swaps, hire services, or join project teams and track real progress together.",
  },
];

const models = [
  {
    icon: "🔄",
    title: "Skill Exchange",
    text: "Trade skills directly, like design for development, without cash involved.",
    badge: "No money involved",
  },
  {
    icon: "💰",
    title: "Paid Service",
    text: "List services, hire professionals, and complete a demo checkout flow in minutes.",
    badge: "Secure demo checkout",
  },
  {
    icon: "🤝",
    title: "Collaboration",
    text: "Join teams for projects that need multiple skills, roles, and clear milestones.",
    badge: "Project-based teamwork",
  },
];

const valuePoints = [
  "Built for students, freelancers, MSMEs, and local organizations.",
  "Matches based on skill fit, availability, location, and experience.",
  "Works as a realistic frontend MVP with LocalStorage-ready architecture.",
];

const featuredSkills = [
  "Web Development",
  "Graphic Design",
  "Content Writing",
  "Branding",
  "UI/UX",
  "Business Strategy",
];
const featuredProjects = [
  { title: "Bakery Website", type: "Web Design", budget: "₹12,000" },
  { title: "College Event Site", type: "Collaboration", budget: "₹5,000" },
  { title: "Startup Landing Page", type: "Branding", budget: "₹8,500" },
];
const featuredServices = [
  { title: "Website Development", price: "₹2,000", rating: "4.8 ⭐" },
  { title: "Logo Design", price: "₹1,200", rating: "4.9 ⭐" },
  { title: "Social Media Kit", price: "₹1,800", rating: "4.7 ⭐" },
];

const beneficiarySections = [
  {
    title: "For Students",
    text: "Gain practical experience, learn by doing, and exchange skills with people who match your goals.",
  },
  {
    title: "For Freelancers",
    text: "Turn idle capacity into income, discover project work, and build deeper professional networks.",
  },
  {
    title: "For MSMEs",
    text: "Access affordable talent, meet urgent business needs, and build agile teams without long hiring cycles.",
  },
];

function HomePage() {
  return (
    <div className="skillit-homepage">
      <section className="hero-section">
        <div className="container py-5 py-lg-6">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <p className="eyebrow">Build, trade, and collaborate</p>
              <h1 className="display-4 fw-bold mb-3">SKILLit</h1>
              <h2 className="hero-subtitle">
                Swap Your Skill, Earn Your Bill.
              </h2>
              <p className="lead text-secondary mb-4">
                SKILLit connects students, freelancers, MSMEs, and local
                organizations through skill exchange, paid services, and project
                collaboration built around real availability and project fit.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/find-skills" className="btn btn-primary btn-lg">
                  Find Skills
                </Link>
                <Link to="/projects" className="btn btn-outline-primary btn-lg">
                  Browse Projects
                </Link>
                <Link
                  to="/services"
                  className="btn btn-outline-secondary btn-lg"
                >
                  Offer a Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="container">
          <div className="section-heading text-center mb-4">
            <p className="eyebrow">How SKILLit Works</p>
            <h3>From discovery to delivery</h3>
          </div>

          <div className="row g-4">
            {howItWorks.map((item) => (
              <div key={item.number} className="col-md-6 col-xl-3">
                <div className="info-card h-100">
                  <span className="step-pill">{item.number}</span>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap section-soft">
        <div className="container">
          <div className="section-heading text-center mb-4">
            <p className="eyebrow">Three Models</p>
            <h3>One platform, three ways to collaborate</h3>
          </div>

          <div className="row g-4">
            {models.map((model) => (
              <div key={model.title} className="col-lg-4">
                <div className="model-card h-100">
                  <div className="model-icon">{model.icon}</div>
                  <div className="badge-row">
                    <span className="mini-badge">{model.badge}</span>
                  </div>
                  <h4>{model.title}</h4>
                  <p>{model.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="section-heading mb-4">
                <p className="eyebrow">Why SKILLit</p>
                <h3>Built for practical, real-world cooperation</h3>
              </div>
              <ul className="benefit-list">
                {valuePoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="col-lg-6">
              <div className="stats-panel">
                <div className="stat-box">
                  <strong>300+</strong>
                  <span>Skill matches</span>
                </div>
                <div className="stat-box">
                  <strong>94%</strong>
                  <span>Average fit score</span>
                </div>
                <div className="stat-box">
                  <strong>24h</strong>
                  <span>Average response time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap section-soft">
        <div className="container">
          <div className="section-heading text-center mb-4">
            <p className="eyebrow">Featured Skills</p>
            <h3>Most in-demand capabilities</h3>
          </div>

          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {featuredSkills.map((skill) => (
              <span key={skill} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="container">
          <div className="section-heading mb-4">
            <p className="eyebrow">Featured Projects</p>
            <h3>Projects people are actively building</h3>
          </div>

          <div className="row g-4">
            {featuredProjects.map((project) => (
              <div key={project.title} className="col-md-6 col-xl-4">
                <div className="content-card h-100">
                  <span className="content-tag">{project.type}</span>
                  <h4>{project.title}</h4>
                  <p className="content-meta">Budget: {project.budget}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap section-soft">
        <div className="container">
          <div className="section-heading mb-4">
            <p className="eyebrow">Featured Services</p>
            <h3>High-demand skills you can hire today</h3>
          </div>

          <div className="row g-4">
            {featuredServices.map((service) => (
              <div key={service.title} className="col-md-6 col-xl-4">
                <div className="content-card h-100">
                  <span className="content-tag">Service</span>
                  <h4>{service.title}</h4>
                  <p className="content-meta">{service.price}</p>
                  <p className="content-subtle">{service.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="container">
          <div className="section-heading text-center mb-4">
            <p className="eyebrow">Who It Helps</p>
            <h3>Flexible support across every kind of creator and team</h3>
          </div>

          <div className="row g-4">
            {beneficiarySections.map((item) => (
              <div key={item.title} className="col-lg-4">
                <div className="benefit-card h-100">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap cta-wrap">
        <div className="container">
          <div className="cta-panel text-center">
            <p className="eyebrow">Ready to get started?</p>
            <h3>Trade your skills, grow your network, and get work done.</h3>
            <div className="d-flex justify-content-center flex-wrap gap-3 mt-4">
              <Link to="/register" className="btn btn-primary btn-lg">
                Join SKILLit
              </Link>
              <Link to="/login" className="btn btn-outline-light btn-lg">
                Try Demo Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
