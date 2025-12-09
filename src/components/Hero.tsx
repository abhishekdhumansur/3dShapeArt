"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Gift } from "lucide-react";
import Link from "next/link";
import ThreeScene from "./ThreeScene";

export default function Hero() {
  const [screen, setScreen] = useState({ w: 0, h: 0 });

  // Safe window usage
  useEffect(() => {
    setScreen({
      w: window.innerWidth,
      h: window.innerHeight,
    });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0">
        <ThreeScene />
      </div>

      {/* Snowflakes */}
      {screen.w > 0 &&
        [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="snowflake absolute text-2xl"
            initial={{
              x: Math.random() * screen.w,
              y: -20,
            }}
            animate={{
              y: screen.h + 20,
              x: Math.random() * screen.w,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            ❄
          </motion.div>
        ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          {/* Christmas Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="inline-block mb-8"
          >
            <div className="glass-effect px-6 py-3 rounded-full flex items-center space-x-2">
              <Gift className="text-christmas-red animate-bounce" />
              <span className="font-semibold">
                Christmas Special - Up to 40% OFF! 🎄
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">Transform Ideas</span>
            <br />
            <span className="text-white">Into Reality</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Premium 3D printed products crafted with precision. From figurines
            to functional designs, bring your imagination to life this holiday
            season.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/products">
              <button className="btn-primary flex items-center space-x-2 group">
                <span>Shop Now</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </Link>
            <button className="btn-secondary flex items-center space-x-2">
              <Sparkles size={20} />
              <span>View Collections</span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="glass-effect rounded-xl p-6">
              <div className="text-3xl font-bold gradient-text mb-2">500+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <div className="text-3xl font-bold gradient-text mb-2">1000+</div>
              <div className="text-gray-400">Products Sold</div>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <div className="text-3xl font-bold gradient-text mb-2">4.9★</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/80 pointer-events-none" />
    </div>
  );
}
