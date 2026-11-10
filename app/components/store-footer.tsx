"use client";

import { useState, type FormEvent } from "react";
import { products, type Category } from "../catalog";

type StoreFooterProps = {
  className: string;
  activeCategory?: Category;
};

function ArrowMark() {
  return (
    <svg aria-hidden="true" className="arrow-mark" viewBox="0 0 16 16" focusable="false">
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  );
}

export function StoreFooter({ className, activeCategory }: StoreFooterProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const linkedProducts = (activeCategory
    ? products.filter((product) => product.category === activeCategory)
    : products
  ).slice(0, 4);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubscribed(true);
  }

  return (
    <footer className={`site-footer section-shell ${className}`}>
      <div className="footer-top">
        <a className="footer-wordmark" href="/" aria-label="JP home">JP</a>
        <p className="footer-statement">Look closer.</p>
      </div>

      <div className="footer-main">
        <div className="footer-newsletter">
          <span className="footer-label">Newsletter</span>
          <p>Subscribe to receive updates from JP Optical.</p>
          <form className="footer-newsletter-form" onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor="footer-newsletter-email">Email address</label>
            <div className="footer-newsletter-field">
              <input id="footer-newsletter-email" name="email" type="email" placeholder="Email address" autoComplete="email" required />
              <button type="submit">Subscribe <ArrowMark /></button>
            </div>
          </form>
          {isSubscribed && <p className="footer-newsletter-status" role="status">Thanks — your details were received locally.</p>}
        </div>

        <div className="footer-link-group">
          <span className="footer-label">Shop</span>
          <a href="/collections/sunglasses">Sunglasses</a>
          <a href="/collections/optical">Optical</a>
          <span className="footer-sublabel">Selected frames</span>
          {linkedProducts.map((product) => (
            <a href={`/products/${product.slug}`} key={product.slug}>{product.name}</a>
          ))}
        </div>

        <div className="footer-link-group">
          <span className="footer-label">Information</span>
          <a href="/about">About JP</a>
          <a href="/help">Help</a>
          <a href="/account">Account</a>
          <a href="/#collection">Best sellers</a>
          {activeCategory && <a href={`/collections/${activeCategory.toLowerCase()}`}>Collection</a>}
          <span className="footer-sublabel">Follow</span>
          <a href="/">Instagram</a>
          <a href="/">Pinterest</a>
        </div>

        <div className="footer-about">
          <span className="footer-label">About JP</span>
          <p>JP Optical began with a simple idea: eyewear should feel personal before it feels precious. We look for shapes with a point of view, materials that age beautifully, and details that reward a closer look.</p>
          <a className="footer-about-link" href="/about">Read our story <ArrowMark /></a>
          <div className="footer-contact">
            <a href="mailto:hello@jpoptical.example">hello@jpoptical.example</a>
            <a href="tel:+918045672088">+91 80 4567 2088</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom"><span>&copy; 2026 JP Optical</span><span>Made for your view</span></div>
    </footer>
  );
}
