"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "../../catalog";
import { BagDrawer, useBag } from "../../components/store-cart";
import { StoreHeader } from "../../components/store-header";

function ArrowMark() {
  return (
    <svg aria-hidden="true" className="arrow-mark" viewBox="0 0 16 16" focusable="false">
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  );
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [isBagOpen, setIsBagOpen] = useState(false);
  const { bagItems, addToBag } = useBag();
  const collectionPath = product.category === "Sunglasses" ? "/collections/sunglasses" : "/collections/optical";

  return (
    <main className="product-detail-page">
      <StoreHeader activeCollection={product.category} bagCount={bagItems.length} onOpenBag={() => setIsBagOpen(true)} />

      <section className="product-detail section-shell" aria-labelledby="product-title">
        <div className={`product-detail-media${product.presentation === "editorial" ? " is-editorial" : ""}`}>
          <Image src={product.image} alt={`${product.name} ${product.note}`} fill priority sizes="(max-width: 720px) 100vw, 56vw" />
          <span>{product.category} / {product.shape}</span>
        </div>
        <div className="product-detail-copy">
          <a className="product-back-link" href={collectionPath}>Back to {product.category.toLowerCase()} <ArrowMark /></a>
          <h1 id="product-title">{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>
          <div className="product-detail-specs">
            <div><span>Category</span><strong>{product.category}</strong></div>
            <div><span>Shape</span><strong>{product.shape}</strong></div>
            <div><span>Collection</span><strong>JP / 2025</strong></div>
          </div>
          <div className="product-detail-buy">
            <strong>{product.price}</strong>
            <button className="product-detail-add" type="button" onClick={() => { addToBag(product); setIsBagOpen(true); }}>Add to bag <ArrowMark /></button>
          </div>
          <p className="product-detail-note">Complimentary delivery across India. Need help choosing? <a href="/help">Talk to support.</a></p>
        </div>
      </section>

      <footer className="site-footer collection-footer section-shell">
        <div className="footer-top">
          <a className="footer-wordmark" href="/" aria-label="JP home">JP</a>
          <p className="footer-statement">Look closer.</p>
        </div>
        <div className="footer-links">
          <div><span className="footer-label">Shop</span><a href="/collections/sunglasses">Sunglasses</a><a href="/collections/optical">Optical</a></div>
          <div><span className="footer-label">Explore</span><a href="/about">About JP</a><a href="/help">Help</a><a href={collectionPath}>Collection</a></div>
          <div><span className="footer-label">Follow</span><a href="/">Instagram</a><a href="/">Pinterest</a></div>
        </div>
        <div className="footer-bottom"><span>&copy; 2025 JP Optical</span><span>Made for your view</span></div>
      </footer>

      <BagDrawer items={bagItems} isOpen={isBagOpen} onClose={() => setIsBagOpen(false)} />
    </main>
  );
}

