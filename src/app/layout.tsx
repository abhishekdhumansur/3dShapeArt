import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "3DShapeArt | Custom 3D Printing & Personalized Gifts",
    template: "%s | 3DShapeArt",
  },
  description:
    "3DShapeArt offers custom 3D printing, personalized photo lamps, Christmas decor, home decor, and unique 3D printed gifts. High-quality handcrafted designs made in India.",
  keywords: [
    "3D printing",
    "custom 3D printing",
    "3D photo lamp",
    "personalized gifts",
    "Christmas 3D decor",
    "3DShapeArt",
    "3D printing India",
    "custom home decor",
  ],
  authors: [{ name: "3DShapeArt" }],
  creator: "3DShapeArt",
  metadataBase: new URL("https://www.3dshapeart.com"),

  // ✅ Using ONLY logo.png
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },

  openGraph: {
    title: "3DShapeArt | Custom 3D Printing & Personalized Gifts",
    description:
      "Bring your ideas to life with premium 3D printed decor, photo lamps, and custom gifts.",
    url: "https://www.3dshapeart.com",
    siteName: "3DShapeArt",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "3DShapeArt Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "3DShapeArt | Custom 3D Printing",
    description:
      "Custom 3D printed decor, photo lamps & personalized gifts by 3DShapeArt.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}


// service_de4szd9
