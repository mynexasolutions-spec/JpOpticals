"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { getSimilarProducts, type Product } from "../../catalog";
import { BagDrawer, useBag } from "../../components/store-cart";
import { StoreFooter } from "../../components/store-footer";
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
  const { bagItems, addToBag, updateQuantity, removeFromBag, clearBag, totalItems, subtotal, bagPulse } = useBag();
  const collectionPath = product.category === "Sunglasses" ? "/collections/sunglasses" : "/collections/optical";
  const similarProducts = getSimilarProducts(product, 4);

  return (
    <main className="product-detail-page">
      <StoreHeader activeCollection={product.category} bagCount={totalItems} bagPulse={bagPulse} onOpenBag={() => setIsBagOpen(true)} />

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
            <div><span>Collection</span><strong>JP / 2026</strong></div>
          </div>
          <div className="product-detail-buy">
            <strong>{product.price}</strong>
            <button className="product-detail-add" type="button" onClick={() => addToBag(product)}>Add to bag <ArrowMark /></button>
          </div>
          <p className="product-detail-note">Complimentary delivery across India. Need help choosing? <a href="/help">Talk to support.</a></p>
        </div>
      </section>

      <section className="similar-products section-shell" aria-labelledby="similar-products-title">
        <div className="similar-products-head">
          <div>
            <span className="similar-products-label">Based on this frame</span>
            <h2 id="similar-products-title">You may also like.</h2>
          </div>
          <a className="similar-products-link" href={collectionPath}>
            View the {product.category.toLowerCase()} edit <ArrowMark />
          </a>
        </div>

        <div className="collection-product-grid similar-product-grid is-ready">
          {similarProducts.map((similarProduct, index) => (
            <article
              className="collection-product-card"
              key={similarProduct.slug}
              style={{ "--card-index": index } as CSSProperties}
            >
              <a
                className={`collection-product-media${similarProduct.presentation === "editorial" ? " is-editorial" : ""}`}
                href={`/products/${similarProduct.slug}`}
                aria-label={`View ${similarProduct.name}`}
              >
                <Image
                  className="collection-product-image collection-product-image-default"
                  src={similarProduct.image}
                  alt={`${similarProduct.name} ${similarProduct.note}`}
                  fill
                  sizes="(max-width: 720px) 50vw, (max-width: 1040px) 50vw, 25vw"
                />
                {similarProduct.hoverImage ? (
                  <Image
                    className="collection-product-image collection-product-image-hover"
                    src={similarProduct.hoverImage}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 720px) 50vw, (max-width: 1040px) 50vw, 25vw"
                  />
                ) : null}
                <span className="collection-product-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="collection-view-link">
                  View frame <ArrowMark />
                </span>
              </a>
              <div className="collection-product-meta">
                <div>
                  <a href={`/products/${similarProduct.slug}`}>
                    <h3>{similarProduct.name}</h3>
                  </a>
                  <p>{similarProduct.note}</p>
                </div>
                <span>{similarProduct.price}</span>
              </div>
              <button
                className="collection-add-button"
                type="button"
                onClick={() => addToBag(similarProduct)}
              >
                Add to bag <ArrowMark />
              </button>
            </article>
          ))}
        </div>
      </section>

      <StoreFooter className="collection-footer" activeCategory={product.category} />

      <BagDrawer
        items={bagItems}
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromBag}
        onClear={clearBag}
        subtotal={subtotal}
      />
    </main>
  );
}
