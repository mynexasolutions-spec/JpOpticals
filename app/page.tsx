"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Category = "Sunglasses" | "Optical";

type Product = {
  name: string;
  price: string;
  category: Category;
  image: string;
  hoverImage?: string;
  note: string;
};

const products: Product[] = [
  {
    name: "Glossy Black",
    price: "₹12,800",
    category: "Sunglasses",
    image: "/Glossy_Black_Oversized_Sunglasses-removebg-preview.png",
    hoverImage: "/Glossy_Black_Aviator_Sunglasses-removebg-preview.png",
    note: "Oversized acetate",
  },
  {
    name: "Crystal Edge",
    price: "₹14,500",
    category: "Sunglasses",
    image: "/Crystal-Edge_Rimless_Gradient_Sunglasses-removebg-preview.png",
    hoverImage: "/Faceted_Gradient_Rimless_Sunglasses-removebg-preview.png",
    note: "Gradient rimless",
  },
  {
    name: "Silver Geometry",
    price: "₹13,900",
    category: "Optical",
    image: "/products/Rimless_Geometric_Silver_Sunglasses-removebg-preview.png",
    hoverImage: "/products/Rimless_Green_Gradient_Sunglasses-removebg-preview.png",
    note: "Geometric metal",
  },
  {
    name: "Green Gradient",
    price: "₹13,600",
    category: "Optical",
    image: "/products/Rimless_Green_Gradient_Sunglasses-removebg-preview.png",
    hoverImage: "/products/Rimless_Geometric_Silver_Sunglasses-removebg-preview.png",
    note: "Tinted rimless",
  },
];

const heroSlides = [
  { image: "/hero1.jpeg", alt: "Woman wearing dark transition sunglasses" },
  { image: "/hero2.jpeg", alt: "Man wearing gold transition sunglasses" },
  { image: "/hero3.jpeg", alt: "Two people wearing modern JP eyewear" },
];

const categories: { label: string; title: string; description: string; image: string; category: Category }[] = [
  {
    label: "01",
    title: "Transition (Photochromic) Sunglasses",
    description: "Sunglasses that shift with the light.",
    image: "/hero1.jpeg",
    category: "Sunglasses",
  },
  {
    label: "02",
    title: "Transition (Photochromic)",
    description: "A clearer kind of adaptive.",
    image: "/hero2.jpeg",
    category: "Sunglasses",
  },
  {
    label: "03",
    title: "Optical",
    description: "Refined frames for every day.",
    image: "/Modern Rimless Glasses Portrait.png",
    category: "Optical",
  },
];

function ArrowMark() {
  return <span aria-hidden="true" className="arrow-mark">↗</span>;
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

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Sunglasses");
  const [activeHero, setActiveHero] = useState(0);
  const [bagItems, setBagItems] = useState<Product[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const heroTimer = window.setInterval(() => {
      setActiveHero((slide) => (slide + 1) % heroSlides.length);
    }, 3000);

    return () => window.clearInterval(heroTimer);
  }, []);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > window.innerHeight * 0.82);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const visibleProducts = products.filter((product) => product.category === activeCategory);

  function showCategory(category: Category) {
    setActiveCategory(category);
    setIsMenuOpen(false);
    document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
  }

  function addToBag(product: Product) {
    setBagItems((items) => [...items, product]);
    setIsBagOpen(true);
  }

  return (
    <main>
      <header className={`site-header${isScrolled ? " is-scrolled" : ""}${isMenuOpen ? " menu-is-open" : ""}`}>
        <a className="wordmark" href="#top" aria-label="JP home">JP</a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <button type="button" onClick={() => showCategory("Sunglasses")}>Sunglasses</button>
          <button type="button" onClick={() => showCategory("Optical")}>Optical</button>
          <a href="#help">Help</a>
          <a href="#about">About</a>
        </nav>
        <div className="header-actions">
          <button className="text-button menu-toggle" type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen}>
            {isMenuOpen ? "Close" : "Menu"}
          </button>
          <button className="icon-button" type="button" aria-label="Open profile" title="Profile" onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}>
            <ProfileIcon />
          </button>
          <button className="icon-button" type="button" aria-label="Search the collection" title="Search" onClick={() => document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" })}>
            <SearchIcon />
          </button>
          <button className="bag-button" type="button" onClick={() => setIsBagOpen(true)} aria-label={`Open bag, ${bagItems.length} items`}>
            Bag <span className="bag-count">{bagItems.length}</span>
          </button>
        </div>
        {isMenuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <button type="button" onClick={() => showCategory("Sunglasses")}>Sunglasses</button>
            <button type="button" onClick={() => showCategory("Optical")}>Optical</button>
            <a href="#help" onClick={() => setIsMenuOpen(false)}>Help</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
          </nav>
        )}
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-slides" aria-label="JP eyewear campaign">
          {heroSlides.map((slide, index) => (
            <Image
              className={`hero-image${activeHero === index ? " is-active" : ""}`}
              key={slide.image}
              src={slide.image}
              alt={activeHero === index ? slide.alt : ""}
              fill
              priority={index === 0}
              sizes="100vw"
            />
          ))}
        </div>
        <div className="hero-shade" />
        <div className="hero-content page-gutter">
          <h1 id="hero-title">A new point of view.</h1>
          <p className="hero-copy">Modern frames for the changing light, made to stay with you.</p>
          <button className="light-button" type="button" onClick={() => showCategory("Sunglasses")}>
            Explore sunglasses <ArrowMark />
          </button>
        </div>
        <div className="hero-indicators" aria-label="Hero slides">
          {heroSlides.map((slide, index) => (
            <button
              className={`hero-indicator${activeHero === index ? " is-active" : ""}`}
              key={slide.image}
              type="button"
              aria-label={`Show hero image ${index + 1}`}
              aria-current={activeHero === index ? "true" : undefined}
              onClick={() => setActiveHero(index)}
            >
              <span className="hero-indicator-fill" aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="hero-bottom page-gutter" aria-hidden="true">
          <span>JP / 2025</span>
          <span>Designed for the everyday</span>
        </div>
      </section>

      <section className="intro section-shell" id="about" aria-labelledby="intro-title">
        <div>
          <h2 id="intro-title">Find the frame that feels like yours.</h2>
        </div>
        <div className="intro-side">
          <p>Easy lines, considered materials, and lenses that meet the day where it is.</p>
          <button className="underlined-link" type="button" onClick={() => showCategory("Optical")}>Shop the collection <ArrowMark /></button>
        </div>
      </section>

      <section className="category-section section-shell" aria-labelledby="category-title">
        <div className="section-heading-row">
          <h2 id="category-title">Shop by category</h2>
          <span className="section-count">03 / 03</span>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <button className="category-card" type="button" key={category.label} onClick={() => showCategory(category.category)}>
              <span className="category-image-wrap">
                <Image src={category.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" />
              </span>
              <span className="category-overlay" />
              <span className="category-content">
                <span className="category-label">{category.label}</span>
                <span className="category-title">{category.title}</span>
                <span className="category-description">{category.description}</span>
                <span className="category-link">Shop now <ArrowMark /></span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="collection section-shell" id="collection" aria-labelledby="collection-title">
        <div className="collection-head">
          <div>
            <h2 id="collection-title">Best sellers, made to be noticed.</h2>
          </div>
          <div className="category-tabs" role="tablist" aria-label="Product category">
            {(["Sunglasses", "Optical"] as Category[]).map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "tab is-active" : "tab"}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.name}>
              <div className={`product-image-wrap${product.hoverImage ? " has-hover-image" : ""}`}>
                <Image className="product-image product-image-default" src={product.image} alt={product.name} fill sizes="(max-width: 700px) 100vw, 50vw" />
                {product.hoverImage && <Image className="product-image product-image-hover" src={product.hoverImage} alt="" aria-hidden="true" fill sizes="(max-width: 700px) 100vw, 50vw" />}
                <span className="product-note">{product.note}</span>
                <button className="quick-add" type="button" onClick={() => addToBag(product)} aria-label={`Add ${product.name} to bag`}>Add to bag <ArrowMark /></button>
              </div>
              <div className="product-meta">
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <span>{product.price}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="story-section section-shell">
        <div className="story-image-wrap">
          <Image src="/Luxury Gold Aviator Sunglasses.png" alt="Gold aviator sunglasses on a deep red background" fill sizes="(max-width: 800px) 100vw, 55vw" />
          <div className="story-image-detail" aria-hidden="true">
            <Image src="/Luxury Gold-Trimmed Sunglasses on Green.png" alt="" fill sizes="(max-width: 800px) 34vw, 20vw" />
            <span>Detail / 01</span>
          </div>
          <span className="story-image-index">JP / 02</span>
          <span className="story-image-caption">The gold edit <ArrowMark /></span>
        </div>
        <div className="story-copy">
          <div className="story-copy-head">
            <span className="story-rule" aria-hidden="true" />
            <span className="story-copy-index">Featured / 02</span>
          </div>
          <h2>Clean shape. Soft light.</h2>
          <div className="story-product-meta" aria-label="Product details">
            <span><small>Frame</small>Aviator</span>
            <span><small>Finish</small>Gold trim</span>
            <span><small>Edit</small>JP / 02</span>
          </div>
          <p className="story-description">Gold frames made for every day. Simple lines, easy to wear, and made to catch the light.</p>
          <button className="story-cta" type="button" onClick={() => showCategory("Sunglasses")}>Discover sunglasses <ArrowMark /></button>
        </div>
      </section>

      <section className="service-band" id="help" aria-label="JP help and service">
        <div><span>01</span><p>Clear by design</p></div>
        <div><span>02</span><p>Made for the light</p></div>
        <div><span>03</span><p>Easy to make yours</p></div>
      </section>

      <footer className="site-footer section-shell">
        <div className="footer-top">
          <p className="footer-wordmark">JP</p>
          <p className="footer-statement">Look closer.</p>
        </div>
        <div className="footer-links">
          <div><span className="footer-label">Shop</span><button type="button" onClick={() => showCategory("Sunglasses")}>Sunglasses</button><button type="button" onClick={() => showCategory("Optical")}>Optical</button></div>
          <div><span className="footer-label">Explore</span><a href="#about">About JP</a><a href="#collection">Best sellers</a></div>
          <div><span className="footer-label">Follow</span><a href="#top">Instagram</a><a href="#top">Pinterest</a></div>
        </div>
        <div className="footer-bottom"><span>© 2025 JP Optical</span><span>Made for your view</span></div>
      </footer>

      {isBagOpen && (
        <div className="bag-layer" role="presentation" onClick={() => setIsBagOpen(false)}>
          <aside className="bag-drawer" role="dialog" aria-modal="true" aria-labelledby="bag-title" onClick={(event) => event.stopPropagation()}>
            <div className="bag-drawer-head"><h2 id="bag-title">Your bag</h2><button className="text-button" type="button" onClick={() => setIsBagOpen(false)}>Close</button></div>
            {bagItems.length === 0 ? <p className="bag-empty">Your bag is waiting for a good frame.</p> : (
              <div className="bag-items">{bagItems.map((item, index) => <div className="bag-item" key={`${item.name}-${index}`}><span>{item.name}</span><span>{item.price}</span></div>)}</div>
            )}
            <button className="drawer-button" type="button" disabled={bagItems.length === 0}>Continue to checkout <ArrowMark /></button>
          </aside>
        </div>
      )}
    </main>
  );
}
