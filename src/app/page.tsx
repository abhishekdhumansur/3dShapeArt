import type { Metadata } from "next";
import OfficialHomePage from "../components/OfficialHomePage";

export const metadata: Metadata = {
  title: "Custom 3D Printing Bangalore | 3D Shape Art",
  description:
    "Order custom 3D printed gifts, scale models, premium pieces, and useful designs from 3D Shape Art in Bangalore. Available for online and offline orders.",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.3dshapeart.com/#organization",
      name: "3D Shape Art",
      url: "https://www.3dshapeart.com",
      logo: "https://www.3dshapeart.com/logo.png",
      sameAs: [
        "https://www.instagram.com/3dshapeart2025",
        "https://www.youtube.com/channel/UCb0pTej4LEGZJukVhAR-XYQ",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.3dshapeart.com/#localbusiness",
      name: "3D Shape Art",
      image: [
        "https://www.3dshapeart.com/ourProduct4.jpg",
        "https://www.3dshapeart.com/ourProduct3.jpg",
      ],
      url: "https://www.3dshapeart.com",
      telephone: "+91 6366036081",
      email: "3dshapeart2024@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      areaServed: "IN",
      priceRange: "$$",
      description:
        "Custom 3D printing business for premium gifts, scale models, utility products, and design-based custom orders.",
    },
    {
      "@type": "Service",
      "@id": "https://www.3dshapeart.com/#service",
      serviceType: "Custom 3D Printing",
      provider: {
        "@id": "https://www.3dshapeart.com/#localbusiness",
      },
      areaServed: "IN",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://www.3dshapeart.com",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "3D Printing Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom 3D Gifts" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Scale Models" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Premium Custom Designs" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Utility Product Printing" } },
        ],
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <OfficialHomePage />
    </>
  );
}
