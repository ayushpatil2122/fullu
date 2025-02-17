"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import {
  Utensils,
  Coffee,
  Pizza,
  IceCream,
  ChefHat,
  Sandwich,
  Salad,
  Soup,
  Drumstick,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Hero() {
  const params = useParams()
  const tableNumber = params.selectedTable

  const homePageRef = useRef<HTMLDivElement>(null);

  const scrollToHomePage = () => {
    const yOffset = 320;
    const element = homePageRef.current;

    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, left: 0, behavior: "smooth" });
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 0.2,
      scale: [1, 1.2, 1],
      transition: {
        delay: i * 0.2,
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    }),
  };

  // Adjusted icon positions to prevent overlap
  const iconPositions = [
    { top: "13%", left: "10%" }, // Utensils (moved slightly left)
    { top: "15%", left: "75%" }, // Coffee
    { top: "40%", left: "10%" }, // Pizza
    { top: "47%", left: "75%" }, // Ice Cream
    { top: "65%", left: "5%" }, // Chef Hat
    { top: "75%", left: "67%" }, // Sandwich
    { top: "83%", left: "32%" }, // Salad
    { top: "93%", left: "95%" }, // Soup (shifted right)
    { top: "6%", left: "45%" }, // Drumstick (moved down slightly)
  ];

  const icons = [
    Utensils,
    Coffee,
    Pizza,
    IceCream,
    ChefHat,
    Sandwich,
    Salad,
    Soup,
    Drumstick,
  ];

  const steps = [
    "Click on Start Ordering",
    "Explore the Menu",
    "Add to Cart",
    "Review and Place Your Order",
  ];

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-yellow-100 to-orange-200">
      {/* Randomly placed icons with proper spacing */}
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          className="absolute opacity-10 md:block"
          style={{
            top: iconPositions[index].top,
            left: iconPositions[index].left,
          }}
        >
          <Icon className="text-orange-400 w-16 h-16" />
        </motion.div>
      ))}

      {/* Text & Title */}
      <motion.div
        className="z-10 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.h1
          className="text-6xl font-bold mb-2 text-orange-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Excuse Me!{" "}
        </motion.h1>
        <motion.p
          className="text-xl text-orange-600 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Your Personal Digital Waiter
        </motion.p>
      </motion.div>

      {/* Steps Section */}
      <motion.div
        className="z-10 flex flex-col items-start space-y-2 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex items-center text-orange-800 text-sm font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 + index * 0.2, duration: 0.5 }}
          >
            <ChevronRight className="mr-2 text-orange-500 w-4 h-4" />
            <span>{step}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <Link href={`/table/${tableNumber}/menu/All`}>
      <motion.button
        className="z-10 bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 20px rgba(251, 146, 60, 0.7)",
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        Start Ordering
      </motion.button>
      </Link>
      

      <div ref={homePageRef} />
    </div>
  );
}