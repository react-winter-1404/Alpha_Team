import React from "react";
import { motion } from "framer-motion";
import star1 from "../../assets/News/3d-glassy-gradient-crisscross-form 1.ico";
import star2 from "../../assets/Courses/Star 2.ico";
import twistedLine from "../../assets/Courses/3d-glassy-twisted-line-2 1.ico";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const NewsHeroSection = () => {
  return (
    <section
      className="relative w-full py-16 px-4 flex flex-col items-center justify-center text-center overflow-hidden bg-white"
      dir="rtl"
    >
      <motion.img
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        src={star2}
        alt="Star 2"
        className="absolute top-6 left-[35%] md:left-[32%] w-6 h-6 animate-pulse select-none"
      />

      <motion.img
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        src={star1}
        alt="Star 1"
        className="absolute top-20 right-[20%] md:right-[28%] w-7 h-7 select-none"
      />

      <motion.img
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        src={twistedLine}
        alt="Twisted Line"
        className="absolute left-[10%] md:left-[28%] bottom-12 hidden sm:block w-16 h-auto select-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-2xl mx-auto z-10 flex flex-col items-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-5xl font-black text-slate-800 mb-6 tracking-tight"
        >
          اخبار و مقالات آکادمی
          <span className="text-blue-600"> ! </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-slate-500 text-sm md:text-base leading-relaxed max-w-lg mb-10 font-medium"
        >
          اخبار و مقالات که میتوانند برای پیشرفت و یادگیری شما مفید باشند
           رو ما در اختیار شما قرار میدیم
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center cursor-pointer group text-slate-400 hover:text-blue-600 transition-colors duration-200"
        >
          <span className="text-sm font-semibold mb-1">لیست دوره ها</span>
          <svg
            className="w-5 h-5 animate-bounce group-hover:translate-y-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NewsHeroSection;