import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import stagIllustration from "../chesterfield-stag.svg";

// Set this when the business inbox is ready; the form then opens a prefilled email.
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

// Shared Crooked Spire code-bracket mark for the header and footer.
function LogoMark() {
  return (
    <span className="brand-symbol" aria-hidden="true">
      <svg viewBox="0 0 40 36">
        <path d="m10.5 5-6.5 10 6.5 8.5m19-18.5 6.5 10-6.5 8.5" />
        <image
          href="/crooked-spire-mark.png"
          x="14"
          y="1"
          width="12"
          height="34"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </span>
  );
}

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Keep in-page contact links working when navigation changes the route.
    if (hash) {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}

function Reveal({ children, className = "", delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const revealRef = useRef(null);

  useEffect(() => {
    const node = revealRef.current;
    // Show content immediately on browsers without IntersectionObserver.
    if (!node || !("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      ref={revealRef}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu after every route or in-page navigation.
  useEffect(() => setMenuOpen(false), [location.pathname, location.hash]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand"
          to="/"
          aria-label="Wingerworth Technology Solutions home"
        >
          <LogoMark />
          <span className="brand-copy">
            <strong>Wingerworth</strong>
            <span>Technology Solutions</span>
          </span>
        </Link>

        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          id="primary-nav"
          aria-label="Main navigation"
        >
          <NavLink
            end
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About us
          </NavLink>
          <NavLink
            to="/work"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Some of our work
          </NavLink>
          <Link className="nav-cta" to="/#contact">
            Get in touch <Arrow />
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <Link className="footer-brand" to="/">
        <LogoMark />
        <span>Wingerworth Technology Solutions</span>
      </Link>
      <span className="footer-slogan">Local People. Local Solutions.</span>
      <span className="footer-year">
        © {new Date().getFullYear()} Wingerworth Technology Solutions
      </span>
    </footer>
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

    // Build a mailto URL instead of sending form data to a server.
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
        <Reveal className="contact-form-wrap" delay={100}>
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

function HomePage() {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <img
          className="hero-art"
          src={stagIllustration}
          alt=""
          aria-hidden="true"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-kicker">
            <span />
            Independent technology partner · Chesterfield
          </p>
          <h1 id="hero-title">
            Local People.
            <br />
            <span>Local Solutions.</span>
          </h1>
          <p className="hero-intro">
            Enterprise technology for local business. Practical, personal and
            priced for the way you work.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/work">
              See some of our work <Arrow />
            </Link>
            <Link className="text-link" to="/about">
              Get to know us <Arrow />
            </Link>
          </div>
          <div className="hero-proof">
            <span className="proof-dot" />
            <span>Local expertise. Straightforward advice.</span>
          </div>
        </div>
      </section>

      <section className="intro-section" id="intro">
        <Reveal className="intro-heading">
          <p className="eyebrow">Technology should move you forward</p>
          <h2>
            Big capability.
            <br />
            <span>Right-sized for you.</span>
          </h2>
          <p>
            The right tools make all the difference. We help local businesses
            find and use technology that saves time, supports their people and
            makes the day-to-day run better.
          </p>
        </Reveal>
        <div className="intro-links">
          <Reveal>
            <Link className="feature-link" to="/about">
              <span className="feature-index">01</span>
              <span>
                <strong>People first</strong>
                <small>Know who you’re working with</small>
              </span>
              <Arrow />
            </Link>
          </Reveal>
          <Reveal delay={90}>
            <Link className="feature-link" to="/work">
              <span className="feature-index">02</span>
              <span>
                <strong>Built around your business</strong>
                <small>Technology that fits your goals</small>
              </span>
              <Arrow />
            </Link>
          </Reveal>
          <Reveal delay={180}>
            <Link className="feature-link" to="/#contact">
              <span className="feature-index">03</span>
              <span>
                <strong>Support that stays local</strong>
                <small>Clear advice, close to home</small>
              </span>
              <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>
      <ContactSection />
    </main>
  );
}

function AboutPage() {
  return (
    <main id="main" className="inner-page">
      <section className="page-hero">
        <Reveal>
          <p className="eyebrow">Local people, working alongside you</p>
          <h1>
            Good technology
            <br />
            <span>starts with people.</span>
          </h1>
          <p className="page-lead">
            We’re Josh and George. We started Wingerworth Technology Solutions
            to make enterprise-grade technology feel accessible to the
            businesses that make our community what it is.
          </p>
        </Reveal>
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
        <Reveal className="about-detail-copy" delay={100}>
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

// These clearly marked cards are placeholders until real client work is approved.
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
    title: "A smarter way to work",
    category: "Cloud & collaboration",
  },
  {
    number: "03",
    type: "PROJECT PLACEHOLDER",
    title: "Technology that grows",
    category: "Support & modernisation",
  },
];

function WorkPage() {
  return (
    <main id="main" className="inner-page work-page">
      <section className="page-hero work-hero">
        <Reveal>
          <p className="eyebrow">Some of our work</p>
          <h1>
            Good work.
            <br />
            <span>Good people.</span>
          </h1>
          <p className="page-lead">
            A few examples of the challenges we help local businesses solve.
            We’re getting our portfolio ready — project details coming soon.
          </p>
        </Reveal>
      </section>
      <section className="portfolio-section" aria-label="Portfolio placeholders">
        <div className="portfolio-grid">
          {portfolioItems.map((item, index) => (
            <Reveal
              className="portfolio-card"
              delay={index * 100}
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
      <section className="work-contact">
        <Reveal>
          <p className="eyebrow">Have a project in mind?</p>
          <h2>
            Your business could
            <br />
            <span>be next.</span>
          </h2>
          <Link className="button button-primary" to="/#contact">
            Start a conversation <Arrow />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = pageTitles[location.pathname] ?? pageTitles["/"];
  }, [location.pathname]);

  return (
    <>
      <ScrollManager />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
