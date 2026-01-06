"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Menu,
  X,
  Zap,
  Sparkles,
  Package,
  Star,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ChevronRight,
  User,
  Shield,
  Truck,
  Grid3x3,
  List,
  ChevronLeft,
  Send,
  Play,
  Volume2,
  VolumeX,
  Instagram,
  Layers,
  Cpu,
  ArrowRight,
} from "lucide-react";

// 3D Printing Products Showcase
const bestProducts = [
  {
    id: 1,
    name: "Quantum Lamp Pro",
    image: "/photo1.jpg",
    category: "Lighting",
    description: "Precision-crafted LED lamp with geometric design",
  },
  {
    id: 2,
    name: "Custom Photo Lamp",
    image: "/photo4.jpg",
    category: "Personalized",
    description: "Transform memories into illuminated art",
  },
  {
    id: 3,
    name: "Minimalist Decor",
    image: "/photo3.jpg",
    category: "Home",
    description: "Modern sculptural pieces for contemporary spaces",
  },
  {
    id: 4,
    name: "Gift Box Series",
    image: "/photo2.jpg",
    category: "Gifts",
    description: "Elegant packaging for special occasions",
  },
  {
    id: 5,
    name: "Accent Lighting",
    image: "/photo6.jpg",
    category: "Design",
    description: "Ambient lighting for sophisticated interiors",
  },
];

// Produced Products (Portfolio)
const producedProducts = [
  {
    id: 1,
    title: "Nativity Water Globe",
    customer: "Sainath M",
    image: "/ourProduct1.jpg",
    rating: 5,
  },
  {
    id: 2,
    title: "Memory Photo Lamp",
    customer: "Shilpa",
    image: "/photo12.jpg",
    rating: 5,
  },
  {
    id: 3,
    title: "Wooden Ship Replica (3D Printed)",
    customer: "Nithish",
    image: "/ourProduct2.jpg",
    rating: 5,
  },
  {
    id: 4,
    title: "Custom Gift Lamp",
    customer: "Anjali",
    image: "/ourProduct3.jpg",
    rating: 5,
  },
  {
    id: 5,
    title: "Luxury Model - AMG GT 63",
    customer: "Venkatesh",
    image: "/ourProduct4.jpg",
    rating: 5,
  },
];

// YouTube Shorts Data
const youtubeShorts = [
  {
    id: 1,
    title: "Precision Printing Process",
    youtubeId: "ApdZr_Qywdc?si=lnIUBY21xaiYguv7",
    thumbnail: "/photo20.jpg",
    description: "Watch our precision 3D printer creating masterpieces",
  },
  {
    id: 2,
    title: "Design Showcase Reel",
    youtubeId: "IrJnJAQSEbs?si=_M_mxNGSRgMIlRla",
    thumbnail: "/photo21.jpg",
    description: "Beautiful designs brought to life",
  },
  {
    id: 3,
    title: "Customer Transformation",
    youtubeId: "JfepIbSmsbU?si=qrlNjiKIaTd07ILr",
    thumbnail: "/ourProduct3.jpg",
    description: "From concept to reality - timelapse magic",
  },
];

const ITEMS_PER_PAGE = 12;

// Email service integration
const sendEmail = async (form: any) => {
  try {
    await emailjs.send(
      "service_de4szd9",
      "template_jvk5lzy",
      {
        product_name: form.productName || "General Inquiry",
        name: form.name,
        reply_to: form.email,
        whatsapp: form.whatsappNumber,
        location: form.location,
        message: form.details || "No extra message",
      },
      "-FkgbxiO1TouDogC9"
    );
    return true;
  } catch (err) {
    console.error("EmailJS Error:", err);
    return false;
  }
};

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

interface BookingFormData {
  productName: string;
  name: string;
  email: string;
  location: string;
  whatsappNumber: string;
  details: string;
}

interface ProductItem {
  id: number;
  name: string;
  image: string;
  category: string;
  description: string;
}

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [submitted, setSubmitted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null
  );
  const [contactMethod, setContactMethod] = useState("whatsapp");
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [mutedVideos, setMutedVideos] = useState<Record<number, boolean>>({});
  const [scrollProgress, setScrollProgress] = useState(0);

  const [bookingForm, setBookingForm] = useState<BookingFormData>({
    productName: "",
    name: "",
    email: "",
    location: "",
    whatsappNumber: "",
    details: "",
  });

  const [isSending, setIsSending] = useState(false);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    {
      name: "Prabhu",
      role: "Customer",
      text: "Exceptional quality and precision. The photo lamp details are incredibly clear. Highly recommend!",
      rating: 5,
    },
    {
      name: "Nithish",
      role: "Customer",
      text: "The 3D printed boat model exceeded expectations. Outstanding craftsmanship and attention to detail.",
      rating: 5,
    },
    {
      name: "Anjali",
      role: "Customer",
      text: "Beautiful gift lamp with perfect photo clarity. My family absolutely loves it!",
      rating: 5,
    },
  ];

  const totalPages = Math.ceil(bestProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = bestProducts.slice(startIndex, endIndex);

  const handleBookNow = (product: ProductItem) => {
    setSelectedProduct(product);
    setBookingForm({
      productName: product.name,
      name: "",
      email: "",
      location: "",
      whatsappNumber: "",
      details: "",
    });
    setContactMethod("whatsapp");
    setSubmitted(false);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    try {
      if (contactMethod === "email") {
        await sendEmail(bookingForm);
      } else {
        const whatsappMessage = `Hi, I'm interested in "${bookingForm.productName}". 
Name: ${bookingForm.name}
Email: ${bookingForm.email}
Location: ${bookingForm.location}
WhatsApp: ${bookingForm.whatsappNumber}
Details: ${bookingForm.details}`;

        window.open(
          `https://wa.me/916366036081?text=${encodeURIComponent(
            whatsappMessage
          )}`,
          "_blank"
        );
      }

      setSubmitted(true);

      setTimeout(() => {
        setBookingModalOpen(false);
        setSubmitted(false);
        setBookingForm({
          productName: "",
          name: "",
          email: "",
          location: "",
          whatsappNumber: "",
          details: "",
        });
      }, 2000);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  // Main Page
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 z-50"
        style={{ scaleX: scrollProgress, transformOrigin: "left" }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold relative overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                />
                <span className="relative">3D</span>
              </div>
              <span>3D Shape Art</span>
            </motion.div>

            <div className="hidden md:flex gap-8">
              <a
                href="#home"
                className="text-gray-300 hover:text-cyan-400 font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#products"
                className="text-gray-300 hover:text-cyan-400 font-medium transition-colors"
              >
                Products
              </a>
              <a
                href="#portfolio"
                className="text-gray-300 hover:text-cyan-400 font-medium transition-colors"
              >
                Portfolio
              </a>
              <a
                href="#videos"
                className="text-gray-300 hover:text-cyan-400 font-medium transition-colors"
              >
                Videos
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-cyan-400 font-medium transition-colors"
              >
                Contact
              </a>
            </div>

            <a
              href="https://wa.me/916366036081"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>

            <button
              className="md:hidden text-cyan-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden pb-4 flex flex-col gap-4"
            >
              <a
                href="#home"
                className="text-gray-300 hover:text-cyan-400 font-medium"
              >
                Home
              </a>
              <a
                href="#products"
                className="text-gray-300 hover:text-cyan-400 font-medium"
              >
                Products
              </a>
              <a
                href="#portfolio"
                className="text-gray-300 hover:text-cyan-400 font-medium"
              >
                Portfolio
              </a>
              <a
                href="#videos"
                className="text-gray-300 hover:text-cyan-400 font-medium"
              >
                Videos
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-cyan-400 font-medium"
              >
                Contact
              </a>
              <a
                href="https://wa.me/916366036081"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-16 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            {/* Badge */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 px-6 py-3 rounded-full font-semibold backdrop-blur-sm"
            >
              <span className="text-2xl">🚀</span>
              Welcome to the 3D Zone
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight"
            >
              Precision 3D
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse"
              >
                Printing Mastery
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Transform your ideas into stunning 3D creations. Custom printing,
              rapid prototyping, and production-ready parts with unmatched
              precision.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(34,211,238,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.getElementById("products");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg transition-all flex items-center gap-2 justify-center"
              >
                Explore Products
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setBookingModalOpen(true)}
                className="border-2 border-cyan-500 text-cyan-400 px-8 py-4 rounded-lg font-bold hover:bg-cyan-500/10 transition-colors flex items-center gap-2 justify-center"
              >
                <MessageCircle size={20} />
                Get Quote
              </motion.button>
            </motion.div>

            {/* Floating Elements */}
            <motion.div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              {[
                { icon: "⚡", label: "48h Turnaround", delay: 0.8 },
                { icon: "🎯", label: "Premium Quality", delay: 1 },
                { icon: "🌍", label: "Global Delivery", delay: 1.2 },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay }}
                  className="text-center"
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-sm text-gray-400">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                3D Shape Art
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Industry-leading expertise and cutting-edge technology
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "48-hour turnaround on most orders",
              },
              {
                icon: Shield,
                title: "Quality Assured",
                desc: "Precision manufacturing with QA checks",
              },
              {
                icon: Truck,
                title: "Global Shipping",
                desc: "Fast and reliable worldwide delivery",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-8 hover:border-cyan-500/60 transition-all group"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center mb-4"
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Premium{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                3D Creations
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Handpicked collection of our finest work
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {paginatedProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -8 }}
                onClick={() => handleBookNow(product)}
                className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl overflow-hidden hover:border-cyan-500/60 transition-all cursor-pointer group"
              >
                <div className="relative w-full h-40 overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2 bg-cyan-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                    {product.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-white mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">
                    {product.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="py-20 relative bg-gradient-to-b from-cyan-500/5 to-transparent"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Our Best Work <span className="text-3xl">⭐</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Showcasing exceptional projects from satisfied customers
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {producedProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl overflow-hidden hover:border-cyan-500/60 transition-all group"
              >
                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {product.title}
                  </h3>
                  <p className="text-cyan-400 font-semibold mb-4">
                    👤 {product.customer}
                  </p>
                  <div className="flex gap-1">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-cyan-400 text-cyan-400"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      <section
        id="videos"
        className="py-20 relative bg-gradient-to-b from-transparent to-blue-500/5"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 px-4 py-2 rounded-full font-semibold mb-4 backdrop-blur-sm">
              <span className="text-lg">📹</span>
              Behind The Scenes
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Featured Videos
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Watch our latest content showcasing precision printing, design
              processes, and customer transformations
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {youtubeShorts.map((short) => (
              <motion.div
                key={short.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredVideo(short.id)}
                onMouseLeave={() => setHoveredVideo(null)}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl overflow-hidden hover:border-cyan-500/60 transition-all duration-300 h-full">
                  <div className="relative w-full aspect-video bg-black overflow-hidden">
                    <motion.img
                      src={short.thumbnail}
                      alt={short.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredVideo === short.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

                    <motion.a
                      href={`https://www.youtube.com/shorts/${short.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    >
                      <motion.div
                        animate={{
                          scale: hoveredVideo === short.id ? [1, 1.2, 1] : 1,
                        }}
                        transition={{
                          repeat: hoveredVideo === short.id ? Infinity : 0,
                          duration: 1.5,
                        }}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full p-4 shadow-2xl"
                      >
                        <Play size={32} fill="white" />
                      </motion.div>
                    </motion.a>

                    <div className="absolute top-4 right-4 bg-cyan-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <span>▶</span> YouTube
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <motion.h3
                      className="text-lg font-bold text-white line-clamp-2"
                      whileHover={{ color: "#06b6d4" }}
                    >
                      {short.title}
                    </motion.h3>

                    <p className="text-gray-400 text-sm line-clamp-2">
                      {short.description}
                    </p>

                    <motion.a
                      href={`https://www.youtube.com/shorts/${short.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <Play size={16} fill="white" />
                      Watch Video
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <p className="text-gray-400 mb-6 text-lg">
              Subscribe to our YouTube channel for weekly content updates!
            </p>
            <motion.a
              href="https://www.youtube.com/channel/UCb0pTej4LEGZJukVhAR-XYQ"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              <span className="text-xl">▶</span>
              Subscribe Now
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-black text-center mb-16"
          >
            Trusted by Professionals <span className="text-3xl">💫</span>
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-8 hover:border-cyan-500/60 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-cyan-400 text-cyan-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-black"
          >
            Ready to{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Create
            </span>
            ?
          </motion.h2>
          <p className="text-lg text-gray-400">
            Start your 3D printing journey today. Transform your ideas into
            reality.
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(34,211,238,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById("contact");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-4 rounded-lg font-bold hover:shadow-lg transition-all"
          >
            Get Started
          </motion.button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-8">
                Get In Touch
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">Phone</p>
                    <a
                      href="tel:+916366036081"
                      className="text-lg font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      +91 6366036081
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">Email</p>
                    <a
                      href="mailto:3dshapeart2024@gmail.com"
                      className="text-lg font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      3dshapeart2024@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/916366036081"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Contact via WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">
                      Address
                    </p>
                    <p className="text-lg font-bold text-white">
                      Bangalore, Karnataka, India
                    </p>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-8 p-6 bg-cyan-500/10 border-2 border-cyan-500/50 rounded-xl"
              >
                <p className="text-cyan-300 font-bold text-center">
                  💬 WhatsApp us for instant response & easy booking!
                </p>
              </motion.div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                alert("Thank you! We will contact you soon.");
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-gray-900 border-2 border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-gray-900 border-2 border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Project Details
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-gray-900 border-2 border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 border-t border-cyan-500/20">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    3D
                  </div>
                  <span className="font-bold text-white">3D Shape Art</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Precision 3D printing for the future.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Products</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>
                    <a
                      href="#products"
                      className="hover:text-cyan-400 transition"
                    >
                      All Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="#portfolio"
                      className="hover:text-cyan-400 transition"
                    >
                      Portfolio
                    </a>
                  </li>
                  <li>
                    <a
                      href="#videos"
                      className="hover:text-cyan-400 transition"
                    >
                      Videos
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Company</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>
                    <a href="#" className="hover:text-cyan-400 transition">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-cyan-400 transition">
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="hover:text-cyan-400 transition"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Connect</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a
                      href="mailto:3dshapeart2024@gmail.com"
                      className="hover:text-cyan-400 transition"
                    >
                      Email
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <a
                      href="tel:+916366036081"
                      className="hover:text-cyan-400 transition"
                    >
                      Phone
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    <a
                      href="https://www.instagram.com/3dshapeart2025"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 transition"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="mb-2 font-semibold text-white">
                © 2024 3D Shape Art. All rights reserved.
              </p>
              <p className="text-gray-600">Made with ❤️ in Bangalore, India</p>
            </div>
          </div>
        </motion.div>
      </footer>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setBookingModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/50 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 flex justify-between items-center p-6 border-b border-cyan-500/30 bg-gray-950">
                <h3 className="text-2xl font-bold text-white">
                  Book Now
                  {bookingForm.productName && ` - ${bookingForm.productName}`}
                </h3>
                <button
                  onClick={() => setBookingModalOpen(false)}
                  className="text-gray-400 hover:text-cyan-400"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: 3, duration: 0.5 }}
                      className="text-6xl"
                    >
                      ✨
                    </motion.div>
                    <h3 className="text-2xl font-bold text-cyan-400">
                      Request Submitted!
                    </h3>
                    <p className="text-gray-300 text-lg">
                      {contactMethod === "email"
                        ? "Check your email for confirmation!"
                        : "WhatsApp message sent! We'll respond shortly."}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-6">
                      <p className="text-sm font-semibold text-cyan-300 mb-3">
                        Preferred Contact Method:
                      </p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setContactMethod("email")}
                          className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${
                            contactMethod === "email"
                              ? "bg-cyan-500 text-black"
                              : "bg-gray-800 text-gray-400"
                          }`}
                        >
                          <Mail size={16} className="inline mr-2" />
                          Email
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactMethod("whatsapp")}
                          className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${
                            contactMethod === "whatsapp"
                              ? "bg-cyan-500 text-black"
                              : "bg-gray-800 text-gray-400"
                          }`}
                        >
                          <MessageCircle size={16} className="inline mr-2" />
                          WhatsApp
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        <User size={16} className="inline mr-2" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingForm.name}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-gray-900 border-2 border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        <Mail size={16} className="inline mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={bookingForm.email}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            email: e.target.value,
                          })
                        }
                        className="w-full bg-gray-900 border-2 border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        <MessageCircle size={16} className="inline mr-2" />
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={bookingForm.whatsappNumber}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            whatsappNumber: e.target.value,
                          })
                        }
                        className="w-full bg-gray-900 border-2 border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="Your WhatsApp number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        <MapPin size={16} className="inline mr-2" />
                        Location
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingForm.location}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            location: e.target.value,
                          })
                        }
                        className="w-full bg-gray-900 border-2 border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="Your location"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        Additional Details
                      </label>
                      <textarea
                        value={bookingForm.details}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            details: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full bg-gray-900 border-2 border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="Any specific requirements..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSending}
                      whileHover={!isSending ? { scale: 1.02 } : {}}
                      whileTap={!isSending ? { scale: 0.98 } : {}}
                      className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                        isSending
                          ? "bg-gray-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50"
                      }`}
                    >
                      {isSending ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Submit Request
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
