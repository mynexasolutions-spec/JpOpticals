import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "JP — Optical",
  description: "Modern eyewear, made for the changing light.",
  icons: {
    icon: "/fevicon.png",
    shortcut: "/fevicon.png",
    apple: "/fevicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="js">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
