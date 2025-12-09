"use client";

import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, Tag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "../lib/store";
import { formatPrice } from "../lib/utils";
import { promoCodes } from "../data/products";
import { useState } from "react";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartSubtotal,
    getCartTotal,
    getDiscount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
  } = useStore();
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = () => {
    const promo = promoCodes.find(
      (p) => p.code.toUpperCase() === promoInput.toUpperCase()
    );

    if (!promo) {
      setPromoError("Invalid promo code");
      return;
    }

    const subtotal = getCartSubtotal();
    if (promo.minAmount && subtotal < promo.minAmount) {
      setPromoError(`Minimum order amount is ${formatPrice(promo.minAmount)}`);
      return;
    }

    applyPromoCode(promo);
    setPromoError("");
    setPromoInput("");
  };

  const subtotal = getCartSubtotal();
  const discount = getDiscount();
  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <ShoppingBag size={80} className="mx-auto mb-6 text-gray-600" />
            <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-400 mb-8">
              Add some amazing 3D printed products to get started!
            </p>
            <Link href="/products">
              <button className="btn-primary">Continue Shopping</button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-12 text-center"
        >
          <span className="gradient-text">Shopping Cart</span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex gap-6">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} className="text-red-500" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="p-2 glass-effect rounded-lg hover:bg-white/20 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-2 glass-effect rounded-lg hover:bg-white/20 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold gradient-text">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        <div className="text-sm text-gray-400">
                          {formatPrice(item.product.price)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card sticky top-32">
              <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Promo Code
                </label>
                {appliedPromo ? (
                  <div className="glass-effect border-2 border-green-500 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Tag size={20} className="text-green-500" />
                      <div>
                        <div className="font-semibold">{appliedPromo.code}</div>
                        <div className="text-xs text-gray-400">
                          {appliedPromo.description}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="p-1 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <X size={18} className="text-red-500" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value.toUpperCase());
                          setPromoError("");
                        }}
                        placeholder="Enter code"
                        className="flex-1 px-4 py-2 glass-effect rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="btn-secondary"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-sm text-red-500">{promoError}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-500">FREE</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold mb-6">
                <span>Total</span>
                <span className="gradient-text">{formatPrice(total)}</span>
              </div>

              <Link href="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary"
                >
                  Proceed to Checkout
                </motion.button>
              </Link>

              <Link href="/products">
                <button className="w-full btn-secondary mt-4">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
