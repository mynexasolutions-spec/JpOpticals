"use client";

import { useState } from "react";
import type { Category } from "../catalog";

type StoreHeaderProps = {
  activeCollection?: Category;
  bagCount: number;
  onOpenBag: () => void;
};

export function StoreHeader({ activeCollection, bagCount, onOpenBag }: StoreHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`site-header store-site-header${isMenuOpen ? " menu-is-open" : ""}`}>
      <a className="wordmark" href="/" aria-label="JP home">JP</a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="/collections/sunglasses" aria-current={activeCollection === "Sunglasses" ? "page" : undefined}>Sunglasses</a>
        <a href="/collections/optical" aria-current={activeCollection === "Optical" ? "page" : undefined}>Optical</a>
        <a href="/help">Help</a>
        <a href="/about">About</a>
      </nav>
      <div className="header-actions">
        <button className="text-button menu-toggle" type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen}>
          {isMenuOpen ? "Close" : "Menu"}
        </button>
        <a className="icon-button" href="/about" aria-label="Open profile" title="Profile">
          <ProfileIcon />
        </a>
        <a className="icon-button" href="#collection" aria-label="Search the collection" title="Search">
          <SearchIcon />
        </a>
        <button className="bag-button" type="button" onClick={onOpenBag} aria-label={`Open bag, ${bagCount} items`}>
          Bag <span className="bag-count">{bagCount}</span>
        </button>
      </div>
      {isMenuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <a href="/collections/sunglasses" onClick={() => setIsMenuOpen(false)} aria-current={activeCollection === "Sunglasses" ? "page" : undefined}>Sunglasses</a>
          <a href="/collections/optical" onClick={() => setIsMenuOpen(false)} aria-current={activeCollection === "Optical" ? "page" : undefined}>Optical</a>
          <a href="/help" onClick={() => setIsMenuOpen(false)}>Help</a>
          <a href="/about" onClick={() => setIsMenuOpen(false)}>About</a>
        </nav>
      )}
    </header>
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

