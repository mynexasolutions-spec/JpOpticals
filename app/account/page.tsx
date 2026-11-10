"use client";

import { useState, type FormEvent } from "react";
import { BagDrawer, useBag } from "../components/store-cart";
import { StoreFooter } from "../components/store-footer";
import { StoreHeader } from "../components/store-header";

type AccountMode = "login" | "register";

function ArrowMark() {
  return (
    <svg aria-hidden="true" className="arrow-mark" viewBox="0 0 16 16" focusable="false">
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  );
}

export default function AccountPage() {
  const [mode, setMode] = useState<AccountMode>("login");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const { bagItems, updateQuantity, removeFromBag, clearBag, totalItems, subtotal } = useBag();

  function changeMode(nextMode: AccountMode) {
    setMode(nextMode);
    setIsSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <main className="account-page">
      <StoreHeader bagCount={totalItems} onOpenBag={() => setIsBagOpen(true)} />

      <section className="account-shell section-shell" aria-labelledby="account-title">
        <div className="account-intro">
          <h1 id="account-title">Your view,<br />kept close.</h1>
          <p className="account-lead">Sign in to keep your JP frames close, or create an account for a smoother way to return to the pieces you like.</p>
          <div className="account-note">
            <span>JP / 2026</span>
            <p>Made for the changing light, and the everyday that follows.</p>
          </div>
        </div>

        <div className="account-form-wrap">
          <div className="account-switch" role="group" aria-label="Account access">
            <button className={mode === "login" ? "is-active" : ""} type="button" aria-pressed={mode === "login"} onClick={() => changeMode("login")}>Sign in</button>
            <button className={mode === "register" ? "is-active" : ""} type="button" aria-pressed={mode === "register"} onClick={() => changeMode("register")}>Create account</button>
          </div>

          <form className="account-form" onSubmit={handleSubmit}>
            <h2 id="account-form-title">{mode === "login" ? "Welcome back." : "Start your account."}</h2>
            <p className="account-form-copy">{mode === "login" ? "Enter your details to continue." : "A closer look starts here."}</p>

            <div className="account-fields">
              {mode === "register" && (
                <div className="account-field">
                  <label htmlFor="account-name">Full name</label>
                  <input id="account-name" name="name" type="text" autoComplete="name" required />
                </div>
              )}
              <div className="account-field">
                <label htmlFor="account-email">Email address</label>
                <input id="account-email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="account-field">
                <label htmlFor="account-password">Password</label>
                <input id="account-password" name="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} required />
              </div>
              {mode === "register" && (
                <div className="account-field">
                  <label htmlFor="account-confirm-password">Confirm password</label>
                  <input id="account-confirm-password" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required />
                </div>
              )}
            </div>

            <button className="account-submit" type="submit">{mode === "login" ? "Sign in" : "Create account"} <ArrowMark /></button>
            <p className="account-form-note">This demo form does not send or store personal details.</p>
            {isSubmitted && <p className="account-success" role="status">Thanks — your request was received locally. Connect an auth provider to make accounts live.</p>}
          </form>
        </div>
      </section>

      <StoreFooter className="account-footer" />

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
