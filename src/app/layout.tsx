import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "Omomarket — Marketplace Pre Order Omo";
const siteDescription =
  "Katalog Pre Order Omo — listing PO, lihat katalog, dan chat langsung via WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL("https://omomarket.shop"),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "Omomarket",
    locale: "id_ID",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
