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
import Image from "next/image";

export default function Hero() {
  const params = useParams();
  const tableNumber = params.selectedTable;

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

  const iconPositions = [
    { top: "13%", left: "10%" },
    { top: "15%", left: "75%" },
    { top: "40%", left: "10%" },
    { top: "47%", left: "75%" },
    { top: "65%", left: "5%" },
    { top: "75%", left: "67%" },
    { top: "83%", left: "32%" },
    { top: "93%", left: "95%" },
    { top: "6%", left: "45%" },
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

  const cards = [
    {
      id: 1,
      title: "Cold Coffee",
      image: "/assets/Cold-Coffee.jpeg",
    },
    {
      id: 2,
      title: "French Fries",
      image: "/assets/French-Fries.jpeg",
    },
    {
      id: 3,
      title: "Mojito Mint",
      image: "/assets/Mojito-Mint.jpeg",
    },
    {
      id: 4,
      title: "Ice Cream",
      image: "/assets/Ice-Cream.jpeg",
    },
    {
      id: 5,
      title: "Milk Shake",
      image: "/assets/Milk-Shake.jpeg",
    },
    {
      id: 6,
      title: "Sandwich",
      image: "/assets/sandwich.jpeg",
    },
    {
      id: 7,
      title: "MomosMomos",
      image: "/assets/Momos.jpeg",
    }
  ];

  return (
    <div className="h-screen w-full flex flex-col items-center justify-start relative overflow-hidden bg-gradient-to-br from-yellow-100 to-orange-200 pt-20">
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

      <motion.div
        className="z-10 text-center mt-4 md:mt-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-2 text-orange-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Excuse Me!{" "}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-orange-600 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Your Personal Digital Waiter
        </motion.p>
      </motion.div>

      <motion.div
        className="z-10 flex flex-col items-start space-y-2 mb-6"
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

      <Link href={`/table/${tableNumber}/menu/All`}>
        <motion.button
          className="z-20 bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg"
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

      <motion.div
        className="absolute bottom-0 w-full overflow-hidden py-8 z-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="flex space-x-6"
          animate={{ x: [0, -2000] }}
          transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          {[...cards, ...cards].map((card, index) => (
            <motion.div
              key={`${card.id}-${index}`}
              className="w-64 h-80 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 transform hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden relative ring-4 ring-white/30 shadow-lg">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 128px) 100vw, 128px"
                />
              </div>
              <h3 className="text-xl font-bold text-orange-800 text-center mt-6">
                {card.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div ref={homePageRef} />
    </div>
  );
}