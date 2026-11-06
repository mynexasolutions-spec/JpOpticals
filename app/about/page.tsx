"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BagIcon } from "../components/store-header";

function ArrowMark() {
  return (
    <svg aria-hidden="true" className="arrow-mark" viewBox="0 0 16 16" focusable="false">
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <circle cx="12" cy="7.5" r="3.25" />
      <path d="M5.5 20c.7-3.25 3-5 6.5-5s5.8 1.75 6.5 5" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <circle cx="10.75" cy="10.75" r="6.25" />
      <path d="m15.5 15.5 4.25 4.25" />
    </svg>
  );
}

function AboutHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`site-header about-site-header${isMenuOpen ? " menu-is-open" : ""}`}>
      <a className="wordmark" href="/" aria-label="JP home">JP</a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href="/collections/sunglasses">Sunglasses</a>
        <a href="/collections/optical">Optical</a>
        <a href="/help">Help</a>
        <a href="/about" aria-current="page">About</a>
      </nav>
      <div className="header-actions">
        <button className="text-button menu-toggle" type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-label={isMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={isMenuOpen}>
          <span className="menu-toggle-icon" aria-hidden="true"><span /><span /><span /></span>
        </button>
        <a className="icon-button" href="/#about" aria-label="Open profile" title="Profile">
          <ProfileIcon />
        </a>
        <a className="icon-button" href="/#collection" aria-label="Search the collection" title="Search">
          <SearchIcon />
        </a>
        <a className="bag-button" href="/#collection" aria-label="Open bag, 0 items">
          <BagIcon /><span className="bag-label">Bag</span><span className="bag-count">0</span>
        </a>
      </div>
      {isMenuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <a href="/" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="/collections/sunglasses" onClick={() => setIsMenuOpen(false)}>Sunglasses</a>
          <a href="/collections/optical" onClick={() => setIsMenuOpen(false)}>Optical</a>
          <a href="/help" onClick={() => setIsMenuOpen(false)}>Help</a>
          <a href="/about" onClick={() => setIsMenuOpen(false)} aria-current="page">About</a>
        </nav>
      )}
    </header>
  );
}

export default function AboutPage() {
  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".about-reveal"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="about-page">
      <AboutHeader />

      <section className="about-hero section-shell" aria-labelledby="about-title">
        <div className="about-hero-copy">
          <h1 id="about-title">A clearer point of view.</h1>
          <p className="about-hero-lead">JP Optical creates considered eyewear for people who notice the details — frames that bring clarity, confidence, and a little more character to the everyday.</p>
          <a className="about-primary-link" href="/#collection">Explore the collection <ArrowMark /></a>
          <div className="about-hero-note">
            <span>01</span>
            <p>Independent eyewear, thoughtfully selected for the way you see the world.</p>
          </div>
        </div>
        <div className="about-hero-media">
          <div className="about-image-viewport">
            <Image src="/About1.jpeg" alt="JP Opticals showroom with a pair of glasses displayed on a stone counter" width={1600} height={800} priority sizes="(max-width: 720px) 100vw, 62vw" />
          </div>
          <span className="about-image-label">JP OPTICAL / THE HOUSE</span>
          <span className="about-image-count">01 / 02</span>
        </div>
      </section>

      <section className="about-story section-shell about-reveal" id="our-story" aria-labelledby="story-title">
        <div className="about-story-media">
          <div className="about-image-viewport">
            <Image src="/About2.jpeg" alt="Eyewear displayed in the JP Opticals showroom" width={1600} height={800} sizes="(max-width: 720px) 100vw, 52vw" />
          </div>
          <span className="about-image-label">THE STORY / IN FOCUS</span>
        </div>
        <div className="about-story-copy">
          <div className="about-section-marker"><span>02</span><span>Our story</span></div>
          <h2 id="story-title">Built around the belief that better seeing changes everything.</h2>
          <p>JP Optical began with a simple idea: eyewear should feel personal before it feels precious. We look for shapes with a point of view, materials that age beautifully, and details that reward a closer look.</p>
          <p>From the first fitting to the frame you reach for every morning, our role is to make choosing well feel effortless. The result is a collection that is refined, expressive, and made to stay with you.</p>
        </div>
      </section>

      <section className="about-direction section-shell about-reveal" id="vision" aria-labelledby="direction-title">
        <div className="about-direction-lead">
          <span className="about-section-marker"><span>03</span><span>Our direction</span></span>
          <h2 id="direction-title">A more thoughtful way to look forward.</h2>
        </div>
        <div className="about-principles">
          <article className="about-principle">
            <span>Vision</span>
            <h3>Make confidence feel natural.</h3>
            <p>We imagine a future where great eyewear is not reserved for special occasions. It is part of the rhythm of a well-lived day.</p>
          </article>
          <article className="about-principle">
            <span>Mission</span>
            <h3>Bring clarity to every choice.</h3>
            <p>We curate distinctive frames, offer clear guidance, and make the fitting experience as considered as the pieces themselves.</p>
          </article>
          <article className="about-principle">
            <span>Commitment</span>
            <h3>Choose detail over noise.</h3>
            <p>Every edit is intentionally small, so each frame has the space to feel like a decision rather than an impulse.</p>
          </article>
        </div>
      </section>

      <section className="about-philosophy about-reveal" id="philosophy" aria-labelledby="philosophy-title">
        <div className="about-philosophy-inner section-shell">
          <div className="about-philosophy-copy">
            <span className="about-section-marker"><span>04</span><span>Brand philosophy</span></span>
            <h2 id="philosophy-title">See the essential. Keep the rest out of frame.</h2>
          </div>
          <div className="about-values">
            <div><span>01</span><p>Clarity in the edit</p></div>
            <div><span>02</span><p>Character in the details</p></div>
            <div><span>03</span><p>Ease in the everyday</p></div>
          </div>
        </div>
      </section>

      <section className="about-cta section-shell about-reveal" aria-labelledby="about-cta-title">
        <div>
          <span className="about-cta-label">The next view</span>
          <h2 id="about-cta-title">Find the frame that feels like yours.</h2>
        </div>
        <a className="about-cta-link" href="/#collection">Shop the collection <ArrowMark /></a>
      </section>

      <footer className="site-footer about-footer section-shell">
        <div className="footer-top">
          <a className="footer-wordmark" href="/" aria-label="JP home">JP</a>
          <p className="footer-statement">Look closer.</p>
        </div>
        <div className="footer-links">
          <div><span className="footer-label">Shop</span><a href="/collections/sunglasses">Sunglasses</a><a href="/collections/optical">Optical</a></div>
          <div><span className="footer-label">Explore</span><a href="/about">About JP</a><a href="/help">Help</a><a href="/#collection">Best sellers</a></div>
          <div><span className="footer-label">Follow</span><a href="/">Instagram</a><a href="/">Pinterest</a></div>
        </div>
        <div className="footer-bottom"><span>&copy; 2025 JP Optical</span><span>Made for your view</span></div>
      </footer>
    </main>
  );
}
