"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
  MapPin as LocationIcon,
  User,
  X as CloseIcon,
  Shield,
  Truck,
  Grid3x3,
  List,
  ChevronLeft,
  Send,
  CheckCircle,
  Play,
  Heart,
  Share2,
  Volume2,
  VolumeX,
} from "lucide-react";

// Top 5 Christmas Product Images for Home
const topProducts = [
  {
    id: 1,
    name: "Christmas Nativity Water Globe",
    image: "/photo1.jpg",
  },
  {
    id: 2,
    name: "Santa Sleigh Door Corner",
    image: "/photo4.jpg",
  },
  {
    id: 3,
    name: "Hanging Snowman",
    image: "/photo3.jpg",
  },
  {
    id: 4,
    name: "Gift",
    image: "/photo2.jpg",
  },
  {
    id: 5,
    name: "Illuminated Nativity Christmas Tree",
    image: "/photo6.jpg",
  },
];

// All 30 Christmas Product Images
const allProducts = [
  ...topProducts,
  {
    id: 6,
    name: "Sant Key chain",
    image: "/photo5.jpg",
  },
  {
    id: 7,
    name: "Christmas Nativity Scene",
    image: "/photo7.jpg",
  },
  {
    id: 8,
    name: "Holy Family Christmas Statue",
    image: "/photo8.jpg",
  },
  {
    id: 9,
    name: "Nativity Silhouette Decor",
    image: "/photo9.jpg",
  },
  {
    id: 10,
    name: "Family Heart Sculpture",
    image: "/photo10.jpg",
  },
  {
    id: 11,
    name: "Jesus Christ LED Lamp",
    image: "/photo11.jpg",
  },
  {
    id: 12,
    name: "Family Wall Plaque",
    image: "/photo12.jpg",
  },
  {
    id: 13,
    name: "Reindeer Forest Showpiece",
    image: "/photo13.jpg",
  },
  {
    id: 14,
    name: "Santa's Workshop Christmas Display",
    image: "/photo14.jpg",
  },
  {
    id: 15,
    name: "Modern Spiral Christmas Tree",
    image: "/photo15.jpg",
  },
  {
    id: 16,
    name: "Nativity Stable Silhouette",
    image: "/photo16.jpg",
  },
  {
    id: 17,
    name: "Door Corner Decor",
    image: "/photo17.jpg",
  },
  {
    id: 18,
    name: "Santa Wall Hanging",
    image: "/photo18.jpg",
  },
  {
    id: 19,
    name: "Tree Dangle Earrings",
    image: "/photo19.jpg",
  },
];

// Produced Products
const producedProducts = [
  {
    id: 1,
    title: "Christmas Nativity Water Globe",
    customer: "Sainath M",
    image: "/ourProduct1.jpg",
  },
  {
    id: 2,
    title: "Classic Wooden Ship Replica (3D Printed)",
    customer: "Nithish",
    image: "/ourProduct2.jpg",
  },
  {
    id: 3,
    title: "Baby photo lamp",
    customer: "Anjali",
    image: "/ourProduct3.jpg",
  },
];

// YouTube Shorts
const youtubeShorts = [
  {
    id: 1,
    title: "Eternal Love Abstract Sculpture",
    youtubeId: "ApdZr_Qywdc?si=lnIUBY21xaiYguv7",
    thumbnail: "/photo20.jpg",
    description:
      "Watch our precision 3D printer in action creating beautiful designs",
  },
  {
    id: 2,
    title: "Custom Christmas Design Showcase",
    youtubeId: "IrJnJAQSEbs?si=_M_mxNGSRgMIlRla",
    thumbnail: "/photo21.jpg",
    description: "Beautiful Christmas collection designs revealed",
  },
  {
    id: 3,
    title: "Customer Project Transformation",
    youtubeId: "JfepIbSmsbU?si=qrlNjiKIaTd07ILr",
    thumbnail: "/ourProduct3.jpg",
    description: "From concept to reality - customer project timelapse",
  },
];

const ITEMS_PER_PAGE = 12;

// Email sending function
const sendEmail = async (emailData: any) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });
    return response.ok;
  } catch (error) {
    console.error("Email sending failed:", error);
    return true;
  }
};

// Type definitions
interface Product {
  id: number;
  name: string;
  image: string;
}

interface BookingFormData {
  productName: string;
  name: string;
  email: string;
  location: string;
  whatsappNumber: string;
  details: string;
}

interface SpecialOfferFormData {
  name: string;
  email: string;
  whatsappNumber: string;
  location: string;
  message: string;
}

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [specialOfferModalOpen, setSpecialOfferModalOpen] = useState(false);
  const [showChristmasPage, setShowChristmasPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [submitted, setSubmitted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [contactMethod, setContactMethod] = useState("email");
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [mutedVideos, setMutedVideos] = useState<Record<number, boolean>>({});

  const [bookingForm, setBookingForm] = useState<BookingFormData>({
    productName: "",
    name: "",
    email: "",
    location: "",
    whatsappNumber: "",
    details: "",
  });

  const [specialOfferForm, setSpecialOfferForm] = useState<SpecialOfferFormData>({
    name: "",
    email: "",
    whatsappNumber: "",
    location: "",
    message: "",
  });

  const testimonials = [
    {
      name: "Prabhu",
      role: "Customer",
      text: "I ordered a customizable photo lamp and it turned out amazing. The details were very clear and the finish was perfect. My family loved it.",
      rating: 4,
    },
    {
      name: "Nithish",
      role: "Customer",
      text: "I ordered a 3D printed boat model and the quality exceeded my expectations. The design, structure, and finishing were really impressive.",
      rating: 5,
    },
    {
      name: "Anjali",
      role: "Customer",
      text: "I ordered a baby photo lamp as a gift and it came out beautifully. The photo clarity and soft lighting made it very special for us.",
      rating: 5,
    },
  ];

  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = allProducts.slice(startIndex, endIndex);

  const handleBookNow = (product: Product) => {
    setSelectedProduct(product);
    setBookingForm({
      productName: product.name,
      name: "",
      email: "",
      location: "",
      whatsappNumber: "",
      details: "",
    });
    setContactMethod("email");
    setSubmitted(false);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contactMethod === "email") {
      await sendEmail({
        to: bookingForm.email,
        subject: `Booking Confirmation - ${bookingForm.productName}`,
        html: `
          <h2>Booking Confirmation</h2>
          <p>Thank you for your interest in <strong>${bookingForm.productName}</strong>!</p>
          <h3>Your Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${bookingForm.name}</li>
            <li><strong>Email:</strong> ${bookingForm.email}</li>
            <li><strong>WhatsApp:</strong> ${bookingForm.whatsappNumber}</li>
            <li><strong>Location:</strong> ${bookingForm.location}</li>
            <li><strong>Details:</strong> ${bookingForm.details}</li>
          </ul>
          <p>We will contact you shortly to confirm your booking.</p>
          <p><strong>Promo Code:</strong> XMAS30 (25% OFF)</p>
          <hr />
          <p>Best regards,<br />3D Shape Art Team</p>
        `,
      });
    } else {
      const whatsappMessage = `Hi, I'm interested in booking "${bookingForm.productName}". 
Name: ${bookingForm.name}
Email: ${bookingForm.email}
Location: ${bookingForm.location}
WhatsApp: ${bookingForm.whatsappNumber}
Details: ${bookingForm.details}`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      window.open(
        `https://wa.me/916366036081?text=${encodedMessage}`,
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
  };

  const handleSpecialOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contactMethod === "email") {
      await sendEmail({
        to: specialOfferForm.email,
        subject: "Christmas Offer Claimed - 25% Discount!",
        html: `
          <h2>Christmas Offer Claimed! 🎄</h2>
          <p>Congratulations! You've successfully claimed our Christmas offer!</p>
          <h3>Your Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${specialOfferForm.name}</li>
            <li><strong>Email:</strong> ${specialOfferForm.email}</li>
            <li><strong>WhatsApp:</strong> ${specialOfferForm.whatsappNumber}</li>
            <li><strong>Location:</strong> ${specialOfferForm.location}</li>
          </ul>
          <h3>Offer Details:</h3>
          <p><strong>Discount:</strong> 25% OFF all products</p>
          <p><strong>Promo Code:</strong> XMAS30</p>
          <p><strong>Message:</strong> ${specialOfferForm.message}</p>
          <p>We will contact you shortly with exclusive deals and offers!</p>
          <hr />
          <p>Best regards,<br />3D Shape Art Team</p>
        `,
      });
    } else {
      const whatsappMessage = `Hi, I want to claim the Christmas offer with code XMAS30. 
Name: ${specialOfferForm.name}
Email: ${specialOfferForm.email}
WhatsApp: ${specialOfferForm.whatsappNumber}
Location: ${specialOfferForm.location}
Message: ${specialOfferForm.message}`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      window.open(
        `https://wa.me/916366036081?text=${encodedMessage}`,
        "_blank"
      );
    }

    setSubmitted(true);
    setTimeout(() => {
      setSpecialOfferModalOpen(false);
      setSubmitted(false);
      setSpecialOfferForm({
        name: "",
        email: "",
        whatsappNumber: "",
        location: "",
        message: "",
      });
    }, 2000);
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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Christmas Collections Page
  if (showChristmasPage) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <motion.button
                onClick={() => setShowChristmasPage(false)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold"
              >
                <ChevronLeft size={20} />
                Back to Home
              </motion.button>
              <h1 className="text-2xl font-bold">🎄 Christmas Collections</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </nav>

        <section className="pt-24 pb-20 bg-gradient-to-br from-red-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                🎄 All 30 Exclusive Christmas Designs 🎄
              </h2>
              <p className="text-gray-600 text-lg">
                Explore our complete Christmas collection with 25% discount!
              </p>

              <div className="flex gap-4 justify-center mt-8">
                <button
                  onClick={() => {
                    setViewMode("grid");
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <Grid3x3 size={20} />
                  Grid View
                </button>
                <button
                  onClick={() => {
                    setViewMode("list");
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <List size={20} />
                  List View
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  : "space-y-4"
              }`}
            >
              {paginatedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => handleBookNow(product)}
                  className={`bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group ${
                    viewMode === "list" ? "flex items-center gap-6 p-4" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "list"
                        ? "w-50 h-50 flex-shrink-0"
                        : "w-full h-80"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -25%
                    </div>
                  </div>
                  <div
                    className={
                      viewMode === "list" ? "flex-1" : "p-6 text-center"
                    }
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    {viewMode === "grid" && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
                      >
                        Book Now
                      </motion.button>
                    )}
                    {viewMode === "list" && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition-all"
                      >
                        Book Now
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center items-center gap-4 mt-16"
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-lg"
                        : "border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                Next
                <ChevronRight size={20} />
              </button>
            </motion.div>

            <div className="text-center mt-8 text-gray-600 font-semibold">
              Page {currentPage} of {totalPages} | Showing{" "}
              {paginatedProducts.length} products
            </div>
          </div>
        </section>

        {/* Booking Modal */}
        <AnimatePresence>
          {bookingModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setBookingModalOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-200 bg-white">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Book {bookingForm.productName}
                  </h3>
                  <button
                    onClick={() => setBookingModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <CloseIcon size={24} />
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
                        ✅
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Booking Submitted!
                      </h3>
                      <p className="text-gray-600 text-lg">
                        {contactMethod === "email"
                          ? "Confirmation email sent! Check your inbox."
                          : "WhatsApp message sent! We'll respond shortly."}
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <p className="text-sm font-semibold mb-3">
                          Preferred Contact Method:
                        </p>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setContactMethod("email")}
                            className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${
                              contactMethod === "email"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700"
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
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            <MessageCircle size={16} className="inline mr-2" />
                            WhatsApp
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
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
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-600"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
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
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-600"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
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
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-green-600"
                          placeholder="Your WhatsApp number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          <LocationIcon size={16} className="inline mr-2" />
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
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-600"
                          placeholder="Your location"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
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
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-600"
                          placeholder="Any specific requirements..."
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Send size={20} />
                        Submit Booking
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

  // Home Page
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                3D
              </div>
              <span>Shape Art</span>
            </motion.div>

            <div className="hidden md:flex gap-8">
              <a
                href="#home"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </a>

              <button
                onClick={() => setShowChristmasPage(true)}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Collections
              </button>
              <a
                href="#produced"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Produced
              </a>
              <a
                href="#videos"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Videos
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Contact
              </a>
            </div>

            <a
              href="https://wa.me/916366036081"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>

            <button
              className="md:hidden"
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
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </a>
              <button
                onClick={() => {
                  setShowChristmasPage(true);
                  setMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:text-blue-600 font-medium text-left"
              >
                Collections
              </button>
              <a
                href="#produced"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Produced
              </a>
              <a
                href="#videos"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Videos
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Contact
              </a>
              <a
                href="https://wa.me/916366036081"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-medium"
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
        className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-br from-blue-50 via-white to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-6 py-3 rounded-full font-semibold"
            >
              <span className="text-2xl">🎄</span>
              Christmas Special - 30 Exclusive Designs
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900">
              3D Printing
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Redefined
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your ideas into reality with precision 3D printing.
              Choose from 30 exclusive Christmas designs. From prototypes to
              final products, we deliver excellence in every layer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowChristmasPage(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg transition-all flex items-center gap-2 justify-center"
              >
                Explore All Collections
                <ChevronRight size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSpecialOfferModalOpen(true)}
                className="border-2 border-red-500 text-red-600 px-8 py-4 rounded-lg font-bold hover:bg-red-50 transition-colors flex items-center gap-2 justify-center"
              >
                <Sparkles size={20} />
                Claim 25% Offer
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg">
              Industry-leading quality and service
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
                desc: "ISO certified precision manufacturing",
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
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Top Collections Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🎄 Featured Christmas Collections 🎄
            </h2>
            <p className="text-gray-600 text-lg">
              Check out our top selections - 25% discount on all!
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {topProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -8 }}
                onClick={() => handleBookNow(product)}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="relative w-full h-40 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-120 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -25%
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-bold text-sm hover:shadow-lg transition-all"
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowChristmasPage(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-lg font-bold hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
            >
              Explore All 30 Collections
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Produced Products Section */}
      <section
        id="produced"
        className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ⭐ Produced Products - Our Best Work
            </h2>
            <p className="text-gray-600 text-lg">
              Check out amazing projects we've completed for our valued
              customers
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
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-blue-600 font-semibold text-lg">
                    Client: {product.customer}
                  </p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* YouTube Shorts Section */}
      <section
        id="videos"
        className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold mb-4">
              <span className="text-lg">📹</span>
              Behind The Scenes
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured YouTube Shorts
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Watch our latest YouTube Shorts showcasing 3D printing magic,
              design processes, and customer transformations
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {youtubeShorts.map((short) => (
              <motion.div
                key={short.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredVideo(short.id)}
                onMouseLeave={() => setHoveredVideo(null)}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
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

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>

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
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-2xl transition-colors"
                      >
                        <Play size={32} fill="white" />
                      </motion.div>
                    </motion.a>

                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <span>▶</span> YouTube Short
                    </div>

                    <motion.button
                      onClick={() =>
                        setMutedVideos((prev) => ({
                          ...prev,
                          [short.id]: !prev[short.id],
                        }))
                      }
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute top-4 left-4 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 shadow-lg transition-all"
                    >
                      {mutedVideos[short.id] ? (
                        <VolumeX size={18} />
                      ) : (
                        <Volume2 size={18} />
                      )}
                    </motion.button>

                    <div className="absolute bottom-4 left-4 text-white text-xs font-semibold">
                      YouTube Shorts
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <motion.h3
                      className="text-lg font-bold text-gray-900 line-clamp-2"
                      whileHover={{ color: "#dc2626" }}
                    >
                      {short.title}
                    </motion.h3>

                    <p className="text-gray-600 text-sm line-clamp-2">
                      {short.description}
                    </p>

                    <motion.a
                      href={`https://www.youtube.com/shorts/${short.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <Play size={16} fill="white" />
                      Watch on YouTube
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-gray-300 mb-6 text-lg">
              Want to see more? Subscribe to our YouTube channel for weekly
              content!
            </p>
            <motion.a
              href="https://www.youtube.com/channel/UCb0pTej4LEGZJukVhAR-XYQ"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <span className="text-xl">▶</span>
              Subscribe to Our YouTube Channel
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Christmas Promo Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 text-8xl opacity-10 animate-pulse">
              🎄
            </div>
            <div className="absolute bottom-0 right-0 text-8xl opacity-10 animate-bounce">
              🎅
            </div>
            <div
              className="absolute top-20 right-10 text-5xl animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              ⭐
            </div>
            <div
              className="absolute bottom-20 left-10 text-5xl animate-pulse"
              style={{ animationDelay: "1s" }}
            >
              🎁
            </div>

            <motion.div
              initial={{ y: -30 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative z-10 space-y-6"
            >
              <h2 className="text-5xl md:text-6xl font-black">
                🎄 Special Christmas Offer 🎄
              </h2>
              <p className="text-xl text-red-50 font-semibold">
                Celebrate this festive season with stunning 3D art creations
              </p>

              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="bg-white bg-opacity-25 backdrop-blur-lg rounded-2xl p-10 border-2 border-white border-opacity-50"
              >
                <p className="text-red-100 mb-3 font-bold text-lg">
                  LIMITED TIME OFFER
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <div className="text-center">
                    <p className="text-7xl font-black text-white drop-shadow-lg">
                      25%
                    </p>
                    <p className="text-red-100 text-xl font-bold mt-2">
                      OFF ALL PRODUCTS
                    </p>
                  </div>
                  <div
                    className="text-6xl animate-spin"
                    style={{ animationDuration: "3s" }}
                  >
                    🎁
                  </div>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSpecialOfferModalOpen(true)}
                className="inline-flex items-center gap-2 bg-white text-red-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-2xl mt-4"
              >
                <Sparkles size={24} />
                Claim Offer Now
              </motion.button>

              <p className="text-red-100 mt-6 text-sm">
                Promo Code:{" "}
                <span className="text-white text-2xl font-black">XMAS30</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16 text-gray-900"
          >
            Trusted by Professionals
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
                className="bg-white border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl font-bold text-gray-900">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of satisfied customers. Choose from 30 exclusive
            Christmas designs with 25% discount!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowChristmasPage(true)}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-lg font-bold hover:shadow-lg transition-all"
          >
            Browse All 30 Designs
          </motion.button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold mb-8 text-gray-900">
                Get In Touch
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">Phone</p>
                    <a
                      href="tel:+916366036081"
                      className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      +91 6366036081
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">Email</p>
                    <a
                      href="mailto:3dshapeart2024@gmail.com"
                      className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      3dshapeart2024@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/916366036081"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-green-600 hover:text-green-700 transition-colors"
                    >
                      Contact via WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <LocationIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">
                      Address
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      Bangalore, Karnataka, India
                    </p>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl"
              >
                <p className="text-green-900 font-bold text-center">
                  💬 Contact us via WhatsApp for instant response and easy
                  booking!
                </p>
              </motion.div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                alert("Thank you! We will contact you soon.");
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-gray-100 border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-gray-100 border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Project Details
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-gray-100 border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600"
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                    3D
                  </div>
                  <span className="font-bold text-white">3D Shape Art</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Precision 3D printing for the future.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Products</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <button
                      onClick={() => setShowChristmasPage(true)}
                      className="hover:text-white transition"
                    >
                      Christmas Collections
                    </button>
                  </li>
                  <li>
                    <a href="#produced" className="hover:text-white transition">
                      Produced Works
                    </a>
                  </li>
                  <li>
                    <a href="#videos" className="hover:text-white transition">
                      Videos
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-white transition">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a
                      href="mailto:3dshapeart2024@gmail.com"
                      className="hover:text-white transition"
                    >
                      3dshapeart2024@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <a
                      href="tel:+916366036081"
                      className="hover:text-white transition"
                    >
                      +91 6366036081
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="mb-2 font-semibold">
                © 2024 3D Shape Art. All rights reserved.
              </p>
              <p className="text-gray-500">Made with ❤️ in Bangalore, India</p>
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
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setBookingModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-200 bg-white">
                <h3 className="text-2xl font-bold text-gray-900">
                  Book {bookingForm.productName}
                </h3>
                <button
                  onClick={() => setBookingModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <CloseIcon size={24} />
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
                      ✅
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Booking Submitted!
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {contactMethod === "email"
                        ? "Confirmation email sent! Check your inbox."
                        : "WhatsApp message sent! We'll respond shortly."}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                      <p className="text-sm font-semibold mb-3">
                        Preferred Contact Method:
                      </p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setContactMethod("email")}
                          className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${
                            contactMethod === "email"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-700"
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
                              ? "bg-green-600 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          <MessageCircle size={16} className="inline mr-2" />
                          WhatsApp
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
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
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-600"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
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
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-600"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
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
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-green-600"
                        placeholder="Your WhatsApp number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        <LocationIcon size={16} className="inline mr-2" />
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
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-600"
                        placeholder="Your location"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
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
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-600"
                        placeholder="Any specific requirements..."
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Send size={20} />
                      Submit Booking
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Special Offer Modal */}
      <AnimatePresence>
        {specialOfferModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSpecialOfferModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border-2 border-red-200"
            >
              <div className="sticky top-0 bg-gradient-to-r from-red-500 to-red-600 flex justify-between items-center p-6 text-white">
                <h3 className="text-2xl font-bold">🎄 Christmas Offer</h3>
                <button
                  onClick={() => setSpecialOfferModalOpen(false)}
                  className="text-white hover:bg-red-700 p-2 rounded-lg"
                >
                  <CloseIcon size={24} />
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
                      🎁
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Offer Claimed!
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {contactMethod === "email"
                        ? "Confirmation email sent! Check your inbox for details."
                        : "WhatsApp message sent! We'll contact you shortly."}
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSpecialOfferSubmit}
                    className="space-y-4"
                  >
                    <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
                      <p className="text-red-900 font-bold text-center text-lg">
                        25% OFF ALL PRODUCTS
                      </p>
                      <p className="text-red-800 text-center text-sm mt-2">
                        Use Code:{" "}
                        <span className="font-black text-lg">XMAS30</span>
                      </p>
                    </div>

                    <div className="bg-red-50 rounded-lg p-4 mb-6">
                      <p className="text-sm font-semibold mb-3">
                        Preferred Contact Method:
                      </p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setContactMethod("email")}
                          className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${
                            contactMethod === "email"
                              ? "bg-red-600 text-white"
                              : "bg-gray-200 text-gray-700"
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
                              ? "bg-green-600 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          <MessageCircle size={16} className="inline mr-2" />
                          WhatsApp
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        <User size={16} className="inline mr-2" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={specialOfferForm.name}
                        onChange={(e) =>
                          setSpecialOfferForm({
                            ...specialOfferForm,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-red-600"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        <Mail size={16} className="inline mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={specialOfferForm.email}
                        onChange={(e) =>
                          setSpecialOfferForm({
                            ...specialOfferForm,
                            email: e.target.value,
                          })
                        }
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-red-600"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        <MessageCircle size={16} className="inline mr-2" />
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={specialOfferForm.whatsappNumber}
                        onChange={(e) =>
                          setSpecialOfferForm({
                            ...specialOfferForm,
                            whatsappNumber: e.target.value,
                          })
                        }
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-green-600"
                        placeholder="Your WhatsApp number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        <LocationIcon size={16} className="inline mr-2" />
                        Location
                      </label>
                      <input
                        type="text"
                        required
                        value={specialOfferForm.location}
                        onChange={(e) =>
                          setSpecialOfferForm({
                            ...specialOfferForm,
                            location: e.target.value,
                          })
                        }
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-red-600"
                        placeholder="Your location"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Message
                      </label>
                      <textarea
                        value={specialOfferForm.message}
                        onChange={(e) =>
                          setSpecialOfferForm({
                            ...specialOfferForm,
                            message: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-red-600"
                        placeholder="Tell us more about your interest..."
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles size={20} />
                      Claim 25% Offer Now
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