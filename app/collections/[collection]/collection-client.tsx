"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { collectionDetails, products, type Category, type Product } from "../../catalog";
import { BagDrawer, useBag } from "../../components/store-cart";
import { StoreFooter } from "../../components/store-footer";
import { StoreHeader } from "../../components/store-header";

type SortOption = "featured" | "price-low" | "price-high" | "name";
type PriceOption = "all" | "under-14000" | "14000-16000" | "over-16000";
type ShapeOption = "All shapes" | Product["shape"];
type FilterKey = "shape" | "price" | "sort";
type FilterOption = { value: string; label: string };

const shapeOptions: FilterOption[] = [
  { value: "All shapes", label: "All shapes" },
  { value: "Aviator", label: "Aviator" },
  { value: "Geometric", label: "Geometric" },
  { value: "Oversized", label: "Oversized" },
  { value: "Rimless", label: "Rimless" },
];

const priceOptions: FilterOption[] = [
  { value: "all", label: "All prices" },
  { value: "under-14000", label: "Under ₹14,000" },
  { value: "14000-16000", label: "₹14,000–₹16,000" },
  { value: "over-16000", label: "Over ₹16,000" },
];

const sortOptions: FilterOption[] = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "name", label: "Name: A to Z" },
];

function ArrowMark() {
  return (
    <svg aria-hidden="true" className="arrow-mark" viewBox="0 0 16 16" focusable="false">
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" className="filter-chevron" viewBox="0 0 12 12" focusable="false">
      <path d="m2.25 4.25 3.75 3.5 3.75-3.5" />
    </svg>
  );
}

type FilterMenuProps = {
  id: string;
  label: string;
  value: string;
  options: FilterOption[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSelect: (value: string) => void;
};

function FilterMenu({ id, label, value, options, isOpen, onToggle, onClose, onSelect }: FilterMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) onClose();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div className="collection-filter-group" ref={menuRef}>
      <span className="collection-filter-label">{label}</span>
      <button
        className="collection-filter-trigger"
        id={`${id}-trigger`}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={`${id}-menu`}
        aria-label={`${label}: ${selectedOption.label}`}
        onClick={onToggle}
      >
        <span>{selectedOption.label}</span>
        <ChevronIcon />
      </button>
      {isOpen && (
        <div className="collection-filter-menu" id={`${id}-menu`} role="menu" aria-labelledby={`${id}-trigger`}>
          {options.map((option) => (
            <button
              className="collection-filter-option"
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={option.value === value}
              onClick={() => { onSelect(option.value); onClose(); }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CollectionClient({ category }: { category: Category }) {
  const [sort, setSort] = useState<SortOption>("featured");
  const [price, setPrice] = useState<PriceOption>("all");
  const [shape, setShape] = useState<ShapeOption>("All shapes");
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { bagItems, addToBag, updateQuantity, removeFromBag, clearBag, totalItems, subtotal, bagPulse } = useBag();
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
      <StoreHeader activeCollection={category} bagCount={totalItems} bagPulse={bagPulse} onOpenBag={() => setIsBagOpen(true)} />

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
          <FilterMenu
            id="shape-filter"
            label="Shape"
            value={shape}
            options={shapeOptions}
            isOpen={openFilter === "shape"}
            onToggle={() => setOpenFilter(openFilter === "shape" ? null : "shape")}
            onClose={() => setOpenFilter(null)}
            onSelect={(value) => setShape(value as ShapeOption)}
          />
          <FilterMenu
            id="price-filter"
            label="Price"
            value={price}
            options={priceOptions}
            isOpen={openFilter === "price"}
            onToggle={() => setOpenFilter(openFilter === "price" ? null : "price")}
            onClose={() => setOpenFilter(null)}
            onSelect={(value) => setPrice(value as PriceOption)}
          />
          <FilterMenu
            id="sort-products"
            label="Sort by"
            value={sort}
            options={sortOptions}
            isOpen={openFilter === "sort"}
            onToggle={() => setOpenFilter(openFilter === "sort" ? null : "sort")}
            onClose={() => setOpenFilter(null)}
            onSelect={(value) => setSort(value as SortOption)}
          />
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
                <button className="collection-add-button" type="button" onClick={() => addToBag(product)}>
                  Add to bag <ArrowMark />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="collection-empty">No frames match this edit. Try widening the filters.</div>
        )}
      </section>

      <StoreFooter className="collection-footer" activeCategory={category} />

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
