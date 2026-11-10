"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { products } from "../catalog";

type StoreSearchProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function StoreSearch({ isOpen, onClose }: StoreSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalizedQuery) return products.slice(0, 4);

    return products.filter((product) => [product.name, product.category, product.shape, product.note, product.description]
      .some((field) => field.toLowerCase().includes(normalizedQuery))).slice(0, 8);
  }, [normalizedQuery]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="search-layer" role="presentation" onClick={onClose}>
      <section className="search-panel" role="dialog" aria-modal="true" aria-labelledby="search-title" onClick={(event) => event.stopPropagation()}>
        <div className="search-panel-head">
          <h2 id="search-title">Find your frame.</h2>
          <button className="search-close-button" type="button" onClick={onClose}>Close</button>
        </div>

        <form className="search-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="store-search-input">Search frames</label>
          <input
            ref={inputRef}
            id="store-search-input"
            className="search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search frames, shapes, collections"
            autoComplete="off"
          />
        </form>

        <div className="search-results" aria-live="polite">
          <div className="search-results-head">
            <span>{normalizedQuery ? `${results.length} ${results.length === 1 ? "frame" : "frames"}` : "Popular in the edit"}</span>
            {normalizedQuery && <span>Showing the closest matches</span>}
          </div>
          {results.length > 0 ? (
            <ul className="search-result-list">
              {results.map((product) => (
                <li key={product.slug}>
                  <a className="search-result" href={`/products/${product.slug}`} onClick={onClose}>
                    <span>
                      <strong>{product.name}</strong>
                      <small>{product.category} / {product.shape}</small>
                    </span>
                    <span>{product.price}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="search-empty">No frames match that search. Try a shape like aviator or rimless.</p>
          )}
        </div>
      </section>
    </div>
  );
}
