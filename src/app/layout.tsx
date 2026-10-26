import type { Metadata } from "next";
import { Rhodium_Libre, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Suspense } from "react";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const rhodiumLibre = Rhodium_Libre({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rhodium-libre",
});
export const metadata: Metadata = {
  title: "Wanderlast — Discover Your Next Adventure",
  description:
    "Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased font-sans", geist.variable, rhodiumLibre.variable)}
    >
      <body className="min-h-full flex flex-col">

        <Suspense fallback={<div className="h-16" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">
          {children}
        </main>
        <Footer />


      </body>
    </html>
  );
}
