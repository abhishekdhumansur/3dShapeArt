import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-head",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.3dshapeart.com"),
  title: {
    default: "3D Shape Art | Custom 3D Printing and Design Studio Bangalore",
    template: "%s | 3D Shape Art",
  },
  description:
    "3D Shape Art is a Bangalore-based custom 3D printing business for premium gifts, custom models, useful products, and special design orders with online and offline support.",
  applicationName: "3D Shape Art",
  referrer: "origin-when-cross-origin",
  keywords: [
    "custom 3D printing Bangalore",
    "3D printing business Bangalore",
    "custom 3D design India",
    "custom models India",
    "personalized 3D gifts India",
    "online 3D printing order",
    "offline 3D print order Bangalore",
    "3D Shape Art",
  ],
  authors: [{ name: "3D Shape Art" }],
  creator: "3D Shape Art",
  publisher: "3D Shape Art",
  category: "business",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    title: "3D Shape Art | Custom 3D Printing and Design Studio Bangalore",
    description:
      "Premium custom 3D printing for gifts, models, decor, and useful product designs with direct online and offline ordering.",
    url: "https://www.3dshapeart.com",
    siteName: "3D Shape Art",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/ourProduct4.jpg",
        width: 720,
        height: 1280,
        alt: "Custom 3D printed premium model by 3D Shape Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Shape Art | Custom 3D Printing Bangalore",
    description:
      "Custom 3D printing business for gifts, models, premium pieces, and utility products.",
    images: ["/ourProduct4.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} ${cormorant.variable} scroll-smooth`}
    >
      <body className="bg-[#08090a] text-white antialiased">{children}</body>
    </html>
  );
}
