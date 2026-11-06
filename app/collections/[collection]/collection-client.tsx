"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { collectionDetails, products, type Category, type Product } from "../../catalog";
import { BagDrawer, useBag } from "../../components/store-cart";
import { StoreHeader } from "../../components/store-header";

type SortOption = "featured" | "price-low" | "price-high" | "name";
type PriceOption = "all" | "under-14000" | "14000-16000" | "over-16000";
type ShapeOption = "All shapes" | Product["shape"];

function ArrowMark() {
  return (
    <svg aria-hidden="true" className="arrow-mark" viewBox="0 0 16 16" focusable="false">
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  );
}

export default function CollectionClient({ category }: { category: Category }) {
  const [sort, setSort] = useState<SortOption>("featured");
  const [price, setPrice] = useState<PriceOption>("all");
  const [shape, setShape] = useState<ShapeOption>("All shapes");
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { bagItems, addToBag } = useBag();
  const details = collectionDetails[category];
  const categoryProducts = products.filter((product) => product.category === category);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const visibleProducts = useMemo(() => {
    const filteredProducts = categoryProducts.filter((product) => {
      const matchesShape = shape === "All shapes" || product.shape === shape;
      const matchesPrice = price === "all"
        || (price === "under-14000" && product.priceValue < 14000)
        || (price === "14000-16000" && product.priceValue >= 14000 && product.priceValue <= 16000)
        || (price === "over-16000" && product.priceValue > 16000);
      return matchesShape && matchesPrice;
    });

    return [...filteredProducts].sort((first, second) => {
      if (sort === "price-low") return first.priceValue - second.priceValue;
      if (sort === "price-high") return second.priceValue - first.priceValue;
      if (sort === "name") return first.name.localeCompare(second.name);
      return categoryProducts.indexOf(first) - categoryProducts.indexOf(second);
    });
  }, [categoryProducts, price, shape, sort]);

  return (
    <main className={`collection-page collection-page-${category.toLowerCase()}`}>
      <StoreHeader activeCollection={category} bagCount={bagItems.length} onOpenBag={() => setIsBagOpen(true)} />

      <section className="collection-hero section-shell" aria-labelledby="collection-title">
        <div className="collection-hero-copy">
          <h1 id="collection-title">{details.title}</h1>
          <p className="collection-hero-description">{details.description}</p>
          <a className="collection-hero-link" href="#collection">Explore the edit <ArrowMark /></a>
        </div>
        <div className="collection-hero-media">
          <Image src={details.heroImage} alt={details.heroAlt} fill priority sizes="(max-width: 720px) 100vw, 58vw" />
          <span className="collection-hero-caption">{category === "Sunglasses" ? "The gold edit" : "In focus / everyday optical"}</span>
        </div>
      </section>

      <section className="collection-browser section-shell" id="collection" aria-labelledby="edit-title">
        <div className="collection-browser-head">
          <div>
            <h2 id="edit-title">The considered edit.</h2>
            <p className="collection-browser-label">{category} / 10 styles</p>
          </div>
          <p className="collection-count" aria-live="polite">Showing {visibleProducts.length} of {categoryProducts.length}</p>
        </div>

        <div className="collection-toolbar" aria-label="Collection filters">
          <div className="collection-category-filter" role="navigation" aria-label="Collection category">
            <a className={category === "Sunglasses" ? "is-active" : ""} href="/collections/sunglasses">Sunglasses <span>10</span></a>
            <a className={category === "Optical" ? "is-active" : ""} href="/collections/optical">Optical <span>10</span></a>
          </div>
          <div className="collection-filter-group">
            <label htmlFor="shape-filter">Shape</label>
            <select id="shape-filter" value={shape} onChange={(event) => setShape(event.target.value as ShapeOption)}>
              <option>All shapes</option>
              <option>Aviator</option>
              <option>Geometric</option>
              <option>Oversized</option>
              <option>Rimless</option>
            </select>
          </div>
          <div className="collection-filter-group">
            <label htmlFor="price-filter">Price</label>
            <select id="price-filter" value={price} onChange={(event) => setPrice(event.target.value as PriceOption)}>
              <option value="all">All prices</option>
              <option value="under-14000">Under ₹14,000</option>
              <option value="14000-16000">₹14,000–₹16,000</option>
              <option value="over-16000">Over ₹16,000</option>
            </select>
          </div>
          <div className="collection-filter-group">
            <label htmlFor="sort-products">Sort by</label>
            <select id="sort-products" value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {visibleProducts.length > 0 ? (
          <div className={`collection-product-grid${isReady ? " is-ready" : ""}`}>
            {visibleProducts.map((product, index) => (
              <article className="collection-product-card" key={product.slug} style={{ "--card-index": index } as React.CSSProperties}>
                <a className={`collection-product-media${product.presentation === "editorial" ? " is-editorial" : ""}`} href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
                  <Image className="collection-product-image collection-product-image-default" src={product.image} alt={`${product.name} ${product.note}`} fill sizes="(max-width: 720px) 50vw, (max-width: 1040px) 50vw, 33vw" />
                  {product.hoverImage && <Image className="collection-product-image collection-product-image-hover" src={product.hoverImage} alt="" aria-hidden="true" fill sizes="(max-width: 720px) 50vw, (max-width: 1040px) 50vw, 33vw" />}
                  <span className="collection-product-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="collection-view-link">View frame <ArrowMark /></span>
                </a>
                <div className="collection-product-meta">
                  <div>
                    <a href={`/products/${product.slug}`}><h3>{product.name}</h3></a>
                    <p>{product.note}</p>
                  </div>
                  <span>{product.price}</span>
                </div>
                <button className="collection-add-button" type="button" onClick={() => { addToBag(product); setIsBagOpen(true); }}>
                  Add to bag <ArrowMark />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="collection-empty">No frames match this edit. Try widening the filters.</div>
        )}
      </section>

      <footer className="site-footer collection-footer section-shell">
        <div className="footer-top">
          <a className="footer-wordmark" href="/" aria-label="JP home">JP</a>
          <p className="footer-statement">Look closer.</p>
        </div>
        <div className="footer-links">
          <div><span className="footer-label">Shop</span><a href="/collections/sunglasses">Sunglasses</a><a href="/collections/optical">Optical</a></div>
          <div><span className="footer-label">Explore</span><a href="/about">About JP</a><a href="/help">Help</a><a href="#collection">Best sellers</a></div>
          <div><span className="footer-label">Follow</span><a href="/">Instagram</a><a href="/">Pinterest</a></div>
        </div>
        <div className="footer-bottom"><span>&copy; 2025 JP Optical</span><span>Made for your view</span></div>
      </footer>

      <BagDrawer items={bagItems} isOpen={isBagOpen} onClose={() => setIsBagOpen(false)} />
    </main>
  );
}

