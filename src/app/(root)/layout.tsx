import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import React from "react";
import Header from "@/components/common/Header";
import Theme from "@/components/common/Theme";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "project-azunyan",
  description: "project-azunyan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "antialiased")}>
        <Theme />
        <Header />
        <main className="container overflow-x-auto overflow-y-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
