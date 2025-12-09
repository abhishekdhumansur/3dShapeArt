import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";  // ← MUST HAVE THIS!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "3DShapeArt - Professional 3D Printing Services",
  description: "Transform your ideas into reality with precision 3D printing",
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