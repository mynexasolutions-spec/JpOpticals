"use client";

import { useEffect, useState } from "react";
import type { Category } from "../catalog";

type StoreHeaderProps = {
  activeCollection?: Category;
  bagCount: number;
  bagPulse?: number;
  onOpenBag: () => void;
};

export function StoreHeader({ activeCollection, bagCount, bagPulse = 0, onOpenBag }: StoreHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBagBumping, setIsBagBumping] = useState(false);

  useEffect(() => {
    if (!bagPulse) return;
    setIsBagBumping(true);
    const timer = window.setTimeout(() => setIsBagBumping(false), 560);
    return () => window.clearTimeout(timer);
  }, [bagPulse]);

  return (
    <header className={`site-header store-site-header${isMenuOpen ? " menu-is-open" : ""}`}>
      <a className="wordmark" href="/" aria-label="JP home">JP</a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href="/collections/sunglasses" aria-current={activeCollection === "Sunglasses" ? "page" : undefined}>Sunglasses</a>
        <a href="/collections/optical" aria-current={activeCollection === "Optical" ? "page" : undefined}>Optical</a>
        <a href="/help">Help</a>
        <a href="/about">About</a>
      </nav>
      <div className="header-actions">
        <button className="text-button menu-toggle" type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-label={isMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={isMenuOpen}>
          <span className="menu-toggle-icon" aria-hidden="true"><span /><span /><span /></span>
        </button>
        <a className="icon-button" href="/about" aria-label="Open profile" title="Profile">
          <ProfileIcon />
        </a>
        <a className="icon-button" href="#collection" aria-label="Search the collection" title="Search">
          <SearchIcon />
        </a>
        <button className={`bag-button${bagCount ? " has-items" : ""}${isBagBumping ? " is-bag-bumping" : ""}`} type="button" onClick={onOpenBag} aria-label={`Open bag, ${bagCount} items`}>
          <BagIcon /><span className="bag-label">Bag</span><span className="bag-count">{bagCount}</span>
        </button>
      </div>
      {isMenuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <a href="/" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="/collections/sunglasses" onClick={() => setIsMenuOpen(false)} aria-current={activeCollection === "Sunglasses" ? "page" : undefined}>Sunglasses</a>
          <a href="/collections/optical" onClick={() => setIsMenuOpen(false)} aria-current={activeCollection === "Optical" ? "page" : undefined}>Optical</a>
          <a href="/help" onClick={() => setIsMenuOpen(false)}>Help</a>
          <a href="/about" onClick={() => setIsMenuOpen(false)}>About</a>
        </nav>
      )}
    </header>
  );
}

export function BagIcon() {
  return (
    <span className="bag-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M5.5 8.5h13l-.8 11H6.3l-.8-11Z" />
        <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
      </svg>
    </span>
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

