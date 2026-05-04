"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import {
  ArrowRight,
  CheckCircle2,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

type Category = "all" | "premium" | "gifts" | "models" | "utility";

const WHATSAPP_NUMBER = "916366036081";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "premium", label: "Premium" },
  { id: "gifts", label: "Custom Gifts" },
  { id: "models", label: "Top Models" },
  { id: "utility", label: "Utility Designs" },
];

const products = [
  {
    title: "Custom Devotional Statue",
    category: "premium" as Category,
    image: "/new.png",
    note: "Premium custom order",
  },
  {
    title: "Basketball Mini Game",
    category: "utility" as Category,
    image: "/WhatsApp Image 2026-05-03 at 4.36.31 PM.jpeg",
    note: "Interactive design",
  },
  {
    title: "Custom Keychain",
    category: "gifts" as Category,
    image: "/WhatsApp Image 2026-05-03 at 5.32.05 PM.jpeg",
    note: "Personalized gift",
  },
  {
    title: "Phone Stand",
    category: "utility" as Category,
    image: "/WhatsApp Image 2026-05-03 at 5.18.47 PM.jpeg",
    note: "Useful desk piece",
  },
  {
    title: "Mini Desk Character",
    category: "premium" as Category,
    image: "/WhatsApp Image 2026-05-03 at 5.55.13 PM.jpeg",
    note: "Creative desk decor",
  },
  {
    title: "Designer Keychain Set",
    category: "gifts" as Category,
    image: "/WhatsApp Image 2026-05-03 at 5.14.14 PM.jpeg",
    note: "Compact custom gift",
  },
  {
    title: "AMG Display Model",
    category: "models" as Category,
    image: "/ourProduct4.jpg",
    note: "Collector finish",
  },
  {
    title: "Dashboard Idol Design",
    category: "premium" as Category,
    image: "/WhatsApp Image 2026-05-03 at 5.47.43 PM.jpeg",
    note: "Custom dashboard piece",
  },
];

const gallery = [
  "/ourProduct2.jpg",
  "/ourProduct4.jpg",
  "/WhatsApp Image 2026-05-03 at 5.55.13 PM.jpeg",
  "/ourProduct3.jpg",
  "/WhatsApp Image 2026-05-03 at 5.35.40 PM.jpeg",
  "/WhatsApp Image 2025-11-23 at 00.18.31_01a7ce99.jpg",
  "/new.png",
  "/WhatsApp Image 2026-05-03 at 5.47.43 PM.jpeg",
];

const trustPoints = [
  "Custom design support for online and offline orders",
  "Premium finish for gifts, models, and display pieces",
  "Fast WhatsApp response for quotes and order updates",
];

const projectServices = [
  {
    title: "College Project Support",
    description:
      "Prototype help, display models, presentation-ready parts, and clean custom outputs for academic projects.",
  },
  {
    title: "Personal Project Printing",
    description:
      "One-off ideas, custom hobby builds, desk pieces, and passion projects made with a premium finish.",
  },
  {
    title: "Custom Concept Development",
    description:
      "Early-stage idea support for clients who need design guidance before moving into the final print.",
  },
];

const testimonials = [
  {
    name: "Prabhu",
    role: "Customer",
    text: "Exceptional quality and precision. The photo lamp details are incredibly clear. Highly recommend!",
  },
  {
    name: "Nithish",
    role: "Customer",
    text: "The 3D printed boat model exceeded expectations. Outstanding craftsmanship and attention to detail.",
  },
  {
    name: "Anjali",
    role: "Customer",
    text: "Beautiful gift lamp with perfect photo clarity. My family absolutely loves it!",
  },
];

const contactDefaults = {
  name: "",
  email: "",
  productName: "",
  location: "",
  whatsappNumber: "",
  details: "",
};

function createWhatsAppLink(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export default function OfficialHomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [form, setForm] = useState(contactDefaults);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);

    try {
      await emailjs.send(
        "service_de4szd9",
        "template_jvk5lzy",
        {
          product_name: form.productName || "Website Inquiry",
          name: form.name,
          reply_to: form.email,
          whatsapp: form.whatsappNumber,
          location: form.location,
          message: form.details || "General inquiry from website contact form",
        },
        "-FkgbxiO1TouDogC9"
      );

      setSubmitted(true);
      setForm(contactDefaults);
    } catch {
      window.alert(
        "Unable to send the form right now. Please use WhatsApp for a faster response."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-[radial-gradient(circle_at_top,#20160f_0%,#0a0a0b_38%,#080809_100%)] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0b]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
            <a
              href="#home"
              className="bg-gradient-to-r from-white via-[#e7c58a] to-[#9fc7ff] bg-clip-text font-head text-lg font-semibold tracking-[0.08em] text-transparent"
            >
              3D SHAPE ART
            </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {["home", "products", "why-us", "gallery", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="font-head text-xs uppercase tracking-[0.22em] text-white/60 transition hover:text-white"
              >
                {id.replace("-", " ")}
              </a>
            ))}
          </nav>

          <a
            href={createWhatsAppLink("Hi, I want to place a custom 3D printing order.")}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-white px-5 py-2.5 font-head text-xs uppercase tracking-[0.18em] text-black transition hover:bg-white/90 lg:inline-flex"
          >
            Get Quote
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-full border border-white/10 p-2.5 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0a0a0b] px-6 py-5 lg:hidden">
          <div className="flex items-center justify-between">
            <span className="bg-gradient-to-r from-white via-[#e7c58a] to-[#9fc7ff] bg-clip-text font-head text-lg font-semibold text-transparent">
              3D SHAPE ART
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-white/10 p-2.5"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-16 flex flex-col gap-8">
            {["home", "products", "why-us", "gallery", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMobileOpen(false)}
                className="font-display text-4xl text-white/80"
              >
                {id.replace("-", " ")}
              </a>
            ))}
          </div>
        </div>
      )}

      <main>
        <section
          id="home"
          className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24"
        >
          <div className="flex flex-col justify-center">
            <div className="font-head text-[11px] uppercase tracking-[0.28em] text-[#d5b57b]">
              Custom 3D Printing in Bangalore
            </div>
            <h1 className="mt-5 max-w-xl font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              <span className="text-white">Trusted custom printing</span>
              <span className="block bg-gradient-to-r from-[#e8d1a3] via-white to-[#b9d4ff] bg-clip-text text-transparent">
                for premium designs.
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/60">
              3D Shape Art creates custom printed gifts, scale models, premium
              display pieces, and useful product designs for online and offline
              orders.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f2dec0] to-white px-6 py-4 font-head text-xs uppercase tracking-[0.18em] text-black transition hover:opacity-95"
              >
                Explore Designs
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={createWhatsAppLink("Hi, I want a custom quote for my 3D printing order.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-4 font-head text-xs uppercase tracking-[0.18em] text-white/85 transition hover:border-white hover:text-white"
              >
                Talk on WhatsApp
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-7">
              {[
                ["500+", "Orders"],
                ["Custom", "Work"],
                ["Fast", "Support"],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="font-head text-2xl font-semibold text-[#f0dcc1]">
                    {value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/40">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
              <Image
                src="/new.png"
                alt="Custom devotional statue design"
                width={900}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
              <Image
                src="/ourProduct4.jpg"
                alt="Custom premium scale model"
                width={900}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section id="products" className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="font-head text-[11px] uppercase tracking-[0.28em] text-[#d5b57b]">
                Product Categories
              </div>
              <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
                Clean, premium, custom.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full px-4 py-2 font-head text-xs uppercase tracking-[0.16em] transition ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-[#f2dec0] to-white text-black"
                      : "border border-white/10 text-white/55 hover:border-[#d5b57b]/60 hover:text-white"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.title}
                className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#111114]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="font-head text-[10px] uppercase tracking-[0.18em] text-[#d5b57b]">
                    {product.note}
                  </div>
                  <h3 className="mt-2 font-head text-xl font-medium text-white">
                    {product.title}
                  </h3>
                  <a
                    href={createWhatsAppLink(`Hi, I want details for ${product.title}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 font-head text-xs uppercase tracking-[0.18em] text-[#d8c1a0] transition hover:text-white"
                  >
                    Ask on WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
          <div className="rounded-[2rem] border border-white/10 bg-[#111114] p-7 sm:p-9">
            <div className="font-head text-[11px] uppercase tracking-[0.28em] text-[#d5b57b]">
              Service Available
            </div>
            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              College project or personal project.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
              This section is ready for your future images and real project data.
              For now, it works as a clean placeholder for custom academic and
              personal project services.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {projectServices.map((service) => (
                <article
                  key={service.title}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6"
                >
                  <div className="mb-4 h-36 rounded-[1.25rem] border border-dashed border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(213,181,123,0.06))]" />
                  <h3 className="font-head text-lg font-medium text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why-us" className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-white/10 bg-[#111114] p-7 sm:p-9">
              <div className="font-head text-[11px] uppercase tracking-[0.28em] text-[#d5b57b]">
                Why Choose Us
              </div>
              <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
                A business website that feels reliable.
              </h2>
              <div className="mt-8 space-y-5">
                {trustPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-white/85" />
                    <p className="text-sm leading-7 text-white/65">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#111114] p-7 sm:p-9">
              <div className="flex items-center gap-2 text-[#e7c58a]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <h3 className="mt-4 font-head text-2xl font-medium text-white">
                Built for trust and direct orders
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/60">
                We focus on custom product design, premium print quality, and
                clear communication for every inquiry, whether the order starts
                online or offline.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "WhatsApp-first support",
                  "Custom quote based process",
                  "Product photos from real work",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-white/70">
                    <ShieldCheck className="h-4 w-4" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
          <div className="mb-8">
              <div className="font-head text-[11px] uppercase tracking-[0.28em] text-[#d5b57b]">
                Real Work Gallery
              </div>
              <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
                Actual product images.
              </h2>
          </div>

          <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={`overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 ${
                  image === "/ourProduct2.jpg"
                    ? "sm:col-span-2 sm:row-span-2"
                    : image === "/ourProduct4.jpg"
                      ? "sm:row-span-2"
                      : ""
                }`}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={image}
                    alt={`3D Shape Art product showcase ${index + 1}`}
                    width={1400}
                    height={1000}
                    className={`h-full w-full ${
                      image === "/ourProduct4.jpg"
                        ? "object-contain bg-[#0d0d10] p-4"
                        : image === "/ourProduct2.jpg"
                          ? "object-cover object-center"
                          : image === "/new.png"
                            ? "object-cover object-top"
                            : "object-cover"
                    }`}
                  />
                  {(image === "/ourProduct2.jpg" || image === "/ourProduct4.jpg") && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="font-head text-[10px] uppercase tracking-[0.18em] text-[#d5b57b]">
                        Best Work
                      </div>
                      <div className="mt-1 font-head text-sm text-white">
                        {image === "/ourProduct2.jpg"
                          ? "Custom Ship Model"
                          : "Premium Car Display Model"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(213,181,123,0.08))] p-6 sm:p-8">
            <div className="mb-6">
              <div className="font-head text-[11px] uppercase tracking-[0.28em] text-[#d5b57b]">
                Trusted by Professionals
              </div>
              <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">
                Real customer reviews.
              </h2>
            </div>

            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="flex w-max gap-5"
            >
              {[...testimonials, ...testimonials].map((item, index) => (
                <article
                  key={`${item.name}-${index}`}
                  className="w-[320px] shrink-0 rounded-[1.6rem] border border-white/10 bg-[#101013] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-center gap-1 text-[#e7c58a]">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 text-sm leading-7 text-white/72">
                    &quot;{item.text}&quot;
                  </p>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <div className="font-head text-base font-medium text-white">
                      {item.name}
                    </div>
                    <div className="mt-1 font-head text-[10px] uppercase tracking-[0.18em] text-[#d5b57b]">
                      {item.role}
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="font-head text-[11px] uppercase tracking-[0.28em] text-[#d5b57b]">
                Contact
              </div>
              <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
                Start your custom order.
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: <Phone className="h-5 w-5" />,
                    label: "+91 6366036081",
                    href: "tel:+916366036081",
                  },
                  {
                    icon: <Mail className="h-5 w-5" />,
                    label: "3dshapeart2024@gmail.com",
                    href: "mailto:3dshapeart2024@gmail.com",
                  },
                  {
                    icon: <Instagram className="h-5 w-5" />,
                    label: "@3dshapeart2025",
                    href: "https://www.instagram.com/3dshapeart2025",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/75 transition hover:border-white/30 hover:text-white"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10">
                      {item.icon}
                    </span>
                    <span className="font-head text-sm">{item.label}</span>
                  </a>
                ))}
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/75">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span className="font-head text-sm">Bangalore, Karnataka, India</span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#111114] p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    value={form.name}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm outline-none transition focus:border-white/40"
                  />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, email: event.target.value }))
                    }
                    placeholder="Email"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm outline-none transition focus:border-white/40"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    value={form.productName}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        productName: event.target.value,
                      }))
                    }
                    placeholder="Product name"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm outline-none transition focus:border-white/40"
                  />
                  <input
                    value={form.whatsappNumber}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        whatsappNumber: event.target.value,
                      }))
                    }
                    placeholder="WhatsApp number"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm outline-none transition focus:border-white/40"
                  />
                </div>
                <input
                  value={form.location}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, location: event.target.value }))
                  }
                  placeholder="Location"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm outline-none transition focus:border-white/40"
                />
                <textarea
                  required
                  value={form.details}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, details: event.target.value }))
                  }
                  placeholder="Tell us what you need"
                  className="min-h-36 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm outline-none transition focus:border-white/40"
                />

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#f2dec0] to-white px-6 py-4 font-head text-xs uppercase tracking-[0.18em] text-black transition hover:opacity-95 disabled:opacity-60"
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                  <a
                    href={createWhatsAppLink(
                      `Hi, my name is ${form.name || "there"}. I want to discuss a custom order.`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-4 font-head text-xs uppercase tracking-[0.18em] text-white/85 transition hover:border-white hover:text-white"
                  >
                    WhatsApp
                  </a>
                </div>

                {submitted && (
                  <p className="text-sm text-white/70">Message sent successfully.</p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-xs uppercase tracking-[0.18em] text-white/35 lg:px-8">
        3D Shape Art / Custom Printing / Bangalore / Online and Offline Orders
      </footer>
    </div>
  );
}
