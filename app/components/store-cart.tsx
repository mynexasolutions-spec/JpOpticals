"use client";

import { useEffect, useState } from "react";
import type { Product } from "../catalog";

const BAG_STORAGE_KEY = "jp-optical-bag";

function readBag() {
  if (typeof window === "undefined") return [];

  const storedBag = window.localStorage.getItem(BAG_STORAGE_KEY);
  if (!storedBag) return [];

  try {
    return JSON.parse(storedBag) as Product[];
  } catch {
    return [];
  }
}

function saveBag(items: Product[]) {
  window.localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("jp-optical-bag-updated"));
}

export function useBag() {
  const [bagItems, setBagItems] = useState<Product[]>([]);

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
      const nextItems = [...items, product];
      saveBag(nextItems);
      return nextItems;
    });
  }

  return { bagItems, addToBag };
}

function ArrowMark() {
  return (
    <svg aria-hidden="true" className="arrow-mark" viewBox="0 0 16 16" focusable="false">
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  );
}

export function BagDrawer({ items, isOpen, onClose }: { items: Product[]; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="bag-layer" role="presentation" onClick={onClose}>
      <aside className="bag-drawer" role="dialog" aria-modal="true" aria-labelledby="store-bag-title" onClick={(event) => event.stopPropagation()}>
        <div className="bag-drawer-head"><h2 id="store-bag-title">Your bag</h2><button className="text-button" type="button" onClick={onClose}>Close</button></div>
        {items.length === 0 ? <p className="bag-empty">Your bag is waiting for a good frame.</p> : (
          <div className="bag-items">{items.map((item, index) => <div className="bag-item" key={`${item.slug}-${index}`}><span>{item.name}</span><span>{item.price}</span></div>)}</div>
        )}
        <button className="drawer-button" type="button" disabled={items.length === 0}>Continue to checkout <ArrowMark /></button>
      </aside>
    </div>
  );
}

