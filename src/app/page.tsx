"use client";

const products = [
  {
    id: 1,
    name: "Precision Prototype",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=500&fit=crop",
  },
  {
    id: 2,
    name: "Custom Miniatures",
    image:
      "https://images.unsplash.com/photo-1578762335591-ce4a42c7fac2?w=500&h=500&fit=crop",
  },
  {
    id: 3,
    name: "Mechanical Parts",
    image:
      "https://images.unsplash.com/photo-1578926314433-a4307d5a1111?w=500&h=500&fit=crop",
  },
  {
    id: 4,
    name: "Jewelry & Accessories",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
  },
  {
    id: 5,
    name: "Architectural Models",
    image:
      "https://images.unsplash.com/photo-1577720643272-265f434b4b3d?w=500&h=500&fit=crop",
  },
  {
    id: 6,
    name: "Educational Sets",
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop",
  },
];

import { useState } from "react";
import {
  ChevronRight,
  Zap,
  Shield,
  Truck,
  Star,
  Gift,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function Home() {
 

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // MODAL STATE & FORM
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    location: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleBookNow = (product: any) => {
    setSelectedProduct(product);
    setFormData({
      name: "",
      email: "",
      whatsapp: "",
      location: "",
      details: "",
    });
    setSubmitted(false);
  };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  //   setTimeout(() => {
  //     setSelectedProduct(null);
  //     setSubmitted(false);
  //   }, 2000);
  // };

  // Testimonials
  const testimonials = [
    {
      name: "Prabhu",
      role: "Customer",
      text: "I order one customizable photo lamp that is amazing",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      role: "Architect",
      text: "The precision and quality of the models exceeded all expectations.",
      rating: 5,
    },
    {
      name: "Marcus Williams",
      role: "Engineer",
      text: "Perfect for testing mechanical concepts. Highly recommended.",
      rating: 5,
    },
  ];

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceTypeChange = (value: any) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFormSubmitted(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        serviceType: "",
        details: "",
        date: "",
      });
      setFormSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>
      {/* Navigation */}
      <nav className="relative z-40 border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                3DShapeArt
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#products"
                className="text-sm text-gray-400 hover:text-white transition"
              >
                Products
              </a>
              <a
                href="#promo"
                className="text-sm text-gray-400 hover:text-white transition"
              >
                Promo
              </a>
              <a
                href="#features"
                className="text-sm text-gray-400 hover:text-white transition"
              >
                Features
              </a>
              <a
                href="#contact"
                className="text-sm text-gray-400 hover:text-white transition"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-block px-4 py-2 bg-white/5 border border-white/20 rounded-full text-sm text-cyan-400">
              🚀 Future of Manufacturing
            </div>

            <h1 className="text-5xl sm:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                3D Printing
              </span>
              <br />
              <span className="text-white">Redefined</span>
            </h1>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Transform your ideas into reality with precision 3D printing. From
              prototypes to final products, we deliver excellence in every
              layer.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-lg px-8 h-12 text-base font-semibold group"
              >
                Explore Products
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 rounded-lg px-8 h-12 text-base"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-cyan-400">10K+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-purple-400">99.8%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-pink-400">48H</div>
                <div className="text-sm text-gray-400">Avg Turnaround</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-400">
              Industry-leading quality and service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
            ].map((feature, i) => (
              <Card
                key={i}
                className="bg-white/5 border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-cyan-400 mb-4" />
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Products Section */}
      <section
        id="products"
        className="relative z-10 py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Products</h2>
            <p className="text-gray-400">
              Explore our range of 3D printing services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white/5 border border-white/10 overflow-hidden rounded-lg hover:border-cyan-500/50 transition-all duration-300 group cursor-pointer"
              >
                {/* Product Image */}
                <div
                  className={`h-64 relative overflow-hidden bg-gradient-to-br ${product.color}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">
                    {product.name}
                  </h3>

                  {/* Book Now Button */}
                  <button
                    onClick={() => handleBookNow(product)}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* MODAL FORM */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-white/10 rounded-2xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border-b border-white/10 px-6 py-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-white">
                  Book {selectedProduct.name}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Fill in your details below
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {submitted ? (
                // Success Message
                <div className="text-center py-12 space-y-4">
                  <div className="text-6xl animate-bounce">✅</div>
                  <h3 className="text-2xl font-bold text-white">
                    Order Success!
                  </h3>
                  <p className="text-gray-400">
                    We'll contact you shortly to confirm your booking.
                  </p>
                </div>
              ) : (
                // Form
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="City, Country"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>

                  {/* Details */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Project Details
                    </label>
                    <textarea
                      value={formData.details}
                      onChange={(e) =>
                        setFormData({ ...formData, details: e.target.value })
                      }
                      placeholder="Describe your project..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 resize-none min-h-20"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold py-3 rounded-lg transition mt-6"
                  >
                    SUBMIT ORDER
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Christmas Promo Section */}
      <section id="promo" className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/50 via-red-800/30 to-green-900/50 backdrop-blur-lg"></div>

            {/* Main content */}
            <div className="relative z-10 px-8 py-20 text-center space-y-8">
              {/* Badge */}
              <div className="inline-block px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-full">
                <span className="text-red-400 text-sm font-bold">
                  🎄 SPECIAL HOLIDAY OFFER
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h2 className="text-6xl sm:text-7xl font-black">
                  <span className="text-red-400">30% OFF</span>
                  <br />
                  <span className="bg-gradient-to-r from-green-300 via-yellow-300 to-red-300 bg-clip-text text-transparent">
                    Christmas Printing
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Limited time offer! Perfect for holiday gifts, decorations,
                  and special projects.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid sm:grid-cols-3 gap-4 py-8">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-green-400 font-semibold text-sm">
                    ✨ Free Shipping
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Orders over $500</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-yellow-400 font-semibold text-sm">
                    ⚡ 24-Hour Turnaround
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Priority processing
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-red-400 font-semibold text-sm">
                    🎁 Free Returns
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Till January 15th
                  </p>
                </div>
              </div>

              {/* Countdown */}
              <div className="bg-gradient-to-r from-red-500/10 to-green-500/10 border border-red-500/30 rounded-2xl p-8">
                <p className="text-gray-400 text-sm font-semibold mb-4">
                  ⏰ OFFER ENDS IN
                </p>
                <div className="flex justify-center gap-4">
                  {[
                    { value: "12", label: "Days" },
                    { value: "24", label: "Hours" },
                    { value: "47", label: "Mins" },
                    { value: "38", label: "Secs" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="bg-gradient-to-b from-red-600 to-green-600 rounded-lg px-4 py-3 min-w-16">
                        <div className="text-2xl font-black text-white">
                          {item.value}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2 font-semibold">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-green-500/20 border-2 border-green-500/50 rounded-xl p-6">
                <p className="text-green-400 text-sm font-semibold mb-2">
                  USE PROMO CODE
                </p>
                <p className="text-white text-4xl font-black tracking-wider">
                  XMAS30
                </p>
                <p className="text-green-400/70 text-xs mt-3">
                  🎄 Get 30% discount on all services
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  const name = prompt("Your Name:");
                  const email = prompt("Your Email:");
                  const whatsapp = prompt("Your WhatsApp:");
                  const location = prompt("Your Location:");

                  if (name && email && whatsapp && location) {
                    alert(
                      `✓ Thank you! We'll contact you shortly.\n\nPromo Code: XMAS30`
                    );
                  }
                }}
                className="group relative inline-block mt-8"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-green-600 rounded-xl blur opacity-75 group-hover:opacity-100"></div>
                <div className="relative bg-black px-12 py-4 rounded-xl flex items-center gap-3 group-hover:bg-opacity-90 transition">
                  <span className="text-lg font-bold text-transparent bg-gradient-to-r from-red-400 to-green-400 bg-clip-text">
                    CLAIM 30% DISCOUNT
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Trusted by Professionals
            </h2>
            <p className="text-gray-400">See what our clients say about us</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card
                key={i}
                className="bg-white/5 border-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex gap-1 mb-3">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                  </div>
                  <CardTitle className="text-white">
                    {testimonial.name}
                  </CardTitle>
                  <CardDescription className="text-purple-400">
                    {testimonial.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Start Your Project?</h2>
          <p className="text-lg text-gray-400">
            Join thousands of satisfied customers. Order now and get 30% off
            with code XMAS30
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-12 h-12 text-base font-semibold rounded-lg"
          >
            Get Started Today
          </Button>
        </div>
      </section>
      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="font-bold">3DShapeArt</span>
              </div>
              <p className="text-gray-400 text-sm">
                Precision 3D printing for the future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Prototyping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Miniatures
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Parts
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
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
                    href="mailto:hello@3DShapeArt.com"
                    className="hover:text-white transition"
                  >
                    abhishekdhumsur@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a
                    href="tel:+1234567890"
                    className="hover:text-white transition"
                  >
                    +91 6366036081
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 3DShapeArt. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
