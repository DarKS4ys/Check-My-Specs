import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Check My Specs",
  description:
    "Discover the Power of Your Device with Check My Specs! Dive into the depths of your device's capabilities with our cutting-edge tool. Unveil every detail of your GPU, OS, CPU, and browser effortlessly. Maximize your performance and stay ahead with our intuitive interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
