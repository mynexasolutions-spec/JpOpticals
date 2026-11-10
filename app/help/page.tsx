"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { BagIcon } from "../components/store-header";
import { StoreFooter } from "../components/store-footer";
import { StoreSearch } from "../components/store-search";

const faqs = [
  {
    question: "How do I find the right frame?",
    answer: "Start with the shapes you naturally reach for, then consider the width of your face and where the frame sits on your bridge. Our support team can also help narrow the selection if you share a few styles you already love.",
  },
  {
    question: "Can I change or cancel my order?",
    answer: "We can usually update or cancel an order within two hours of confirmation. Send us your order number as soon as possible and we will check its status before it enters fulfillment.",
  },
  {
    question: "How long does delivery take?",
    answer: "Orders are prepared within one to two business days. Standard delivery usually arrives in three to five business days across India, with an email update as soon as your frame leaves us.",
  },
  {
    question: "What is your return policy?",
    answer: "Unused frames can be returned within 14 days of delivery in their original packaging. Contact our team first so we can guide you through the simple return and exchange process.",
  },
  {
    question: "Do you offer prescription lenses?",
    answer: "Yes. Prescription lens support is available for selected optical frames. Share your prescription with our team and we will confirm the available lens options, timelines, and final price.",
  },
  {
    question: "How can I book a fitting?",
    answer: "Write to hello@jpoptical.example with your preferred day and time. Our team will confirm an in-store or virtual fitting appointment during support hours.",
  },
];

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

function HelpHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className={`site-header help-site-header${isMenuOpen ? " menu-is-open" : ""}`}>
      <a className="wordmark" href="/" aria-label="JP home">JP</a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href="/collections/sunglasses">Sunglasses</a>
        <a href="/collections/optical">Optical</a>
        <a href="/help" aria-current="page">Help</a>
        <a href="/about">About</a>
      </nav>
      <div className="header-actions">
        <button className="text-button menu-toggle" type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-label={isMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={isMenuOpen}>
          <span className="menu-toggle-icon" aria-hidden="true"><span /><span /><span /></span>
        </button>
        <a className="icon-button" href="/account" aria-label="Open account" title="Account">
          <ProfileIcon />
        </a>
        <button className="icon-button" type="button" aria-label="Search the collection" title="Search" aria-expanded={isSearchOpen} onClick={() => { setIsMenuOpen(false); setIsSearchOpen(true); }}>
          <SearchIcon />
        </button>
        <a className="bag-button" href="/#collection" aria-label="Open bag, 0 items">
          <BagIcon /><span className="bag-label">Bag</span><span className="bag-count">0</span>
        </a>
      </div>
      {isMenuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <a href="/" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="/collections/sunglasses" onClick={() => setIsMenuOpen(false)}>Sunglasses</a>
          <a href="/collections/optical" onClick={() => setIsMenuOpen(false)}>Optical</a>
          <a href="/help" onClick={() => setIsMenuOpen(false)} aria-current="page">Help</a>
          <a href="/about" onClick={() => setIsMenuOpen(false)}>About</a>
        </nav>
      )}
      <StoreSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".help-reveal"));
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="help-page">
      <HelpHeader />

      <section className="help-hero section-shell" aria-labelledby="help-title">
        <div className="help-hero-copy">
          <span className="help-eyebrow">JP Optical / Support</span>
          <h1 id="help-title">Help, made clear.</h1>
          <p className="help-hero-lead">Thoughtful answers for the frames you choose, the orders you place, and the view you take into every day.</p>
          <a className="help-primary-link" href="#faq">Browse common questions <ArrowMark /></a>
          <div className="help-hero-note">
            <span>01</span>
            <p>Personal guidance from a real person, whenever you need a closer look.</p>
          </div>
        </div>
        <div className="help-hero-media">
          <div className="help-image-viewport">
            <Image src="/help.jpeg" alt="JP Optical support desk with eyewear and a customer care headset" width={1600} height={800} priority sizes="(max-width: 720px) 100vw, 66vw" />
          </div>
          <span className="help-image-label">JP OPTICAL / CUSTOMER CARE</span>
          <span className="help-image-count">01 / 01</span>
        </div>
      </section>

      <section className="help-support-strip section-shell help-reveal" aria-label="Customer support contact details">
        <div className="help-support-item">
          <span>Talk to a person</span>
          <a href="tel:+918045672088">+91 80 4567 2088 <ArrowMark /></a>
          <p>For fittings, orders, and frame advice.</p>
        </div>
        <div className="help-support-item">
          <span>Write to us</span>
          <a href="mailto:hello@jpoptical.example">hello@jpoptical.example <ArrowMark /></a>
          <p>We reply within one business day.</p>
        </div>
        <div className="help-support-item">
          <span>Support hours</span>
          <strong>Mon–Sat / 10:00–19:00 IST</strong>
          <p>Closed on Sundays and public holidays.</p>
        </div>
      </section>

      <section className="help-faq section-shell help-reveal" id="faq" aria-labelledby="faq-title">
        <div className="help-faq-intro">
          <span className="help-section-marker"><span>02</span><span>Frequently asked</span></span>
          <h2 id="faq-title">The clear answer is usually close by.</h2>
          <p>Start here for the details our customers ask about most. If you need more context, our team is only a message away.</p>
          <a className="help-text-link" href="#contact">Ask us directly <ArrowMark /></a>
        </div>
        <div className="help-faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div className={`help-faq-item${isOpen ? " is-open" : ""}`} key={faq.question}>
                <button className="help-faq-question" type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(isOpen ? -1 : index)}>
                  <span>{faq.question}</span>
                  <span className="help-faq-icon" aria-hidden="true">+</span>
                </button>
                <div className="help-faq-answer" id={`faq-answer-${index}`} hidden={!isOpen}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="help-assistance section-shell help-reveal" id="orders" aria-labelledby="assistance-title">
        <div className="help-assistance-head">
          <div>
            <span className="help-section-marker"><span>03</span><span>Here for every step</span></span>
            <h2 id="assistance-title">Support that stays simple.</h2>
          </div>
          <p>From the first order to the next pair, we keep the practical details easy to find.</p>
        </div>
        <div className="help-assistance-grid">
          <article className="help-assistance-card">
            <span>01 / Order assistance</span>
            <h3>Need to update an order?</h3>
            <p>Keep your order number close and tell us what needs changing. We will check the status and help with delivery details, prescriptions, or product questions.</p>
            <a className="help-text-link" href="#contact">Get order help <ArrowMark /></a>
          </article>
          <article className="help-assistance-card">
            <span>02 / Shipping</span>
            <h3>Delivered with care.</h3>
            <p>Every frame is packed securely and dispatched within one to two business days. Standard delivery across India generally takes three to five business days.</p>
            <a className="help-text-link" href="mailto:hello@jpoptical.example">Check delivery <ArrowMark /></a>
          </article>
          <article className="help-assistance-card">
            <span>03 / Returns</span>
            <h3>A considered return.</h3>
            <p>If the frame is not quite yours, contact us within 14 days of delivery. We will guide you through an exchange or return in its original condition.</p>
            <a className="help-text-link" href="#contact">Start a return <ArrowMark /></a>
          </article>
        </div>
      </section>

      <section className="help-contact section-shell help-reveal" id="contact" aria-labelledby="contact-title">
        <div className="help-contact-copy">
          <span className="help-section-marker"><span>04</span><span>Contact support</span></span>
          <h2 id="contact-title">Tell us what you need to see clearly.</h2>
          <p>Share a few details and a member of the JP Optical team will get back to you within one business day.</p>
          <div className="help-contact-details">
            <a href="mailto:hello@jpoptical.example">hello@jpoptical.example <ArrowMark /></a>
            <a href="tel:+918045672088">+91 80 4567 2088 <ArrowMark /></a>
            <span>10:00–19:00 IST / Monday–Saturday</span>
          </div>
        </div>
        <form className="help-form" onSubmit={handleSubmit}>
          <div className="help-form-field">
            <label htmlFor="help-name">Your name</label>
            <input id="help-name" name="name" type="text" autoComplete="name" required />
          </div>
          <div className="help-form-field">
            <label htmlFor="help-email">Email address</label>
            <input id="help-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="help-form-field">
            <label htmlFor="help-order">Order number <span>Optional</span></label>
            <input id="help-order" name="orderNumber" type="text" autoComplete="off" />
          </div>
          <div className="help-form-field">
            <label htmlFor="help-topic">What can we help with?</label>
            <select id="help-topic" name="topic" defaultValue="" required>
              <option value="" disabled>Select a topic</option>
              <option value="order">Order assistance</option>
              <option value="shipping">Shipping</option>
              <option value="returns">Returns and exchanges</option>
              <option value="fitting">Frame or fitting advice</option>
              <option value="other">Something else</option>
            </select>
          </div>
          <div className="help-form-field help-form-field-wide">
            <label htmlFor="help-message">How can we help?</label>
            <textarea id="help-message" name="message" rows={4} required />
          </div>
          <div className="help-form-actions">
            <p className="help-form-note">By sending this form, you are asking our support team to contact you about your request.</p>
            <button className="help-submit" type="submit" disabled={submitted}>{submitted ? "Request sent" : "Send request"} <ArrowMark /></button>
          </div>
          {submitted && <p className="help-form-success" role="status">Thanks — your request is in the queue. We’ll reply within one business day.</p>}
        </form>
      </section>

      <StoreFooter className="help-footer" />
    </main>
  );
}
