"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Gift, Sparkles } from "lucide-react";
import Link from "next/link";
import ThreeScene from "./ThreeScene";

export default function Hero() {
  const [screen] = useState(() => ({
    w: typeof window === "undefined" ? 0 : window.innerWidth,
    h: typeof window === "undefined" ? 0 : window.innerHeight,
  }));
  const flakes = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => ({
        id: index,
        startX: (index * 73) % 1280,
        driftX: ((index % 5) - 2) * 48,
        duration: 10 + (index % 6) * 1.5,
        delay: (index % 5) * 0.7,
      })),
    []
  );

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ThreeScene />
      </div>

      {screen.w > 0 &&
        flakes.map((flake) => (
          <motion.div
            key={flake.id}
            className="snowflake absolute text-2xl text-white/35"
            initial={{
              x: flake.startX % screen.w,
              y: -20,
            }}
            animate={{
              y: screen.h + 20,
              x: (flake.startX + flake.driftX + screen.w) % screen.w,
            }}
            transition={{
              duration: flake.duration,
              repeat: Infinity,
              ease: "linear",
              delay: flake.delay,
            }}
          >
            *
          </motion.div>
        ))}

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="mb-8 inline-block"
          >
            <div className="glass-effect flex items-center space-x-2 rounded-full px-6 py-3">
              <Gift className="animate-bounce text-pink-400" />
              <span className="font-semibold">
                Premium custom 3D printing for gifts, decor, and models
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-5xl font-bold sm:text-6xl lg:text-7xl"
          >
            <span className="gradient-text">Transform Ideas</span>
            <br />
            <span className="text-white">Into Reality</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mb-12 max-w-3xl text-xl text-gray-300 sm:text-2xl"
          >
            Premium 3D printed products crafted with precision. From figurines
            to functional designs, bring your imagination to life with a
            premium custom finish.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/products">
              <button className="btn-primary group flex items-center space-x-2">
                <span>Shop Now</span>
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </Link>
            <button className="btn-secondary flex items-center space-x-2">
              <Sparkles size={20} />
              <span>View Collections</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-8"
          >
            <div className="glass-effect rounded-xl p-6">
              <div className="gradient-text mb-2 text-3xl font-bold">500+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <div className="gradient-text mb-2 text-3xl font-bold">1000+</div>
              <div className="text-gray-400">Products Sold</div>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <div className="gradient-text mb-2 text-3xl font-bold">4.9*</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/80" />
    </div>
  );
}
