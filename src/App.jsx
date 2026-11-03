import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import stagIllustration from "../wingerworth-stag.svg";

const businessEmail = "";
const pageTitles = {
  "/": "Wingerworth Technology Solutions | Local People. Local Solutions.",
  "/about": "About us | Wingerworth Technology Solutions",
  "/work": "Some of our work | Wingerworth Technology Solutions",
};

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M5 15 15 5M6 5h9v9" />
    </svg>
  );
}

function Logo({ footer = false }) {
  return (
    <img
      className={`brand-logo ${footer ? "brand-logo-footer" : ""}`}
      src="/wingerworth-technology-solutions-logo.png"
      alt="Wingerworth Technology Solutions"
    />
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <div
      className={`reveal ${className}`.trim()}
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Header({ menuOpen, setMenuOpen }) {
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname, location.hash, setMenuOpen]);

  return (
    <>
      <div className={`menu-wrapper ${menuOpen ? "is-open" : ""}`}>
        <div className="main-nav-wrapper">
          <div className="main-navigation">
            <div className="menu-header">
              <span className="menu_title">WINGERWORTH TECHNOLOGY SOLUTIONS</span>
            </div>
            <nav className="main__nav" aria-label="Main navigation">
              <div className="links_group">
                <h2>EXPLORE</h2>
                <NavLink end to="/">
                  Home
                </NavLink>
                <NavLink to="/work">Portfolio</NavLink>
                <Link to="/#contact">Get in touch</Link>
              </div>
              <div className="links_group">
                <h2>WHO WE ARE</h2>
                <NavLink to="/about">About us</NavLink>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="main-links-wrapper">
          <Link className="img-menu-link" to="/" aria-label="Wingerworth Technology Solutions home">
            <Logo />
          </Link>
          <button
            className={`mobile-nav-trigger ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="hamburger-line top" />
            <span className="hamburger-line mid" />
            <span className="hamburger-line bot" />
          </button>
        </div>
      </header>
    </>
  );
}

function ContactSection() {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    if (!businessEmail) {
      setStatus(
        "This draft site needs your business email added before enquiries can be sent. Your message has not been sent.",
      );
      return;
    }

    const data = new FormData(form);
    const subject = `Website enquiry from ${data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Reply email: ${data.get("email")}`,
      "",
      data.get("message"),
    ].join("\n");
    setStatus("Your email app should open with your message ready to send.");
    window.location.href =
      `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-shell">
        <Reveal className="contact-copy">
          <p className="eyebrow">Start a conversation</p>
          <h2>
            Have a challenge?
            <br />
            <span>Let’s talk.</span>
          </h2>
          <p>
            Tell us what you’d like to make easier. We’ll get back to you for a
            friendly, no-pressure chat.
          </p>
        </Reveal>
        <Reveal className="contact-form-wrap" delay={110}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              <span>Your name</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Alex Smith"
                required
              />
            </label>
            <label>
              <span>Your email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="alex@yourbusiness.co.uk"
                required
              />
            </label>
            <label>
              <span>What would you like to improve?</span>
              <textarea
                name="message"
                rows="4"
                placeholder="A technology challenge, an idea, or a question…"
                required
              />
            </label>
            <button className="button button-primary" type="submit">
              Prepare your email <Arrow />
            </button>
            <p className="form-status" role="status" aria-live="polite">
              {status}
            </p>
            <p className="privacy-note">
              Your message opens in your email app. This website doesn’t store
              your details.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer wts-footer">
      <Link className="footer-brand" to="/">
        <Logo footer />
      </Link>
      <span className="footer-slogan">Local People. Local Solutions.</span>
      <span className="footer-year">
        © {new Date().getFullYear()} Wingerworth Technology Solutions
      </span>
    </footer>
  );
}

function HomePage() {
  return (
    <main className="page-content" id="main">
      <section className="hero-panel wts-hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <header className="main-header wts-main-header" data-reveal>
          <h1>
            <strong className="local-page-heading">
              Local People
              <br />
              <span>Local Stories</span>
            </strong>
          </h1>
        </header>
        <div className="slider-wrapper wts-slider" data-reveal>
          <img
            className="slider-media wts-stag"
            src={stagIllustration}
            alt=""
            aria-hidden="true"
          />
          <div className="slider-text">
            <section className="slider-article">
              <h2>
                <em>Enterprise technology</em>
                <strong>for local business.</strong>
              </h2>
              <p>
                Practical, personal and priced for the way you work. We help
                local businesses make technology work harder — with
                straightforward advice from people close to home.
              </p>
              <div className="btn-wrapper">
                <Link className="btn addHover" to="/work">
                  See some of our work
                </Link>
                <Link className="btn addHover" to="/about">
                  Get to know us
                </Link>
              </div>
              <div className="slider-copyright-text">
                <p>Local expertise. Straightforward advice.</p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}

function AboutPage() {
  return (
    <main className="page-content inner-page" id="main">
      <section className="page-hero" data-reveal>
        <p className="eyebrow">Local people, working alongside you</p>
        <h1 className="local-page-heading">
          Local Now 
          <br />
          <span>Local Forever</span>
        </h1>
        <p className="page-lead">
          Wingerworth Technology Solutions was founded to
          make enterprise-grade technology accessible to the businesses
          that make our community what it is.
        </p>
      </section>
      <section className="about-detail">
        <Reveal className="about-statement">
          <p className="eyebrow">A local partner, not another helpdesk</p>
          <h2>
            Enterprise technology.
            <br />
            <span>A fraction of the cost.</span>
          </h2>
        </Reveal>
        <Reveal className="about-detail-copy" delay={110}>
          <p className="about-lead">
            Local businesses deserve access to the same smart technology as the
            big players, without paying for a team or setup they don’t need.
          </p>
          <p>
            We start by listening, then recommend a practical way forward that
            makes sense for your business. No one-size-fits-all packages,
            confusing jargon or costly extras: just experienced people nearby
            who want your technology to work harder for you.
          </p>
          <Link className="button button-primary" to="/#contact">
            Tell us what you need <Arrow />
          </Link>
        </Reveal>
      </section>
      <ContactSection />
    </main>
  );
}

const portfolioItems = [
  {
    number: "01",
    type: "PROJECT PLACEHOLDER",
    title: "Local business project",
    category: "Technology & infrastructure",
  },
  {
    number: "02",
    type: "PROJECT PLACEHOLDER",
    title: "Local business project",
    category: "Technology & infrastructure",
  },
  {
    number: "03",
    type: "PROJECT PLACEHOLDER",
    title: "Local business project",
    category: "Technology & infrastructure",
  },
];

function WorkPage() {
  return (
    <main className="page-content inner-page work-page" id="main">
      <section className="page-hero work-hero" data-reveal>
        <p className="eyebrow">Some of our work</p>
        <h1 className="local-page-heading">
          Local Problems
          <br />
          <span>Local Solutions</span>
        </h1>
        <p className="page-lead">
          A few examples of the challenges we help derbyshire-based businesses solve.
          We’re getting our portfolio ready - project details coming soon.
        </p>
      </section>
      <section className="portfolio-section" aria-label="Portfolio placeholders">
        <div className="portfolio-grid">
          {portfolioItems.map((item, index) => (
            <Reveal
              className="portfolio-card"
              delay={index * 110}
              key={item.number}
            >
              <div
                className={`portfolio-art portfolio-art-${index + 1}`}
                aria-hidden="true"
              >
                <span className="art-orbit orbit-one" />
                <span className="art-orbit orbit-two" />
                <span className="art-core">{item.number}</span>
              </div>
              <div className="portfolio-meta">
                <span>{item.type}</span>
                <span>{item.number} / 03</span>
              </div>
              <h2>{item.title}</h2>
              <p>{item.category}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="work-contact" data-reveal>
        <p className="eyebrow">Have a project in mind?</p>
        <h2>
          Your business could
          <br />
          <span>be next.</span>
        </h2>
        <Link className="button button-primary" to="/#contact">
          Start a conversation <Arrow />
        </Link>
      </section>
    </main>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle("menu_is_open", menuOpen);
    return () => document.body.classList.remove("menu_is_open");
  }, [menuOpen]);

  useEffect(() => {
    document.title = pageTitles[location.pathname] ?? pageTitles["/"];
    if (location.hash) {
      window.setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      setIntroComplete(true);
      return undefined;
    }
    const timer = window.setTimeout(() => setIntroComplete(true), 1700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");

    const updateReveals = () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const revealItems = document.querySelectorAll("[data-reveal]:not(.is-visible)");

      if (reducedMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return undefined;
      }

      const observer = new IntersectionObserver(
        (entries, currentObserver) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              currentObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
      );
      revealItems.forEach((item) => observer.observe(item));
      return observer;
    };

    const observer = updateReveals();
    return () => {
      observer?.disconnect();
      root.classList.remove("motion-ready");
    };
  }, [location.pathname]);

  return (
    <>
      {!introComplete && (
        <div className="intro-curtain" aria-hidden="true">
          <div className="curtain-panel" />
          <div className="curtain-panel" />
          <div className="curtain-panel" />
          <div className="curtain-panel" />
        </div>
      )}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
    </>
  );
}

export default App;
