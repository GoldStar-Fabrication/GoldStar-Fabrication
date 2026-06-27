import { useState, useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";

const NAV_LINKS = ["Home", "About", "Services", "Projects", "Gallery", "Contact"];

const SERVICES = [
  {
    icon: "🔩",
    title: "Safety Grills & Railings",
    desc: "Precision-engineered iron grills and railings for residential and commercial spaces. Custom patterns, powder-coated finishes.",
  },
  {
    icon: "🏗️",
    title: "Sheds & Roofing Structures",
    desc: "Industrial-grade fabricated sheds and overhead structures built for longevity. From factory floors to residential parking.",
  },
  {
    icon: "🚪",
    title: "Custom Iron Doors & Gates",
    desc: "Ornate and modern iron doors with precision welding. Security meets aesthetics in every gate we craft.",
  },
  {
    icon: "🏢",
    title: "Contract Building Fabrication",
    desc: "End-to-end structural fabrication for builders. Trusted by Dolphin Group, Nirman Group, and Pragati Group.",
  },
  {
    icon: "⚙️",
    title: "Structural Frameworks",
    desc: "Load-bearing iron frameworks for multi-storey buildings, industrial units, and large-scale commercial projects.",
  },
  {
    icon: "✨",
    title: "Decorative Metalwork",
    desc: "Artistic iron screens, pergolas, balustrades, and furniture legs. Where fabrication becomes fine craft.",
  },
];

const STATS = [
  { value: "18+", label: "Years of Excellence" },
  { value: "500+", label: "Projects Completed" },
  { value: "12+", label: "Brand Partners" },
  { value: "3000+", label: "Happy Clients" },
];

const PARTNERS = [
  { name: "Dolphin Group", abbr: "DG", color: "#1a3a5c" },
  { name: "Nirman Group", abbr: "NG", color: "#2d4a1e" },
  { name: "Pragati Group", abbr: "PG", color: "#4a1e2d" },
];

const TESTIMONIALS = [
  {
    quote:
      "GoldStar Fabrication delivered precision ironwork for our Dolphin Palms project on time, every time. Their structural grills are unmatched in quality.",
    author: "Rajesh Mehta",
    role: "Project Manager, Dolphin Group",
  },
  {
    quote:
      "We've contracted TY for three buildings now. The welding quality, finish, and on-site discipline are exactly what a builder needs.",
    author: "Sunita Rao",
    role: "Director, Nirman Group",
  },
  {
    quote:
      "From custom gates to full structural work — they handle it all with the professionalism of a much larger firm.",
    author: "Amit Chary",
    role: "Pragati Group",
  },
];

const PROJECTS = [
  { name: "Dolphin Matrix", type: "Commercial Structure", tags: ["Railings", "Sheds", "Gates"] },
  { name: "Nirman Skyline", type: "Residential Complex", tags: ["Grills", "Doors", "Framework"] },
  { name: "Pragati Heights", type: "Multi-storey Building", tags: ["Structural", "Doors", "Screens"] },
  { name: "Industrial Warehouse", type: "Private Client", tags: ["Shed", "Framework", "Roofing"] },
];

export default function Landing() {

  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Premium, High-Contrast Light Mode UI Color Configuration
  const bg = dark ? "#0d0d0d" : "#fdfbfc";
  const surface = dark ? "#161616" : "#ffffff";
  const card = dark ? "#1c1c1c" : "#f7f9fa";
  const border = dark ? "#2a2a2a" : "#e2e8f0";
  const text = dark ? "#f0ede8" : "#0f172a";
  const muted = dark ? "#888888" : "#64748b";
  const accent = "#c8922a"; // signature industrial warm gold
  const accentLight = dark ? "#3a2700" : "#fef3c7";

  const isMobile = windowWidth <= 768;

  const s = {
    root: {
      background: bg,
      color: text,
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      minHeight: "100vh",
      transition: "background 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      overflowX: "hidden",
    },
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: scrolled ? (dark ? "rgba(13,13,13,0.85)" : "rgba(253,251,252,0.85)") : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${border}` : "none",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      padding: "0 clamp(1.5rem, 5vw, 4rem)",
    },
    navInner: {
      maxWidth: 1280,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: scrolled ? 68 : 88,
      transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    logo: {
      display: "flex",
      flexDirection: "column",
      lineHeight: 1,
    },
    logoMain: {
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: "-0.03em",
      color: text,
    },
    logoSub: {
      fontSize: 10,
      letterSpacing: "0.18em",
      color: accent,
      textTransform: "uppercase",
      marginTop: 2,
    },
    navLinks: {
      display: isMobile ? "none" : "flex",
      gap: "2.5rem",
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    navLink: {
      fontSize: 13,
      letterSpacing: "0.06em",
      color: muted,
      cursor: "pointer",
      textTransform: "uppercase",
      fontWeight: 500,
      transition: "color 0.2s ease, transform 0.2s ease",
    },
    navRight: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    themeBtn: {
      background: "none",
      border: `1px solid ${border}`,
      borderRadius: 8,
      padding: "8px 14px",
      cursor: "pointer",
      color: text,
      fontSize: 13,
      fontWeight: 500,
      transition: "all 0.2s ease",
    },
    ctaBtn: {
      background: accent,
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "10px 22px",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: "0.05em",
      cursor: "pointer",
      textTransform: "uppercase",
      transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease",
    },
    hamburger: {
      display: isMobile ? "block" : "none",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: text,
      fontSize: 24,
      padding: 4,
    },
    hero: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "120px clamp(1.5rem, 5vw, 4rem) 5rem",
      position: "relative",
      overflow: "hidden",
    },
    heroBg: {
      position: "absolute",
      inset: 0,
      background: dark
        ? "linear-gradient(160deg, #0d0d0d 0%, #1c150c 60%, #0d0d0d 100%)"
        : "linear-gradient(160deg, #fdfbfc 0%, #f7f1e5 60%, #fdfbfc 100%)",
      transition: "background 0.5s ease",
      zIndex: 0,
    },
    heroGrid: {
      position: "absolute",
      inset: 0,
      backgroundImage: `linear-gradient(${border} 1px, transparent 1px), linear-gradient(90deg, ${border} 1px, transparent 1px)`,
      backgroundSize: "80px 80px",
      opacity: dark ? 0.2 : 0.4,
      zIndex: 1,
    },
    heroAccentBar: {
      position: "absolute",
      top: "25%",
      right: "clamp(2rem, 10vw, 12rem)",
      width: 2,
      height: "45%",
      background: `linear-gradient(transparent, ${accent}, transparent)`,
      zIndex: 1,
      display: isMobile ? "none" : "block",
    },
    heroContent: { position: "relative", maxWidth: 1280, margin: "0 auto", width: "100%", zIndex: 2 },
    heroEyebrow: {
      fontSize: 12,
      letterSpacing: "0.22em",
      color: accent,
      textTransform: "uppercase",
      marginBottom: "1.5rem",
      fontWeight: 600,
    },
    heroH1: {
      fontSize: "clamp(2.5rem, 7vw, 6rem)",
      fontWeight: 900,
      lineHeight: 1.05,
      letterSpacing: "-0.04em",
      marginBottom: "1.5rem",
      maxWidth: 950,
      color: text,
    },
    heroSpan: { color: accent },
    heroSubtitle: {
      fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
      color: muted,
      maxWidth: 580,
      lineHeight: 1.65,
      marginBottom: "3rem",
    },
    heroCtas: { display: "flex", gap: "1rem", flexWrap: "wrap" },
    primaryBtn: {
      background: accent,
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "16px 36px",
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: "0.06em",
      cursor: "pointer",
      textTransform: "uppercase",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    secondaryBtn: {
      background: "transparent",
      color: text,
      border: `1px solid ${border}`,
      borderRadius: 8,
      padding: "16px 36px",
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: "0.06em",
      cursor: "pointer",
      textTransform: "uppercase",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    section: {
      padding: "8rem clamp(1.5rem, 5vw, 4rem)",
      maxWidth: 1280,
      margin: "0 auto",
    },
    eyebrow: {
      fontSize: 12,
      letterSpacing: "0.22em",
      color: accent,
      textTransform: "uppercase",
      marginBottom: "0.85rem",
      fontWeight: 600,
    },
    sectionTitle: {
      fontSize: "clamp(2rem, 4vw, 3.5rem)",
      fontWeight: 800,
      letterSpacing: "-0.03em",
      lineHeight: 1.15,
      marginBottom: "1rem",
    },
    sectionDesc: {
      fontSize: 16,
      color: muted,
      lineHeight: 1.7,
      maxWidth: 540,
    },
    divider: {
      width: 64,
      height: 3,
      background: accent,
      margin: "1.5rem 0 2rem 0",
      borderRadius: 2,
    },
    statsBar: {
      background: accent,
      padding: "4rem clamp(1.5rem, 5vw, 4rem)",
    },
    statsGrid: {
      maxWidth: 1280,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "2.5rem",
      textAlign: "center",
    },
    statNum: {
      fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
      fontWeight: 900,
      color: "#fff",
      letterSpacing: "-0.03em",
    },
    statLabel: {
      fontSize: 12,
      letterSpacing: "0.14em",
      color: "rgba(255,255,255,0.8)",
      textTransform: "uppercase",
      marginTop: "0.5rem",
      fontWeight: 500,
    },
    servicesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      marginTop: "4rem",
    },
    serviceCard: {
      background: card,
      border: `1px solid ${border}`,
      borderRadius: 16,
      padding: "2.5rem",
      transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "default",
    },
    serviceIcon: {
      fontSize: 40,
      marginBottom: "1.5rem",
    },
    serviceTitle: {
      fontSize: 19,
      fontWeight: 700,
      marginBottom: "0.75rem",
      letterSpacing: "-0.02em",
    },
    serviceDesc: {
      fontSize: 14,
      color: muted,
      lineHeight: 1.7,
    },
    serviceTag: {
      display: "inline-block",
      marginTop: "1.5rem",
      fontSize: 12,
      letterSpacing: "0.08em",
      color: accent,
      textTransform: "uppercase",
      fontWeight: 600,
      transition: "gap 0.2s ease",
    },
    projectsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem",
      marginTop: "4rem",
    },
    projectCard: {
      background: card,
      border: `1px solid ${border}`,
      borderRadius: 16,
      overflow: "hidden",
      cursor: "pointer",
      transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    projectImgPlaceholder: {
      height: 220,
      background: dark
        ? "linear-gradient(135deg, #1c1c1c 0%, #302412 100%)"
        : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 54,
      transition: "transform 0.5s ease",
    },
    projectBody: { padding: "1.5rem" },
    projectName: { fontSize: 19, fontWeight: 700, marginBottom: "0.35rem", letterSpacing: "-0.02em" },
    projectType: { fontSize: 13, color: muted, marginBottom: "1rem" },
    tagRow: { display: "flex", gap: "0.5rem", flexWrap: "wrap" },
    tag: {
      fontSize: 11,
      padding: "4px 12px",
      borderRadius: 20,
      background: accentLight,
      color: dark ? "#f59e0b" : "#b45309",
      fontWeight: 600,
      letterSpacing: "0.05em",
    },
    partnersSection: {
      borderTop: `1px solid ${border}`,
      borderBottom: `1px solid ${border}`,
      padding: "5rem clamp(1.5rem, 5vw, 4rem)",
      background: surface,
    },
    partnersInner: { maxWidth: 1280, margin: "0 auto" },
    partnersLabel: {
      textAlign: "center",
      fontSize: 12,
      letterSpacing: "0.22em",
      color: muted,
      textTransform: "uppercase",
      marginBottom: "3rem",
      fontWeight: 600,
    },
    partnersFlex: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "clamp(2rem, 6vw, 6rem)",
      flexWrap: "wrap",
    },
    partnerBadge: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    partnerAvatar: {
      width: 48,
      height: 48,
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      fontWeight: 800,
      color: "#fff",
    },
    partnerName: {
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    testimonialWrap: {
      background: card,
      border: `1px solid ${border}`,
      borderRadius: 24,
      padding: "4rem clamp(1.5rem, 5vw, 5rem)",
      marginTop: "4rem",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    testimonialQuote: {
      fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
      lineHeight: 1.65,
      fontWeight: 500,
      maxWidth: 750,
      margin: "0 auto 2.5rem",
      color: text,
    },
    testimonialAuthor: {
      fontSize: 16,
      fontWeight: 700,
    },
    testimonialRole: {
      fontSize: 13,
      color: accent,
      marginTop: "0.35rem",
      fontWeight: 500,
    },
    dotRow: {
      display: "flex",
      justifyContent: "center",
      gap: "0.6rem",
      marginTop: "2.5rem",
    },
    footer: {
      background: dark ? "#070707" : "#0f172a",
      color: "#94a3b8",
      padding: "6rem clamp(1.5rem, 5vw, 4rem) 3rem",
    },
    footerInner: {
      maxWidth: 1280,
      margin: "0 auto",
    },
    footerTop: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "4rem",
      marginBottom: "4rem",
    },
    footerLogo: {
      fontSize: 26,
      fontWeight: 900,
      color: "#fff",
      letterSpacing: "-0.03em",
    },
    footerTagline: {
      fontSize: 14,
      lineHeight: 1.6,
      marginTop: "1rem",
      color: "#94a3b8",
    },
    footerHeading: {
      fontSize: 11,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: accent,
      marginBottom: "1.5rem",
      fontWeight: 700,
    },
    footerLink: {
      display: "block",
      fontSize: 14,
      color: "#cbd5e1",
      marginBottom: "0.75rem",
      cursor: "pointer",
      transition: "color 0.2s ease",
    },
    footerDivider: {
      borderTop: "1px solid rgba(255,255,255,0.1)",
      paddingTop: "2rem",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "1.5rem",
      fontSize: 13,
      color: "#64748b",
    },
    mobileMenu: {
      position: "fixed",
      inset: 0,
      zIndex: 200,
      background: dark ? "rgba(13,13,13,0.98)" : "rgba(255,255,255,0.98)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "2.5rem",
      backdropFilter: "blur(20px)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    mobileNavLink: {
      fontSize: "clamp(1.8rem, 6vw, 2.5rem)",
      fontWeight: 800,
      color: text,
      letterSpacing: "-0.03em",
      cursor: "pointer",
      transition: "transform 0.2s ease, color 0.2s ease",
    },
    closeBtn: {
      position: "absolute",
      top: 32,
      right: 32,
      background: "none",
      border: "none",
      fontSize: 28,
      color: text,
      cursor: "pointer",
    },
  };

  return (
    <div style={s.root}>
      {/* Mobile Dynamic Slide Overlay Menu */}
      {menuOpen && (
        <div style={s.mobileMenu}>
          <button style={s.closeBtn} onClick={() => setMenuOpen(false)}>✕</button>
          {NAV_LINKS.map((l) => (
            <span 
              key={l} 
              style={s.mobileNavLink} 
              onClick={() => setMenuOpen(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = accent;
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = text;
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {l}
            </span>
          ))}
        </div>
      )}

      {/* Navbar Container */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <div style={s.logo}>
            <span style={s.logoMain}>GoldStar</span>
            <span style={s.logoSub}>Fabrication Co.</span>
          </div>
          <ul style={s.navLinks}>
            {NAV_LINKS.map((l) => (
              <li 
                key={l} 
                style={s.navLink}
                onMouseEnter={(e) => { e.currentTarget.style.color = text; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = muted; }}
              >
                {l}
              </li>
            ))}
          </ul>
          <div style={s.navRight}>
            <button 
              style={s.themeBtn} 
              onClick={() => setDark(!dark)}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; }}
            >
              {dark ? "☀ Light" : "☾ Dark"}
            </button>
            <button 
              style={s.ctaBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = `0 4px 12px ${dark ? 'rgba(200,146,42,0.2)' : 'rgba(200,146,42,0.3)'}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Get Quote
            </button>
            <button style={s.hamburger} onClick={() => setMenuOpen(true)}>
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section featuring react-type-animation */}
      <section style={s.hero} ref={heroRef}>
        <div style={s.heroBg} />
        <div style={s.heroGrid} />
        <div style={s.heroAccentBar} />
        <div style={s.heroContent}>
          <p style={s.heroEyebrow}>Pune's Precision Metal Craftsmen</p>
          <h1 style={s.heroH1}>
            Built in{" "}
            <span style={s.heroSpan}>
              <TypeAnimation
                sequence={[
                  "Iron.",
                  3000,
                  "Steel.",
                  3000,
                  "Quality.",
                  3000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </span>
            <br />
            Built to Last.
          </h1>
          <p style={s.heroSubtitle}>
            Custom fabrication for grills, railings, sheds, doors, and large-scale structural ironwork.
            Trusted by Dolphin Group, Nirman, and Pragati since 2006.
          </p>
          <div style={s.heroCtas}>
            <button 
              style={s.primaryBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = "#b28020";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = accent;
              }}
            >
              View Our Work
            </button>
            <button 
              style={s.secondaryBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = border;
              }}
            >
              Call Us Now
            </button>
          </div>
          <div style={{ ...s.heroStats, position: "relative", marginTop: "5rem", display: "flex", gap: "3.5rem", flexWrap: "wrap", flexDirection: "row" }}>
            {STATS.map((st) => (
              <div key={st.label} style={{ minWidth: 140 }}>
                <div style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: accent, letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {st.value}
                </div>
                <div style={{ fontSize: 12, color: muted, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 8, fontWeight: 500 }}>
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metric Stats Bar */}
      <div style={s.statsBar}>
        <div style={s.statsGrid}>
          {[
            { v: "2Mn+", l: "Sq. ft. fabricated" },
            { v: "Zero", l: "Compromises on quality" },
            { v: "48hr", l: "Quote turnaround" },
            { v: "100%", l: "On-site safety record" },
          ].map((st) => (
            <div key={st.l}>
              <div style={s.statNum}>{st.v}</div>
              <div style={s.statLabel}>{st.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div style={{ background: surface, transition: "background 0.5s ease" }}>
        <div style={s.section}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <div>
              <p style={s.eyebrow}>About GoldStar Fabrication</p>
              <h2 style={s.sectionTitle}>Where craft meets<br /><span style={{ color: accent }}>structural integrity</span></h2>
              <div style={s.divider} />
              <p style={{ ...s.sectionDesc, marginBottom: "1.25rem" }}>
                Founded in Pune, GoldStar Fabrication has spent 18 years turning raw iron into precise, durable structures.
                From a single security grill to the full structural ironwork of a multi-storey residential complex — we handle it all.
              </p>
              <p style={s.sectionDesc}>
                Our workshop is equipped with MIG welding, plasma cutting, and custom bending facilities.
                Every weld is inspected. Every finish is uniform.
              </p>
              <button 
                style={{ ...s.primaryBtn, marginTop: "2.5rem" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; }}
              >
                Our Story →
              </button>
            </div>
            <div style={{
              background: card,
              border: `1px solid ${border}`,
              borderRadius: 24,
              padding: "2.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "1.5rem",
              transition: "background 0.5s ease, border-color 0.5s ease",
            }}>
              {[
                { label: "MIG Welding", detail: "Precision arc" },
                { label: "Plasma Cutting", detail: "Clean edges" },
                { label: "Powder Coating", detail: "10-year finish" },
                { label: "Custom Bending", detail: "CNC accuracy" },
                { label: "On-site Install", detail: "Full team" },
                { label: "CAD Design", detail: "Before we build" },
              ].map((c) => (
                <div key={c.label} style={{
                  background: bg,
                  borderRadius: 12,
                  padding: "1.25rem",
                  borderLeft: `4px solid ${accent}`,
                  transition: "transform 0.2s ease, background 0.5s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; }}
                >
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: "0.25rem" }}>{c.label}</div>
                  <div style={{ fontSize: 12, color: muted }}>{c.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid Section */}
      <div>
        <div style={s.section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <p style={s.eyebrow}>What We Do</p>
              <h2 style={s.sectionTitle}>Our Services</h2>
            </div>
            <button 
              style={s.secondaryBtn}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = text; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; }}
            >
              All Services →
            </button>
          </div>
          <div style={s.servicesGrid}>
            {SERVICES.map((svc) => (
              <div key={svc.title} style={s.serviceCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accent;
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = dark ? "0 12px 24px rgba(0,0,0,0.4)" : "0 12px 24px rgba(15,23,42,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = border;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={s.serviceIcon}>{svc.icon}</div>
                <div style={s.serviceTitle}>{svc.title}</div>
                <div style={s.serviceDesc}>{svc.desc}</div>
                <div style={s.serviceTag} onMouseEnter={(e) => { e.currentTarget.style.gap = "12px"; }}>
                  Learn more <span style={{ transition: "margin 0.2s ease" }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Partnership Row */}
      <div style={s.partnersSection}>
        <div style={s.partnersInner}>
          <p style={s.partnersLabel}>Trusted by Pune's Top Builders</p>
          <div style={s.partnersFlex}>
            {PARTNERS.map((p) => (
              <div key={p.name} style={s.partnerBadge}>
                <div style={{ ...s.partnerAvatar, background: p.color }}>{p.abbr}</div>
                <span style={s.partnerName}>{p.name}</span>
              </div>
            ))}
            <div style={s.partnerBadge}>
              <div style={{
                ...s.partnerAvatar,
                background: "transparent",
                border: `2px dashed ${border}`,
                color: muted,
                fontSize: 12,
              }}>+9</div>
              <span style={{ ...s.partnerName, color: muted }}>More Partners</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Grid */}
      <div>
        <div style={s.section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <p style={s.eyebrow}>Our Work</p>
              <h2 style={s.sectionTitle}>Featured Projects</h2>
            </div>
            <button 
              style={s.secondaryBtn}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = text; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; }}
            >
              View All →
            </button>
          </div>
          <div style={s.projectsGrid}>
            {PROJECTS.map((pr, i) => (
              <div key={pr.name} style={s.projectCard}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.borderColor = accent;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = dark ? "0 12px 24px rgba(0,0,0,0.4)" : "0 12px 24px rgba(15,23,42,0.06)";
                  if(e.currentTarget.firstChild) e.currentTarget.firstChild.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.borderColor = border;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  if(e.currentTarget.firstChild) e.currentTarget.firstChild.style.transform = "scale(1)";
                }}
              >
                <div style={s.projectImgPlaceholder}>
                  {["🏢", "🏗️", "🏠", "🏭"][i]}
                </div>
                <div style={s.projectBody}>
                  <div style={s.projectName}>{pr.name}</div>
                  <div style={s.projectType}>{pr.type}</div>
                  <div style={s.tagRow}>
                    {pr.tags.map((t) => (
                      <span key={t} style={s.tag}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smooth Carousel Testimonials */}
      <div style={{ background: surface, transition: "background 0.5s ease" }}>
        <div style={s.section}>
          <p style={s.eyebrow}>Client Voices</p>
          <h2 style={s.sectionTitle}>What our partners say</h2>
          <div style={s.testimonialWrap}>
            <div style={{
              position: "absolute",
              top: 16,
              left: 32,
              fontSize: 100,
              color: accent,
              opacity: 0.15,
              fontFamily: "Georgia, serif",
              lineHeight: 1,
              userSelect: "none"
            }}>"</div>
            <p style={s.testimonialQuote}>"{TESTIMONIALS[activeTestimonial].quote}"</p>
            <div style={s.testimonialAuthor}>{TESTIMONIALS[activeTestimonial].author}</div>
            <div style={s.testimonialRole}>{TESTIMONIALS[activeTestimonial].role}</div>
            <div style={s.dotRow}>
              {TESTIMONIALS.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: i === activeTestimonial ? 28 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === activeTestimonial ? accent : border,
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action / Free Quote Conversions Section */}
      <div style={{
        background: accent,
        padding: "6rem clamp(1.5rem, 5vw, 4rem)",
        textAlign: "center",
      }}>
        <p style={{ fontSize: 12, letterSpacing: "0.2em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 600 }}>
          Ready to Build?
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: "1.5rem", lineHeight: 1.1 }}>
          Get your free<br />fabrication quote
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", maxWidth: 500, margin: "0 auto 3rem", lineHeight: 1.65 }}>
          Tell us your project requirements and we'll visit your site, take measurements, and send a detailed quote within 48 hours.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{
            background: "#fff",
            color: accent,
            border: "none",
            borderRadius: 8,
            padding: "16px 40px",
            fontSize: 14,
            fontWeight: 800,
            cursor: "pointer",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
          >
            Request a Quote
          </button>
          <button style={{
            background: "transparent",
            color: "#fff",
            border: "2px solid rgba(255,255,255,0.5)",
            borderRadius: 8,
            padding: "16px 40px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.borderColor = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
          }}
          >
            Call: +91 98765 43210
          </button>
        </div>
      </div>

      {/* Structural Minimalist Footer */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <div style={s.footerTop}>
            <div>
              <div style={s.footerLogo}>GoldStar Fabrication</div>
              <p style={s.footerTagline}>
                Precision ironwork crafted in Pune since 2006.<br />
                Plot no. 151, Sector 24, Pradhikaran,<br />
                Nigdi, Pune — 411044
              </p>
            </div>
            <div>
              <div style={s.footerHeading}>Services</div>
              {["Safety Grills", "Railings", "Sheds", "Iron Doors", "Structural Work", "Decorative Metal"].map((l) => (
                <span key={l} style={s.footerLink} onMouseEnter={(e) => e.currentTarget.style.color = accent} onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}>{l}</span>
              ))}
            </div>
            <div>
              <div style={s.footerHeading}>Company</div>
              {["About Us", "Projects", "Gallery", "Careers", "Contact"].map((l) => (
                <span key={l} style={s.footerLink} onMouseEnter={(e) => e.currentTarget.style.color = accent} onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}>{l}</span>
              ))}
            </div>
            <div>
              <div style={s.footerHeading}>Contact</div>
              <span style={s.footerLink} onMouseEnter={(e) => e.currentTarget.style.color = accent} onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}>+91 98765 43210</span>
              <span style={s.footerLink} onMouseEnter={(e) => e.currentTarget.style.color = accent} onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}>info@tyfabrication.in</span>
              <div style={{ marginTop: "2rem" }}>
                <div style={s.footerHeading}>Follow Us</div>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {["Facebook", "Instagram", "LinkedIn"].map((l) => (
                    <span key={l} style={{ ...s.footerLink, display: "inline" }} onMouseEnter={(e) => e.currentTarget.style.color = accent} onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={s.footerDivider}>
            <span>© 2026 GoldStar Fabrication Co. All rights reserved.</span>
            <span>Privacy Policy · Terms of Use · Disclaimer</span>
          </div>
        </div>
      </footer>
    </div>
  );
}