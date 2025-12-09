"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../lib/types";
import { useStore } from "../lib/store";
import { formatPrice, calculateDiscount } from "../lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        <div className="card overflow-hidden">
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden rounded-xl mb-4">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Discount Badge */}
            {discount > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="absolute top-4 left-4 bg-gradient-to-r from-christmas-red to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold"
              >
                {discount}% OFF
              </motion.div>
            )}

            {/* Quick View Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <button className="glass-effect px-4 py-2 rounded-lg flex items-center space-x-2">
                <Eye size={20} />
                <span>Quick View</span>
              </button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-purple-400 mb-1">
                  {product.category}
                </p>
                <h3 className="font-semibold text-lg group-hover:text-purple-400 transition-colors">
                  {product.name}
                </h3>
              </div>
              <div className="flex items-center space-x-1 text-yellow-400">
                <Star size={16} fill="currentColor" />
                <span className="text-sm text-white">{product.rating}</span>
              </div>
            </div>

            <p className="text-gray-400 text-sm line-clamp-2">
              {product.description}
            </p>

            {/* Price and Action */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold gradient-text">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through text-sm">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {product.reviews} reviews
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
              >
                <ShoppingCart size={20} />
              </motion.button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  product.inStock ? "bg-green-500" : "bg-red-500"
                } animate-pulse`}
              />
              <span className="text-xs text-gray-400">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
