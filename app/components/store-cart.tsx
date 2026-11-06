"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import type { Product } from "../catalog";

const BAG_STORAGE_KEY = "jp-optical-bag";

export type BagItem = {
  product: Product;
  quantity: number;
};

function isProductRecord(value: unknown): value is Product {
  return typeof value === "object" && value !== null && "slug" in value && "name" in value && "priceValue" in value;
}

function readBag(): BagItem[] {
  if (typeof window === "undefined") return [];

  const storedBag = window.localStorage.getItem(BAG_STORAGE_KEY);
  if (!storedBag) return [];

  try {
    const parsed: unknown = JSON.parse(storedBag);
    if (!Array.isArray(parsed)) return [];

    if (parsed.every((item) => typeof item === "object" && item !== null && "product" in item && "quantity" in item)) {
      return parsed.filter((item): item is BagItem => {
        if (typeof item !== "object" || item === null || !("product" in item) || !("quantity" in item)) return false;
        const candidate = item as { product: unknown; quantity: unknown };
        return isProductRecord(candidate.product) && typeof candidate.quantity === "number" && candidate.quantity > 0;
      });
    }

    return parsed.filter(isProductRecord).map((product) => ({ product, quantity: 1 }));
  } catch {
    return [];
  }
}

function saveBag(items: BagItem[]) {
  window.localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("jp-optical-bag-updated"));
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export function useBag() {
  const [bagItems, setBagItems] = useState<BagItem[]>([]);
  const [bagPulse, setBagPulse] = useState(0);

  useEffect(() => {
    const syncBag = () => setBagItems(readBag());
    syncBag();
    window.addEventListener("storage", syncBag);
    window.addEventListener("jp-optical-bag-updated", syncBag);
    return () => {
      window.removeEventListener("storage", syncBag);
      window.removeEventListener("jp-optical-bag-updated", syncBag);
    };
  }, []);

  function addToBag(product: Product) {
    setBagItems((items) => {
      const existingItem = items.find((item) => item.product.slug === product.slug);
      const nextItems = existingItem
        ? items.map((item) => item.product.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { product, quantity: 1 }];
      saveBag(nextItems);
      return nextItems;
    });
    setBagPulse((pulse) => pulse + 1);
  }

  function updateQuantity(slug: string, quantity: number) {
    setBagItems((items) => {
      const nextItems = quantity > 0
        ? items.map((item) => item.product.slug === slug ? { ...item, quantity } : item)
        : items.filter((item) => item.product.slug !== slug);
      saveBag(nextItems);
      return nextItems;
    });
  }

  function removeFromBag(slug: string) {
    updateQuantity(slug, 0);
  }

  function clearBag() {
    setBagItems([]);
    saveBag([]);
  }

  const totalItems = bagItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = bagItems.reduce((total, item) => total + item.product.priceValue * item.quantity, 0);

  return { bagItems, addToBag, updateQuantity, removeFromBag, clearBag, totalItems, subtotal, bagPulse };
}

function ArrowMark() {
  return (
    <svg aria-hidden="true" className="arrow-mark" viewBox="0 0 16 16" focusable="false">
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  );
}

type BagDrawerProps = {
  items: BagItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (slug: string, quantity: number) => void;
  onRemove: (slug: string) => void;
  onClear: () => void;
  subtotal: number;
};

export function BagDrawer({ items, isOpen, onClose, onUpdateQuantity, onRemove, onClear, subtotal }: BagDrawerProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsCheckoutOpen(false);
      setOrderPlaced(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function handleCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onClear();
    setIsCheckoutOpen(false);
    setOrderPlaced(true);
  }

  return (
    <div className="bag-layer" role="presentation" onClick={onClose}>
      <aside className="bag-drawer" role="dialog" aria-modal="true" aria-labelledby="store-bag-title" onClick={(event) => event.stopPropagation()}>
        <div className="bag-drawer-head">
          <div><span className="bag-drawer-kicker">JP Optical</span><h2 id="store-bag-title">Your bag</h2></div>
          <button className="text-button" type="button" onClick={onClose}>Close</button>
        </div>

        {orderPlaced ? (
          <div className="bag-confirmation" role="status">
            <h3>Your order request is in.</h3>
            <p>Thank you. Our team will contact you shortly to confirm delivery and payment details.</p>
            <button className="drawer-button" type="button" onClick={onClose}>Continue browsing <ArrowMark /></button>
          </div>
        ) : isCheckoutOpen ? (
          <form className="bag-checkout-form" onSubmit={handleCheckout}>
            <button className="bag-back-link" type="button" onClick={() => setIsCheckoutOpen(false)}>← Back to bag</button>
            <h3>Delivery details</h3>
            <p>Enter your details and the JP Optical team will confirm the order with you.</p>
            <label htmlFor="checkout-name">Full name</label>
            <input id="checkout-name" name="name" type="text" autoComplete="name" required />
            <label htmlFor="checkout-email">Email address</label>
            <input id="checkout-email" name="email" type="email" autoComplete="email" required />
            <label htmlFor="checkout-phone">Phone number</label>
            <input id="checkout-phone" name="phone" type="tel" autoComplete="tel" required />
            <label htmlFor="checkout-address">Delivery address</label>
            <textarea id="checkout-address" name="address" rows={3} autoComplete="street-address" required />
            <button className="drawer-button" type="submit">Place order request <ArrowMark /></button>
          </form>
        ) : items.length === 0 ? (
          <div className="bag-empty-state">
            <p className="bag-empty">Your bag is waiting for a good frame.</p>
            <button className="drawer-button" type="button" onClick={onClose}>Continue shopping <ArrowMark /></button>
          </div>
        ) : (
          <>
            <div className="bag-items">
              {items.map((item) => (
                <div className="bag-item" key={item.product.slug}>
                  <Image className="bag-item-image" src={item.product.image} alt="" width={72} height={72} />
                  <div className="bag-item-content">
                    <strong>{item.product.name}</strong>
                    <span>{item.product.note}</span>
                    <div className="bag-quantity" aria-label={`Quantity for ${item.product.name}`}>
                      <button type="button" onClick={() => onUpdateQuantity(item.product.slug, item.quantity - 1)} aria-label={`Decrease ${item.product.name} quantity`}>−</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => onUpdateQuantity(item.product.slug, item.quantity + 1)} aria-label={`Increase ${item.product.name} quantity`}>+</button>
                    </div>
                  </div>
                  <div className="bag-item-side">
                    <strong>{formatPrice(item.product.priceValue * item.quantity)}</strong>
                    <button className="bag-remove" type="button" onClick={() => onRemove(item.product.slug)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bag-summary">
              <div className="bag-subtotal"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <p>Taxes and delivery are confirmed with your order request.</p>
              <button className="drawer-button" type="button" onClick={() => setIsCheckoutOpen(true)}>Continue to checkout <ArrowMark /></button>
              <button className="bag-clear" type="button" onClick={onClear}>Clear bag</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

